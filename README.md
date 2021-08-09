# 林业害虫智能识别APP

## 更新记录



## 简介



### APP简介



**安卓手机APP安装包下载地址**

```
源代码地址：

APP安装包下载地址：暂无
```





#### 目录结构

```
┌─components            	组件目录
│   │─beyondGod-drag            
│   │   └─uni-load-more         	
│   │─images-adaptation         图片自适应排列
│   │   └─uni-media-list                图片自适应排列组件
│   └─ygc-comment           	添加评论的弹出框
│      └─ygc-comment 					添加评论的弹出框组件
│       │─comments              评论目录
│       │   └─comments      评论模板
│       │─image         图片模板目录
│           │─choose        选择图片
│           │─compress      压缩图片
│           └─cut           可视化裁剪图片
├─pages                 业务页面文件存放的目录
│   │─expert            	专家模块
│   │   └─index.vue         	专家模块主页
│   │─folkMasters       	论坛模块（高手社区）
│	  │	  │-comment.vue			评论界面（用于查看帖子详情）	
│	  │	  │-push.vue				发帖界面（用于发布一个帖子）	
│   │   └─index.vue         	论坛模块主页（查看用户发的帖子、查看“我”发的帖子）
│   │─index       			APP首页模块（）
│   │   └─index.vue         	首页界面（用于给用户上传一个图片来识别害虫）
│   │─petsLibrary       	害虫库模块（）
│	  │	  │-pet.vue				害虫详情界面（查看害虫的详细信息）	
│   │   └─index.vue         	害虫库模块主页（可以查看所有已录取的害虫，可以通过名字来搜索）
│   │─user       			用户模块（）
│	  │	  │-code.vue				验证码验证界面（输入验证码来进行登录验证）
│	  │	  │-edit.vue				个人信息修改界面	
│	  │	  │-login.vue				登录界面（通过手机号和验证码验证）	
│	  │	  │-loginByPwd.vue		登录界面2（通过用户名和验证码验证）	
│	  │	  │-register.vue			用户注册界面（）	
│   │   └─index.vue         	用户模块主页（）
│
├─static                存放应用引用静态资源（如图片、视频等）的地方，注意：静态资源只能存放于此
│   ├─images             图片目录
│   │   └─xxx.jpg           图片
│   └─icon             	 图标目录
│       └─xxx.png           图标
│
├─store                 用户信息全局保存目录
│   └─index.js          	可用于将用户信息保存在全局   
│
│     
│     
├─main.js               Vue初始化入口文件
│     
├─App.vue               应用配置，用来配置App全局样式以及监听 应用生命周期
│     
├─manifest.json         配置应用名称、appid、logo、版本等打包信息，详见
│     
└─pages.json            配置页面路由、导航条、选项卡等页面类信息，详见
```

