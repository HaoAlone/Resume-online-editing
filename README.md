# 在线简历编辑
## task1
webpack 安装 
npm install webpack (webpack-cli)
npm install -g webpack-cli
webpack -v
## task2
Vue的安装和试运行，官网代码的"hello Vue"的试验
## task3
Tips：如果你不想每次都运行 webpack，那么你可以新开一个命令行窗口，
运行 webpack --watch，那么 webpack 就会在每次 JS 文件变化时自动重新运行。
[待办事项在线编辑链接](https://haoalone.github.io/Resume-online-editing/task3/page.html)
功能：输入待办事项，返回事项的内容和创建时间，有多选按钮点击表示该事项已完成，最后还有删除按钮，点击可以删除该事项。如果还未输完刷新网页，未输完的内容会留在输入框中。点击刷新也可以看到之前的待办事项（存储在本地localstorge中）
## task4
添加了登录注册功能，利用了leancloud存储我们的数据
如果已经登录过会直接登录，不用输入用户名密码再登录了。
有退出登录按钮
[待办事项在线编辑链接](https://haoalone.github.io/Resume-online-editing/task4/page.html)
## task5 
数据关联，数据不再保存在本地localstorage里了，而是通过leanStorage存储用户数据