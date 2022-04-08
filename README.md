# Hexo\#

<div align="center">
  <img src="https://github.com/lixiang810/HexoSharp/raw/main/src/frontend/static/favicon.svg" style="height: 256px; width: 256px" />
  <p>暂定图标，欢迎PR</p>
</div>

Hexo\#, 读作 `Hexo sharp` 或 `Hexo 升`。

Hexo\# 是一个可独立部署也可托管在 Cloudflare 上的轻后端的现代化静态博客管理器和 GitHub Repo 编辑器。Hexo\# 解决了静态博客无后端带来的一系列麻烦，以及 jsDelivr 掉备案后的 GitHub 图床问题。部署 Hexo\# 可以不花一分钱。

虽然名字里带 Hexo ，但这个项目并不依赖于 Hexo，因为 Hexo\# 本质是一个 GitHub repo 编辑器，只要你的 repo 能生成静态页面，并且完成了相关的 CI，就可以使用 Hexo\#。诸如 jekyll、hexo、hugo、vuepress、docusaurus 这样的静态页面生成器都可以使用 Hexo\#，而相较 GitHub 自己的编辑器，Hexo\#：

- 可以所见即所得地编辑 markdown。
- 可以随地部署，解决 GitHub 在中国大陆被限制访问的问题。
- 加入了 Service Worker，整体只需加载一次。

使用截图、详细部署教程等详细内容，可以 Star 本 Repo 后参见：

## [📝 使用文档](https://docs.hsp.penclub.club/)

## 💡 起源

我曾使用 Hexo++，这是一个优秀的项目，但它最近变成了 Archived 状态。而且，它有这些让我没法接手的地方：

1. 没有使用 TypeScript。
2. HTML 内容被 inline 地写在 js 里。
3. 代码风格不统一，缩进混乱。
4. Markdown 编辑器不够完善。
5. 由于编写时还没有 miniflare，开发流程需要依赖 cloudflare 的服务器，开发流较为痛苦。
6. 使用 gulp 打包。
7. 前端使用 Vanilla JS。
8. 使用了 GPL 协议。对于一个部署在网页上的项目而言，GPL 协议是不够自由的，只有 AGPL 协议才能确保修改后的源代码被开源出来。

既然选择重新写一个项目，那么新的 Hexo\# 从一开始就避免了这些问题，因为它：

1. 使用了 TypeScript。
2. 使用 KV 存储 assets 并提供服务。
3. 使用 prettier 和 eslint 确保码风一致。
4. 使用 [vditor](https://github.com/Vanessa219/vditor) 作为 Markdown 编辑器。
5. 使用 miniflare，开发时可在本地运行 worker 脚本，也可自行部署于 VPS。
6. 使用 esbuild 打包 worker，使用 vite 打包前端。
7. 使用 React 编写前端。
8. 使用 AGPL 协议。

## ✅ 在进行中的工作

- [x] 查看 Repo 内容
- [x] 修改 Repo 内容
- [x] 创建 Repo 内容
- [x] 删除 Repo 内容
- [x] 上传图片
- [x] 在编辑器里上传图片
- [x] 在图片列表里预览和删除图片
- [x] 添加 Service Worker 支持
- [ ] 文章列表
- [ ] 发布说说

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

## 🏭 手动部署

```bash
sudo corepack enable
# sudo npm install -g pnpm，如果上一条命令失败
sudo pnpm install -g wrangler
git clone https://github.com/lixiang810/HexoSharp
cd HexoSharp
```

在 `HexoSharp` 文件夹中，编辑 `wrangler.toml` 的 `account_id`、`kv_namespaces`，然后

```bash
pnpm install
wrangler publish
```

## 鸣谢

- [Hexo++](https://github.com/HexoPlusPlus/HexoPlusPlus) 提供了命名灵感和架构思路。

## 相似项目

- [Wexagonal](https://github.com/Wexagonal/Wexagonal) - [Hexo++](https://github.com/HexoPlusPlus/HexoPlusPlus) 作者的续作
- [Qexo](https://github.com/am-abudu/Qexo) - 基于 Python 后端的在线 Hexo 编辑器
