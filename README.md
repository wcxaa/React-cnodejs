# React-cnodejs

> 基于React.js重写Cnodejs.org社区的webapp

此项目参考自[Vue-cnodejs](https://github.com/shinygang/Vue-cnodejs), 用于学习react。

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8021
npm start

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 开发

### 目录结构
<pre>
.
├── README.md           
├── build              // 构建服务和webpack配置
├── config             // 项目不同环境的配置
├── dist               // 项目build目录
├── index.html         // 项目入口文件
├── package.json       // 项目配置文件
├── src                // 生产目录
│   ├── assets         // css js 和字体资源
│   ├── components     // 各种组件
│   ├── router         // 路由定义
│   ├── pages          // 各种页面
│   ├── store          // 状态管理器
│   └── main.js        // Webpack 预编译入口
</pre>
