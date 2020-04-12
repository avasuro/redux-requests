import {
  getActionPayload,
  createSuccessAction,
  createErrorAction,
  createAbortAction,
} from '../actions';
import { ABORT_REQUESTS } from '../constants';

const getRequestTypeString = requestType =>
  typeof requestType === 'function' ? requestType.toString() : requestType;

const getKeys = requests =>
  requests.map(v =>
    typeof v === 'object'
      ? getRequestTypeString(v.requestType) + v.requestKey
      : getRequestTypeString(v),
  );

const getDriver = (config, action) =>
  action.meta && action.meta.driver
    ? config.driver[action.meta.driver]
    : config.driver.default || config.driver;

const getLastActionKey = action =>
  action.type +
  (action.meta && action.meta.requestKey ? action.meta.requestKey : '');

// TODO: remove to more functional style, we need object maps and filters
const createSendRequestMiddleware = config => {
  // TODO: clean not pending promises sometimes
  const pendingRequests = {};

  return store => next => action => {
    if (action.type === ABORT_REQUESTS) {
      const clearAll = !action.requests;
      const keys = !clearAll && getKeys(action.requests);

      if (!action.requests) {
        Object.values(pendingRequests).forEach(requests =>
          requests.forEach(r => r.cancel()),
        );
      } else {
        Object.entries(pendingRequests)
          .filter(([k]) => keys.includes(k))
          .forEach(([, requests]) => requests.forEach(r => r.cancel()));
      }

      return next(action);
    }

    if (
      config.isRequestAction(action) &&
      (!action.meta || action.meta.runByWatcher !== false)
    ) {
      if (config.onRequest) {
        action = {
          ...action,
          request: config.onRequest(action.request, action, store),
        };
      }

      action = next(action);

      let responsePromises;
      const actionPayload = getActionPayload(action);
      const isBatchedRequest = Array.isArray(actionPayload.request);

      if (action.meta && action.meta.cacheResponse) {
        responsePromises = [Promise.resolve(action.meta.cacheResponse)];
      } else if (action.meta && action.meta.ssrResponse) {
        responsePromises = [Promise.resolve(action.meta.ssrResponse)];
      } else {
        const driver = getDriver(config, action);
        const lastActionKey = getLastActionKey(action);
        const takeLatest =
          action.meta && action.meta.takeLatest !== undefined
            ? action.meta.takeLatest
            : typeof config.takeLatest === 'function'
            ? config.takeLatest(action)
            : config.takeLatest;

        if (takeLatest && pendingRequests[lastActionKey]) {
          pendingRequests[lastActionKey].forEach(r => r.cancel());
        }

        responsePromises = isBatchedRequest
          ? actionPayload.request.map(r => driver(r, action))
          : [driver(actionPayload.request, action)];

        if (responsePromises[0].cancel) {
          pendingRequests[lastActionKey] = responsePromises;
        }
      }

      return Promise.all(responsePromises)
        .catch(error => {
          if (
            error !== 'REQUEST_ABORTED' &&
            action.meta &&
            action.meta.getError
          ) {
            error = action.meta.getError(error);
          }

          if (error !== 'REQUEST_ABORTED' && config.onError) {
            return [config.onError(error, action, store)];
          }

          throw error;
        })
        .catch(error => {
          if (error === 'REQUEST_ABORTED') {
            if (config.onAbort) {
              config.onAbort(action, store);
            }

            const abortAction = createAbortAction(action);
            store.dispatch(abortAction);
            throw abortAction;
          }

          const errorAction = createErrorAction(action, error);
          store.dispatch(errorAction);
          throw errorAction;
        })
        .then(response => {
          response =
            isBatchedRequest &&
            (!action.meta ||
              (!action.meta.cacheResponse && !action.meta.ssrResponse))
              ? response.reduce(
                  (prev, current) => {
                    prev.data.push(current.data);
                    return prev;
                  },
                  { data: [] },
                )
              : response[0];

          if (
            action.meta &&
            !action.meta.cacheResponse &&
            !action.meta.ssrResponse &&
            action.meta.getData
          ) {
            return { ...response, data: action.meta.getData(response.data) };
          }

          return response;
        })
        .then(response => {
          if (
            config.onResponse &&
            (!action.meta ||
              (!action.meta.cacheResponse && !action.meta.ssrResponse))
          ) {
            return config.onResponse(response, action, store);
          }

          return response;
        })
        .then(response => {
          const successAction = createSuccessAction(action, response);
          store.dispatch(successAction);
          return successAction;
        });
    }

    return next(action);
  };
};

export default createSendRequestMiddleware;
