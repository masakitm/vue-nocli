# Vue + 単一ファイルコンポーネント 手動で環境構築

参考 URL  
https://log.pocka.io/posts/vue-webpack-tutorial  
https://qiita.com/kurosame/items/0434d81bdcd97eb0da19  
https://github.com/nabepon/frontend/tree/env-setup-tutorial  
https://qiita.com/zprodev/items/9d611a482715fa64512b  
上記 URL からかなり引用させてもらいました。感謝！

## 環境構築

```
$ mkdir project-name
$ cd project-name
$ git init
$ npm init

$ touch .gitignore
# .gitignoreにnode_modules追加
```

.gitignore に node_modules 追加

### webpack のインストール

```
$ yarn add --dev webpack webpack-dev-server
```

```
# webpack.config.js
module.exports = {
    entry: './src/index.js',
    # 出力設定
    # この場合はdest/bundle.jsというファイルが生成される
    output: {
        # 出力先のファイル名
        filename: 'bundle.js',
        # 出力先のファイルパス
        path: `${__dirname}/dest`,
    },
    # 開発サーバの設定
    devServer: {
        # destディレクトリの中身を表示する
        contentBase: 'dest',
    },
}
```

```
# package.json
{
  # ...省略
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --hot --host 0.0.0.0",
    "build": "webpack -p"
  }
  # ...省略
}
```

```
# dest内にindex.htmlを作成
mkdir dest
touch dest/index.html

# index.html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Vue app</title>
    </head>
    <body>
        <div id="app"></div>
        <script src="/bundle.js"></script>
    </body>
</html>
```

```
# vueまわりのインストール
$ yarn add vue
$ yarn add --dev vue-loader vue-template-compiler css-loader
$ yarn add --dev babel-loader babel babel-core babel-preset-env
$ yarn add --dev sass-loader node-sass
$ yarn add babel-polyfill # このパッケージのみ --dev は不要
```

```
# webpack.config.js
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/dest`,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.(css|sass|scss)$/,
        loader: 'sass-loader',
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  devServer: {
    contentBase: 'public',
  },
  entry: [
    'babel-polyfill',
    path.resolve('src', 'index.js')
  ],
}
```

```
# .babelrc
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": [
          "last 2 versions",
          "ie >= 9",
          "safari >= 7",
          "iOS 8",
          "Android 4.1"
        ]
      }
    }],
  ],
}
```

```
# eslintとprettier
$ yarn add --dev eslint-config-airbnb-base prettier eslint-config-prettier eslint-plugin-prettier
```

```
# .eslintrc
{
  "extends": ["airbnb-base", "prettier"],
  "plugins": ["prettier"]
}
```

```
mkdir src/components
touch src/components/App.vue
```

```
# index.js
import Vue from 'vue';

import App from './components/App';

new Vue({
  el: '#app',
  components: { App },
  render: h => h(App),
});
```

### おまけ：render: h => h(App) とはなんぞや？

答えはこのページに
https://github.com/vuejs-templates/webpack-simple/issues/29

```
これが
render: function (createElement) {
    return createElement(App);
}
```

```
こう短縮されて
render (createElement) {
    return createElement(App);
}
```

```
こうなり
render (h){
    return h(App);
}
```

```
アロー関数になった結果
render: h => h(App);
```
