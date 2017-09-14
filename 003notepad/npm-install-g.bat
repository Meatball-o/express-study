::npm安装依赖
@echo off
set PHANTOMJS_CDNURL=http://cnpmjs.org/downloads
call npm install --registry=https://registry.npm.taobao.org  -g http-server node-sass
pause
::全局设置npm源为taobao
::npm config set registry=https://registry.npm.taobao.org
