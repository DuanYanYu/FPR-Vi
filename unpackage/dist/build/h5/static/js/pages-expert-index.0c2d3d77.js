(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-expert-index"],{"0156":function(t,e,n){"use strict";n.d(e,"b",(function(){return c})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}));var a={uTabbar:n("c29c").default},c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("v-uni-view",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toPush()}}},[t._v("push")]),n("u-tabbar",{attrs:{"bg-color":t.bgColor,"border-top":t.borderTop,list:t.tabbar,"mid-button":t.midButton,"inactive-color":t.inactiveColor,activeColor:t.activeColor},model:{value:t.current,callback:function(e){t.current=e},expression:"current"}})],1)},o=[]},2016:function(t,e,n){"use strict";var a=n("724a"),c=n.n(a);c.a},6398:function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 下方引入的为uView UI的集成样式文件，为scss预处理器，其中包含了一些"u-"开头的自定义变量\r\n * uView自定义的css类名和scss变量，均以"u-"开头，不会造成冲突，请放心使用 \r\n */.content[data-v-315a6b6e]{width:100%;height:100%}.content-div[data-v-315a6b6e]{width:100%;height:100%}.swiper-div[data-v-315a6b6e]{display:-webkit-box;display:-webkit-flex;display:flex;width:100%;margin-bottom:%?5?%}',""]),t.exports=e},"650b":function(t,e,n){"use strict";var a=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var c=a(n("ade3")),o={data:function(){var t;return t={current:0,show:!0,bgColor:"#ffffff",borderTop:!0,tabbar:""},(0,c.default)(t,"current",0),(0,c.default)(t,"midButton",!0),(0,c.default)(t,"inactiveColor","#909399"),(0,c.default)(t,"activeColor","#5098FF"),t},onLoad:function(){this.tabbar=[{pagePath:"/pages/folkMasters/index",iconPath:"/static/icon/cum.png",selectedIconPath:"/static/icon/cum-full.png",text:"高手社区",customIcon:!1},{pagePath:"/pages/expert/index",iconPath:"/static/icon/rc.png",selectedIconPath:"/static/icon/rc-full.png",text:"询问专家",customIcon:!1},{pagePath:"/pages/index/index",iconPath:"/static/icon/scan.png",selectedIconPath:"/static/icon/scan-full.png",text:"扫一扫",midButton:!0,customIcon:!1},{pagePath:"/pages/petsLibrary/index",iconPath:"/static/icon/bug.png",selectedIconPath:"/static/icon/bug-full.png",text:"智虫库",customIcon:!1},{pagePath:"/pages/user/index",iconPath:"account",selectedIconPath:"account-fill",text:"我",customIcon:!1}]},methods:{toPush:function(){this.$u.route({url:"pages/folkMasters/push"})}}};e.default=o},"724a":function(t,e,n){var a=n("6398");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var c=n("4f06").default;c("15111501",a,!0,{sourceMap:!1,shadowMode:!1})},7819:function(t,e,n){"use strict";n.r(e);var a=n("650b"),c=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=c.a},f317:function(t,e,n){"use strict";n.r(e);var a=n("0156"),c=n("7819");for(var o in c)"default"!==o&&function(t){n.d(e,t,(function(){return c[t]}))}(o);n("2016");var i,r=n("f0c5"),u=Object(r["a"])(c["default"],a["b"],a["c"],!1,null,"315a6b6e",null,!1,a["a"],i);e["default"]=u.exports}}]);