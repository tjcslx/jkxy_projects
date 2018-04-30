# jkxy_projects
极客学院就业班全部课程作业

`git clone https://github.com/tjcslx/jkxy_projects.git`
`git add .`
`git commit -m "Commit to master branch by git bash."`
`git push`

创建两个分支，分别是CDN和less，CDN将原来
`git branch cdnize`
`git branch lessize`

# 极客学院大前端工程师就业班作业GitHub仓库

## 概述
该仓库包括master、cdn及minions_less三个分支，其中master分支为正常分支，cdn分支中，所有Bootstrap、jQuery以及jQuery UI的源文件均由本地文件替换为CDN上的文件，M1、M2、M3两个文件夹中的源文件已被删除；minions_less为将M1/w03_draw作业的CSS改写为Less并重新发布的版本，已与master分支合并。

## 作业情况
### M1：第一个月——HTML与CSS
#### 第一周：学会基本的HTML标签骨架以及基本服务器概念

* w01_baidu：开发基础百度首页

利用table布局及CSS实现了百度首页的样式。

* w01_coursetable：开发课程表

利用table实现表格，利用CSS中的nth-child选择器实现不同列的双色。

#### 第二周：学会HTML5新增元素及CSS核心技术

* w02_divcross：制作一个由5个100*100DIV组成的十字架

分别利用浮动以及绝对定位方式实现。

* w02_baidudiv：让百度首页样式完全与官网样式完全一致

搜索关键字和搜索按钮通过绝对定位方式实现。

* w02_boxandflexbox：实战盒子模型与弹性盒模型

多列布局、弹性盒模型、普通与怪异盒模型。

* w02_qdjjregisterform：制作青岛家教网注册页面

form及input、select等元素的使用。

#### 第三周：学会CSS常用布局技巧以及绘制特殊图形和动画

* w03_baiduhack：让百度首页适配IE等所有浏览器

CSS Hack在IE 6、7、8中的注意事项。

* w03_css3d：CSS开发3D魔方效果

利用以及CSS3中的animation、transform（rotate3d）实现魔方动画。

* w03_doublewings：双飞翼布局

双飞翼布局、圣杯布局、负边距。

* w03_draw：CSS开发简笔画

利用CSS的绝对定位，以及CSS3中的animation、transform实现小黄人动画。

#### 第四周：掌握HTML+CSS的基本核心技巧

* w04_baiduresp：响应式的百度首页

CSS响应式布局。

* w04_boottax：利用Bootstrap开发后台登录页面和首页

Bootstrap，通过[BootCDN](www.bootcdn.cn)提供版本进行开发。

* w04_frontendtest：完成初级前端面试题

包括HTML基础、CSS选择器、布局、Hack等。

* w04_psd：利用PSD制作首页

Photoshop、Fireworks切图，CSS Sprites制作。

### M2：第二个月——JavaScript、jQuery及后端基础

#### 第五周：JavaScript基础入门认识变量

* w05_calc：JS开发简易计算器

判断输入数据是否为整数，JS运算符。

* w05_score：将0~100分学员以10分为界，分为十段，然后计算出该生为数字几等生

if …… else判断分数区间。

* w05_stringcount：找到数组中出现次数最多的字母，并给出个数和每一个所在的顺序

正则表达式，JS循环。

#### 第六周：掌握JavaScriptDOM和高级技巧

* w06_calculator：复杂计算器

JS DOM操作，运算符，等号判断。

* w06_webthemeswitch：开发一个顶部带可选颜色的hao123网站，点击这些颜色可改变网站主题

jQuery UI滑块控件改变颜色，HTML 5的LocalStorage机制。

#### 第七周：掌握jQuery使用深入JavaScript

* w07_baiduimg：百度图片瀑布流

瀑布流图，随页面滚动图片动态加载。

* w07_baiduuser：登录后百度首页

jQuery实现标签页、右侧弹出菜单。

* w07_jkxy：极客学院首页

页面布局设计，RequireJS模块化，jQuery实现标签页。

#### 第八周：了解面向对象编程以及PHP+MySql入门

* w08_baidunews：百度新闻前后端

Less预处理器，前端页面响应式布局，后端Bootstrap开发类“单页面应用”，Ajax实现，MySQL数据库设计注意事项，PHP基础、连接数据库。

### M3：第三个月——JS高级、前端工业化

#### 第九周：NodeJS、ES6与移动开发

* w09_baidunewsnode、w09_restify：NodeJS

NodeJS入门，连接数据库，实现RESTful API供前端调用。

#### 前端工业化框架

* w10_baidufis、w10_baidunewsfis：前端工业化框架

百度FIS 3框架的使用，编辑后自动发布，节省F5键^_^。

#### 第十一周：掌握CSS在工程中的变化

* w11_busstop：利用Less制作公交站牌

Less预处理器，AutoPrefixer后处理器，CSS分层（BEM方法）。

* w11_jkxyless：Less改写极客学院首页

Less预处理器，Grunt工业化框架。

#### JS常用设计模式

* w12_advancedfrontend：高级前端工程师测试题

包含面向对象、前端优化（Yahoo性能优化军规）、JS异步概念、CSS单位名称等，制作了前端思维导图。

* w12_baidupattern：JS设计模式改写百度首页

JS设计模式。

## GitHub仓库构建

在网页上建立远程仓库及分支，本地使用Git Bash进行操作。