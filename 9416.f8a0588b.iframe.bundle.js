"use strict";(self.webpackChunk_open_sauced_app=self.webpackChunk_open_sauced_app||[]).push([[9416],{"./node_modules/@radix-ui/react-checkbox/dist/index.module.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{z$:()=>$e698a72e93240346$export$adb584737d712b70,fC:()=>$e698a72e93240346$export$be92b6f5f03c0fe9});var esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),index_module=__webpack_require__("./node_modules/@radix-ui/react-compose-refs/dist/index.module.js"),dist_index_module=__webpack_require__("./node_modules/@radix-ui/react-context/dist/index.module.js"),primitive_dist_index_module=__webpack_require__("./node_modules/@radix-ui/primitive/dist/index.module.js"),react_use_controllable_state_dist_index_module=__webpack_require__("./node_modules/@radix-ui/react-use-controllable-state/dist/index.module.js"),react_use_previous_dist_index_module=__webpack_require__("./node_modules/@radix-ui/react-use-previous/dist/index.module.js"),react_use_size_dist_index_module=__webpack_require__("./node_modules/@radix-ui/react-use-size/dist/index.module.js"),react_presence_dist_index_module=__webpack_require__("./node_modules/@radix-ui/react-presence/dist/index.module.js");__webpack_require__("./node_modules/next/dist/compiled/react-dom/index.js");const $5e63c961fc1ce211$export$8c6ed5c666ac1360=(0,react.forwardRef)(((props,forwardedRef)=>{const{children,...slotProps}=props,childrenArray=react.Children.toArray(children),slottable=childrenArray.find($5e63c961fc1ce211$var$isSlottable);if(slottable){const newElement=slottable.props.children,newChildren=childrenArray.map((child=>child===slottable?react.Children.count(newElement)>1?react.Children.only(null):(0,react.isValidElement)(newElement)?newElement.props.children:null:child));return(0,react.createElement)($5e63c961fc1ce211$var$SlotClone,(0,esm_extends.Z)({},slotProps,{ref:forwardedRef}),(0,react.isValidElement)(newElement)?(0,react.cloneElement)(newElement,void 0,newChildren):null)}return(0,react.createElement)($5e63c961fc1ce211$var$SlotClone,(0,esm_extends.Z)({},slotProps,{ref:forwardedRef}),children)}));$5e63c961fc1ce211$export$8c6ed5c666ac1360.displayName="Slot";const $5e63c961fc1ce211$var$SlotClone=(0,react.forwardRef)(((props,forwardedRef)=>{const{children,...slotProps}=props;return(0,react.isValidElement)(children)?(0,react.cloneElement)(children,{...$5e63c961fc1ce211$var$mergeProps(slotProps,children.props),ref:(0,index_module.F)(forwardedRef,children.ref)}):react.Children.count(children)>1?react.Children.only(null):null}));$5e63c961fc1ce211$var$SlotClone.displayName="SlotClone";const $5e63c961fc1ce211$export$d9f1ccf0bdb05d45=({children})=>(0,react.createElement)(react.Fragment,null,children);function $5e63c961fc1ce211$var$isSlottable(child){return(0,react.isValidElement)(child)&&child.type===$5e63c961fc1ce211$export$d9f1ccf0bdb05d45}function $5e63c961fc1ce211$var$mergeProps(slotProps,childProps){const overrideProps={...childProps};for(const propName in childProps){const slotPropValue=slotProps[propName],childPropValue=childProps[propName];/^on[A-Z]/.test(propName)?slotPropValue&&childPropValue?overrideProps[propName]=(...args)=>{childPropValue(...args),slotPropValue(...args)}:slotPropValue&&(overrideProps[propName]=slotPropValue):"style"===propName?overrideProps[propName]={...slotPropValue,...childPropValue}:"className"===propName&&(overrideProps[propName]=[slotPropValue,childPropValue].filter(Boolean).join(" "))}return{...slotProps,...overrideProps}}const $8927f6f2acc4f386$export$250ffa63cdc0d034=["a","button","div","h2","h3","img","label","li","nav","ol","p","span","svg","ul"].reduce(((primitive,node)=>{const Node=(0,react.forwardRef)(((props,forwardedRef)=>{const{asChild,...primitiveProps}=props,Comp=asChild?$5e63c961fc1ce211$export$8c6ed5c666ac1360:node;return(0,react.useEffect)((()=>{window[Symbol.for("radix-ui")]=!0}),[]),(0,react.createElement)(Comp,(0,esm_extends.Z)({},primitiveProps,{ref:forwardedRef}))}));return Node.displayName=`Primitive.${node}`,{...primitive,[node]:Node}}),{});const[$e698a72e93240346$var$createCheckboxContext,$e698a72e93240346$export$b566c4ff5488ea01]=(0,dist_index_module.b)("Checkbox"),[$e698a72e93240346$var$CheckboxProvider,$e698a72e93240346$var$useCheckboxContext]=$e698a72e93240346$var$createCheckboxContext("Checkbox"),$e698a72e93240346$export$48513f6b9f8ce62d=(0,react.forwardRef)(((props,forwardedRef)=>{const{__scopeCheckbox,name,checked:checkedProp,defaultChecked,required,disabled,value="on",onCheckedChange,...checkboxProps}=props,[button,setButton]=(0,react.useState)(null),composedRefs=(0,index_module.e)(forwardedRef,(node=>setButton(node))),hasConsumerStoppedPropagationRef=(0,react.useRef)(!1),isFormControl=!button||Boolean(button.closest("form")),[checked=!1,setChecked]=(0,react_use_controllable_state_dist_index_module.T)({prop:checkedProp,defaultProp:defaultChecked,onChange:onCheckedChange});return(0,react.createElement)($e698a72e93240346$var$CheckboxProvider,{scope:__scopeCheckbox,state:checked,disabled},(0,react.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.button,(0,esm_extends.Z)({type:"button",role:"checkbox","aria-checked":$e698a72e93240346$var$isIndeterminate(checked)?"mixed":checked,"aria-required":required,"data-state":$e698a72e93240346$var$getState(checked),"data-disabled":disabled?"":void 0,disabled,value},checkboxProps,{ref:composedRefs,onKeyDown:(0,primitive_dist_index_module.M)(props.onKeyDown,(event=>{"Enter"===event.key&&event.preventDefault()})),onClick:(0,primitive_dist_index_module.M)(props.onClick,(event=>{setChecked((prevChecked=>!!$e698a72e93240346$var$isIndeterminate(prevChecked)||!prevChecked)),isFormControl&&(hasConsumerStoppedPropagationRef.current=event.isPropagationStopped(),hasConsumerStoppedPropagationRef.current||event.stopPropagation())}))})),isFormControl&&(0,react.createElement)($e698a72e93240346$var$BubbleInput,{control:button,bubbles:!hasConsumerStoppedPropagationRef.current,name,value,checked,required,disabled,style:{transform:"translateX(-100%)"}}))})),$e698a72e93240346$export$59aad738f51d1c05=(0,react.forwardRef)(((props,forwardedRef)=>{const{__scopeCheckbox,forceMount,...indicatorProps}=props,context=$e698a72e93240346$var$useCheckboxContext("CheckboxIndicator",__scopeCheckbox);return(0,react.createElement)(react_presence_dist_index_module.z,{present:forceMount||$e698a72e93240346$var$isIndeterminate(context.state)||!0===context.state},(0,react.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.span,(0,esm_extends.Z)({"data-state":$e698a72e93240346$var$getState(context.state),"data-disabled":context.disabled?"":void 0},indicatorProps,{ref:forwardedRef,style:{pointerEvents:"none",...props.style}})))})),$e698a72e93240346$var$BubbleInput=props=>{const{control,checked,bubbles=!0,...inputProps}=props,ref=(0,react.useRef)(null),prevChecked=(0,react_use_previous_dist_index_module.D)(checked),controlSize=(0,react_use_size_dist_index_module.t)(control);return(0,react.useEffect)((()=>{const input=ref.current,inputProto=window.HTMLInputElement.prototype,setChecked=Object.getOwnPropertyDescriptor(inputProto,"checked").set;if(prevChecked!==checked&&setChecked){const event=new Event("click",{bubbles});input.indeterminate=$e698a72e93240346$var$isIndeterminate(checked),setChecked.call(input,!$e698a72e93240346$var$isIndeterminate(checked)&&checked),input.dispatchEvent(event)}}),[prevChecked,checked,bubbles]),(0,react.createElement)("input",(0,esm_extends.Z)({type:"checkbox","aria-hidden":!0,defaultChecked:!$e698a72e93240346$var$isIndeterminate(checked)&&checked},inputProps,{tabIndex:-1,ref,style:{...props.style,...controlSize,position:"absolute",pointerEvents:"none",opacity:0,margin:0}}))};function $e698a72e93240346$var$isIndeterminate(checked){return"indeterminate"===checked}function $e698a72e93240346$var$getState(checked){return $e698a72e93240346$var$isIndeterminate(checked)?"indeterminate":checked?"checked":"unchecked"}const $e698a72e93240346$export$be92b6f5f03c0fe9=$e698a72e93240346$export$48513f6b9f8ce62d,$e698a72e93240346$export$adb584737d712b70=$e698a72e93240346$export$59aad738f51d1c05},"./node_modules/@radix-ui/react-use-previous/dist/index.module.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D:()=>$010c2913dbd2fe3d$export$5cae361ad82dce8b});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js");function $010c2913dbd2fe3d$export$5cae361ad82dce8b(value){const ref=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({value,previous:value});return(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>(ref.current.value!==value&&(ref.current.previous=ref.current.value,ref.current.value=value),ref.current.previous)),[value])}},"./components/Workspaces/SearchReposTable.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{H:()=>SearchedReposTable});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),react_icons_bi__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react-icons/bi/index.mjs"),components_shared_Table__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./components/shared/Table.tsx"),components_atoms_Avatar_avatar_hover_card__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./components/atoms/Avatar/avatar-hover-card.tsx"),components_atoms_Checkbox_checkbox__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./components/atoms/Checkbox/checkbox.tsx"),components_atoms_Search_search__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./components/atoms/Search/search.tsx"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement;const EmptyState=_ref=>{let{message}=_ref;return __jsx(components_shared_Table__WEBPACK_IMPORTED_MODULE_1__.SC,null,__jsx(components_shared_Table__WEBPACK_IMPORTED_MODULE_1__.pj,{className:"grid place-content-center"},__jsx("div",{className:"grid place-content-center gap-5 my-8"},__jsx(react_icons_bi__WEBPACK_IMPORTED_MODULE_5__.mJ5,{className:"border rounded-lg p-2 w-11 h-11 mx-auto fill-slate-600 shadow-xs"}),__jsx("div",{className:"grid w-max max-w-sm mx-auto"},__jsx("span",{className:"text-center font-medium mb-2"},message)))))};EmptyState.displayName="EmptyState";const SearchedReposTable=_ref2=>{let{type,repositories=new Map,onFilter,onToggleRepo,onToggleAllRepos,message="No repositories found"}=_ref2;const allChecked=[...repositories.values()].every((checked=>checked)),rows=[...repositories.entries()];return __jsx("div",{className:"border border-light-slate-7 rounded-lg"},__jsx(components_shared_Table__WEBPACK_IMPORTED_MODULE_1__.iA,{className:"not-sr-only"},__jsx(components_shared_Table__WEBPACK_IMPORTED_MODULE_1__.xD,null,__jsx(components_shared_Table__WEBPACK_IMPORTED_MODULE_1__.SC,{className:"bg-light-slate-3"},__jsx(components_shared_Table__WEBPACK_IMPORTED_MODULE_1__.ss,{className:"flex justify-between items-center gap-6"},__jsx("div",{className:"flex gap-2"},__jsx(components_atoms_Checkbox_checkbox__WEBPACK_IMPORTED_MODULE_3__.Z,{onCheckedChange:checked=>{onToggleAllRepos(!!checked)},checked:allChecked,label:"by-repos"===type?"Selected repositories":"Selected organization repositories"})),__jsx("form",{className:"pr-2",role:"search",onSubmit:event=>{event.preventDefault}},__jsx(components_atoms_Search_search__WEBPACK_IMPORTED_MODULE_4__.Z,{placeholder:"Filter repositories",className:"w-full",name:"query",onChange:onFilter})))))),__jsx("div",{className:"overflow-y-scroll h-60"},__jsx(components_shared_Table__WEBPACK_IMPORTED_MODULE_1__.iA,null,__jsx(components_shared_Table__WEBPACK_IMPORTED_MODULE_1__.xD,{className:"sr-only"},__jsx(components_shared_Table__WEBPACK_IMPORTED_MODULE_1__.SC,{className:" bg-light-slate-3"},__jsx(components_shared_Table__WEBPACK_IMPORTED_MODULE_1__.ss,null,"Selected repositories"))),__jsx(components_shared_Table__WEBPACK_IMPORTED_MODULE_1__.RM,null,rows.length>0?__jsx(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,rows.map((_ref3=>{let[repo,checked]=_ref3;const[owner]=repo.split("/");return __jsx(components_shared_Table__WEBPACK_IMPORTED_MODULE_1__.SC,{key:repo},__jsx(components_shared_Table__WEBPACK_IMPORTED_MODULE_1__.pj,{className:"flex gap-2 items-center w-full"},__jsx("label",{className:"flex items-center gap-2"},__jsx(components_atoms_Checkbox_checkbox__WEBPACK_IMPORTED_MODULE_3__.Z,{onCheckedChange:checked=>{onToggleRepo(repo,!!checked)},checked}),__jsx(components_atoms_Avatar_avatar_hover_card__WEBPACK_IMPORTED_MODULE_2__.q,{contributor:owner,size:"xsmall"}),__jsx("span",null,repo))))}))):__jsx(EmptyState,{message})))))};SearchedReposTable.displayName="SearchedReposTable";try{SearchedReposTable.displayName="SearchedReposTable",SearchedReposTable.__docgenInfo={description:"",displayName:"SearchedReposTable",props:{type:{defaultValue:null,description:"",name:"type",required:!0,type:{name:"enum",value:[{value:'"by-repos"'},{value:'"by-org"'}]}},repositories:{defaultValue:{value:"new Map()"},description:"",name:"repositories",required:!1,type:{name:"Map<string, boolean>"}},onFilter:{defaultValue:null,description:"",name:"onFilter",required:!0,type:{name:"(filterTerm: string) => void"}},onToggleRepo:{defaultValue:null,description:"",name:"onToggleRepo",required:!0,type:{name:"(repo: string, checked: boolean) => void"}},onToggleAllRepos:{defaultValue:null,description:"",name:"onToggleAllRepos",required:!0,type:{name:"(checked: boolean) => void"}},message:{defaultValue:{value:"No repositories found"},description:"",name:"message",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/Workspaces/SearchReposTable.tsx#SearchedReposTable"]={docgenInfo:SearchedReposTable.__docgenInfo,name:"SearchedReposTable",path:"components/Workspaces/SearchReposTable.tsx#SearchedReposTable"})}catch(__react_docgen_typescript_loader_error){}},"./components/atoms/Checkbox/checkbox.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),_radix_ui_react_checkbox__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@radix-ui/react-checkbox/dist/index.module.js"),react_icons_fi__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react-icons/fi/index.mjs"),clsx__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/clsx/dist/clsx.m.js");const _excluded=["className","label","id"];var __jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement;const Checkbox=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((_ref,ref)=>{let{className,label,id}=_ref,props=(0,_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__.Z)(_ref,_excluded);const getId=()=>id||(null==label?void 0:label.replaceAll(" ","_").toLowerCase());return __jsx("div",{className:"flex items-center"},__jsx(_radix_ui_react_checkbox__WEBPACK_IMPORTED_MODULE_2__.fC,(0,_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_3__.Z)({ref,className:(0,clsx__WEBPACK_IMPORTED_MODULE_4__.Z)("peer h-4 w-4 shrink-0 rounded cursor-pointer bg-white border border-light-slate-8 hover:border-orange-500 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-orange-500 data-[state=checked]:bg-orange-500",className)},props,{id:getId()}),__jsx(_radix_ui_react_checkbox__WEBPACK_IMPORTED_MODULE_2__.z$,{className:(0,clsx__WEBPACK_IMPORTED_MODULE_4__.Z)("p-0.5 flex items-center justify-center text-white")},__jsx(react_icons_fi__WEBPACK_IMPORTED_MODULE_5__.UgA,{className:"w-full h-full"}))),label&&__jsx("label",{htmlFor:getId(),className:"ml-3 text-sm leading-none cursor-pointer text-light-slate-12 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"},label))}));Checkbox.displayName=_radix_ui_react_checkbox__WEBPACK_IMPORTED_MODULE_2__.fC.displayName;const __WEBPACK_DEFAULT_EXPORT__=Checkbox;try{checkbox.displayName="checkbox",checkbox.__docgenInfo={description:"",displayName:"checkbox",props:{label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string"}},asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/atoms/Checkbox/checkbox.tsx#checkbox"]={docgenInfo:checkbox.__docgenInfo,name:"checkbox",path:"components/atoms/Checkbox/checkbox.tsx#checkbox"})}catch(__react_docgen_typescript_loader_error){}},"./components/atoms/ScrollArea/scroll-area.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{fK:()=>ScrollViewport,xr:()=>ScrollArea});var _home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),_radix_ui_react_scroll_area__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@radix-ui/react-scroll-area/dist/index.mjs"),clsx__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/clsx/dist/clsx.m.js");const _excluded=["className","children"],_excluded2=["className","children"],_excluded3=["className","orientation"];var __jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement;const ScrollArea=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((_ref,ref)=>{let{className,children}=_ref,props=(0,_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__.Z)(_ref,_excluded);return __jsx(_radix_ui_react_scroll_area__WEBPACK_IMPORTED_MODULE_2__.fC,(0,_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_3__.Z)({ref,className:(0,clsx__WEBPACK_IMPORTED_MODULE_4__.Z)("relative overflow-hidden",className)},props),__jsx(ScrollViewport,null,children))}));ScrollArea.displayName=_radix_ui_react_scroll_area__WEBPACK_IMPORTED_MODULE_2__.fC.displayName;const ScrollViewport=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((_ref2,ref)=>{let{className,children}=_ref2,props=(0,_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__.Z)(_ref2,_excluded2);return __jsx(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,__jsx(_radix_ui_react_scroll_area__WEBPACK_IMPORTED_MODULE_2__.l_,(0,_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_3__.Z)({ref,className:(0,clsx__WEBPACK_IMPORTED_MODULE_4__.Z)("h-full w-full rounded-[inherit]",className)},props),children),__jsx(ScrollBar,null),__jsx(_radix_ui_react_scroll_area__WEBPACK_IMPORTED_MODULE_2__.Ns,null))}));ScrollViewport.displayName=_radix_ui_react_scroll_area__WEBPACK_IMPORTED_MODULE_2__.l_.displayName;const ScrollBar=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((_ref3,ref)=>{let{className,orientation="vertical"}=_ref3,props=(0,_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__.Z)(_ref3,_excluded3);return __jsx(_radix_ui_react_scroll_area__WEBPACK_IMPORTED_MODULE_2__.LW,(0,_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_3__.Z)({ref,className:(0,clsx__WEBPACK_IMPORTED_MODULE_4__.Z)("flex touch-none select-none p-0.5 transition-colors duration-[160ms] ease-out","vertical"===orientation&&"h-full w-2 border-l border-l-transparent","horizontal"===orientation&&"h-2 border-t border-t-transparent",className),orientation},props),__jsx(_radix_ui_react_scroll_area__WEBPACK_IMPORTED_MODULE_2__.bU,{className:"relative bg-light-slate-5 flex-1 rounded-full bg-border"}))}));ScrollBar.displayName=_radix_ui_react_scroll_area__WEBPACK_IMPORTED_MODULE_2__.LW.displayName;try{ScrollArea.displayName="ScrollArea",ScrollArea.__docgenInfo={description:"",displayName:"ScrollArea",props:{asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/atoms/ScrollArea/scroll-area.tsx#ScrollArea"]={docgenInfo:ScrollArea.__docgenInfo,name:"ScrollArea",path:"components/atoms/ScrollArea/scroll-area.tsx#ScrollArea"})}catch(__react_docgen_typescript_loader_error){}try{ScrollViewport.displayName="ScrollViewport",ScrollViewport.__docgenInfo={description:"",displayName:"ScrollViewport",props:{asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/atoms/ScrollArea/scroll-area.tsx#ScrollViewport"]={docgenInfo:ScrollViewport.__docgenInfo,name:"ScrollViewport",path:"components/atoms/ScrollArea/scroll-area.tsx#ScrollViewport"})}catch(__react_docgen_typescript_loader_error){}try{ScrollBar.displayName="ScrollBar",ScrollBar.__docgenInfo={description:"",displayName:"ScrollBar",props:{asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/atoms/ScrollArea/scroll-area.tsx#ScrollBar"]={docgenInfo:ScrollBar.__docgenInfo,name:"ScrollBar",path:"components/atoms/ScrollArea/scroll-area.tsx#ScrollBar"})}catch(__react_docgen_typescript_loader_error){}},"./components/atoms/Search/search.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),clsx__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/clsx/dist/clsx.m.js"),react_icons_gr__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react-icons/gr/index.mjs"),react_icons_fa__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react-icons/fa/index.mjs"),_SpinLoader_spin_loader__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./components/atoms/SpinLoader/spin-loader.tsx"),_ScrollArea_scroll_area__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./components/atoms/ScrollArea/scroll-area.tsx"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement;const suggestionsStyle={"-webkit-line-clamp":"1",display:"-webkit-box","-webkit-box-orient":"vertical"},Search=_ref=>{let{placeholder,name,value,autoFocus,className,onSearch,suggestions=[],suggestionsLabel,onChange,isLoading,onSelect,isDisabled}=_ref;const{0:cursor,1:setCursor}=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(-1),{0:search,1:setSearch}=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(value),{0:showSuggestions,1:setShowSuggestions}=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),handleOnSearch=()=>{null==onSearch||onSearch(search)};(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{setSearch(value)}),[value]);const handleOnSelect=suggestion=>{onSelect?(onSelect(suggestion),setSearch("")):(setSearch(suggestion),null==onSearch||onSearch(suggestion)),setShowSuggestions(!1),setCursor(-1)};return __jsx("div",{className:"".concat(className&&className," flex bg-white py-1 px-3 shadow-input border transition focus-within:ring focus-within:border-orange-500 focus-within:ring-orange-100 rounded-lg ring-light-slate-6 items-center relative min-w-[15rem]")},__jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_3__.U41,{className:"text-light-slate-9",fontSize:16,onClick:handleOnSearch}),__jsx("input",{className:"w-full pl-2 placeholder:text-sm focus:outline-none placeholder:text-slate-400 disabled:cursor-not-allowed",autoFocus,placeholder,name,value:search,type:"search",id:name,onChange:e=>{setSearch(e.target.value),null==onChange||onChange(e.target.value)},onKeyUp:e=>{"Enter"===e.code&&handleOnSearch()},disabled:isDisabled,onKeyDown:e=>{const resultsCount=(null==suggestions?void 0:suggestions.length)||0;if(resultsCount&&"ArrowUp"===e.key&&(e.preventDefault(),setCursor(0===cursor?Math.min(resultsCount-1,9):cursor-1)),resultsCount&&"ArrowDown"===e.key&&(e.preventDefault(),setCursor(cursor===Math.min(resultsCount-1,9)?0:cursor+1)),resultsCount&&"Enter"===e.key&&(e.preventDefault(),document.querySelector("._cursorActive"))){const{suggestion}=document.querySelector("._cursorActive").dataset;suggestion&&suggestion.length>0&&(handleOnSelect(suggestion),setCursor(-1))}},onFocus:()=>setShowSuggestions(!0),onBlur:()=>setTimeout((()=>setShowSuggestions(!1)),500)}),suggestions&&suggestions.length>0&&showSuggestions&&__jsx("div",{className:"absolute left-0 z-10 w-full pb-1 space-y-1 bg-white border rounded-lg cursor-pointer shadow-input border-light-slate-6 top-full"},__jsx(_ScrollArea_scroll_area__WEBPACK_IMPORTED_MODULE_2__.xr,{type:"auto",className:"h-60"},suggestionsLabel&&suggestions.length>0?__jsx("div",{className:"pl-5 pt-4"},suggestionsLabel):null,suggestions.map(((suggestion,index)=>__jsx("div",{className:(0,clsx__WEBPACK_IMPORTED_MODULE_4__.Z)(cursor===index&&"_cursorActive bg-slate-100","px-4 py-2 hover:bg-light-slate-2","[&_span]:max-w-[13rem]"),style:suggestionsStyle,key:index,"data-suggestion":"string"==typeof suggestion?suggestion:suggestion.key,onClick:event=>{const{suggestion}=event.currentTarget.dataset;suggestion&&handleOnSelect(suggestion)}},"string"==typeof suggestion?__jsx("span",{className:"pl-5 text-sm md:mw-auto inline-block text-ellipsis truncate tracking-tighter"},suggestion):suggestion.node))))),search&&__jsx(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,isLoading?__jsx(_SpinLoader_spin_loader__WEBPACK_IMPORTED_MODULE_1__.$,{className:"w-5 h-5"}):__jsx(react_icons_gr__WEBPACK_IMPORTED_MODULE_5__.nfZ,{className:"cursor-pointer text-light-slate-9",fontSize:16,onClick:()=>{setSearch(""),null==onSearch||onSearch(""),null==onChange||onChange("")}})))};Search.displayName="Search";const __WEBPACK_DEFAULT_EXPORT__=Search;try{search.displayName="search",search.__docgenInfo={description:"",displayName:"search",props:{name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string"}},value:{defaultValue:null,description:"",name:"value",required:!1,type:{name:"string"}},placeholder:{defaultValue:null,description:"",name:"placeholder",required:!1,type:{name:"string"}},autoFocus:{defaultValue:null,description:"",name:"autoFocus",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},onSearch:{defaultValue:null,description:"",name:"onSearch",required:!1,type:{name:"((search?: string) => void)"}},suggestions:{defaultValue:{value:"[]"},description:"",name:"suggestions",required:!1,type:{name:"string[] | RichSearchSuggestion[]"}},suggestionsLabel:{defaultValue:null,description:"",name:"suggestionsLabel",required:!1,type:{name:"string"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!1,type:{name:"((value: string) => void)"}},onSelect:{defaultValue:null,description:"",name:"onSelect",required:!1,type:{name:"((value: string) => void)"}},isLoading:{defaultValue:null,description:"",name:"isLoading",required:!1,type:{name:"boolean"}},isDisabled:{defaultValue:null,description:"",name:"isDisabled",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/atoms/Search/search.tsx#search"]={docgenInfo:search.__docgenInfo,name:"search",path:"components/atoms/Search/search.tsx#search"})}catch(__react_docgen_typescript_loader_error){}},"./components/atoms/SpinLoader/spin-loader.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$:()=>Spinner,Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),clsx__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/clsx/dist/clsx.m.js");const _excluded=["className"],_excluded2=["className"];var __jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement;const SpinLoader=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((_ref,ref)=>{let{className}=_ref,props=(0,_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__.Z)(_ref,_excluded);return __jsx("div",(0,_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_2__.Z)({ref},props,{className:"flex justify-center w-full pt-36 "}),__jsx(Spinner,{className:"mr-2 md:w-16 md:h-16"}))}));SpinLoader.displayName="SpinLoader";const __WEBPACK_DEFAULT_EXPORT__=SpinLoader,Spinner=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((_ref2,ref)=>{let{className}=_ref2,props=(0,_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__.Z)(_ref2,_excluded2);return __jsx("div",(0,_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_2__.Z)({ref},props,{role:"status"}),__jsx("svg",{"aria-hidden":"true",className:(0,clsx__WEBPACK_IMPORTED_MODULE_3__.Z)("inline w-6 h-6 text-gray-200 animate-spin fill-light-slate-8",className),viewBox:"0 0 100 101",fill:"none",xmlns:"http://www.w3.org/2000/svg"},__jsx("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"}),__jsx("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"})),__jsx("span",{className:"sr-only"},"Loading..."))}));Spinner.displayName="Spinner";try{SpinLoader.displayName="SpinLoader",SpinLoader.__docgenInfo={description:"",displayName:"SpinLoader",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/atoms/SpinLoader/spin-loader.tsx#SpinLoader"]={docgenInfo:SpinLoader.__docgenInfo,name:"SpinLoader",path:"components/atoms/SpinLoader/spin-loader.tsx#SpinLoader"})}catch(__react_docgen_typescript_loader_error){}},"./components/shared/Table.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{RM:()=>TableBody,SC:()=>TableRow,iA:()=>Table,pj:()=>TableCell,ss:()=>TableHead,xD:()=>TableHeader});var _home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),clsx__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/clsx/dist/clsx.m.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js");const _excluded=["className"],_excluded2=["className"],_excluded3=["className"],_excluded4=["className"],_excluded5=["className"],_excluded6=["className"],_excluded7=["className"],_excluded8=["className"];var __jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement;const Table=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((_ref,ref)=>{let{className}=_ref,props=(0,_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__.Z)(_ref,_excluded);return __jsx("div",{className:"relative w-full overflow-auto"},__jsx("table",(0,_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_2__.Z)({ref,className:(0,clsx__WEBPACK_IMPORTED_MODULE_3__.Z)("w-full caption-bottom text-sm",className)},props)))}));Table.displayName="Table";const TableHeader=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((_ref2,ref)=>{let{className}=_ref2,props=(0,_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__.Z)(_ref2,_excluded2);return __jsx("thead",(0,_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_2__.Z)({ref,className:(0,clsx__WEBPACK_IMPORTED_MODULE_3__.Z)("[&_tr]:border-b",className)},props))}));TableHeader.displayName="TableHeader";const TableBody=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((_ref3,ref)=>{let{className}=_ref3,props=(0,_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__.Z)(_ref3,_excluded3);return __jsx("tbody",(0,_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_2__.Z)({ref,className:(0,clsx__WEBPACK_IMPORTED_MODULE_3__.Z)("[&_tr:last-child]:border-0",className)},props))}));TableBody.displayName="TableBody";react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((_ref4,ref)=>{let{className}=_ref4,props=(0,_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__.Z)(_ref4,_excluded4);return __jsx("tfoot",(0,_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_2__.Z)({ref,className:(0,clsx__WEBPACK_IMPORTED_MODULE_3__.Z)("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",className)},props))})).displayName="TableFooter";const TableRow=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((_ref5,ref)=>{let{className}=_ref5,props=(0,_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__.Z)(_ref5,_excluded5);return __jsx("tr",(0,_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_2__.Z)({ref,className:(0,clsx__WEBPACK_IMPORTED_MODULE_3__.Z)("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",className)},props))}));TableRow.displayName="TableRow";const TableHead=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((_ref6,ref)=>{let{className}=_ref6,props=(0,_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__.Z)(_ref6,_excluded6);return __jsx("th",(0,_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_2__.Z)({ref,className:(0,clsx__WEBPACK_IMPORTED_MODULE_3__.Z)("h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",className)},props))}));TableHead.displayName="TableHead";const TableCell=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((_ref7,ref)=>{let{className}=_ref7,props=(0,_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__.Z)(_ref7,_excluded7);return __jsx("td",(0,_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_2__.Z)({ref,className:(0,clsx__WEBPACK_IMPORTED_MODULE_3__.Z)("p-4 align-middle [&:has([role=checkbox])]:pr-0",className)},props))}));TableCell.displayName="TableCell";react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(((_ref8,ref)=>{let{className}=_ref8,props=(0,_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__.Z)(_ref8,_excluded8);return __jsx("caption",(0,_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_2__.Z)({ref,className:(0,clsx__WEBPACK_IMPORTED_MODULE_3__.Z)("mt-4 text-sm text-muted-foreground",className)},props))})).displayName="TableCaption";try{Table.displayName="Table",Table.__docgenInfo={description:"",displayName:"Table",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/shared/Table.tsx#Table"]={docgenInfo:Table.__docgenInfo,name:"Table",path:"components/shared/Table.tsx#Table"})}catch(__react_docgen_typescript_loader_error){}}}]);