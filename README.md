# Sunglass

## 一个基于 Vue 的多页面商城应用

[效果预览](http://www.denglin.xyz:8080/home.html)

### 技术栈

**前端**：Vue + Vue-Router + Vuex   
**后端**：Node + Koa2 + Sequelize

### 实现的页面
* 首页
* 商品分类页
* 商品详情页
* 用户登录页
* 用户资料页
* 购物车
* 订单页

### 项目结构
```
.
├─ dist/              # build 生成的代码
├─ src/               # 源码目录
│   ├─ assets/        # 公用资源，主要是 SCSS
│   ├─ components/    # 公用组件
│   ├─ http/          # http 请求相关
│   ├─ mixin/         # mixin
│   ├─ pages/         # 页面
│   │   ├─ cart/      # 购物车
│   │   ├─ home/      # 首页
│   │   ├─ member/    # 用户页
│   │   ├─ product/   # 商品详情页
│   ├─ utils/         # 工具库
├── vue.config.js     # 配置多页面入口
├── .babelrc
├── package.json
```
