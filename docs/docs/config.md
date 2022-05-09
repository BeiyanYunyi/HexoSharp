# 配置文件说明

所有配置项的说明如下，标\*为必填：

:::tip `owner` 与 `repo`
举个例子，我的博客系统托管在 [https://github.com/lixiang810/comb](https://github.com/lixiang810/comb)，那么 `owner` 处就填 `lixiang810`，`repo` 处就填 `comb`。
:::

- `ghApiToken`\* - 前文所述的 `GH Token`，Hexo\# 需要它以编辑你的 Repo。
- `owner`\* - 你存放静态博客系统的 repo 的所有者。如果填别人，则你需要有对那个 repo 的权限。
- `repo`\* - 你存放静态博客系统的 repo 名。
- `imgRepo` - 你用来存放图片的 repo 名，若不填写则默认为 `repo`。
- `imgPath` - 你用来存放图片的路径，若不填写则默认为 `/img`。
- `imgRepoOwner` - `imgRepo` 的所有者。如果填别人，则你需要有对那个 repo 的权限。
