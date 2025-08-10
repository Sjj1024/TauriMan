# Tauri + Vanilla

This template should help get you started developing with Tauri in vanilla HTML, CSS and Javascript.

为什么不能和 pp 集成？
因为 pp 本身包含了 PP 的 ui 内容，如果合在一起，会导致新的项目存在多余的 PP 内容，导致包体积过大，和性能下降。

## Recommended IDE Setup

-   [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

# Add TauriApi

在前端文件夹项目中添加依赖

```shell
pnpm add -D @tauri-apps/cli@latest

"@tauri-apps/api": "^2",
"@tauri-apps/plugin-dialog": "^2.2.0",
"@tauri-apps/plugin-fs": "^2.2.0",
"@tauri-apps/plugin-http": "^2.2.0",
"@tauri-apps/plugin-opener": "^2",
"@tauri-apps/plugin-os": "^2.2.0",
"@tauri-apps/plugin-shell": "^2.2.0",
"@tauri-apps/plugin-store": "^2.2.0",
"@tauri-apps/plugin-updater": "^2.7.1",
"@tauri-apps/plugin-window-state": "^2.2.1",
```

# 在 debug 或发布目录添加 config 文件夹

TauriMan 会主动加载 config 文件夹下的配置文件，用于配置 TauriMan 的功能。
