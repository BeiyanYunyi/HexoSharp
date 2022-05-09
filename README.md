# Hexo\#

<div align="center">
  <img src="https://github.com/lixiang810/HexoSharp/raw/main/src/frontend/static/favicon.svg" style="height: 256px; width: 256px" />
  <p>暂定图标，欢迎PR</p>
</div>

Hexo\#, 读作 `Hexo sharp` 或 `Hexo 升`。

Hexo\# 是一个可独立部署也可托管在 Cloudflare 上的轻后端的现代化静态博客管理器和 GitHub Repo 编辑器。Hexo\# 解决了静态博客无后端带来的一系列麻烦，以及 jsDelivr 掉备案后的 GitHub 图床问题。

虽然名字里带 Hexo ，但这个项目并不依赖于 Hexo，因为 Hexo\# 本质是一个 GitHub repo 编辑器，只要你的 repo 能生成静态页面，并且完成了相关的 CI，就可以使用 Hexo\#。诸如 jekyll、hexo、hugo、vuepress、docusaurus 这样的静态页面生成器都可以使用 Hexo\#，而相较 GitHub 自己的编辑器，Hexo\#：

- 可以所见即所得地编辑 markdown。
- 可以随地部署，解决 GitHub 在中国大陆被限制访问的问题。
- 加入了 Service Worker，整体只需加载一次。

使用截图、详细部署教程等详细内容，可以 Star 本 Repo 后参考：

## [📝 使用文档](https://docs.hsp.penclub.club/)

## 💡 起源

随着时代发展，免费静态空间越来越多，静态博客也如雨后春笋。在 GitHub 提供 Action 这个功能后，静态博客的门槛进一步降低：写一篇文章，Commit 一下，GitHub 就会自动构建好网页，然后更新上去。

不过，托管在 GitHub 上的静态博客依然面临着一些问题。Markdown 有一定的学习成本，一边写一边预览也不符合大多数人的使用习惯。在 raw.githubusercontent.com 被墙后，图片的预览成了问题，而在 GitHub 的访问也不稳定以后，有时连编辑博文都需要翻墙。

为此，人们需要一个博客管理器。我之前也见到了一些类似的项目，但它们代码质量不太好，我二次开发时心智负担过重。于是我开始写 Hexo\#，它将解决上述所有问题。

## 📈 特性

### 三个现代化，紧跟大趋势

#### 代码现代化

- TypeScript 严格地检查类型
- Prettier 和 ESLint 确保码风一致
- React + TSX 编写前端代码
- ESBuild 打包 Worker，Vite 打包前端，构建如闪电
- 丰富的 JsDoc 注释，代码即文档

#### 平台现代化

- 拥抱 Serverless，零成本部署
- 保留独立部署选项

#### 架构现代化

- 重前端、轻后端，后端适应性强
- 使用 GitHub 官方 API 库，开发体验好
- 渐进式应用，资源全部缓存

### 编辑 Markdown，所见即所得

- 使用 [Vditor](https://github.com/Vanessa219/vditor) 作为 Markdown 编辑器

### 滚动更新，方便又快捷

- 没有版本号，main 分支的每个 Commit 都是稳定的
- 一键更新，免除操作烦恼

### 自由软件，而且也免费

- 使用 AGPL 协议
- 部署不花一分钱

## ✅ 在进行中的工作

见 [Projects](https://github.com/users/lixiang810/projects/2)

## 🖼️ 展望

未来有可能会与 Cloudflare Pages 结合，把前端托管在 Pages 上，用 Page 自带的 Function 来干现在 Worker 干的事情，但现在该功能尚在 Beta 阶段，未来可能收费，故暂且观望。

## 🛠️ 开发

```bash
sudo corepack enable
# sudo npm install -g pnpm，如果上一条命令失败
git clone https://github.com/lixiang810/HexoSharp
cd HexoSharp
pnpm install
pnpm dev
```

## ❤️ 鸣谢

- [Hexo++](https://github.com/HexoPlusPlus/HexoPlusPlus) 提供了命名灵感和架构思路。

## 🤝 相似项目

- [Wexagonal](https://github.com/Wexagonal/Wexagonal) - [Hexo++](https://github.com/HexoPlusPlus/HexoPlusPlus) 作者的续作
- [Qexo](https://github.com/am-abudu/Qexo) - 基于 Python 后端的在线 Hexo 编辑器

## ⏩ 开源协议

本项目使用 AGPLv3 自由软件协议。任何项目若使用或修改了来自本项目的源码并向他人提供服务，则必须使用同样的协议并保持开源。
