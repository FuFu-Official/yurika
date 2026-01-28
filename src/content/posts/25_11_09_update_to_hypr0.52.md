---
title: Dependency Issue when updating to Hyprland 0.52
published: 2025-11-09
pinned: false
description: Update Note to Hyprland 0.52.
tags: [Update Note, Hyprland, Linux, Arch]
category: Linux
licenseName: "Unlicensed"
author: FuFu
draft: true
date: 2025-11-09
pubDate: 2025-11-09
---

When updating to [Hyprland 0.52](https://hypr.land/news/update52/), I encountered dependency issues related to the replacement of `hyprland-qtutils` with `hyprland-guiutils`.

在更新到 [Hyprland 0.52](https://hypr.land/news/update52/) 时，我遇到了与将 `hyprland-qtutils` 替换为 `hyprland-guiutils` 相关的依赖问题。

```sh
~> sudo pacman -Syu
:: Synchronizing package databases...
:: Starting full system upgrade...
:: Replace hyprland-qtutils with extra/hyprland-guiutils? [Y/n] y
resolving dependencies...
looking for conflicting packages...
error: failed to prepare transaction (could not satisfy dependencies)
:: removing hyprland-qtutils breaks dependency 'hyprland-qtutils' required by illogical-impulse-hyprland

```

By searching on [AUR website](https://aur.archlinux.org/),
I found that the package `illogical-impulse-hyprland` used by [end-4/dots-hyprland](https://github.com/end-4/dots-hyprland#) (a popular Hyprland rice I use) no longer exists.

通过在 [AUR 网站](https://aur.archlinux.org/) 上搜索，我发现我使用的 [end-4/dots-hyprland](https://github.com/end-4/dots-hyprland#) 所用的 `illogical-impulse-hyprland` 包已不再存在。

::github{repo="end-4/dots-hyprland"}

To resolve this issue, I simply removed the `illogical-impulse-hyprland` by using `paru -Rns illogical-impulse-hyprland`, and then proceeded with the system update using `sudo pacman -Syu`.
Then updating dots-hyprland by following the instructions on its [Installation Guide](https://ii.clsty.link/en/ii-qs/01setup/)

为了解决此问题，我只需使用 `paru -Rns illogical-impulse-hyprland` 删除 `illogical-impulse-hyprland`，然后使用 `sudo pacman -Syu` 继续系统更新。然后按照其[安装指南](https://ii.clsty.link/en/ii-qs/01setup/)中的说明更新 dots-hyprland。
