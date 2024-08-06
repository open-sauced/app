"use strict";(self.webpackChunk_open_sauced_app=self.webpackChunk_open_sauced_app||[]).push([[7184],{"./node_modules/@babel/runtime/helpers/esm/defineProperty.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _typeof(o){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}function toPropertyKey(t){var i=function toPrimitive(t,r){if("object"!=_typeof(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=_typeof(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==_typeof(i)?i:i+""}function _defineProperty(obj,key,value){return(key=toPropertyKey(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}__webpack_require__.d(__webpack_exports__,{Z:()=>_defineProperty})},"./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>_objectWithoutProperties});var _objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=(0,_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__.Z)(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}},"./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}__webpack_require__.d(__webpack_exports__,{Z:()=>_objectWithoutPropertiesLoose})},"./components/atoms/Typography/typography-wrapper.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _Default$parameters,_Default$parameters2,_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),_wrapper__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./components/atoms/Typography/wrapper.tsx"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement;function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){(0,_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}const __WEBPACK_DEFAULT_EXPORT__={title:"Design System/Atoms/Typography/Wrapper",component:_wrapper__WEBPACK_IMPORTED_MODULE_2__.Z,argTypes:{size:{options:["sm","base","lg","xl","2xl"],control:{type:"select"}}}},TypographyTemplate=args=>__jsx(_wrapper__WEBPACK_IMPORTED_MODULE_2__.Z,args,__jsx("p",{className:"lead"},"Until now, trying to style an article, document, or blog post in OpenSauced Insights has been a tedious task that required a keen eye for typography and a lot of complex custom CSS."),__jsx("p",null,"By default, OpenSauced Insights removes all of the default browser styling from paragraphs, headings, lists and more. This ends up being really useful for building application UIs because you spend less time undoing user-agent styles, but when you ",__jsx("em",null,"really are")," just trying to style some content that came from a rich-text editor in a CMS or a markdown file, it can be surprising and unintuitive."),__jsx("p",null,"We get lots of complaints about it actually, with people regularly asking us things like:"),__jsx("blockquote",null,__jsx("p",null,"Why is OpenSauced Insights removing the default styles on my ",__jsx("code",null,"h1")," elements? How do I disable this? What do you mean I lose all the other base styles too?")),__jsx("p",null,"We hear you, but we're not convinced that simply disabling our base styles is what you really want. You don't want to have to remove annoying margins every time you use a ",__jsx("code",null,"p")," element in a piece of your dashboard UI. And I doubt you really want your blog posts to use the user-agent styles either — you want them to look ",__jsx("em",null,"awesome"),", not awful."),__jsx("p",null,"The ",__jsx("code",null,"@tailwindcss/typography")," plugin is our attempt to give you what you ",__jsx("em",null,"actually")," want, without any of the downsides of doing something stupid like disabling our base styles."),__jsx("p",null,"It adds a new ",__jsx("code",null,"prose")," class that you can slap on any block of vanilla HTML content and turn it into a beautiful, well-formatted document:"),__jsx("pre",null,__jsx("code",{className:"language-html"},'<article class="prose"> <h1>Garlic bread with cheese: What the science tells us</h1> <p> For years parents have espoused the health benefits of eating garlic bread with cheese to their children, with the food earning such an iconic status in our culture that kids will often dress up as warm, cheesy loaf for Halloween. </p> <p> But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases springing up around the country. </p> \x3c!-- ... --\x3e </article>')),__jsx("p",null,"Hopefully that looks good enough to you."),__jsx("h3",null,"What about nested lists?"),__jsx("p",null,"Nested lists basically always look bad which is why editors like Medium don't even let you do it, but I guess since some of you goofballs are going to do it we have to carry the burden of at least making it work."),__jsx("ol",null,__jsx("li",null,__jsx("strong",null,"Nested lists are rarely a good idea."),__jsx("ul",null,__jsx("li",null,'You might feel like you are being really "organized" or something but you are just creating a gross shape on the screen that is hard to read.'),__jsx("li",null,"Nested navigation in UIs is a bad idea too, keep things as flat as possible."),__jsx("li",null,"Nesting tons of folders in your source code is also not helpful."))),__jsx("li",null,__jsx("strong",null,"Since we need to have more items, here's another one."),__jsx("ul",null,__jsx("li",null,"I'm not sure if we'll bother styling more than two levels deep."),__jsx("li",null,"Two is already too much, three is guaranteed to be a bad idea."),__jsx("li",null,"If you nest four levels deep you belong in prison."))),__jsx("li",null,__jsx("strong",null,"Two items isn't really a list, three is good though."),__jsx("ul",null,__jsx("li",null,"Again please don't nest lists if you want people to actually read your content."),__jsx("li",null,"Nobody wants to look at this."),__jsx("li",null,"I'm upset that we even have to bother styling this.")))),__jsx("p",null,"The most annoying thing about lists in Markdown is that ",__jsx("code",null,"<li>")," elements aren't given a child"," ",__jsx("code",null,"<p>")," tag unless there are multiple paragraphs in the list item. That means I have to worry about styling that annoying situation too."),__jsx("ul",null,__jsx("li",null,__jsx("p",null,__jsx("strong",null,"For example, here's another nested list.")),__jsx("p",null,"But this time with a second paragraph."),__jsx("ul",null,__jsx("li",null,"These list items won't have ",__jsx("code",null,"<p>")," tags"),__jsx("li",null,"Because they are only one line each"))),__jsx("li",null,__jsx("p",null,__jsx("strong",null,"But in this second top-level list item, they will.")),__jsx("p",null,"This is especially annoying because of the spacing on this paragraph."),__jsx("ul",null,__jsx("li",null,__jsx("p",null,"As you can see here, because I've added a second line, this list item now has a"," ",__jsx("code",null,"<p>")," tag."),__jsx("p",null,"This is the second line I'm talking about by the way.")),__jsx("li",null,__jsx("p",null,"Finally here's another list item so it's more like a list.")))),__jsx("li",null,__jsx("p",null,"A closing list item, but with no nested list, because why not?"))),__jsx("p",null,"And finally a sentence to close off this section."),__jsx("h2",null,"There are other elements we need to style"),__jsx("p",null,"I almost forgot to mention links, like"," ",__jsx("a",{href:"https://app.opensauced.pizza"},"this link to the OpenSauced Insights website"),". We almost made them blue but that's so yesterday, so we went with dark gray, feels edgier."),__jsx("p",null,"We even included table styles, check it out:"),__jsx("table",null,__jsx("thead",null,__jsx("tr",null,__jsx("th",null,"Wrestler"),__jsx("th",null,"Origin"),__jsx("th",null,"Finisher"))),__jsx("tbody",null,__jsx("tr",null,__jsx("td",null,'Bret "The Hitman" Hart'),__jsx("td",null,"Calgary, AB"),__jsx("td",null,"Sharpshooter")),__jsx("tr",null,__jsx("td",null,"Stone Cold Steve Austin"),__jsx("td",null,"Austin, TX"),__jsx("td",null,"Stone Cold Stunner")),__jsx("tr",null,__jsx("td",null,"Randy Savage"),__jsx("td",null,"Sarasota, FL"),__jsx("td",null,"Elbow Drop")),__jsx("tr",null,__jsx("td",null,"Vader"),__jsx("td",null,"Boulder, CO"),__jsx("td",null,"Vader Bomb")),__jsx("tr",null,__jsx("td",null,"Razor Ramon"),__jsx("td",null,"Chuluota, FL"),__jsx("td",null,"Razor's Edge")))),__jsx("p",null,"We also need to make sure inline code looks good, like if I wanted to talk about ",__jsx("code",null,"<span>")," ","elements or tell you the good news about ",__jsx("code",null,"@tailwindcss/typography"),"."),__jsx("h3",null,"Sometimes I even use ",__jsx("code",null,"code")," in headings"),__jsx("p",null,"Even though it's probably a bad idea, and historically I've had a hard time making it look good. This"," ",__jsx("em",null,'"wrap the code blocks in backticks"')," trick works pretty well though really."),__jsx("p",null,"Another thing I've done in the past is put a ",__jsx("code",null,"code")," tag inside of a link, like if I wanted to tell you about the"," ",__jsx("a",{href:"https://github.com/tailwindcss/docs"},__jsx("code",null,"tailwindcss/docs"))," ","repository. I don't love that there is an underline below the backticks but it is absolutely not worth the madness it would require to avoid it."),__jsx("h4",null,"We haven't used an ",__jsx("code",null,"h4")," yet"),__jsx("p",null,"But now we have. Please don't use ",__jsx("code",null,"h5")," or ",__jsx("code",null,"h6")," in your content, Medium only supports two heading levels for a reason, you animals. I honestly considered using a ",__jsx("code",null,"before")," pseudo-element to scream at you if you use an ",__jsx("code",null,"h5")," or ",__jsx("code",null,"h6"),"."),__jsx("p",null,"We don't style them at all out of the box because ",__jsx("code",null,"h4")," elements are already so small that they are the same size as the body copy. What are we supposed to do with an ",__jsx("code",null,"h5"),", make it ",__jsx("em",null,"smaller")," than the body copy? No thanks."),__jsx("h3",null,"We still need to think about stacked headings though."),__jsx("h4",null,"Let's make sure we don't screw that up with ",__jsx("code",null,"h4")," elements, either."),__jsx("p",null,"Phew, with any luck we have styled the headings above this text and they look pretty good."),__jsx("p",null,"Let's add a closing paragraph here so things end with a decently sized block of text. I can't explain why I want things to end that way but I have to assume it's because I think things will look weird or unbalanced if there is a heading too close to the end of the document."),__jsx("p",null,"What I've written here is probably long enough, but adding this final sentence can't hurt."));TypographyTemplate.displayName="TypographyTemplate";const Default=TypographyTemplate.bind({});Default.args={size:"sm"},Default.parameters=_objectSpread(_objectSpread({},Default.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Default$parameters=Default.parameters)||void 0===_Default$parameters?void 0:_Default$parameters.docs),{},{source:_objectSpread({originalSource:'args => <TypographyWrapper {...args}>\n    <p className="lead">\n      Until now, trying to style an article, document, or blog post in OpenSauced Insights has been a tedious task that\n      required a keen eye for typography and a lot of complex custom CSS.\n    </p>\n    <p>\n      By default, OpenSauced Insights removes all of the default browser styling from paragraphs, headings, lists and\n      more. This ends up being really useful for building application UIs because you spend less time undoing user-agent\n      styles, but when you <em>really are</em> just trying to style some content that came from a rich-text editor in a\n      CMS or a markdown file, it can be surprising and unintuitive.\n    </p>\n    <p>We get lots of complaints about it actually, with people regularly asking us things like:</p>\n    <blockquote>\n      <p>\n        Why is OpenSauced Insights removing the default styles on my <code>h1</code> elements? How do I disable this?\n        What do you mean I lose all the other base styles too?\n      </p>\n    </blockquote>\n    <p>\n      We hear you, but we&apos;re not convinced that simply disabling our base styles is what you really want. You\n      don&apos;t want to have to remove annoying margins every time you use a <code>p</code> element in a piece of your\n      dashboard UI. And I doubt you really want your blog posts to use the user-agent styles either — you want them to\n      look <em>awesome</em>, not awful.\n    </p>\n    <p>\n      The <code>@tailwindcss/typography</code> plugin is our attempt to give you what you <em>actually</em> want,\n      without any of the downsides of doing something stupid like disabling our base styles.\n    </p>\n    <p>\n      It adds a new <code>prose</code> class that you can slap on any block of vanilla HTML content and turn it into a\n      beautiful, well-formatted document:\n    </p>\n    <pre>\n      <code className="language-html">\n        &lt;article class=&quot;prose&quot;&gt; &lt;h1&gt;Garlic bread with cheese: What the science tells us&lt;/h1&gt;\n        &lt;p&gt; For years parents have espoused the health benefits of eating garlic bread with cheese to their\n        children, with the food earning such an iconic status in our culture that kids will often dress up as warm,\n        cheesy loaf for Halloween. &lt;/p&gt; &lt;p&gt; But a recent study shows that the celebrated appetizer may be\n        linked to a series of rabies cases springing up around the country. &lt;/p&gt; &lt;!-- ... --&gt;\n        &lt;/article&gt;\n      </code>\n    </pre>\n    <p>Hopefully that looks good enough to you.</p>\n    <h3>What about nested lists?</h3>\n    <p>\n      Nested lists basically always look bad which is why editors like Medium don&apos;t even let you do it, but I guess\n      since some of you goofballs are going to do it we have to carry the burden of at least making it work.\n    </p>\n    <ol>\n      <li>\n        <strong>Nested lists are rarely a good idea.</strong>\n        <ul>\n          <li>\n            You might feel like you are being really &quot;organized&quot; or something but you are just creating a\n            gross shape on the screen that is hard to read.\n          </li>\n          <li>Nested navigation in UIs is a bad idea too, keep things as flat as possible.</li>\n          <li>Nesting tons of folders in your source code is also not helpful.</li>\n        </ul>\n      </li>\n      <li>\n        <strong>Since we need to have more items, here&apos;s another one.</strong>\n        <ul>\n          <li>I&apos;m not sure if we&apos;ll bother styling more than two levels deep.</li>\n          <li>Two is already too much, three is guaranteed to be a bad idea.</li>\n          <li>If you nest four levels deep you belong in prison.</li>\n        </ul>\n      </li>\n      <li>\n        <strong>Two items isn&apos;t really a list, three is good though.</strong>\n        <ul>\n          <li>Again please don&apos;t nest lists if you want people to actually read your content.</li>\n          <li>Nobody wants to look at this.</li>\n          <li>I&apos;m upset that we even have to bother styling this.</li>\n        </ul>\n      </li>\n    </ol>\n    <p>\n      The most annoying thing about lists in Markdown is that <code>&lt;li&gt;</code> elements aren&apos;t given a child{" "}\n      <code>&lt;p&gt;</code> tag unless there are multiple paragraphs in the list item. That means I have to worry about\n      styling that annoying situation too.\n    </p>\n    <ul>\n      <li>\n        <p>\n          <strong>For example, here&apos;s another nested list.</strong>\n        </p>\n        <p>But this time with a second paragraph.</p>\n        <ul>\n          <li>\n            These list items won&apos;t have <code>&lt;p&gt;</code> tags\n          </li>\n          <li>Because they are only one line each</li>\n        </ul>\n      </li>\n      <li>\n        <p>\n          <strong>But in this second top-level list item, they will.</strong>\n        </p>\n        <p>This is especially annoying because of the spacing on this paragraph.</p>\n        <ul>\n          <li>\n            <p>\n              As you can see here, because I&apos;ve added a second line, this list item now has a{" "}\n              <code>&lt;p&gt;</code> tag.\n            </p>\n            <p>This is the second line I&apos;m talking about by the way.</p>\n          </li>\n          <li>\n            <p>Finally here&apos;s another list item so it&apos;s more like a list.</p>\n          </li>\n        </ul>\n      </li>\n      <li>\n        <p>A closing list item, but with no nested list, because why not?</p>\n      </li>\n    </ul>\n    <p>And finally a sentence to close off this section.</p>\n    <h2>There are other elements we need to style</h2>\n    <p>\n      I almost forgot to mention links, like{" "}\n      <a href="https://app.opensauced.pizza">this link to the OpenSauced Insights website</a>. We almost made them blue\n      but that&apos;s so yesterday, so we went with dark gray, feels edgier.\n    </p>\n    <p>We even included table styles, check it out:</p>\n    <table>\n      <thead>\n        <tr>\n          <th>Wrestler</th>\n          <th>Origin</th>\n          <th>Finisher</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n          <td>Bret &quot;The Hitman&quot; Hart</td>\n          <td>Calgary, AB</td>\n          <td>Sharpshooter</td>\n        </tr>\n        <tr>\n          <td>Stone Cold Steve Austin</td>\n          <td>Austin, TX</td>\n          <td>Stone Cold Stunner</td>\n        </tr>\n        <tr>\n          <td>Randy Savage</td>\n          <td>Sarasota, FL</td>\n          <td>Elbow Drop</td>\n        </tr>\n        <tr>\n          <td>Vader</td>\n          <td>Boulder, CO</td>\n          <td>Vader Bomb</td>\n        </tr>\n        <tr>\n          <td>Razor Ramon</td>\n          <td>Chuluota, FL</td>\n          <td>Razor&apos;s Edge</td>\n        </tr>\n      </tbody>\n    </table>\n    <p>\n      We also need to make sure inline code looks good, like if I wanted to talk about <code>&lt;span&gt;</code>{" "}\n      elements or tell you the good news about <code>@tailwindcss/typography</code>.\n    </p>\n    <h3>\n      Sometimes I even use <code>code</code> in headings\n    </h3>\n    <p>\n      Even though it&apos;s probably a bad idea, and historically I&apos;ve had a hard time making it look good. This{" "}\n      <em>&quot;wrap the code blocks in backticks&quot;</em> trick works pretty well though really.\n    </p>\n    <p>\n      Another thing I&apos;ve done in the past is put a <code>code</code> tag inside of a link, like if I wanted to tell\n      you about the{" "}\n      <a href="https://github.com/tailwindcss/docs">\n        <code>tailwindcss/docs</code>\n      </a>{" "}\n      repository. I don&apos;t love that there is an underline below the backticks but it is absolutely not worth the\n      madness it would require to avoid it.\n    </p>\n    <h4>\n      We haven&apos;t used an <code>h4</code> yet\n    </h4>\n    <p>\n      But now we have. Please don&apos;t use <code>h5</code> or <code>h6</code> in your content, Medium only supports\n      two heading levels for a reason, you animals. I honestly considered using a <code>before</code> pseudo-element to\n      scream at you if you use an <code>h5</code> or <code>h6</code>.\n    </p>\n    <p>\n      We don&apos;t style them at all out of the box because <code>h4</code> elements are already so small that they are\n      the same size as the body copy. What are we supposed to do with an <code>h5</code>, make it <em>smaller</em> than\n      the body copy? No thanks.\n    </p>\n    <h3>We still need to think about stacked headings though.</h3>\n    <h4>\n      Let&apos;s make sure we don&apos;t screw that up with <code>h4</code> elements, either.\n    </h4>\n    <p>Phew, with any luck we have styled the headings above this text and they look pretty good.</p>\n    <p>\n      Let&apos;s add a closing paragraph here so things end with a decently sized block of text. I can&apos;t explain\n      why I want things to end that way but I have to assume it&apos;s because I think things will look weird or\n      unbalanced if there is a heading too close to the end of the document.\n    </p>\n    <p>What I&apos;ve written here is probably long enough, but adding this final sentence can&apos;t hurt.</p>\n  </TypographyWrapper>'},null===(_Default$parameters2=Default.parameters)||void 0===_Default$parameters2||null===(_Default$parameters2=_Default$parameters2.docs)||void 0===_Default$parameters2?void 0:_Default$parameters2.source)})});const __namedExportsOrder=["Default"]},"./components/atoms/Typography/wrapper.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),clsx__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/clsx/dist/clsx.m.js");const _excluded=["children","className","size"];var __jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement;const TypographyWrapper=_ref=>{let{children,className,size="sm"}=_ref,props=(0,_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties_js__WEBPACK_IMPORTED_MODULE_1__.Z)(_ref,_excluded);return __jsx("span",(0,_home_runner_work_app_app_node_modules_babel_runtime_helpers_esm_extends_js__WEBPACK_IMPORTED_MODULE_2__.Z)({className:(0,clsx__WEBPACK_IMPORTED_MODULE_3__.Z)("prose","prose-".concat(size),className)},props),children)};TypographyWrapper.displayName="TypographyWrapper";const __WEBPACK_DEFAULT_EXPORT__=TypographyWrapper;try{wrapper.displayName="wrapper",wrapper.__docgenInfo={description:"",displayName:"wrapper",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},size:{defaultValue:{value:"sm"},description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"base"'},{value:'"sm"'},{value:'"lg"'},{value:'"xl"'},{value:'"2xl"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["components/atoms/Typography/wrapper.tsx#wrapper"]={docgenInfo:wrapper.__docgenInfo,name:"wrapper",path:"components/atoms/Typography/wrapper.tsx#wrapper"})}catch(__react_docgen_typescript_loader_error){}},"./node_modules/clsx/dist/clsx.m.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);else for(t in e)e[t]&&(n&&(n+=" "),n+=t);return n}function clsx(){for(var e,t,f=0,n="";f<arguments.length;)(e=arguments[f++])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}__webpack_require__.d(__webpack_exports__,{W:()=>clsx,Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=clsx}}]);