webpackJsonp([1],{"6R1r":function(t,e){},"7gsK":function(t,e){},"9auy":function(t,e){},"9n10":function(t,e){},EIAv:function(t,e){},KI0M:function(t,e){},Lkcm:function(t,e){},M6Sr:function(t,e){},N4gd:function(t,e){},NHnr:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("7+uW"),n={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("keep-alive",{attrs:{exclude:"DetailPage"}},[e("router-view")],1)],1)},staticRenderFns:[]};var a=i("VU/8")({name:"App"},n,!1,function(t){i("vIei")},null,null).exports,r=i("/ocq"),o=i("Dd8w"),c=i.n(o),l=i("NYxO"),d={name:"HomeHeader",data:function(){return{}},computed:c()({},Object(l.c)(["city"]),Object(l.c)({city2:"city"}))},u={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"header"},[t._m(0),t._v(" "),t._m(1),t._v(" "),i("router-link",{attrs:{to:"/city"}},[i("div",{staticClass:"header-right"},[t._v(t._s(t.city)),i("span",{staticClass:"iconfont arrow-icon"},[t._v("")])])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"header-left"},[e("div",{staticClass:"iconfont back-icon"},[this._v("")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"header-input"},[e("span",{staticClass:"iconfont"},[this._v("")]),this._v("输入城市/景点/游玩主题")])}]};var h=i("VU/8")(d,u,!1,function(t){i("Lkcm")},"data-v-21b417b0",null).exports,v={name:"HomeSwiper",props:{list:Array},data:function(){return{swiperOption:{loop:!0,autoplay:{delay:3e3,disableOnInteraction:!1},pagination:{el:".swiper-pagination",clickable:!0}}}},computed:{showSwiper:function(){return this.list.length}}},m={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"wrapper"},[this.showSwiper?e("swiper",{ref:"mySwiper",attrs:{options:this.swiperOption}},[this._l(this.list,function(t){return e("swiper-slide",{key:t.id},[e("img",{staticClass:"swiper-img",attrs:{src:t.imgUrl,alt:""}})])}),this._v(" "),e("div",{staticClass:"swiper-pagination",attrs:{slot:"pagination"},slot:"pagination"})],2):this._e()],1)},staticRenderFns:[]};var f=i("VU/8")(v,m,!1,function(t){i("l0d9")},"data-v-1d89e20c",null).exports,p={name:"HomeIcons",props:{list:Array},data:function(){return{swiperOption2:{pagination:{el:".swiper-pagination",clickable:!0}}}},computed:{pages:function(){var t=[];return this.list.forEach(function(e,i){var s=Math.floor(i/8);t[s]||(t[s]=[]),t[s].push(e)}),t}}},_={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"icons"},[i("swiper",{ref:"mySwiper",attrs:{options:t.swiperOption2}},[t._l(t.pages,function(e,s){return i("swiper-slide",{key:s},t._l(e,function(e){return i("div",{key:e.id,staticClass:"icon"},[i("div",{staticClass:"icon-img"},[i("img",{staticClass:"icon-img-content",attrs:{src:e.imgUrl,alt:""}})]),t._v(" "),i("p",{staticClass:"icon-desc"},[t._v(t._s(e.desc))])])}))}),t._v(" "),i("div",{staticClass:"swiper-pagination",attrs:{slot:"pagination"},slot:"pagination"})],2)],1)},staticRenderFns:[]};var g=i("VU/8")(p,_,!1,function(t){i("iyWX")},"data-v-f2fb0d58",null).exports,y={name:"HomeRecommend",props:{list:Array}},C={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"recommend"},[i("div",{staticClass:"title"},[t._v("热销推荐")]),t._v(" "),i("ul",t._l(t.list,function(e){return i("router-link",{key:e.id,staticClass:"item border-bottom",attrs:{tag:"li",to:"/detail/"+e.id}},[i("img",{staticClass:"item-img",attrs:{src:e.imgUrl,alt:""}}),t._v(" "),i("div",{staticClass:"item-info"},[i("p",{staticClass:"info-title"},[t._v(t._s(e.title))]),t._v(" "),i("p",{staticClass:"info-desc"},[t._v(t._s(e.desc))]),t._v(" "),i("button",[t._v("查看详情")])])])}))])},staticRenderFns:[]};var w=i("VU/8")(y,C,!1,function(t){i("jVfv")},"data-v-5b439d1b",null).exports,b={name:"HomeWeekend",props:{list:Array}},k={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"recommend"},[i("div",{staticClass:"title"},[t._v("周末去哪儿")]),t._v(" "),i("ul",t._l(t.list,function(e){return i("li",{key:e.id,staticClass:"item border-bottom"},[i("img",{staticClass:"item-img",attrs:{src:e.imgUrl,alt:""}}),t._v(" "),i("div",{staticClass:"item-info"},[i("p",{staticClass:"info-title"},[t._v(t._s(e.title))]),t._v(" "),i("p",{staticClass:"info-desc"},[t._v(t._s(e.desc))])])])}))])},staticRenderFns:[]};var S=i("VU/8")(b,k,!1,function(t){i("KI0M")},"data-v-3b113487",null).exports,x=i("mtWM"),L=i.n(x),H={name:"Home",components:{HomeHeader:h,HomeSwiper:f,HomeIcons:g,HomeRecommend:w,HomeWeekend:S},data:function(){return{lastCity:"",swiperList:[],iconList:[],recommendList:[],weekendList:[]}},mounted:function(){console.log("mounted"),this.getHomeInfo(),this.lastCity=this.city},activated:function(){console.log("activated"),this.lastCity!==this.city&&(this.getHomeInfo(),this.lastCity=this.city)},computed:c()({},Object(l.c)(["city"])),methods:{getHomeInfo:function(){var t=this;L.a.get("static/mock/index.json?city="+this.city).then(function(e){200===e.status&&t.getHomeInfoSucc(e.data)})},getHomeInfoSucc:function(t){console.log(t);var e=t.data;this.swiperList=e.swiperList,this.iconList=e.iconList,this.recommendList=e.recommendList,this.weekendList=e.weekendList}}},$={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("home-header",{attrs:{city:t.city}}),t._v(" "),i("home-swiper",{attrs:{list:t.swiperList}}),t._v(" "),i("HomeIcons",{attrs:{list:t.iconList}}),t._v(" "),i("HomeRecommend",{attrs:{list:t.recommendList}}),t._v(" "),i("HomeWeekend",{attrs:{list:t.weekendList}})],1)},staticRenderFns:[]};var E=i("VU/8")(H,$,!1,function(t){i("tgjV")},"data-v-62af9038",null).exports,I={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"header"},[e("router-link",{attrs:{to:"/"}},[e("span",{staticClass:"iconfont header-back"},[this._v("")])]),this._v("\n  城市选择\n")],1)},staticRenderFns:[]};var A=i("VU/8")({name:"CityHeader"},I,!1,function(t){i("YQh8")},"data-v-3e56d752",null).exports,R=i("GQaK"),F={name:"CitySearch",props:{cities:Object},data:function(){return{keyWords:"",contentList:[],timer:null,noData:!1}},methods:{chooseCity:function(t){this.$store.commit("changeCity",t),this.keyWords="",this.$router.push("/")}},mounted:function(){this.scroll=new R.a(this.$refs.search,{click:!0})},computed:{hasNoData:function(){return!this.contentList.length&&this.keyWords}},watch:{keyWords:function(){var t=this;this.keyWords?(this.timer&&clearTimeout(this.timer),this.timer=setTimeout(function(){var e=[];for(var i in t.cities)t.cities[i].forEach(function(i){(i.name.indexOf(t.keyWords)>-1||i.spell.indexOf(t.keyWords)>-1)&&e.push(i)});t.contentList=e,console.log(t.contentList)},100)):this.contentList=[]}}},U={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"search"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.keyWords,expression:"keyWords"}],attrs:{type:"text",placeholder:"请输入城市名或拼音"},domProps:{value:t.keyWords},on:{input:function(e){e.target.composing||(t.keyWords=e.target.value)}}})]),t._v(" "),i("div",{ref:"search",staticClass:"search-content"},[i("ul",[t._l(t.contentList,function(e){return i("li",{key:e.id,staticClass:"item border-bottom",on:{click:function(i){t.chooseCity(e.name)}}},[t._v(t._s(e.name))])}),t._v(" "),i("li",{directives:[{name:"show",rawName:"v-show",value:t.hasNoData,expression:"hasNoData"}],staticClass:"item no-data"},[t._v("没有匹配到城市！")])],2)])])},staticRenderFns:[]};var V=i("VU/8")(F,U,!1,function(t){i("tKM5")},"data-v-2e70a364",null).exports,O={name:"CityList",props:{cities:Object,host:Array,letter:String},methods:c()({chooseCity:function(t){this.changeCity(t),this.$router.push("/")}},Object(l.b)(["changeCity"]),Object(l.b)({changeCity2:"changeCity"})),mounted:function(){this.scroll=new R.a(this.$refs.wrapper,{click:!0})},activated:function(){var t=this.$refs.wrapper;this.scroll.scrollToElement(t)},computed:{},watch:{letter:function(){if(this.letter){var t=this.$refs[this.letter][0];this.scroll.scrollToElement(t)}}}},D={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{ref:"wrapper",staticClass:"list"},[i("div",[i("div",{staticClass:"area"},[i("div",{staticClass:"title border-topbottom"},[t._v("当前城市")]),t._v(" "),i("div",{staticClass:"button-list"},[i("div",{staticClass:"button-wrapper"},[i("div",{staticClass:"button"},[t._v(t._s(t.$store.state.city))])])])]),t._v(" "),i("div",{staticClass:"area"},[i("div",{staticClass:"title border-topbottom"},[t._v("热门城市")]),t._v(" "),i("div",{staticClass:"button-list"},t._l(t.host,function(e){return i("div",{key:e.id,staticClass:"button-wrapper"},[i("div",{staticClass:"button",on:{click:function(i){t.chooseCity(e.name)}}},[t._v(t._s(e.name))])])}))]),t._v(" "),t._l(t.cities,function(e,s){return i("div",{key:s,ref:s,refInFor:!0,staticClass:"area"},[i("div",{staticClass:"title border-topbottom"},[t._v(t._s(s))]),t._v(" "),i("div",{staticClass:"item-list"},t._l(e,function(e){return i("div",{key:e.id,staticClass:"item border-bottom",on:{click:function(i){t.chooseCity(e.name)}}},[t._v(t._s(e.name))])}))])})],2)])},staticRenderFns:[]};var T=i("VU/8")(O,D,!1,function(t){i("aTh1")},"data-v-850bbcce",null).exports,M=this,j={name:"CityAlphabet",props:{cities:Object},data:function(){return{moveStatus:!1,letterTop:0,letterHeight:0,timer:null}},methods:{handleLetter:function(t){var e=t.target.innerHTML;console.log(e),this.$emit("change",e)},touchMoveStart:function(t){console.log("touchMoveStart",t),this.moveStatus=!0},touchMove:function(t){var e=this;this.moveStatus&&(this.timer&&clearTimeout(this.timer),this.timer=setTimeout(function(){var i=t.touches[0].clientY-e.letterTop-79,s=Math.floor(i/e.letterHeight);console.log(s),s>=0&&s<e.letters.length&&e.$emit("change",e.letters[s])},16))},touchMoveEnd:function(t){console.log("touchMoveEnd",t),M.moveStatus=!1}},mounted:function(){},updated:function(){for(var t in this.cities)console.log(t);console.log(this.$refs.A[0].offsetTop),this.letterTop=this.$refs.A[0].offsetTop,this.letterHeight=this.$refs.A[0].clientHeight},computed:{letters:function(){var t=[];for(var e in this.cities)t.push(e);return t}}},W={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"alphabet"},[i("ul",{staticClass:"list"},t._l(t.letters,function(e){return i("li",{key:e,ref:e,refInFor:!0,staticClass:"item",on:{touchstart:function(e){return e.preventDefault(),t.touchMoveStart(e)},touchmove:t.touchMove,touchend:t.touchMoveEnd,click:t.handleLetter}},[t._v(t._s(e))])}))])},staticRenderFns:[]};var B={name:"CityPage",components:{CityHeader:A,CitySearch:V,CityList:T,CityAlphabet:i("VU/8")(j,W,!1,function(t){i("EIAv")},"data-v-53acbab5",null).exports},data:function(){return{cities:{},hostCities:[],letter:""}},mounted:function(){this.getCityInfo()},methods:{getCityInfo:function(){var t=this;L.a.get("static/mock/city.json").then(function(e){if(200===e.status){var i=e.data;t.getCityInfoSucc(i)}})},getCityInfoSucc:function(t){var e=t.data;this.cities=e.cities,this.hostCities=e.hotCities},changeLetter:function(t){this.letter=t}}},N={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("city-header"),t._v(" "),i("city-search",{attrs:{cities:t.cities}}),t._v(" "),i("city-list",{attrs:{cities:t.cities,host:t.hostCities,letter:t.letter}}),t._v(" "),i("city-alphabet",{attrs:{cities:t.cities},on:{change:t.changeLetter}})],1)},staticRenderFns:[]};var G=i("VU/8")(B,N,!1,function(t){i("9auy")},"data-v-7b444de1",null).exports,z={name:"GallaryBanner",props:{imgs:{type:Array,default:function(){return[]}}},data:function(){return{swiperOption:{pagination:{el:".swiper-pagination",type:"fraction"},observer:!0,observeParents:!0}}},methods:{handleGallaryClick:function(){this.$emit("close")}}},P={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"container",on:{click:this.handleGallaryClick}},[e("div",{staticClass:"wrapper"},[e("swiper",{ref:"mySwiper",attrs:{options:this.swiperOption}},[this._l(this.imgs,function(t,i){return e("swiper-slide",{key:i},[e("img",{staticClass:"gallary-img",attrs:{src:t,alt:""}})])}),this._v(" "),e("div",{staticClass:"swiper-pagination",attrs:{slot:"pagination"},slot:"pagination"})],2)],1)])},staticRenderFns:[]};var K={render:function(){var t=this.$createElement;return(this._self._c||t)("transition",{attrs:{name:"fade"}},[this._t("default")],2)},staticRenderFns:[]};var Y={name:"DetailBanner",components:{GallaryBanner:i("VU/8")(z,P,!1,function(t){i("N4gd")},"data-v-766e464c",null).exports,FadeAnimation:i("VU/8")({name:"FadeAnimation"},K,!1,function(t){i("x8SO")},"data-v-53ad1921",null).exports},data:function(){return{showGallary:!1,imgs:["http://img1.qunarzz.com/sight/p0/1807/ad/ad574bfe6c9e1ceda3.img.png_r_800x800_246d40af.png","http://img1.qunarzz.com/sight/p0/1712/5d/5d4f18e64813d0f6a3.img.jpg_r_800x800_41a80401.jpg"]}},methods:{handleBannerClick:function(){this.showGallary=!0},handleGallaryClick:function(){this.showGallary=!1}}},q={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("div",{staticClass:"banner",on:{click:this.handleBannerClick}},[e("img",{staticClass:"banner-img",attrs:{src:"//img1.qunarzz.com/sight/p0/1807/ad/ad574bfe6c9e1ceda3.img.png_600x330_0046c90a.png",alt:""}}),this._v(" "),this._m(0)]),this._v(" "),e("fade-animation",[e("gallary-banner",{directives:[{name:"show",rawName:"v-show",value:this.showGallary,expression:"showGallary"}],attrs:{imgs:this.imgs},on:{close:this.handleGallaryClick}})],1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"banner-info"},[e("div",{staticClass:"banner-title"},[this._v("成都欢乐谷(AAAA景区)")]),this._v(" "),e("div",{staticClass:"banner-number"},[e("span",{staticClass:"iconfont banner-icon"},[this._v("")]),this._v("39")])])}]};var Q=i("VU/8")(Y,q,!1,function(t){i("x05H")},"data-v-2e61321c",null).exports,X={name:"DetailHeader",data:function(){return{showCircleBack:!0,headerStyle:{opacity:0}}},mounted:function(){window.addEventListener("scroll",this.handleScroll)},destroyed:function(){console.log("DetailHeader destroyed"),window.removeEventListener("scroll",this.handleScroll)},activated:function(){console.log("activated"),window.addEventListener("scroll",this.handleScroll)},deactivated:function(){console.log("deactivated"),window.removeEventListener("scroll",this.handleScroll)},methods:{handleScroll:function(){var t=document.documentElement.scrollTop||document.body.scrollTop;if(console.log(this.headerStyle.opacity),t>60){var e=t/160;e=e>1?1:e,this.headerStyle.opacity=e,this.showCircleBack=!1}else this.showCircleBack=!0}}},J={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("div",{directives:[{name:"show",rawName:"v-show",value:this.showCircleBack,expression:"showCircleBack"}],staticClass:"header-circle-back"},[e("router-link",{staticClass:"iconfont back-icon",attrs:{tag:"div",to:"/"}},[this._v("")])],1),this._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:!this.showCircleBack,expression:"!showCircleBack"}],staticClass:"header-fixed",style:this.headerStyle},[e("router-link",{attrs:{to:"/"}},[e("span",{staticClass:"iconfont header-back"},[this._v("")])]),this._v("\n    景点详情\n  ")],1)])},staticRenderFns:[]};var Z=i("VU/8")(X,J,!1,function(t){i("7gsK")},"data-v-1beff1b4",null).exports,tt={name:"DetailList",props:{list:Array},data:function(){return{}}},et={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",t._l(t.list,function(e,s){return i("div",{key:s,staticClass:"item border-bottom"},[i("div",{staticClass:"item-title"},[i("span",{staticClass:"item-title-icon"}),t._v(t._s(e.title))]),t._v(" "),e.children?i("div",{staticClass:"item-children"},[i("detail-list",{attrs:{list:e.children}})],1):t._e()])}))},staticRenderFns:[]};var it={name:"DetailPage",components:{DetailBanner:Q,DetailHeader:Z,DetailList:i("VU/8")(tt,et,!1,function(t){i("6R1r")},"data-v-819249f6",null).exports},data:function(){return{list:[{title:"成人票",children:[{title:"日场票"},{title:"夜场票"}]},{title:"学生票"},{title:"儿童票"}]}},mounted:function(){this.getDetailInfo()},methods:{getDetailInfo:function(){var t=this;L.a.get("static/mock/detail.json",{params:{id:this.$route.params.id}}).then(function(e){200===e.status&&t.getDetailInfoSucc(e.data)})},getDetailInfoSucc:function(t){console.log(t)}}},st={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"detail"},[e("detail-header"),this._v(" "),e("detail-banner"),this._v(" "),e("detail-list",{attrs:{list:this.list}})],1)},staticRenderFns:[]};var nt=i("VU/8")(it,st,!1,function(t){i("Y9rP")},"data-v-249750dd",null).exports;s.a.use(r.a);var at=new r.a({routes:[{path:"/",name:"Home",component:E},{path:"/city",name:"City",component:G},{path:"/detail/:id",name:"Detail",component:nt}],scrollBehavior:function(t,e,i){return{x:0,y:0}}}),rt=i("v5o6"),ot=i.n(rt),ct=i("7QTg"),lt=i.n(ct),dt="上海";try{dt=localStorage.city||dt}catch(t){}var ut={city:dt},ht={changeCity:function(t,e){t.city=e;try{localStorage.city=e}catch(t){}}};s.a.use(l.a);var vt=new l.a.Store({state:ut,actions:{changeCity:function(t,e){t.commit("changeCity",e)}},mutations:ht});i("9n10"),i("M6Sr"),i("TzC8"),i("v2ns");ot.a.attach(document.body),s.a.use(lt.a),s.a.config.productionTip=!1,new s.a({el:"#app",router:at,store:vt,components:{App:a},template:"<App/>"})},TzC8:function(t,e){},Y9rP:function(t,e){},YQh8:function(t,e){},aTh1:function(t,e){},iyWX:function(t,e){},jVfv:function(t,e){},l0d9:function(t,e){},tKM5:function(t,e){},tgjV:function(t,e){},v2ns:function(t,e){},vIei:function(t,e){},x05H:function(t,e){},x8SO:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.7c341e1eb762269db45b.js.map