## 个人简易前端脚手架工具；

1,通过 npm init 生成 package.json 文件;删除不必要的 scripts 字段
2,在 package.json 中添加一个 bin 字段，用于指定模块的入口文件,并在项目中创建该文件;
3,在入口文件加入文件头：#!/usr/bin/env node;
4,通过 npm link 将模块映射到全局;
5,运行模块名启动模块;
6,通过 commander 模块实现命令行的交互;
7,通过 download-git-repo 模块，拉取远端模板代码;
8,拉取代码后替换模板 package.json 文件的 name 字段,生成自己的项目;

#### chd-cli init [project-name]

#### 生成基于 vue,axios,vur-router 的 vue 项目
