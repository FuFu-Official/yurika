---
title: Arch Notes
published: 2025-10-29
pinned: false
description: A collection of the problems and solutions I encountered while using Arch Linux.
tags: [Linux, Arch, Hyprland, Configuration]
category: Linux
licenseName: "Unlicensed"
author: FuFu
draft: false
image: "arch.webp"
date: 2025-10-29
pubDate: 2025-10-29
---

This blog will keep updating with the problems and solutions I encountered while using Arch Linux.

# System Info

`````sh
~> fastfetch -c ~/.config/fastfetch/safe_config.jsonc

                  -`                     ┌───────────────┬─────── fastfetch - 2.56.1 ────────────────────┐
                 .o+`                    │    Linux     │ Arch Linux x86_64                             │
                `ooo/                    │    Fetched   │ 2025-12-23 22:35:22 CST                       │
               `+oooo:                   │    Locale    │ en_US.UTF-8                                   │
              `+oooooo:                  │┌──────────────┬─────────── Desktop ──────────────────────────┐│
              -+oooooo+:                 ││   Session   │ Hyprland 0.52.2 (Wayland)                    ││
            `/:-:++oooo+:                ││ 󰍹  Display   │ 2560x1600 @ 240Hz                            ││
           `/++++/+++++++:               ││ 󰾲  G-Driver  │ nvidia (open source) 590.48.01               ││
          `/++++++++++++++:              ││ 󰾲  G-Driver  │ i915                                         ││
         `/+++ooooooooooooo/`            │└──────────────┴──────────────────────────────────────────────┘│
        ./ooosssso++osssssso+`           │┌──────────────┬─────────── Terminal ─────────────────────────┐│
       .oossssso-````/ossssss+`          ││   Shell     │ fish 4.2.1                                   ││
      -osssssso.      :ssssssso.         ││   Terminal  │ kitty 0.44.0                                 ││
     :osssssss/        osssso+++.        ││   Term Font │ JetBrainsMonoNF-Regular (18pt)               ││
    /ossssssss/        +ssssooo/-        ││ 󰔎  Colors    │ #EFD3C9 (FG) - #221819 (BG) [Dark]           ││
  `/ossssso+/:-        -:/+osssso+-      ││ 󰏖  Packages  │ 1929 (pacman), 17 (flatpak)                  ││
 `+sso+:-`                 `.-/+oso:     │└──────────────┴──────────────────────────────────────────────┘│
`++:.                           `-/+/    │┌──────────────┬───────── Development ────────────────────────┐│
.`                                 `/    ││   Rust      │ rustc 1.92.0                                 ││
                                         ││   Clang     │ clang 21.1.6                                 ││
                                         ││   NodeJS    │ node 25.2.1                                  ││
                                         ││   Go        │ go 1.25.5                                    ││
                                         ││ 󰊢  Git       │ git 2.52.0                                   ││
                                         │└──────────────┴──────────────────────────────────────────────┘│
                                         └───────────────────────────────────────────────────────────────┘
`````
---

# Grub

## Open Secure Boot with Arch&Windows Dual Boot (双系统下开启安全启动)

Secure Boot is a security feature in a computer's firmware that ensures the system starts up using only ~~trusted and sate~~ Microsoft software, during the Arch Linux installation process, it is usually chosen to be disabled.
However, due to some reasons, it is necessary to enable Secure Boot.

安全启动是计算机固件中的一项安全功能，确保系统仅使用受信任和安全的软件启动, 在 Arch Linux 安装过程中通常选择关闭。
但因为~~一些原因~~要在 windows 下玩瓦罗兰特，战地等游戏，所以需要开启安全启动。

In short, the steps to enable Secure Boot in a dual-boot system with Arch Linux and Windows are as follows:

简而言之，在 Arch Linux 和 Windows 的双系统中启用安全启动的步骤如下：

- Use `openssl` to generate a public and private key pair.

  使用`openssl`生成一对公钥和私钥。

- Sign grub and the kernel with the private key.

  使用私钥对 grub 和内核进行签名。

- Use `arch-shim` as the bootloader.

  利用 `arch-shim` 来引导启动

[Detailed Guide (优质博客)](https://blog.azurezeng.com/arch-linux-grub-sb-with-font-and-some-optimization/)

---

# Hyprland

## How to Disable Touchpad ? (禁用触摸板)

<a href="/posts/25_10_29_hypr_disable_touchpad/">Disable Touchpad in Hyprland</a>

## Fail to launch Timeshift GUI with Hyprland (Hyprland 下无法启动 Timeshift GUI)

logs:

```sh
/usr/bin/timeshift-launcher: line 16: xhost: command not found
Authorization required, but no authorization protocol specified


(timeshift-gtk:41495): Gtk-WARNING **: 15:57:06.995: cannot open display: :0
/usr/bin/timeshift-launcher: line 18: xhost: command not found
/usr/bin/timeshift-launcher: line 19: xhost: command not found
```

Solution:

```sh
sudo pacman -S xorg-xhost
```

## AUR Wechat can't use fcitx5 input method (AUR 微信无法使用 fcitx5 输入法)

Edit `/usr/share/applications/wechat.desktop`

```sh
Exec=env QT_QPA_PLATFORM=xcb GTK_IM_MODULE=fcitx QT_IM_MODULE=fcitx XMODIFIERS=@im=fcitx /opt/wechat/wechat %U
```

## Updating Issues (更新相关问题)

- <a href="/posts/25_11_09_update_to_hypr0.52.md">Dependency Issue when updating to Hyprland 0.52</a>

---

# Hardware

## The keyboard backlight and the back light strip on my ASUS laptop are not working. (华硕笔记本键盘背光和背光条不工作)

```sh
sudo pacman -S asusctl
```

::github{repo="NeroReflex/asusctl"}

---

# Other

## VPNS && Privacy (魔法和隐私保护)

- [VPNs](https://arch.icekylin.online/guide/rookie/transparent.html#v2raya)
- [Hogwarts](https://archlinuxstudio.github.io/ArchLinuxTutorial/#/rookie/fxckGFW?id=%e5%b7%b2%e6%9c%89%e7%a7%91%e5%ad%a6%e4%b8%8a%e7%bd%91%e7%9a%84%e8%8a%82%e7%82%b9%e7%9a%84%e6%83%85%e5%86%b5)
- [VPS](https://blog.hill-q.com/posts/hy2/)
- [Modern Privacy Protection](https://archlinuxstudio.github.io/ModernSecurityProtectionGuide/#/)
