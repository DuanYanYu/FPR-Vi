(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/register"],{1545:function(t,e,n){"use strict";n.r(e);var u=n("4ff3"),r=n.n(u);for(var o in u)"default"!==o&&function(t){n.d(e,t,(function(){return u[t]}))}(o);e["default"]=r.a},"1dbb":function(t,e,n){"use strict";var u=n("9792"),r=n.n(u);r.a},"4ff3":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{pwd:"",pwd2:"",username:""}},computed:{inputStyle:function(){var t={};return this.pwd&&this.pwd2&&this.username&&(t.color="#fff",t.backgroundColor=this.$u.color["warning"]),t}},methods:{register:function(){var e=this;""==this.tel||""==this.pwd||""==this.pwd2||""==this.username?this.$refs.uToast.show({title:"请将信息填入完整进行注册",type:"error"}):this.pwd!=this.pwd2?(this.$refs.uToast.show({title:"输入的两次密码不一致",type:"error"}),this.pwd="",this.pwd2=""):t.request({url:"http://ocr.server.truedei.com/ocr/user/registration",method:"POST",data:{accountNumber:this.username,password:this.pwd},success:function(t){console.log(t),"注册成功"==t.data.message?e.$refs.uToast.show({title:"注册成功",type:"success",url:"/pages/user/loginByPwd",duration:1e3}):"已存在该账号！"==t.data.message&&(e.$refs.uToast.show({title:"该用户名已存在！",type:"error"}),e.username="")},fail:function(t){reject(t)}})}}};e.default=n}).call(this,n("543d")["default"])},"5e7e":function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return u}));var u={uToast:function(){return n.e("uview-ui/components/u-toast/u-toast").then(n.bind(null,"b40a"))},uForm:function(){return n.e("uview-ui/components/u-form/u-form").then(n.bind(null,"e06d"))},uFormItem:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-form-item/u-form-item")]).then(n.bind(null,"29cb"))},uInput:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-input/u-input")]).then(n.bind(null,"134c"))}},r=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__get_style([t.inputStyle]));t.$mp.data=Object.assign({},{$root:{s0:n}})},o=[]},"731a":function(t,e,n){"use strict";(function(t){n("1b22");u(n("66fd"));var e=u(n("8888"));function u(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},8888:function(t,e,n){"use strict";n.r(e);var u=n("5e7e"),r=n("1545");for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);n("1dbb");var s,i=n("f0c5"),a=Object(i["a"])(r["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],s);e["default"]=a.exports},9792:function(t,e,n){}},[["731a","common/runtime","common/vendor"]]]);