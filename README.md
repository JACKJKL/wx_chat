# wx_chat

>模拟微信界面实现一个简单的聊天室，后端服务采用nodejs+ws模块搭建websocket服务。前端简介采用vue.js+vuex,less,pug等编写。

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

项目至此暂不准备添加新功能。后端只提供一个websocket服务，没有存储任何信息，前端数据存储在sessionStorage以及localStorage中。
