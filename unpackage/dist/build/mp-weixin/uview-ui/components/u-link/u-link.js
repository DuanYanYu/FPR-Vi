(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-link/u-link"],{"4bfa":function(t,n,e){"use strict";var u=e("b0fc"),f=e.n(u);f.a},ab40:function(t,n,e){"use strict";e.r(n);var u=e("f095"),f=e("fc0a");for(var a in f)"default"!==a&&function(t){e.d(n,t,(function(){return f[t]}))}(a);e("4bfa");var i,r=e("f0c5"),o=Object(r["a"])(f["default"],u["b"],u["c"],!1,null,"e94f7372",null,!1,u["a"],i);n["default"]=o.exports},b0fc:function(t,n,e){},f095:function(t,n,e){"use strict";var u;e.d(n,"b",(function(){return f})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return u}));var f=function(){var t=this,n=t.$createElement;t._self._c},a=[]},fc0a:function(t,n,e){"use strict";e.r(n);var u=e("fd00"),f=e.n(u);for(var a in u)"default"!==a&&function(t){e.d(n,t,(function(){return u[t]}))}(a);n["default"]=f.a},fd00:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"u-link",props:{color:{type:String,default:"#2979ff"},fontSize:{type:[String,Number],default:28},underLine:{type:Boolean,default:!1},href:{type:String,default:""},mpTips:{type:String,default:"链接已复制，请在浏览器打开"},lineColor:{type:String,default:""}},methods:{openLink:function(){var n=this;t.setClipboardData({data:this.href,success:function(){t.hideToast(),n.$nextTick((function(){n.$u.toast(n.mpTips)}))}})}}};n.default=e}).call(this,e("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-link/u-link-create-component',
    {
        'uview-ui/components/u-link/u-link-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("ab40"))
        })
    },
    [['uview-ui/components/u-link/u-link-create-component']]
]);
