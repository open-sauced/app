"use strict";(self.webpackChunk_open_sauced_app=self.webpackChunk_open_sauced_app||[]).push([[8632],{"./components/Contributors/OscrPill.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>OscrPill});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),components_atoms_Pill_pill__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./components/atoms/Pill/pill.tsx"),components_atoms_Tooltip_tooltip__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./components/atoms/Tooltip/tooltip.tsx"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement;const OscrPill=_ref=>{let{rating,hideRating}=_ref,percentageRating=rating?Math.floor(100*rating):0;return percentageRating<1&&(percentageRating=0),__jsx(components_atoms_Tooltip_tooltip__WEBPACK_IMPORTED_MODULE_2__.Z,{direction:"top",content:"Open Source Contributor Rating (OSCR)"},__jsx(components_atoms_Pill_pill__WEBPACK_IMPORTED_MODULE_1__.Z,hideRating?{color:"purple",size:"small",text:"00",blurText:!0}:{color:"purple",size:"small",text:"".concat(percentageRating)}))};OscrPill.displayName="OscrPill";try{OscrPill.displayName="OscrPill",OscrPill.__docgenInfo={description:"",displayName:"OscrPill",props:{rating:{defaultValue:null,description:"",name:"rating",required:!0,type:{name:"number | undefined"}},hideRating:{defaultValue:null,description:"",name:"hideRating",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/Contributors/OscrPill.tsx#OscrPill"]={docgenInfo:OscrPill.__docgenInfo,name:"OscrPill",path:"components/Contributors/OscrPill.tsx#OscrPill"})}catch(__react_docgen_typescript_loader_error){}},"./components/atoms/Avatar/avatar-hover-card.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__,q:()=>Avatar});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),_radix_ui_react_hover_card__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@radix-ui/react-hover-card/dist/index.module.js"),next_link__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/next/link.js"),next_link__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__),next_image__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@storybook/nextjs/dist/images/next-image.mjs"),components_molecules_HoverCardWrapper_hover_card_wrapper__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./components/molecules/HoverCardWrapper/hover-card-wrapper.tsx"),lib_utils_github__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./lib/utils/github.ts"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement;const Avatar=_ref=>{let{contributor,size="large"}=_ref,width=500,height=500;switch(size){case"xxsmall":width=18,height=18;break;case"xsmall":width=24,height=24;break;case"small":width=45,height=45;break;case"medium":width=35,height=35}return __jsx(next_image__WEBPACK_IMPORTED_MODULE_2__.Z,{alt:contributor,className:"border rounded-full not-prose",height:width,src:(0,lib_utils_github__WEBPACK_IMPORTED_MODULE_4__.cc)(contributor,40),width:height})};Avatar.displayName="Avatar";const AvatarHoverCard=_ref2=>{let{contributor,repositories,size="large"}=_ref2;return __jsx(_radix_ui_react_hover_card__WEBPACK_IMPORTED_MODULE_5__.fC,null,__jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default(),{href:"/u/".concat(contributor),as:"/u/".concat(contributor)},__jsx(_radix_ui_react_hover_card__WEBPACK_IMPORTED_MODULE_5__.xz,null,__jsx(Avatar,{contributor,size}))),__jsx(_radix_ui_react_hover_card__WEBPACK_IMPORTED_MODULE_5__.h_,null,__jsx(_radix_ui_react_hover_card__WEBPACK_IMPORTED_MODULE_5__.VY,{sideOffset:5},__jsx(components_molecules_HoverCardWrapper_hover_card_wrapper__WEBPACK_IMPORTED_MODULE_3__.Z,{username:contributor,repositories}))))};AvatarHoverCard.displayName="AvatarHoverCard";const __WEBPACK_DEFAULT_EXPORT__=AvatarHoverCard;try{Avatar.displayName="Avatar",Avatar.__docgenInfo={description:"",displayName:"Avatar",props:{contributor:{defaultValue:null,description:"",name:"contributor",required:!0,type:{name:"string"}},size:{defaultValue:{value:"large"},description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"xsmall"'},{value:'"medium"'},{value:'"large"'},{value:'"xxsmall"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/atoms/Avatar/avatar-hover-card.tsx#Avatar"]={docgenInfo:Avatar.__docgenInfo,name:"Avatar",path:"components/atoms/Avatar/avatar-hover-card.tsx#Avatar"})}catch(__react_docgen_typescript_loader_error){}try{avatarhovercard.displayName="avatarhovercard",avatarhovercard.__docgenInfo={description:"",displayName:"avatarhovercard",props:{contributor:{defaultValue:null,description:"",name:"contributor",required:!0,type:{name:"string"}},size:{defaultValue:{value:"large"},description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"xsmall"'},{value:'"medium"'},{value:'"large"'},{value:'"xxsmall"'}]}},repositories:{defaultValue:null,description:"",name:"repositories",required:!0,type:{name:"number[]"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/atoms/Avatar/avatar-hover-card.tsx#avatarhovercard"]={docgenInfo:avatarhovercard.__docgenInfo,name:"avatarhovercard",path:"components/atoms/Avatar/avatar-hover-card.tsx#avatarhovercard"})}catch(__react_docgen_typescript_loader_error){}},"./components/atoms/Pill/pill.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var clsx__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/clsx/dist/clsx.m.js"),__jsx=__webpack_require__("./node_modules/next/dist/compiled/react/index.js").createElement;const Pill=_ref=>{let{className,text,color="slate",size="base",icon,blurText=!1}=_ref;return __jsx("div",{className:"\n        ".concat("green"===color?"bg-light-grass-4 ":"yellow"===color?"bg-amber-200 ":"red"===color?"bg-light-red-4 ":"purple"===color?"bg-purple-200":"bg-light-slate-3 ","\n        ").concat("small"===size?"py-1 px-1.5":"py-1.5 px-2 ","\n        inline-flex items-center rounded-full w-fit gap-1 ").concat(className)},icon,__jsx("p",{className:(0,clsx__WEBPACK_IMPORTED_MODULE_1__.Z)("green"===color?"text-light-grass-11":"yellow"===color?"text-amber-700":"red"===color?"text-light-red-11":"purple"===color?"text-purple-600":"text-light-slate-11","xsmall"===size?"text-xs":"text-sm",blurText?"blur-sm":"","leading-none"),style:{"--tw-blur":"blur(2.85px)"}},text))};Pill.displayName="Pill";const __WEBPACK_DEFAULT_EXPORT__=Pill;try{pill.displayName="pill",pill.__docgenInfo={description:"",displayName:"pill",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string | number"}},color:{defaultValue:{value:"slate"},description:"",name:"color",required:!1,type:{name:"enum",value:[{value:'"slate"'},{value:'"green"'},{value:'"yellow"'},{value:'"red"'},{value:'"purple"'}]}},size:{defaultValue:{value:"base"},description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"base"'},{value:'"small"'},{value:'"xsmall"'}]}},icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"Element"}},blurText:{defaultValue:{value:"false"},description:"",name:"blurText",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/atoms/Pill/pill.tsx#pill"]={docgenInfo:pill.__docgenInfo,name:"pill",path:"components/atoms/Pill/pill.tsx#pill"})}catch(__react_docgen_typescript_loader_error){}},"./components/atoms/SkeletonLoader/skeleton-wrapper.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react-loading-skeleton/dist/index.mjs"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement;const __WEBPACK_DEFAULT_EXPORT__=_ref=>{let{classNames,count=1,width,height,radius}=_ref;const skeletonArray=Array(count).fill(!0);return __jsx(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,skeletonArray.map(((_,index)=>height?__jsx("div",{key:index,className:classNames},__jsx(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1__.Z,{height,width,borderRadius:radius,count:1})):__jsx("div",{key:index,className:"react-loading-skeleton"}))))};try{skeletonwrapper.displayName="skeletonwrapper",skeletonwrapper.__docgenInfo={description:"",displayName:"skeletonwrapper",props:{classNames:{defaultValue:null,description:"",name:"classNames",required:!1,type:{name:"string"}},count:{defaultValue:{value:"1"},description:"",name:"count",required:!1,type:{name:"number"}},height:{defaultValue:null,description:"",name:"height",required:!1,type:{name:"number"}},width:{defaultValue:null,description:"",name:"width",required:!1,type:{name:"number"}},radius:{defaultValue:null,description:"",name:"radius",required:!1,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/atoms/SkeletonLoader/skeleton-wrapper.tsx#skeletonwrapper"]={docgenInfo:skeletonwrapper.__docgenInfo,name:"skeletonwrapper",path:"components/atoms/SkeletonLoader/skeleton-wrapper.tsx#skeletonwrapper"})}catch(__react_docgen_typescript_loader_error){}},"./components/molecules/CardProfile/card-profile.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),next_link__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/next/link.js"),next_link__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__),components_atoms_Avatar_avatar__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./components/atoms/Avatar/avatar.tsx"),components_atoms_Icon_icon__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./components/atoms/Icon/icon.tsx"),components_atoms_Typography_text__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./components/atoms/Typography/text.tsx"),img_icons_fork_icon_svg__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./img/icons/fork-icon.svg"),img_icons_first_pr_icon_svg__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./img/icons/first-pr-icon.svg"),components_atoms_Tooltip_tooltip__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./components/atoms/Tooltip/tooltip.tsx"),components_Contributors_OscrPill__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./components/Contributors/OscrPill.tsx"),components_atoms_SkeletonLoader_skeleton_wrapper__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./components/atoms/SkeletonLoader/skeleton-wrapper.tsx"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement;const CardProfile=_ref=>{let{githubAvatar,githubName,totalPRs,dateOfFirstPR,isRoundedAvatar,oscr,loggedIn}=_ref;return __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default(),{href:"/u/".concat(githubName),as:"/u/".concat(githubName)},__jsx("div",{className:"flex items-center gap-2"},__jsx(components_atoms_Avatar_avatar__WEBPACK_IMPORTED_MODULE_2__.Z,{isCircle:isRoundedAvatar,size:40,avatarURL:githubAvatar||void 0}),__jsx("div",null,__jsx("div",null,__jsx(components_atoms_Typography_text__WEBPACK_IMPORTED_MODULE_4__.Z,{className:"!text-base !text-black  "},githubName)),__jsx("div",{className:"flex gap-2 text-xs"},__jsx("div",{className:"flex items-center gap-1 text-xs text-light-slate-11"},void 0!==totalPRs&&__jsx(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,__jsx(components_atoms_Tooltip_tooltip__WEBPACK_IMPORTED_MODULE_7__.Z,{content:"PRs merged"},__jsx(components_atoms_Icon_icon__WEBPACK_IMPORTED_MODULE_3__.Z,{size:12,alt:"PRs merged",IconImage:img_icons_fork_icon_svg__WEBPACK_IMPORTED_MODULE_5__.Z})),totalPRs," PR",1===totalPRs?"":"s")),__jsx("div",{className:"flex items-center gap-1 text-light-slate-11"},__jsx(components_atoms_Tooltip_tooltip__WEBPACK_IMPORTED_MODULE_7__.Z,{content:"First commit date"},__jsx(components_atoms_Icon_icon__WEBPACK_IMPORTED_MODULE_3__.Z,{size:12,alt:"First commit date",IconImage:img_icons_first_pr_icon_svg__WEBPACK_IMPORTED_MODULE_6__.Z})," ",dateOfFirstPR)),null==oscr&&loggedIn?__jsx(components_atoms_SkeletonLoader_skeleton_wrapper__WEBPACK_IMPORTED_MODULE_9__.Z,{count:1,width:24,height:16,radius:8}):__jsx(components_Contributors_OscrPill__WEBPACK_IMPORTED_MODULE_8__.O,{rating:oscr,hideRating:!loggedIn})))))};CardProfile.displayName="CardProfile";const __WEBPACK_DEFAULT_EXPORT__=CardProfile;try{cardprofile.displayName="cardprofile",cardprofile.__docgenInfo={description:"",displayName:"cardprofile",props:{githubAvatar:{defaultValue:null,description:"",name:"githubAvatar",required:!1,type:{name:"string | StaticImageData"}},githubName:{defaultValue:null,description:"",name:"githubName",required:!0,type:{name:"string"}},totalPRs:{defaultValue:null,description:"",name:"totalPRs",required:!0,type:{name:"number"}},dateOfFirstPR:{defaultValue:null,description:"",name:"dateOfFirstPR",required:!0,type:{name:"string"}},isRoundedAvatar:{defaultValue:null,description:"",name:"isRoundedAvatar",required:!1,type:{name:"boolean"}},oscr:{defaultValue:null,description:"",name:"oscr",required:!1,type:{name:"number"}},loggedIn:{defaultValue:null,description:"",name:"loggedIn",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/molecules/CardProfile/card-profile.tsx#cardprofile"]={docgenInfo:cardprofile.__docgenInfo,name:"cardprofile",path:"components/molecules/CardProfile/card-profile.tsx#cardprofile"})}catch(__react_docgen_typescript_loader_error){}},"./components/molecules/CardRepoList/card-repo-list.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),react_icons_im__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react-icons/im/index.mjs"),components_atoms_Icon_icon__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./components/atoms/Icon/icon.tsx"),components_atoms_Tooltip_tooltip__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./components/atoms/Tooltip/tooltip.tsx"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement;const CardRepoList=_ref=>{let{repoList,limit=5,fontSizeClassName,total,deletable=!1,onDelete=()=>{},onSelect=()=>{},showCursor=!1}=_ref;const repoTotal=total||repoList.length,sanitizedRepoList=[...new Map(repoList.map((item=>[item.repoName,item]))).values()],{0:selectedRepo,1:setSelectedRepo}=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");return __jsx("div",{className:"flex gap-1 items-center max-w[175px] truncate flex-wrap text-xs text-light-slate-9"},repoList.length>0?__jsx(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,sanitizedRepoList.filter(((_,arrCount)=>arrCount<limit)).map(((_ref2,index)=>{let{repoOwner,repoName,repoIcon}=_ref2;return __jsx("div",{key:"repo_".concat(index),onClick:()=>{selectedRepo?(onSelect(""),setSelectedRepo("")):(onSelect("".concat(repoOwner,"/").concat(repoName)),setSelectedRepo("".concat(repoOwner,"/").concat(repoName)))}},repoName&&repoIcon?__jsx(components_atoms_Tooltip_tooltip__WEBPACK_IMPORTED_MODULE_2__.Z,{content:"".concat(repoOwner,"/").concat(repoName)},__jsx("div",{className:"flex gap-1  p-1 pr-2 border-[1px] border-light-slate-6 rounded-lg text-light-slate-12 ".concat(selectedRepo==="".concat(repoOwner,"/").concat(repoName)&&"border-orange-500")},__jsx(components_atoms_Icon_icon__WEBPACK_IMPORTED_MODULE_1__.Z,{IconImage:repoIcon,className:"rounded-[4px] overflow-hidden"}),__jsx("span",{className:"max-w-[45px] md:max-w-[100px] truncate ".concat(fontSizeClassName," ").concat(showCursor&&"cursor-pointer")},repoName),deletable?__jsx("button",{className:"flex items-center justify-center w-4 h-4 rounded-full bg-light-slate-6 hover:bg-light-slate-5 transition-colors duration-300 p-1",onClick:e=>{e.preventDefault(),onDelete(repoName)}},__jsx(react_icons_im__WEBPACK_IMPORTED_MODULE_3__.sQZ,{className:"w-3 h-3 text-light-slate-12"})):"")):"")})),__jsx("div",null,repoTotal>limit?"+".concat(repoTotal-limit):null)):__jsx("p",{className:"mr-2 font-normal text-slate-400 text-sm"},"No repositories tagged..."))};CardRepoList.displayName="CardRepoList";const __WEBPACK_DEFAULT_EXPORT__=CardRepoList;try{cardrepolist.displayName="cardrepolist",cardrepolist.__docgenInfo={description:"",displayName:"cardrepolist",props:{repoList:{defaultValue:null,description:"",name:"repoList",required:!0,type:{name:"RepoList[]"}},limit:{defaultValue:{value:"5"},description:"",name:"limit",required:!1,type:{name:"number"}},fontSizeClassName:{defaultValue:null,description:"",name:"fontSizeClassName",required:!1,type:{name:"string"}},total:{defaultValue:null,description:"",name:"total",required:!1,type:{name:"number"}},deletable:{defaultValue:{value:"false"},description:"",name:"deletable",required:!1,type:{name:"boolean"}},onDelete:{defaultValue:{value:"() => {}"},description:"",name:"onDelete",required:!1,type:{name:"((repoName: string) => void)"}},onSelect:{defaultValue:{value:"() => {}"},description:"",name:"onSelect",required:!1,type:{name:"((repoName: string) => void)"}},showCursor:{defaultValue:{value:"false"},description:"",name:"showCursor",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/molecules/CardRepoList/card-repo-list.tsx#cardrepolist"]={docgenInfo:cardrepolist.__docgenInfo,name:"cardrepolist",path:"components/molecules/CardRepoList/card-repo-list.tsx#cardrepolist"})}catch(__react_docgen_typescript_loader_error){}},"./components/molecules/HoverCardWrapper/hover-card-wrapper.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),next_router__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/next/router.js"),_supabase_ui__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/@supabase/ui/dist/esm/components/Badge/Badge2.js"),lib_hooks_useFetchUser__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./lib/hooks/useFetchUser.ts"),lib_hooks_useContributorPullRequestsChart__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./lib/hooks/useContributorPullRequestsChart.ts"),lib_utils_github__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./lib/utils/github.ts"),lib_hooks_useSupabaseAuth__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./lib/hooks/useSupabaseAuth.ts"),lib_utils_date_utils__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./lib/utils/date-utils.ts"),_PullRequestTable_pull_request_table__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./components/molecules/PullRequestTable/pull-request-table.tsx"),_CardRepoList_card_repo_list__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./components/molecules/CardRepoList/card-repo-list.tsx"),_CardProfile_card_profile__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./components/molecules/CardProfile/card-profile.tsx"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement;const HoverCardWrapper=_ref=>{let{username,repositories}=_ref;const{userId}=(0,lib_hooks_useSupabaseAuth__WEBPACK_IMPORTED_MODULE_5__.Z)(),loggedIn=Boolean(userId),topic=(0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)().query.pageId,{data:contributor}=(0,lib_hooks_useFetchUser__WEBPACK_IMPORTED_MODULE_2__.j)(loggedIn?username:null),{repoList}=(0,lib_hooks_useContributorPullRequestsChart__WEBPACK_IMPORTED_MODULE_3__.u)(username,"*",repositories,"30"),{is_maintainer,first_opened_pr_at,oscr}=null!=contributor?contributor:{};return __jsx("div",{className:"w-[364px] bg-white gap-4 p-3 rounded-lg shadow-superlative flex flex-col"},__jsx("div",{className:"flex items-center justify-between"},__jsx(_CardProfile_card_profile__WEBPACK_IMPORTED_MODULE_8__.Z,{dateOfFirstPR:first_opened_pr_at?(0,lib_utils_date_utils__WEBPACK_IMPORTED_MODULE_9__.wu)(new Date(parseInt(first_opened_pr_at).toString())):"-",githubAvatar:(0,lib_utils_github__WEBPACK_IMPORTED_MODULE_4__.cc)(username,40),githubName:username,totalPRs:repoList.length,isRoundedAvatar:!0,oscr,loggedIn}),is_maintainer&&__jsx(_supabase_ui__WEBPACK_IMPORTED_MODULE_10__.Z,null,"maintainer")),__jsx("div",null,__jsx(_PullRequestTable_pull_request_table__WEBPACK_IMPORTED_MODULE_6__.Z,{isHoverCard:!0,repositories,limit:5,contributor:username,topic})),__jsx("div",null,__jsx(_CardRepoList_card_repo_list__WEBPACK_IMPORTED_MODULE_7__.Z,{repoList,limit:3})))};HoverCardWrapper.displayName="HoverCardWrapper";const __WEBPACK_DEFAULT_EXPORT__=HoverCardWrapper;try{hovercardwrapper.displayName="hovercardwrapper",hovercardwrapper.__docgenInfo={description:"",displayName:"hovercardwrapper",props:{username:{defaultValue:null,description:"",name:"username",required:!0,type:{name:"string"}},repositories:{defaultValue:null,description:"",name:"repositories",required:!1,type:{name:"number[]"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/molecules/HoverCardWrapper/hover-card-wrapper.tsx#hovercardwrapper"]={docgenInfo:hovercardwrapper.__docgenInfo,name:"hovercardwrapper",path:"components/molecules/HoverCardWrapper/hover-card-wrapper.tsx#hovercardwrapper"})}catch(__react_docgen_typescript_loader_error){}},"./components/molecules/PullRequestTable/pull-request-table.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>pull_request_table});var esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),next_image=__webpack_require__("./node_modules/@storybook/nextjs/dist/images/next-image.mjs"),dist=__webpack_require__("./node_modules/react-loading-skeleton/dist/index.mjs"),useContributorPullRequests=__webpack_require__("./lib/hooks/api/useContributorPullRequests.ts"),lib=__webpack_require__("./node_modules/react-icons/lib/index.mjs"),go=__webpack_require__("./node_modules/react-icons/go/index.mjs"),bs=__webpack_require__("./node_modules/react-icons/bs/index.mjs"),fa=__webpack_require__("./node_modules/react-icons/fa/index.mjs"),Typography_text=__webpack_require__("./components/atoms/Typography/text.tsx"),tooltip=__webpack_require__("./components/atoms/Tooltip/tooltip.tsx"),__jsx=react.createElement;const LatestPrTableHeader=_ref=>{let{classNames,isHoverCard}=_ref;return __jsx("div",{className:"flex gap-2 items-center bg-light-slate-3 rounded-md px-2 py-1 "},__jsx("div",{className:"w-3/5"},__jsx(Typography_text.Z,{className:" "},"Latest PRs")),__jsx(lib.Pd.Provider,{value:{color:"gray",style:{width:14,height:14}}},__jsx("div",{className:"".concat(isHoverCard&&"ml-auto"," justify-end w-[calc(10%-4px)]")},__jsx(tooltip.Z,{content:"Last Commit Date"},__jsx(fa.tpH,null)))),__jsx(lib.Pd.Provider,{value:{color:"gray",style:{width:14,height:14}}},__jsx("div",{className:"".concat(isHoverCard?"hidden":"flex"," justify-end w-[calc(10%-4px)]")},__jsx(tooltip.Z,{content:"Date Approved"},__jsx(fa.wO,null)))),__jsx(lib.Pd.Provider,{value:{color:"gray",style:{width:14,height:14,strokeWidth:.3}}},__jsx("div",{className:"".concat(isHoverCard?"hidden":"flex"," justify-end w-[calc(10%-4px)]")},__jsx(tooltip.Z,{content:"Files Touched"},__jsx(go.h3x,null)))),__jsx(lib.Pd.Provider,{value:{color:"gray",style:{width:14,height:14,strokeWidth:.5}}},__jsx("div",{className:"".concat(isHoverCard?"hidden":"flex"," justify-end w-[calc(10%-4px)]")},__jsx(tooltip.Z,{content:"Lines Touched"},__jsx(bs.YlG,null)))))};LatestPrTableHeader.displayName="LatestPrTableHeader";const latest_pr_table_header=LatestPrTableHeader;try{latestprtableheader.displayName="latestprtableheader",latestprtableheader.__docgenInfo={description:"",displayName:"latestprtableheader",props:{classNames:{defaultValue:null,description:"",name:"classNames",required:!1,type:{name:"string"}},isHoverCard:{defaultValue:null,description:"",name:"isHoverCard",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/molecules/LatestPrTableHeader/latest-pr-table-header.tsx#latestprtableheader"]={docgenInfo:latestprtableheader.__docgenInfo,name:"latestprtableheader",path:"components/molecules/LatestPrTableHeader/latest-pr-table-header.tsx#latestprtableheader"})}catch(__react_docgen_typescript_loader_error){}var vsc=__webpack_require__("./node_modules/react-icons/vsc/index.mjs"),date_utils=__webpack_require__("./lib/utils/date-utils.ts"),humanizeNumber=__webpack_require__("./lib/utils/humanizeNumber.ts"),latest_pr_table_row_jsx=react.createElement;const LatestPrTableRow=_ref=>{let{prName,prStatus,prIssuedTime,prMergedTime,noOfFilesChanged,noOfLinesChanged,merged,draft,isHoverCard,repoFullName,prNumber,prUpdatedTime}=_ref;return latest_pr_table_row_jsx("div",{className:"flex gap-2 items-center px-2 py-1"},latest_pr_table_row_jsx("div",{className:"flex item-center gap-2 w-3/5 ".concat(isHoverCard&&"w-5/6")},draft||"open"!==prStatus.toLowerCase()?!draft&&"closed"===prStatus.toLowerCase()||"merged"===prStatus.toLowerCase()?latest_pr_table_row_jsx(lib.Pd.Provider,{value:{color:merged?"purple":"red",style:{width:14,height:14,marginTop:2}}},merged?latest_pr_table_row_jsx(vsc.HlQ,{title:"Merged Pull Request"}):latest_pr_table_row_jsx(vsc.UVi,{title:"Closed Pull Request"})):latest_pr_table_row_jsx(lib.Pd.Provider,{value:{color:"gray",style:{width:14,height:14,marginTop:2}}},latest_pr_table_row_jsx(vsc.jOL,{title:"Draft Pull Request"})):latest_pr_table_row_jsx(lib.Pd.Provider,{value:{color:"green",style:{width:14,height:14,marginTop:2}}},latest_pr_table_row_jsx(vsc.X9P,{title:"Open Pull Request"})),latest_pr_table_row_jsx(Typography_text.Z,{title:"updated date"},(0,date_utils.wu)(new Date(prUpdatedTime))),latest_pr_table_row_jsx(Typography_text.Z,{title:prName,className:"!text-light-slate-12 !w-32 md:!w-96 !truncate"},latest_pr_table_row_jsx("a",{href:"https://github.com/".concat(repoFullName,"/pull/").concat(prNumber),target:"_blank"},prName))),latest_pr_table_row_jsx("div",{className:"".concat(isHoverCard&&"ml-auto"," justify-end w-[calc(10%-4px)] text-sm text-light-slate-11")},(0,date_utils.wu)(new Date(prIssuedTime))),latest_pr_table_row_jsx("div",{className:"".concat(isHoverCard?"hidden":"flex"," justify-end w-[calc(10%-4px)] text-sm text-light-slate-11")},merged?(0,date_utils.wu)(new Date(prMergedTime)):"-"),latest_pr_table_row_jsx("div",{className:"".concat(isHoverCard?"hidden":"flex"," justify-end w-[calc(10%-4px)] text-sm text-light-slate-11")},noOfFilesChanged>=1e3?(0,humanizeNumber.Z)(noOfFilesChanged,"abbreviation"):noOfFilesChanged),latest_pr_table_row_jsx("div",{className:"".concat(isHoverCard?"hidden":"flex"," justify-end w-[calc(10%-4px)] text-sm text-light-slate-11")},noOfLinesChanged>=1e3?(0,humanizeNumber.Z)(noOfLinesChanged,"abbreviation"):noOfLinesChanged))};LatestPrTableRow.displayName="LatestPrTableRow";const latest_pr_table_row=LatestPrTableRow;try{latestprtablerow.displayName="latestprtablerow",latestprtablerow.__docgenInfo={description:"",displayName:"latestprtablerow",props:{prName:{defaultValue:null,description:"",name:"prName",required:!0,type:{name:"string"}},prStatus:{defaultValue:null,description:"",name:"prStatus",required:!0,type:{name:"string"}},merged:{defaultValue:null,description:"",name:"merged",required:!1,type:{name:"boolean"}},draft:{defaultValue:null,description:"",name:"draft",required:!1,type:{name:"boolean"}},prMergedTime:{defaultValue:null,description:"",name:"prMergedTime",required:!0,type:{name:"string"}},prIssuedTime:{defaultValue:null,description:"",name:"prIssuedTime",required:!0,type:{name:"string"}},noOfFilesChanged:{defaultValue:null,description:"",name:"noOfFilesChanged",required:!0,type:{name:"number"}},noOfLinesChanged:{defaultValue:null,description:"",name:"noOfLinesChanged",required:!0,type:{name:"number"}},isHoverCard:{defaultValue:null,description:"",name:"isHoverCard",required:!1,type:{name:"boolean"}},repoFullName:{defaultValue:null,description:"",name:"repoFullName",required:!0,type:{name:"string"}},prNumber:{defaultValue:null,description:"",name:"prNumber",required:!0,type:{name:"number"}},prUpdatedTime:{defaultValue:null,description:"",name:"prUpdatedTime",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/molecules/LatestPrTableRow/latest-pr-table-row.tsx#latestprtablerow"]={docgenInfo:latestprtablerow.__docgenInfo,name:"latestprtablerow",path:"components/molecules/LatestPrTableRow/latest-pr-table-row.tsx#latestprtablerow"})}catch(__react_docgen_typescript_loader_error){}var pull_request_table_jsx=react.createElement;const EmptyState=_ref=>{let{range}=_ref;return pull_request_table_jsx(react.Fragment,null,pull_request_table_jsx("div",{className:"flex flex-col justify-center mt-8 pt-8"},pull_request_table_jsx("div",{className:"absolute sm:left-[20%] md:left-[52%]"},pull_request_table_jsx("div",null,pull_request_table_jsx(next_image.Z,{src:"/assets/images/magnifying-glass.png",alt:"Magnifying Glass",width:"400",height:"400"}))),pull_request_table_jsx("div",{className:"grid w-max max-w-sm mx-auto"},pull_request_table_jsx("span",{className:"text-center font-medium mb-2"},"No Pull Requests Found"),pull_request_table_jsx("p",{className:"text-sm text-slate-600 text-center"},"This contributor doesn't seem to have any Pull Requests data in the past"," ",pull_request_table_jsx("span",{className:"font-bold"},range," days"),". Try changing the date range."))))},pull_request_table=_ref2=>{let{contributor,topic,repositories,limit,isHoverCard,range,repoFilter}=_ref2;const{data,isLoading}=(0,useContributorPullRequests.ZP)({contributor,topic,repoIds:repositories,limit:50,range}),repos=data.filter((pr=>!repoFilter||pr.repo_name===repoFilter)).slice(0,15);return repos.length>0?pull_request_table_jsx(react.Fragment,null,pull_request_table_jsx("div",{className:"flex flex-col"},pull_request_table_jsx(latest_pr_table_header,{isHoverCard}),pull_request_table_jsx("div",{className:"flex flex-col gap-0.5"},repos.map(((_ref3,index)=>{let{pr_title:prName,pr_state:prStatus,pr_is_merged:merged,pr_is_draft:draft,pr_merged_at:prMergedTime,pr_created_at:prIssuedTime,pr_changed_files:noOfFilesChanged,pr_additions:additions,pr_deletions:deletions,pr_number:prNumber,repo_name:fullName,pr_updated_at:prUpdatedTime}=_ref3;const latestPrs={prName,prIssuedTime,prMergedTime,prStatus,merged,draft,noOfFilesChanged,noOfLinesChanged:Math.abs(additions-deletions),repoFullName:fullName,prNumber,prUpdatedTime};return pull_request_table_jsx(latest_pr_table_row,(0,esm_extends.Z)({isHoverCard,key:index},latestPrs))}))))):pull_request_table_jsx("div",{className:"px-2 py-1"},isLoading?pull_request_table_jsx(dist.Z,{height:24,count:3,className:"mt-4 mb-2"}):pull_request_table_jsx(EmptyState,{range:Number(null!=range?range:30)}))};try{pullrequesttable.displayName="pullrequesttable",pullrequesttable.__docgenInfo={description:"",displayName:"pullrequesttable",props:{contributor:{defaultValue:null,description:"",name:"contributor",required:!0,type:{name:"string"}},topic:{defaultValue:null,description:"",name:"topic",required:!0,type:{name:"string"}},repositories:{defaultValue:null,description:"",name:"repositories",required:!1,type:{name:"number[]"}},limit:{defaultValue:null,description:"",name:"limit",required:!1,type:{name:"number"}},isHoverCard:{defaultValue:null,description:"",name:"isHoverCard",required:!1,type:{name:"boolean"}},range:{defaultValue:null,description:"",name:"range",required:!1,type:{name:"string"}},repoFilter:{defaultValue:null,description:"",name:"repoFilter",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/molecules/PullRequestTable/pull-request-table.tsx#pullrequesttable"]={docgenInfo:pullrequesttable.__docgenInfo,name:"pullrequesttable",path:"components/molecules/PullRequestTable/pull-request-table.tsx#pullrequesttable"})}catch(__react_docgen_typescript_loader_error){}},"./lib/hooks/api/useContributorPullRequests.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{ZP:()=>__WEBPACK_DEFAULT_EXPORT__});var swr__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/swr/core/dist/index.mjs"),next_router__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/next/router.js"),lib_utils_public_api_fetcher__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./lib/utils/public-api-fetcher.ts"),lib_utils_get_filter_query__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./lib/utils/get-filter-query.ts");function getContributorPRUrl(contributor,filter,topic){let repoIds=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],limit=arguments.length>4&&void 0!==arguments[4]?arguments[4]:8,range=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"30";const filterQuery=(0,lib_utils_get_filter_query__WEBPACK_IMPORTED_MODULE_3__.Z)(filter),query=new URLSearchParams(filterQuery);Number.isNaN(Number(topic))&&"*"!==topic&&query.set("topic",topic),limit&&query.set("limit","".concat(limit)),(null==repoIds?void 0:repoIds.length)>0&&query.set("repoIds",repoIds.join(",")),query.set("range","".concat(range));const baseEndpoint="users/".concat(contributor,"/prs");return"".concat(baseEndpoint,"?").concat(query.toString())}const __WEBPACK_DEFAULT_EXPORT__=function(){var _data$data,_data$meta;let options=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{contributor:"",topic:"",limit:8,range:"30"};const{contributor,topic,repoIds,limit,range}=options,router=(0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)(),{selectedFilter}=router.query,endpointString=getContributorPRUrl(contributor,selectedFilter,topic,repoIds,limit,range),{data,error,mutate}=(0,swr__WEBPACK_IMPORTED_MODULE_0__.ZP)(contributor?endpointString:null,lib_utils_public_api_fetcher__WEBPACK_IMPORTED_MODULE_2__.N);return{data:null!==(_data$data=null==data?void 0:data.data)&&void 0!==_data$data?_data$data:[],meta:null!==(_data$meta=null==data?void 0:data.meta)&&void 0!==_data$meta?_data$meta:{itemCount:0,limit:0,page:0,hasNextPage:!1,hasPreviousPage:!1,pageCount:0},isLoading:!error&&!data,isError:!!error,mutate}}},"./lib/hooks/useContributorPullRequestsChart.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{u:()=>useContributorPullRequestsChart});var lib_utils_github__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./lib/utils/github.ts"),_api_useContributorPullRequests__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./lib/hooks/api/useContributorPullRequests.ts");const useContributorPullRequestsChart=function(contributor,topic){let repoIds=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],range=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"30";const{data,meta}=(0,_api_useContributorPullRequests__WEBPACK_IMPORTED_MODULE_1__.ZP)({contributor,topic,repoIds,limit:100,range}),repoList=Array.from(new Set(data.map((prData=>prData.repo_name)))).map((repo=>{const[repoOwner,repoName]=repo.split("/");return{repoName,repoOwner,repoIcon:(0,lib_utils_github__WEBPACK_IMPORTED_MODULE_0__.cc)(repoOwner)}}));return{data,meta,repoList}}},"./lib/hooks/useFetchUser.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{j:()=>useFetchUser});var swr__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/swr/core/dist/index.mjs"),lib_utils_public_api_fetcher__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./lib/utils/public-api-fetcher.ts");const useFetchUser=(username,config,repositories)=>{const query=new URLSearchParams;repositories&&query.set("maintainerRepoIds",repositories.join(","));const{data,error,mutate}=(0,swr__WEBPACK_IMPORTED_MODULE_0__.ZP)(username?"users/".concat(username,"?").concat(query):null,lib_utils_public_api_fetcher__WEBPACK_IMPORTED_MODULE_1__.N,config);return{data:data||void 0,isLoading:!error&&!data,isError:!!error,mutate}}},"./lib/utils/date-utils.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{L0:()=>getFormattedDate,MK:()=>getRelativeDays,wu:()=>calcDistanceFromToday,yy:()=>calcDaysFromToday});var date_fns_formatDistanceToNowStrict__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/date-fns/esm/formatDistanceToNowStrict/index.js");const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],calcDaysFromToday=endDate=>{const timeFromNowArray=(0,date_fns_formatDistanceToNowStrict__WEBPACK_IMPORTED_MODULE_0__.Z)(endDate,{unit:"day"}).split(" ");return parseInt(timeFromNowArray[0])},getRelativeDays=days=>0===days?"-":days>=365?"".concat(Math.floor(days/365),"y"):days>30&&days<365?"".concat(Math.floor(days/30),"mo"):"".concat(days,"d"),calcDistanceFromToday=endDate=>{const daysFromNow=calcDaysFromToday(endDate);return"".concat(getRelativeDays(daysFromNow))},getFormattedDate=dateString=>{const date=new Date(dateString),month=months[date.getMonth()],day=date.getDate(),year=date.getFullYear();return"".concat(month," ").concat(day,", ").concat(year)}},"./lib/utils/get-filter-query.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=filter=>{const query=new URLSearchParams;return Array.isArray(filter)&&2===filter.length?query.set("repo",filter.join("/")):filter&&query.set("filter",Array.isArray(filter)?filter[0]:filter),"".concat(query)?"&".concat(query):""}},"./lib/utils/humanizeNumber.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=function(num){let type=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"abbreviation";const number="number"!=typeof num?parseFloat(num):num,abs=Math.abs(number),sign=Math.sign(number),commaConverted="".concat(abs>999?(sign*abs/1e3).toFixed(3).replace(".",","):sign*abs),abbreviated=abs>999?"".concat((sign*abs/1e3).toFixed(1),"k"):"".concat(sign*abs);return"comma"===type?commaConverted:abbreviated}},"./img/icons/first-pr-icon.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={src:"static/media/first-pr-icon.77fd4d58.svg",height:13,width:13,blurDataURL:"static/media/first-pr-icon.77fd4d58.svg"}},"./img/icons/fork-icon.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={src:"static/media/fork-icon.29284437.svg",height:16,width:14,blurDataURL:"static/media/fork-icon.29284437.svg"}}}]);