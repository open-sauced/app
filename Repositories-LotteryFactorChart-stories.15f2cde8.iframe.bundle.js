"use strict";(self.webpackChunk_open_sauced_app=self.webpackChunk_open_sauced_app||[]).push([[3216],{"./components/Repositories/LotteryFactorChart.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{AllLottoFactorHigh:()=>AllLottoFactorHigh,AllLottoFactorLow:()=>AllLottoFactorLow,AllLottoFactorModerate:()=>AllLottoFactorModerate,AllLottoFactorVeryHigh:()=>AllLottoFactorVeryHigh,Default:()=>Default,ErrorState:()=>ErrorState,LoadingState:()=>LoadingState,NoContributors:()=>NoContributors,OneContributor:()=>OneContributor,ThreeContributors:()=>ThreeContributors,TwoContributors:()=>TwoContributors,__namedExportsOrder:()=>__namedExportsOrder,default:()=>LotteryFactorChart_stories});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),hi=__webpack_require__("./node_modules/react-icons/hi/index.mjs"),dist=__webpack_require__("./node_modules/react-loading-skeleton/dist/index.mjs"),next_image=__webpack_require__("./node_modules/@storybook/nextjs/dist/images/next-image.mjs"),next_link=__webpack_require__("./node_modules/next/link.js"),link_default=__webpack_require__.n(next_link),index_module=__webpack_require__("./node_modules/@radix-ui/react-hover-card/dist/index.module.js"),fa6=__webpack_require__("./node_modules/react-icons/fa6/index.mjs"),card=__webpack_require__("./components/atoms/Card/card.tsx"),pill=__webpack_require__("./components/atoms/Pill/pill.tsx"),hover_card_wrapper=__webpack_require__("./components/molecules/HoverCardWrapper/hover-card-wrapper.tsx"),avatar_hover_card=__webpack_require__("./components/atoms/Avatar/avatar-hover-card.tsx"),__jsx=react.createElement;function StackedOwners(_ref){let{owners}=_ref;return __jsx("div",{className:"flex -space-x-3 transition-all duration-300 hover:-space-x-1"},owners.slice(0,owners.length>4?4:owners.length).map((username=>__jsx("div",{key:"owner-picture-".concat(username),className:"w-8 h-8 overflow-hidden transition-all duration-300 border-2 border-white border-solid rounded-full"},__jsx(index_module.fC,null,__jsx(link_default(),{href:"/u/".concat(username),as:"/u/".concat(username)},__jsx(index_module.xz,null,__jsx(avatar_hover_card.q,{contributor:username}))),__jsx(index_module.h_,null,__jsx(index_module.VY,{sideOffset:5},__jsx(hover_card_wrapper.Z,{username}))))))),owners.length>4&&__jsx("div",{className:"text-xs flex items-center bg-slate-100 text-center px-1 w-8 h-8 overflow-hidden transition-all duration-300 border-2 border-white border-solid rounded-full"},__jsx("p",null,"+",owners.length-4)))}StackedOwners.displayName="StackedOwners";try{StackedOwners.displayName="StackedOwners",StackedOwners.__docgenInfo={description:"",displayName:"StackedOwners",props:{owners:{defaultValue:null,description:"",name:"owners",required:!0,type:{name:"string[]"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/Workspaces/StackedOwners.tsx#StackedOwners"]={docgenInfo:StackedOwners.__docgenInfo,name:"StackedOwners",path:"components/Workspaces/StackedOwners.tsx#StackedOwners"})}catch(__react_docgen_typescript_loader_error){}var react_tooltip_dist=__webpack_require__("./node_modules/@radix-ui/react-tooltip/dist/index.mjs"),InfoTooltip_jsx=react.createElement;function InfoTooltip(_ref){let{information,icon}=_ref;const{0:open,1:setOpen}=(0,react.useState)(!1);return InfoTooltip_jsx(react_tooltip_dist.u,{open},InfoTooltip_jsx(react_tooltip_dist.aJ,{asChild:!0},InfoTooltip_jsx("button",{onMouseOver:()=>setOpen(!0),onMouseLeave:()=>setOpen(!1),onClick:()=>setOpen(!open)},icon||InfoTooltip_jsx(hi.if7,{className:"text-slate-500"}))),InfoTooltip_jsx(react_tooltip_dist.NM,null,InfoTooltip_jsx(react_tooltip_dist._v,{side:"bottom",className:"w-fit max-w-xs text-sm shadow-lg text-slate-100 px-4 py-3 rounded-xl bg-[#171E29]"},InfoTooltip_jsx(react_tooltip_dist.Ce,{className:"fill-[#171E29]"}),information)))}InfoTooltip.displayName="InfoTooltip";try{InfoTooltip.displayName="InfoTooltip",InfoTooltip.__docgenInfo={description:"",displayName:"InfoTooltip",props:{information:{defaultValue:null,description:"",name:"information",required:!0,type:{name:"string"}},icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/shared/InfoTooltip.tsx#InfoTooltip"]={docgenInfo:InfoTooltip.__docgenInfo,name:"InfoTooltip",path:"components/shared/InfoTooltip.tsx#InfoTooltip"})}catch(__react_docgen_typescript_loader_error){}var skeleton_wrapper=__webpack_require__("./components/atoms/SkeletonLoader/skeleton-wrapper.tsx"),avatar=__webpack_require__("./components/atoms/Avatar/avatar.tsx"),github=__webpack_require__("./lib/utils/github.ts");const lotto_factor_empty={src:"static/media/lotto-factor-empty.7d3d8ef2.png",height:705,width:900,blurDataURL:"static/media/lotto-factor-empty.7d3d8ef2.png"};var _Default$parameters,_Default$parameters2,_LoadingState$paramet,_LoadingState$paramet2,_ErrorState$parameter,_ErrorState$parameter2,_AllLottoFactorVeryHi,_AllLottoFactorVeryHi2,_AllLottoFactorHigh$p,_AllLottoFactorHigh$p2,_AllLottoFactorModera,_AllLottoFactorModera2,_AllLottoFactorLow$pa,_AllLottoFactorLow$pa2,_NoContributors$param,_NoContributors$param2,_OneContributor$param,_OneContributor$param2,_TwoContributors$para,_TwoContributors$para2,_ThreeContributors$pa,_ThreeContributors$pa2,LotteryFactorChart_jsx=react.createElement;function LotteryFactorChart(_ref){var _lotteryFactor$all_co,_lotteryFactor$all_lo,_sortedContributors$a;let{lotteryFactor,isLoading,error,range,showHoverCards,uniqueYoloCoders=new Set,yoloBannerOnClick,onProfileClick,onYoloIconClick,className}=_ref;const{0:hovered,1:setHovered}=(0,react.useState)(void 0),topFourContributors=null!==(_lotteryFactor$all_co=null==lotteryFactor?void 0:lotteryFactor.all_contribs.slice(0,4))&&void 0!==_lotteryFactor$all_co?_lotteryFactor$all_co:[],hasContributors=topFourContributors.length>0,{sortedContributors}=(0,react.useMemo)((()=>{var _topFourContributors$;const result=null!==(_topFourContributors$=topFourContributors.map((contributor=>({name:contributor.contributor,count:contributor.count,value:Number((100*contributor.percent_of_total).toPrecision(1)),factor:contributor.lotto_factor}))))&&void 0!==_topFourContributors$?_topFourContributors$:[],topFourPercentage=result.reduce(((prev,curr)=>prev+curr.value),0);return null!=lotteryFactor&&lotteryFactor.all_contribs.length&&(null==lotteryFactor?void 0:lotteryFactor.all_contribs.length)>4&&result.push({name:"Other Contributors",count:0,value:Number((100-topFourPercentage).toPrecision(2)),factor:"Other Contributors"}),{sortedContributors:result,topFourPercentage}}),[topFourContributors]),summary=(0,react.useMemo)((()=>{let count=0,percentage=0;for(;percentage<50&&4!==count;){var _topFourContributors$2,_topFourContributors$3;percentage+=Number((100*(null!==(_topFourContributors$2=null===(_topFourContributors$3=topFourContributors.at(count))||void 0===_topFourContributors$3?void 0:_topFourContributors$3.percent_of_total)&&void 0!==_topFourContributors$2?_topFourContributors$2:0)).toPrecision(1)),count++}return{count,percentage}}),[topFourContributors]);function getLottoColor(factor){switch(factor){case"very-high":return"#E80010";case"high":return"#FC5108";case"moderate":return"#FEC009";case"low":return"#5CC90C";case"Other Contributors":return"#0649F1"}}return LotteryFactorChart_jsx(card.Z,{className:"".concat(null!=className?className:""," flex flex-col gap-4 w-full h-full items-center pt-8")},LotteryFactorChart_jsx("section",{className:"flex flex-col lg:flex-row w-full items-start lg:items-center gap-4 lg:justify-between px-4"},LotteryFactorChart_jsx("header",{className:"flex w-full justify-between items-center"},LotteryFactorChart_jsx("div",{className:"flex gap-2 items-center"},LotteryFactorChart_jsx(hi.Kaj,{className:"text-xl"}),LotteryFactorChart_jsx("h3",{className:"text-sm font-semibold xl:text-lg text-slate-800"},"Lottery Factor"),LotteryFactorChart_jsx(InfoTooltip,{information:"Identifies reliance on top contributors. Indicates potential project vulnerability if 2 or fewer create >50% of the pull requests."})),error?null:isLoading||!lotteryFactor?LotteryFactorChart_jsx(skeleton_wrapper.Z,{width:42,height:24,radius:999}):LotteryFactorChart_jsx(pill.Z,{text:null!==(_lotteryFactor$all_lo=lotteryFactor.all_lotto_factor.replace("-"," "))&&void 0!==_lotteryFactor$all_lo?_lotteryFactor$all_lo:"",color:"high"===lotteryFactor.all_lotto_factor?"red":"moderate"===lotteryFactor.all_lotto_factor?"yellow":"low"===lotteryFactor.all_lotto_factor?"green":"very-high"===lotteryFactor.all_lotto_factor?"purple":"slate",className:"capitalize"}))),yoloBannerOnClick&&LotteryFactorChart_jsx("button",{onClick:yoloBannerOnClick,className:"flex items-center justify-between w-full text-slate-500 shadow-sm !border !border-slate-300 p-1 gap-2 text-sm rounded-full"},LotteryFactorChart_jsx("div",{className:"flex gap-2 items-center"},LotteryFactorChart_jsx("div",{className:"flex items-center font-medium gap-1 px-2 py-0.5 rounded-2xl bg-light-red-4 text-light-red-11"},LotteryFactorChart_jsx(fa6.t5d,null),"YOLO Coders"),LotteryFactorChart_jsx("p",{className:"block lg:hidden 2xl:block"},"Pushing commits ",LotteryFactorChart_jsx("span",{className:"xs:hidden sm:inline-block"},"directly")," to main")),LotteryFactorChart_jsx("div",{className:"hidden xs:flex gap-2 items-center ml-auto mr-3"},LotteryFactorChart_jsx("p",{className:"hidden sm:inline-block xl:hidden min-[1650px]:inline-block"},"See more"),LotteryFactorChart_jsx(fa6.Z1Y,{className:"hidden xs:inline-block"}))),LotteryFactorChart_jsx("section",{className:"w-full px-4 flex flex-col gap-4 text-xs xl:text-sm"},isLoading?LotteryFactorChart_jsx(dist.Z,{height:32}):LotteryFactorChart_jsx("p",{className:"text-slate-500"},hasContributors?LotteryFactorChart_jsx(react.Fragment,null,"The top"," ",summary.count>1?LotteryFactorChart_jsx("span",{className:"font-semibold text-black"},"".concat(summary.count," ")):null,"contributor",summary.count>1&&"s"," of this repository ",summary.count>1?"have":"has"," made"," ",LotteryFactorChart_jsx("span",{className:"font-semibold text-black"},summary.percentage,"% "),"of all pull requests in the past ",LotteryFactorChart_jsx("span",{className:"font-semibold text-black"},range)," days."):LotteryFactorChart_jsx(react.Fragment,null,error?LotteryFactorChart_jsx(react.Fragment,null,"This repository doesn't have enough pull request data to calculate the Lottery Factor."):LotteryFactorChart_jsx(react.Fragment,null,"No one has contributed to the repository in the past"," ",LotteryFactorChart_jsx("span",{className:"font-semibold text-black"},range)," days."))),LotteryFactorChart_jsx("div",{className:"flex w-full gap-1 h-3 place-content-center"},isLoading?LotteryFactorChart_jsx(skeleton_wrapper.Z,null):sortedContributors.map(((item,index)=>LotteryFactorChart_jsx("button",{"aria-label":"".concat(item.name," is ").concat(item.value,"% of the most used languages for contributors in your list"),key:item.name,"data-language":item.name,className:"".concat(0===index?"rounded-l-lg":""," ").concat(index===sortedContributors.length-1?"rounded-r-lg":""," transform hover:scale-110 transition-transform hover:z-10"),style:{backgroundColor:getLottoColor(item.factor),width:"".concat(item.value,"%")},onMouseOver:event=>{const{language}=event.currentTarget.dataset;setHovered(language)},onMouseOut:event=>{setHovered(void 0)},onFocus:event=>{const{language}=event.currentTarget.dataset;setHovered(language)},onBlur:event=>{setHovered(void 0)}}))))),isLoading||!error&&hasContributors?null:LotteryFactorChart_jsx(next_image.Z,{src:lotto_factor_empty,alt:""}),isLoading?LotteryFactorChart_jsx("div",{className:"flex flex-col w-full gap-4 px-4"},LotteryFactorChart_jsx(skeleton_wrapper.Z,{count:4,height:32})):null,!isLoading&&hasContributors?LotteryFactorChart_jsx("table",{className:"table-fixed divide-y text-xs xl:text-sm text-slate-500 w-full px-4 border-separate border-spacing-y-2"},LotteryFactorChart_jsx("thead",null,LotteryFactorChart_jsx("tr",null,LotteryFactorChart_jsx("th",{className:"font-normal text-start"},"Contributor"),LotteryFactorChart_jsx("th",{className:"font-normal text-end w-fit"},"Pull Requests"),LotteryFactorChart_jsx("th",{className:"font-normal text-end"},"% of Total"))),LotteryFactorChart_jsx("tbody",{className:"!text-small truncate [&_tr_td]:border-b-1"},sortedContributors.slice(0,4).map((_ref2=>{let{name,count,value}=_ref2;return LotteryFactorChart_jsx("tr",{key:name,className:"".concat(hovered===name&&"bg-slate-100"," grow items-start")},LotteryFactorChart_jsx("td",{className:"".concat(hovered===name?"font-semibold":"font-normal"," pt-1 pb-2 pl-2")},LotteryFactorChart_jsx("div",{className:"flex items-center gap-2 text-light-slate-11"},showHoverCards?LotteryFactorChart_jsx(index_module.fC,null,LotteryFactorChart_jsx(link_default(),{href:"/u/".concat(name),className:"rounded-full",onClick:onProfileClick},LotteryFactorChart_jsx(index_module.xz,null,LotteryFactorChart_jsx(avatar.Z,{size:24,className:"xl:w-9 xl:h-9",isCircle:!0,hasBorder:!1,avatarURL:(0,github.cc)(name)}))),LotteryFactorChart_jsx(index_module.h_,null,LotteryFactorChart_jsx(index_module.VY,{sideOffset:5},LotteryFactorChart_jsx(hover_card_wrapper.Z,{username:name})))):LotteryFactorChart_jsx(link_default(),{href:"/u/".concat(name),className:"rounded-full",onClick:onProfileClick},LotteryFactorChart_jsx(avatar.Z,{size:24,className:"xl:w-9 xl:h-9",isCircle:!0,hasBorder:!1,avatarURL:(0,github.cc)(name)})),LotteryFactorChart_jsx("div",{className:"flex gap-1 items-center"},LotteryFactorChart_jsx("h1",{className:"truncate text-light-slate-12"},name),uniqueYoloCoders.has(name)&&LotteryFactorChart_jsx("button",{onClick:onYoloIconClick},LotteryFactorChart_jsx(InfoTooltip,{icon:LotteryFactorChart_jsx(fa6.t5d,null),information:"YOLO Coder"}))))),LotteryFactorChart_jsx("td",{className:"".concat(hovered===name?"font-semibold":"font-normal"," text-end w-fit")},count),LotteryFactorChart_jsx("td",{className:"".concat(hovered===name?"font-semibold":"font-normal"," text-end pt-1 pb-2 pr-2 ")},value,"%"))})),isLoading?LotteryFactorChart_jsx(dist.Z,null):null,null!=lotteryFactor&&lotteryFactor.all_contribs.length&&(null==lotteryFactor?void 0:lotteryFactor.all_contribs.length)>4?LotteryFactorChart_jsx("tr",{className:"".concat("Other Contributors"===hovered?"font-semibold bg-slate-100":"font-normal")},LotteryFactorChart_jsx("td",{className:"flex gap-2 items-center pt-1 pb-2 xl:py-4 pl-2"},LotteryFactorChart_jsx(StackedOwners,{owners:lotteryFactor.all_contribs.slice(4,7).map((contributor=>contributor.contributor))}),LotteryFactorChart_jsx("p",null,"Other contributors")),LotteryFactorChart_jsx("td",null),LotteryFactorChart_jsx("td",{className:"text-end pt-1 pb-2 pr-2 xl:py-4"},null===(_sortedContributors$a=sortedContributors.at(sortedContributors.length-1))||void 0===_sortedContributors$a?void 0:_sortedContributors$a.value,"%")):null)):null)}LotteryFactorChart.displayName="LotteryFactorChart";try{LotteryFactorChart.displayName="LotteryFactorChart",LotteryFactorChart.__docgenInfo={description:"",displayName:"LotteryFactorChart",props:{lotteryFactor:{defaultValue:null,description:"",name:"lotteryFactor",required:!0,type:{name:"any"}},isLoading:{defaultValue:null,description:"",name:"isLoading",required:!0,type:{name:"boolean"}},error:{defaultValue:null,description:"",name:"error",required:!0,type:{name:"Error | undefined"}},range:{defaultValue:null,description:"",name:"range",required:!0,type:{name:"enum",value:[{value:"7"},{value:"30"},{value:"90"},{value:"180"},{value:"360"}]}},showHoverCards:{defaultValue:null,description:"",name:"showHoverCards",required:!1,type:{name:"boolean"}},uniqueYoloCoders:{defaultValue:{value:"new Set<string>()"},description:"",name:"uniqueYoloCoders",required:!1,type:{name:"Set<string>"}},yoloBannerOnClick:{defaultValue:null,description:"",name:"yoloBannerOnClick",required:!1,type:{name:"(() => void)"}},onProfileClick:{defaultValue:null,description:"",name:"onProfileClick",required:!1,type:{name:"(() => void)"}},onYoloIconClick:{defaultValue:null,description:"",name:"onYoloIconClick",required:!1,type:{name:"(() => void)"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/Repositories/LotteryFactorChart.tsx#LotteryFactorChart"]={docgenInfo:LotteryFactorChart.__docgenInfo,name:"LotteryFactorChart",path:"components/Repositories/LotteryFactorChart.tsx#LotteryFactorChart"})}catch(__react_docgen_typescript_loader_error){}function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){(0,defineProperty.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}const LotteryFactorChart_stories={title:"Components/Repositories/LotteryFactorChart",component:LotteryFactorChart,args:{lotteryFactor:generateLotteryFactor(),range:30,isLoading:!1,error:void 0}},Default={args:{lotteryFactor:generateLotteryFactor(),range:30,isLoading:!1,error:void 0}},LoadingState={args:{lotteryFactor:generateLotteryFactor(),range:30,isLoading:!0,error:void 0}},ErrorState={args:{lotteryFactor:void 0,range:30,isLoading:!1,error:new Error}},AllLottoFactorVeryHigh={args:{lotteryFactor:generateLotteryFactor("very-high"),range:30,isLoading:!1,error:void 0}},AllLottoFactorHigh={args:{lotteryFactor:generateLotteryFactor(),range:30,isLoading:!1,error:void 0}},AllLottoFactorModerate={args:{lotteryFactor:generateLotteryFactor("moderate"),range:30,isLoading:!1,error:void 0}},AllLottoFactorLow={args:{lotteryFactor:generateLotteryFactor("low"),range:30,isLoading:!1,error:void 0}},NoContributors={args:{lotteryFactor:{all_contribs:[],all_lotto_factor:"low"},range:30,isLoading:!1,error:void 0}},OneContributor={args:{lotteryFactor:{all_contribs:[{contributor:"nickytonline",count:100,percent_of_total:1,lotto_factor:"high"}],all_lotto_factor:"very-high"},range:30,isLoading:!1,error:void 0}},TwoContributors={args:{lotteryFactor:{all_contribs:[{contributor:"brandonroberts",count:15,percent_of_total:1,lotto_factor:"high"},{contributor:"nickytonline",count:15,percent_of_total:1,lotto_factor:"high"}],all_lotto_factor:"very-high"},range:30,isLoading:!1,error:void 0}},ThreeContributors={args:{lotteryFactor:{all_contribs:[{contributor:"brandonroberts",count:15,percent_of_total:1,lotto_factor:"high"},{contributor:"zeucapua",count:15,percent_of_total:1,lotto_factor:"high"},{contributor:"nickytonline",count:15,percent_of_total:1,lotto_factor:"high"}],all_lotto_factor:"very-high"},range:30,isLoading:!1,error:void 0}};function generateLotteryFactor(){return{all_contribs:[{contributor:"nickytonline",count:40,percent_of_total:.36036036036036034,lotto_factor:"high"},{contributor:"brandonroberts",count:27,percent_of_total:.24324324324324326,lotto_factor:"moderate"},{contributor:"zeucapua",count:21,percent_of_total:.1891891891891892,lotto_factor:"moderate"},{contributor:"Lalithkumarponnambalam",count:4,percent_of_total:.036036036036036036,lotto_factor:"low"},{contributor:"JayPokale",count:4,percent_of_total:.036036036036036036,lotto_factor:"low"},{contributor:"Idrinth",count:3,percent_of_total:.02702702702702703,lotto_factor:"low"},{contributor:"devharsh2k4",count:3,percent_of_total:.02702702702702703,lotto_factor:"low"},{contributor:"bdougie",count:2,percent_of_total:.018018018018018018,lotto_factor:"low"},{contributor:"francisko-rezende",count:1,percent_of_total:.009009009009009009,lotto_factor:"low"},{contributor:"Asin-Junior-Honore",count:1,percent_of_total:.009009009009009009,lotto_factor:"low"},{contributor:"BekahHW",count:1,percent_of_total:.009009009009009009,lotto_factor:"low"},{contributor:"jpmcb",count:1,percent_of_total:.009009009009009009,lotto_factor:"low"},{contributor:"beckyrich",count:1,percent_of_total:.009009009009009009,lotto_factor:"low"},{contributor:"dependabot[bot]",count:1,percent_of_total:.009009009009009009,lotto_factor:"low"},{contributor:"nikkhielseath",count:1,percent_of_total:.009009009009009009,lotto_factor:"low"}],all_lotto_factor:arguments.length>0&&void 0!==arguments[0]?arguments[0]:"high"}}Default.parameters=_objectSpread(_objectSpread({},Default.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Default$parameters=Default.parameters)||void 0===_Default$parameters?void 0:_Default$parameters.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    lotteryFactor: generateLotteryFactor(),\n    range: 30,\n    isLoading: false,\n    error: undefined\n  }\n}"},null===(_Default$parameters2=Default.parameters)||void 0===_Default$parameters2||null===(_Default$parameters2=_Default$parameters2.docs)||void 0===_Default$parameters2?void 0:_Default$parameters2.source)})}),LoadingState.parameters=_objectSpread(_objectSpread({},LoadingState.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_LoadingState$paramet=LoadingState.parameters)||void 0===_LoadingState$paramet?void 0:_LoadingState$paramet.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    lotteryFactor: generateLotteryFactor(),\n    range: 30,\n    isLoading: true,\n    error: undefined\n  }\n}"},null===(_LoadingState$paramet2=LoadingState.parameters)||void 0===_LoadingState$paramet2||null===(_LoadingState$paramet2=_LoadingState$paramet2.docs)||void 0===_LoadingState$paramet2?void 0:_LoadingState$paramet2.source)})}),ErrorState.parameters=_objectSpread(_objectSpread({},ErrorState.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_ErrorState$parameter=ErrorState.parameters)||void 0===_ErrorState$parameter?void 0:_ErrorState$parameter.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    lotteryFactor: undefined,\n    range: 30,\n    isLoading: false,\n    error: new Error()\n  }\n}"},null===(_ErrorState$parameter2=ErrorState.parameters)||void 0===_ErrorState$parameter2||null===(_ErrorState$parameter2=_ErrorState$parameter2.docs)||void 0===_ErrorState$parameter2?void 0:_ErrorState$parameter2.source)})}),AllLottoFactorVeryHigh.parameters=_objectSpread(_objectSpread({},AllLottoFactorVeryHigh.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_AllLottoFactorVeryHi=AllLottoFactorVeryHigh.parameters)||void 0===_AllLottoFactorVeryHi?void 0:_AllLottoFactorVeryHi.docs),{},{source:_objectSpread({originalSource:'{\n  args: {\n    lotteryFactor: generateLotteryFactor("very-high"),\n    range: 30,\n    isLoading: false,\n    error: undefined\n  }\n}'},null===(_AllLottoFactorVeryHi2=AllLottoFactorVeryHigh.parameters)||void 0===_AllLottoFactorVeryHi2||null===(_AllLottoFactorVeryHi2=_AllLottoFactorVeryHi2.docs)||void 0===_AllLottoFactorVeryHi2?void 0:_AllLottoFactorVeryHi2.source)})}),AllLottoFactorHigh.parameters=_objectSpread(_objectSpread({},AllLottoFactorHigh.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_AllLottoFactorHigh$p=AllLottoFactorHigh.parameters)||void 0===_AllLottoFactorHigh$p?void 0:_AllLottoFactorHigh$p.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    lotteryFactor: generateLotteryFactor(),\n    range: 30,\n    isLoading: false,\n    error: undefined\n  }\n}"},null===(_AllLottoFactorHigh$p2=AllLottoFactorHigh.parameters)||void 0===_AllLottoFactorHigh$p2||null===(_AllLottoFactorHigh$p2=_AllLottoFactorHigh$p2.docs)||void 0===_AllLottoFactorHigh$p2?void 0:_AllLottoFactorHigh$p2.source)})}),AllLottoFactorModerate.parameters=_objectSpread(_objectSpread({},AllLottoFactorModerate.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_AllLottoFactorModera=AllLottoFactorModerate.parameters)||void 0===_AllLottoFactorModera?void 0:_AllLottoFactorModera.docs),{},{source:_objectSpread({originalSource:'{\n  args: {\n    lotteryFactor: generateLotteryFactor("moderate"),\n    range: 30,\n    isLoading: false,\n    error: undefined\n  }\n}'},null===(_AllLottoFactorModera2=AllLottoFactorModerate.parameters)||void 0===_AllLottoFactorModera2||null===(_AllLottoFactorModera2=_AllLottoFactorModera2.docs)||void 0===_AllLottoFactorModera2?void 0:_AllLottoFactorModera2.source)})}),AllLottoFactorLow.parameters=_objectSpread(_objectSpread({},AllLottoFactorLow.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_AllLottoFactorLow$pa=AllLottoFactorLow.parameters)||void 0===_AllLottoFactorLow$pa?void 0:_AllLottoFactorLow$pa.docs),{},{source:_objectSpread({originalSource:'{\n  args: {\n    lotteryFactor: generateLotteryFactor("low"),\n    range: 30,\n    isLoading: false,\n    error: undefined\n  }\n}'},null===(_AllLottoFactorLow$pa2=AllLottoFactorLow.parameters)||void 0===_AllLottoFactorLow$pa2||null===(_AllLottoFactorLow$pa2=_AllLottoFactorLow$pa2.docs)||void 0===_AllLottoFactorLow$pa2?void 0:_AllLottoFactorLow$pa2.source)})}),NoContributors.parameters=_objectSpread(_objectSpread({},NoContributors.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_NoContributors$param=NoContributors.parameters)||void 0===_NoContributors$param?void 0:_NoContributors$param.docs),{},{source:_objectSpread({originalSource:'{\n  args: {\n    lotteryFactor: {\n      all_contribs: [],\n      all_lotto_factor: "low"\n    },\n    range: 30,\n    isLoading: false,\n    error: undefined\n  }\n}'},null===(_NoContributors$param2=NoContributors.parameters)||void 0===_NoContributors$param2||null===(_NoContributors$param2=_NoContributors$param2.docs)||void 0===_NoContributors$param2?void 0:_NoContributors$param2.source)})}),OneContributor.parameters=_objectSpread(_objectSpread({},OneContributor.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_OneContributor$param=OneContributor.parameters)||void 0===_OneContributor$param?void 0:_OneContributor$param.docs),{},{source:_objectSpread({originalSource:'{\n  args: {\n    lotteryFactor: {\n      all_contribs: [{\n        contributor: "nickytonline",\n        count: 100,\n        percent_of_total: 1,\n        lotto_factor: "high"\n      }],\n      all_lotto_factor: "very-high"\n    },\n    range: 30,\n    isLoading: false,\n    error: undefined\n  }\n}'},null===(_OneContributor$param2=OneContributor.parameters)||void 0===_OneContributor$param2||null===(_OneContributor$param2=_OneContributor$param2.docs)||void 0===_OneContributor$param2?void 0:_OneContributor$param2.source)})}),TwoContributors.parameters=_objectSpread(_objectSpread({},TwoContributors.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_TwoContributors$para=TwoContributors.parameters)||void 0===_TwoContributors$para?void 0:_TwoContributors$para.docs),{},{source:_objectSpread({originalSource:'{\n  args: {\n    lotteryFactor: {\n      all_contribs: [{\n        contributor: "brandonroberts",\n        count: 15,\n        percent_of_total: 1,\n        lotto_factor: "high"\n      }, {\n        contributor: "nickytonline",\n        count: 15,\n        percent_of_total: 1,\n        lotto_factor: "high"\n      }],\n      all_lotto_factor: "very-high"\n    },\n    range: 30,\n    isLoading: false,\n    error: undefined\n  }\n}'},null===(_TwoContributors$para2=TwoContributors.parameters)||void 0===_TwoContributors$para2||null===(_TwoContributors$para2=_TwoContributors$para2.docs)||void 0===_TwoContributors$para2?void 0:_TwoContributors$para2.source)})}),ThreeContributors.parameters=_objectSpread(_objectSpread({},ThreeContributors.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_ThreeContributors$pa=ThreeContributors.parameters)||void 0===_ThreeContributors$pa?void 0:_ThreeContributors$pa.docs),{},{source:_objectSpread({originalSource:'{\n  args: {\n    lotteryFactor: {\n      all_contribs: [{\n        contributor: "brandonroberts",\n        count: 15,\n        percent_of_total: 1,\n        lotto_factor: "high"\n      }, {\n        contributor: "zeucapua",\n        count: 15,\n        percent_of_total: 1,\n        lotto_factor: "high"\n      }, {\n        contributor: "nickytonline",\n        count: 15,\n        percent_of_total: 1,\n        lotto_factor: "high"\n      }],\n      all_lotto_factor: "very-high"\n    },\n    range: 30,\n    isLoading: false,\n    error: undefined\n  }\n}'},null===(_ThreeContributors$pa2=ThreeContributors.parameters)||void 0===_ThreeContributors$pa2||null===(_ThreeContributors$pa2=_ThreeContributors$pa2.docs)||void 0===_ThreeContributors$pa2?void 0:_ThreeContributors$pa2.source)})});const __namedExportsOrder=["Default","LoadingState","ErrorState","AllLottoFactorVeryHigh","AllLottoFactorHigh","AllLottoFactorModerate","AllLottoFactorLow","NoContributors","OneContributor","TwoContributors","ThreeContributors"]},"./components/atoms/Card/card.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement;const Card=_ref=>{let{className,children,heading,focusable=!1}=_ref;return __jsx("article",{className:"".concat(className||""," block ").concat(heading?"":"p-3"," bg-white border rounded-lg shadow-xs"),tabIndex:focusable?0:void 0},heading?__jsx(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,__jsx("div",{className:"px-3 py-3 rounded-t-lg md:px-6 bg-light-slate-3"},heading),__jsx("div",null,children)):children)};Card.displayName="Card";const __WEBPACK_DEFAULT_EXPORT__=Card;try{card.displayName="card",card.__docgenInfo={description:"",displayName:"card",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},heading:{defaultValue:null,description:"",name:"heading",required:!1,type:{name:"ReactNode"}},focusable:{defaultValue:{value:"false"},description:"",name:"focusable",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/atoms/Card/card.tsx#card"]={docgenInfo:card.__docgenInfo,name:"card",path:"components/atoms/Card/card.tsx#card"})}catch(__react_docgen_typescript_loader_error){}}}]);