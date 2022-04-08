---
sidebar-position: 1
---

# Cloudflare Workers

## 先决条件

- 有 Cloudflare 账号
- 博客系统已实现连续集成（CI）

## 部署过程

:::info
本教程将以中文版的 Cloudflare 为例，为了使你见到的界面与本教程一致，你需要[切换语言](#切换语言)。
:::

### 切换语言

:::note 可选
如果 Cloudflare 的语言已经是中文，[跳过这一步](#获取-account-id)。
:::

1. 来到 [Cloudflare](https://dash.cloudflare.com) 并登录。
2. 在右上角点击 `English (US)`。
3. 在弹出菜单中，点击`简体中文`。

### 获取 `Account ID`

前往 [Cloudflare](https://dash.cloudflare.com) 并完成登录。这以后，你会跳转到 `https://dash.cloudflare.com/*******************` ，其中星号处就是你的 `Account ID`，记下备用。

### 获取 `API Token`

1. 前往[此处](https://dash.cloudflare.com/profile/api-tokens)
2. 点击“创建令牌”来创建一个 `API 令牌`，Cloudflare 会给出几个模板，选择`编辑 Cloudflare Workers`，点击“使用模板”.
3. 在新页面向下滚动，账户资源处选择`包括 - （你的账号）`，区域资源处选择`包括 - 所有区域`，点击`继续以显示摘要`，在新页面点击`创建令牌`。
4. 记下生成的令牌，这是 `API Token`，记下备用。

:::caution 警告
`API Token` 在你离开网页后不会再次显示，如果你在部署过程中弄丢了，就需要再生成一次。
:::

### 初始化 Workers

:::note 可选
如果你之前已经使用过 Workers，[跳过这一步](#获取-kv-id)。
:::

:::caution 警告
每个账号只能设置一次子域，在设置前请慎重考虑。
:::

1. 前往[Cloudflare 主页](https://dash.cloudflare.com)，在左侧边栏找到 `Workers` 并点击。
2. 在右侧输入你希望你的账号被绑定到的子域。
3. 点击蓝色按钮 `设置`。
4. 点击 `继续使用 Free 计划`。

### 获取 `KV ID`

1. 点击左侧边栏中 `Workers` 旁的小箭头以展开它的子菜单。
2. 点击子菜单中的 `KV`。
3. 在右侧找到蓝色的 `创建命名空间` 按钮并点击。
4. 随意输入命名空间名称，点击蓝色的 `添加` 按钮。
5. 下方的列表会多出一行，鼠标移动到这行对应着 `ID` 的这一项上，点击按钮复制，如图所示：![如图所示](/img/tutorial/2022-04-08-191454.png)
6. 现在你剪贴板里的是 `KV ID`，记下备用。

### 获取 `GH Token`

1. 前往[此处](https://github.com/settings/tokens)。
2. 点击 `Generate new token`。
3. 在 `Note` 一栏输入 `Token` 名，你可以自己起一个。
4. 在 `Expiration` 一栏中，选择 `No expiration`。
5. 在 `Select scopes` 中，点击 `workflow`，这会把上面 `repo` 中的复选框一并选中。
6. 向下滚动，找到绿色的 `Generate token` 按钮并点击。
7. 点击复制按钮，如图所示：![如图所示](/img/tutorial/2022-04-08-194629.png)
8. 现在你剪贴板里的是 `GH Token`，记下备用。

:::caution 警告
`GH Token` 在你离开网页后不会再次显示。部署完成之后的初始化过程也需要 `GH Token`，请不要在部署完成后就将它丢弃。如果你弄丢了，就需要再生成一次。
:::

### 配置 GitHub

1. 来到[本项目页面](https://github.com/lixiang810/HexoSharp)，点击 `Fork`。
2. Fork 后会打开你自己 Fork 后的 Repo，请在这个 Repo 完成后续操作。
3. 点击 `Settings`，在左侧边栏找到 `Secrets` 并点击它的子选项 `Actions`，你会进入一个标题为 `Actions secrets` 的页面。
4. 点击 `New repository secret`，在 `Name` 一栏输入 `CF_API_TOKEN`， `Value` 一栏输入之前记下的 `API Token`，点击 `Add Secret`。
5. 点击 `New repository secret`，在 `Name` 一栏输入 `CF_ACCOUNT_ID`， `Value` 一栏输入之前记下的 `Account ID`，点击 `Add Secret`。
6. 点击 `New repository secret`，在 `Name` 一栏输入 `KV_ID`， `Value` 一栏输入之前记下的 `KV ID`，点击 `Add Secret`。
7. 点击 `New repository secret`，在 `Name` 一栏输入 `GH_TOKEN`， `Value` 一栏输入之前记下的 `GH Token`，点击 `Add Secret`。
8. 在这个页面点击 `Actions` 并随后点击绿色按钮 `I understand my workflows, go ahead and enable them`。
9. 你将进入 `Actions` 界面，在左侧边栏中找到 `Deploy` 并点击。
10. 在右侧列表中找到 `Run workflow` 并点击。
11. 在弹出菜单中点击绿色按钮 `Run workflow`。
12. 刷新页面，可以看到有一个名叫 `Deploy` 的 `Workflow` 正在运行。等待它运行完毕即可。有时它的状态不会自动刷新，你可以试试手动刷新页面。一般而言，这个 Action 将在 2 分钟以内运行完毕。

### 配置 Workers Secret

1. 回到 [Cloudflare](https://dash.cloudflare.com)。
2. 在左侧边栏中找到并点击 `Workers`，在右侧找到 `hexo-sharp` 并点击。
3. 点击 `设置`。
4. 点击 `变量`。
5. 在 `环境变量` 一栏中，点击 `编辑变量`。
6. 点击 `添加变量`。
7. 在左侧栏中输入 `JWT_SECRET`。注意大小写。
8. 在右侧栏中随意输入一串字符串，长度建议在 16 位**以内**。
9. 点击 `加密`。你不需要记下刚刚随机输入的字符串。
10. 点击 `保存`。

:::tip 恭喜
至此，部署完成，花费：0 元。
:::

## 自动更新

1. 在 Github Actions 中，找到 `Merge-upstream` 并点击。
2. 重复[配置 GitHub](#配置-github) 时的 8 - 10 步以运行 `Merge-upstream` 这个 `Action`。
