(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{101:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return s})),n.d(t,"default",(function(){return c}));var r=n(1),o=n(6),a=(n(0),n(154)),i={title:"Selectors",description:"Selectors guide for redux-requests - declarative AJAX requests and automatic network state management for Redux"},l={id:"guides/selectors",title:"Selectors",description:"Selectors guide for redux-requests - declarative AJAX requests and automatic network state management for Redux",source:"@site/docs/guides/selectors.md",permalink:"/docs/guides/selectors",editUrl:"https://github.com/klis87/redux-requests/edit/master/docusaurus/docs/guides/selectors.md",lastUpdatedBy:"Konrad",lastUpdatedAt:1606866644,sidebar:"docs",previous:{title:"Actions",permalink:"/docs/guides/actions"},next:{title:"Server side rendering",permalink:"/docs/guides/server-side-rendering"}},s=[{value:"<code>getQuery</code>",id:"getquery",children:[]},{value:"<code>getQuerySelector</code>",id:"getqueryselector",children:[]},{value:"<code>getMutation</code>",id:"getmutation",children:[]},{value:"<code>getMutationSelector</code>",id:"getmutationselector",children:[]}],u={rightToc:s};function c(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"While it is possible to get a remote state from ",Object(a.b)("inlineCode",{parentName:"p"},"requestsReducer")," on your own, it is recommented to use below selectors.\nFor one thing, they are already optimized, reusing cache and clearing it when necessary. Another reason is\nthat they return only information needed by applications, while state kept in ",Object(a.b)("inlineCode",{parentName:"p"},"requestsReducer")," contains\nmore data required by the library itself. Not to mention a situation when you use automatic normalisation.\nData in reducer is kept normalized, while you need it denormalized in your apps. Selectors already know how to denormalize it automatically and quickly, so that you don't even need to worry about it."),Object(a.b)("h2",{id:"getquery"},Object(a.b)("inlineCode",{parentName:"h2"},"getQuery")),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"getQuery")," is a selector which returns a state for a given query. It is the selector which requires props.\nImagine you want to get a state for ",Object(a.b)("inlineCode",{parentName:"p"},"FETCH_BOOKS")," query which we played with earlier. You can use it like this:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"import { getQuery } from '@redux-requests/core';\n\nconst booksQuery = getQuery(state, { type: 'FETCH_BOOKS' });\n/* for example {\n  data: [{ id: '1', name: 'Some book title' }],\n  loading: false,\n  error: null,\n  pristine: false, // true only when there was no request made for a give type\n  downloadProgress: null, // only when requestAction.meta.measureDownloadProgress is true\n  uploadProgress: null, // only when requestAction.meta.measureUploadProgress is true\n} */\n")),Object(a.b)("p",null,"If you are an experienced Redux developer, you might be worried about memoization of ",Object(a.b)("inlineCode",{parentName:"p"},"getQuery"),".\nFear not! You can call it with different props and memoization is not lost, for example:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"const booksQuery = getQuery(state, { type: 'FETCH_BOOKS' });\ngetQuery(state, { type: 'FETCH_STH_ELSE' });\nbooksQuery === getQuery(state, { type: 'FETCH_BOOKS' });\n// returns true (unless state for FETCH_BOOKS query really changed in the meantime)\n")),Object(a.b)("p",null,"We only provided example for ",Object(a.b)("inlineCode",{parentName:"p"},"type")," prop, but here you have the list of all possibilities:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"type: string"),": just pass query action type or action itself when using action creator library"),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"requestKey: string"),": use it if you used ",Object(a.b)("inlineCode",{parentName:"li"},"meta.requestKey")," in query action"),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"multiple"),": set to ",Object(a.b)("inlineCode",{parentName:"li"},"true")," if you prefer ",Object(a.b)("inlineCode",{parentName:"li"},"data")," to be ",Object(a.b)("inlineCode",{parentName:"li"},"[]")," instead of ",Object(a.b)("inlineCode",{parentName:"li"},"null")," if data is empty, ",Object(a.b)("inlineCode",{parentName:"li"},"false")," by default"),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"defaultData"),": use it to represent ",Object(a.b)("inlineCode",{parentName:"li"},"data")," as an orbitrary object instead of ",Object(a.b)("inlineCode",{parentName:"li"},"null"),", use top level object though,\nnot recreate it multiple times not to break selector memoization")),Object(a.b)("h2",{id:"getqueryselector"},Object(a.b)("inlineCode",{parentName:"h2"},"getQuerySelector")),Object(a.b)("p",null,"It is almost the same as ",Object(a.b)("inlineCode",{parentName:"p"},"getQuery"),", the difference is that ",Object(a.b)("inlineCode",{parentName:"p"},"getQuery")," is the selector,\nwhile ",Object(a.b)("inlineCode",{parentName:"p"},"getQuerySelector")," is the selector creator - it just returns ",Object(a.b)("inlineCode",{parentName:"p"},"getQuery"),"."),Object(a.b)("p",null,"It is helpful when you need to provide a selector without props somewhere (like in ",Object(a.b)("inlineCode",{parentName:"p"},"useSelector")," React hook).\nSo instead of doing ",Object(a.b)("inlineCode",{parentName:"p"},"useSelector(state => getQuery(state, { type: 'FETCH_BOOKS' }))"),"\nyou could just ",Object(a.b)("inlineCode",{parentName:"p"},"useSelector(getQuerySelector({ type: 'FETCH_BOOKS' }))"),"."),Object(a.b)("h2",{id:"getmutation"},Object(a.b)("inlineCode",{parentName:"h2"},"getMutation")),Object(a.b)("p",null,"Almost the same as ",Object(a.b)("inlineCode",{parentName:"p"},"getQuery"),", it is just used for mutations:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"import { getMutation } from '@redux-requests/core';\n\nconst deleteBookMutation = getMutation(state, { type: 'DELETE_BOOK' });\n/* for example {\n  loading: false,\n  error: null,\n  downloadProgress: null, // only when requestAction.meta.measureDownloadProgress is true\n  uploadProgress: null, // only when requestAction.meta.measureUploadProgress is true\n} */\n")),Object(a.b)("p",null,"It accept ",Object(a.b)("inlineCode",{parentName:"p"},"type")," and optionally ",Object(a.b)("inlineCode",{parentName:"p"},"requestKey")," props, which work like for queries."),Object(a.b)("h2",{id:"getmutationselector"},Object(a.b)("inlineCode",{parentName:"h2"},"getMutationSelector")),Object(a.b)("p",null,"Like ",Object(a.b)("inlineCode",{parentName:"p"},"getQuerySelector"),", it just returns ",Object(a.b)("inlineCode",{parentName:"p"},"getMutation")," selector."))}c.isMDXComponent=!0},154:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return m}));var r=n(0),o=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var u=o.a.createContext({}),c=function(e){var t=o.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):l({},t,{},e)),n},p=function(e){var t=c(e.components);return o.a.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},b=Object(r.forwardRef)((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,i=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=c(n),b=r,m=p["".concat(i,".").concat(b)]||p[b]||d[b]||a;return n?o.a.createElement(m,l({ref:t},u,{components:n})):o.a.createElement(m,l({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=b;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var u=2;u<a;u++)i[u]=n[u];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);