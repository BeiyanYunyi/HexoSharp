---
sidebar-position: 1
---

# Cloudflare Workers

## 先决条件

- 有 Cloudflare 账号
- 博客系统已实现连续集成（CI）

## 部署过程

### 获取 `Account ID`

前往 [Cloudflare](https://dash.cloudflare.com) 并完成登录。这以后，你会跳转到 `https://dash.cloudflare.com/*******************` ，其中星号处就是你的 `Account ID`，记下备用。

### 获取 `API Token`

1. 前往[此处](https://dash.cloudflare.com/profile/api-tokens)
2. 点击“创建令牌”来创建一个 `API 令牌`，Cloudflare 会给出几个模板，选择`编辑 Cloudflare Workers`，点击“使用模板”.
3. 在新页面向下滚动，账户资源处选择`包括 - （你的账号）`，区域资源处选择`包括 - 所有区域`，点击`继续以显示摘要`，在新页面点击`创建令牌`。
4. 记下生成的令牌，这是 `API Token`，记下备用。

### 配置 GitHub

来到[本项目页面](https://github.com/lixiang810/HexoSharp)，点击 `Fork`。
