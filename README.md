# vue-cnodejs

> 将之前用vue1.0、vue-router1.0写的cnode社区移动端项目进行了升级到，当前版本为vue2.0、vue-router2.0


## 技术栈
采用vue2.0框架，vue-router2.0来做路由配置，vue-resource来获取后端数据

## 功能
- 首页列表，滑动加载更多数据
- 主题详情，登陆后能够评论和点赞。
- 个人主页，包括最近回复和最近发布的主题
- 消息提醒，能查看已读消息和未读消息
- 关于项目，对项目的一个简介
- 登录功能，近支持通过accessToken进行登录
- 从详情页返回到列表页，返回之前滚动位置

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
