"use strict";(self.webpackChunk_open_sauced_app=self.webpackChunk_open_sauced_app||[]).push([[115],{"./components/Issues/IssueStateAuthorIcon.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ClosedPR:()=>ClosedPR,OpenPR:()=>OpenPR,Reopened:()=>Reopened,__namedExportsOrder:()=>__namedExportsOrder,default:()=>IssueStateAuthorIcon_stories});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),index_esm=__webpack_require__("./node_modules/@primer/octicons-react/dist/index.esm.js"),next_link=__webpack_require__("./node_modules/next/link.js"),link_default=__webpack_require__.n(next_link),avatar_hover_card=__webpack_require__("./components/atoms/Avatar/avatar-hover-card.tsx"),__jsx=react.createElement;const IssueStateAuthorIcon=_ref=>{let{state,author}=_ref,backgroundColor="";switch(state){case"open":case"reopened":backgroundColor="bg-green-600";break;case"closed":backgroundColor="bg-purple-600"}return __jsx("div",{className:"relative w-max"},__jsx(link_default(),{href:"/u/".concat(author),title:"User profile for ".concat(author)},__jsx(avatar_hover_card.q,{contributor:author,size:"medium"})),__jsx("div",{className:"absolute -bottom-[10px] -right-[12px] p-1 border-[2px] border-white  rounded-full [&_svg]:absolute [&_svg]:top-[3.5px] [&_svg]:left-[3.5px] ".concat(backgroundColor),style:{width:"25px",height:"25px"}},function getPullRequestStateIcon(state){switch(state){case"open":return __jsx(index_esm.hEv,{"aria-label":"open pull request",size:14,className:"text-white"});case"reopened":return __jsx(index_esm.eJg,{"aria-label":"open pull request",size:14,className:"text-white"});case"closed":return __jsx(index_esm.GFI,{size:14,"aria-label":"closed pull request",className:"text-white"})}}(state)))};IssueStateAuthorIcon.displayName="IssueStateAuthorIcon";try{IssueStateAuthorIcon.displayName="IssueStateAuthorIcon",IssueStateAuthorIcon.__docgenInfo={description:"",displayName:"IssueStateAuthorIcon",props:{state:{defaultValue:null,description:"",name:"state",required:!0,type:{name:"DbRepoIssueEvents"}},author:{defaultValue:null,description:"",name:"author",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/Issues/IssueStateAuthorIcon.tsx#IssueStateAuthorIcon"]={docgenInfo:IssueStateAuthorIcon.__docgenInfo,name:"IssueStateAuthorIcon",path:"components/Issues/IssueStateAuthorIcon.tsx#IssueStateAuthorIcon"})}catch(__react_docgen_typescript_loader_error){}var _OpenPR$parameters,_OpenPR$parameters2,_ClosedPR$parameters,_ClosedPR$parameters2,_Reopened$parameters,_Reopened$parameters2;function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){(0,defineProperty.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}const IssueStateAuthorIcon_stories={title:"Components/Issues/IssueStateAuthorIcon",component:IssueStateAuthorIcon,args:{author:"brandonroberts"}},OpenPR={args:{state:"open"}},ClosedPR={args:{state:"closed"}},Reopened={args:{state:"reopened"}};OpenPR.parameters=_objectSpread(_objectSpread({},OpenPR.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_OpenPR$parameters=OpenPR.parameters)||void 0===_OpenPR$parameters?void 0:_OpenPR$parameters.docs),{},{source:_objectSpread({originalSource:'{\n  args: {\n    state: "open"\n  }\n}'},null===(_OpenPR$parameters2=OpenPR.parameters)||void 0===_OpenPR$parameters2||null===(_OpenPR$parameters2=_OpenPR$parameters2.docs)||void 0===_OpenPR$parameters2?void 0:_OpenPR$parameters2.source)})}),ClosedPR.parameters=_objectSpread(_objectSpread({},ClosedPR.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_ClosedPR$parameters=ClosedPR.parameters)||void 0===_ClosedPR$parameters?void 0:_ClosedPR$parameters.docs),{},{source:_objectSpread({originalSource:'{\n  args: {\n    state: "closed"\n  }\n}'},null===(_ClosedPR$parameters2=ClosedPR.parameters)||void 0===_ClosedPR$parameters2||null===(_ClosedPR$parameters2=_ClosedPR$parameters2.docs)||void 0===_ClosedPR$parameters2?void 0:_ClosedPR$parameters2.source)})}),Reopened.parameters=_objectSpread(_objectSpread({},Reopened.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Reopened$parameters=Reopened.parameters)||void 0===_Reopened$parameters?void 0:_Reopened$parameters.docs),{},{source:_objectSpread({originalSource:'{\n  args: {\n    state: "reopened"\n  }\n}'},null===(_Reopened$parameters2=Reopened.parameters)||void 0===_Reopened$parameters2||null===(_Reopened$parameters2=_Reopened$parameters2.docs)||void 0===_Reopened$parameters2?void 0:_Reopened$parameters2.source)})});const __namedExportsOrder=["OpenPR","ClosedPR","Reopened"]}}]);