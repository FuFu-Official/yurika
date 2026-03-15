---
title: Secure Boot with GRUB
published: 2026-02-04
pinned: false
description: Script to enable Secure Boot with GRUB on Arch Linux systems.
tags: [Linux, Script]
category: Linux
licenseName: "Unlicensed"
author: FuFu
draft: false
date: 2026-02-04
pubDate: 2026-02-04
---

# Secure Boot with GRUB

It is necessary to have Secure Boot disabled in the process of installing Linux distributions like Arch.
However, some users may want to enable Secure Boot after installation for specific reasons.
For example, to play some games with anti-cheat mechanisms that require Secure Boot to be enabled, including Valorant and Call of Duty.
Check the references section to comprehensively understand the process of enabling Secure Boot with GRUB.

# Make your life easier with my Script

To simplify the process of enabling Secure Boot with GRUB, I have created a script that automates the necessary steps.
You can find the [script](https://github.com/FuFu-Official/dotfiles/blob/main/.scripts/setup_secure_boot.sh) on my GitHub repository.

# Minimal Knowledge Required

In this section, I’ll cover the bare minimum you need to know to use my script, saving you from wading through lengthy Wiki pages. I assume you have a solid understanding of your own system. Specifically, you should be able to answer the following:

- What is your partition structure?
- Are you using Btrfs subvolumes?
- Where does your EFI System Partition (ESP) mount point reside?
- Where is your GRUB installed?

If you are confident about these details, feel free to proceed. Otherwise, I **highly recommend** reviewing the documents in the References section. You can use my scripts when you reinstall your OS next time.

## Configuration

The first part of the script contains several variables that you may need to adjust according to your system configuration.

```sh
SB_DIR="/etc/secureboot"
KEYPAIR_PATH="$SB_DIR/keys"
EFI_DIR="/efi" 
ARCH_EFI_DIR="$EFI_DIR/EFI/arch"
GRUB_STUB_DIR="$SB_DIR/grub-sb-stub"
MOK_SUBJ="/CN=My Arch Linux Machine Owner Key/"
ARCH_KERNEL_PACKAGES=("linux-lts" "linux-zen")
GRUB_DEV_UUID="5682-B92F"
```

Among these variables, `SB_DIR`, `KEYPAIR_PATH`, `GRUB_STUB_DIR` and `MOK_SUBJ` are related to the Secure Boot setup process and can be left unchanged unless you have specific preferences. The explanation of the other variables is as follows:

- `EFI_DIR`: This is the mount point of your EFI System Partition (ESP). Adjust it if your ESP is mounted at a different location.
- `ARCH_EFI_DIR`: This is the directory where Arch Linux's EFI files are located within the ESP. Modify it if your Arch EFI files are stored in a different path.
- `ARCH_KERNEL_PACKAGES`: This is an array containing the names of the Arch Linux kernel packages you are using. Update it to include all the kernel packages installed on your system that you want to sign for Secure Boot.
- `GRUB_DEV_UUID`: This is the UUID of the EFI System Partition (ESP) where GRUB is installed. You can find it using the `lsblk -fs` command.

## Generate grub-pre.cfg

Section 4 of the script deserves special attention, as it is the most common reason why users find themselves stuck in the GRUB rescue shell even after successfully enrolling the MOK key in Shim.

Please note that the commands/functions utilized in this section are exclusive to the GRUB environment and will not function in a standard TTY or terminal emulator. If you are able to boot into GRUB manually from the rescue shell, I encourage you to experiment. If you lack experience with this, the following content will guide you through the necessary steps to modify the script accordingly

### Locate grub.cfg

The UUID and Prefix values must be accurate for GRUB to locate the grub.cfg file. Locating the UUID is usually straightforward if you have gone through the standard installation process; the line `search.fs_uuid $GRUB_DEV_UUID root hd0,gpt2` in the script is designed to find your partition and set it as the `$root` variable.

However, determining the correct Prefix path is where things often get tricky. In my experience, the set prefix line is the most common point of failure in Secure Boot configurations.

The path you need depends entirely on your partition structure and where you chose to install GRUB:

- If you use BTRFS: You may need to include a subvolume name in the Prefix path if your root partition is formatted with Btrfs and you have installed GRUB within a subvolume (e.g., /@/). In this case, GRUB needs the full path relative to the partition root to "see" into the Btrfs structure.

  - Example: set prefix=(\$root)/@/boot/grub

- If you installed GRUB directly into the ESP: For users who opted to keep the GRUB directory within the EFI System Partition (ESP), the Prefix path should point directly to that location. In this scenario, you do not need to worry about Btrfs subvolumes because GRUB is reading from the FAT32 partition.

  - Example: set prefix=(\$root)/grub (as currently seen in the script).

Basically, the script, just like bash scripts, is corresponding to your behavior in shell. So if you entered the GRUB rescue shell, you can use the same commands to find out the correct UUID and Prefix.

### Load GRUB Manually

If you still end up at a `grub>` prompt after enrolling your MOK key:

- Use `ls` to find your EFI/Boot partition (e.g., (hd0,gpt2)).
- Run `ls (hd0,gpt2)/grub/` to verify the existence of grub.cfg. (press `TAB` and auto-completion will tell you whether the `@` should be included)
- Manually boot by typing: `configfile /path/to/grub.cfg`

Once back in Linux, update your script with the correct UUID and Prefix to permanently fix the issue.

# References

- [Arch Wiki: Sign the official ISO with a Machine Owner Key for shim](https://wiki.archlinux.org/title/Unified_Extensible_Firmware_Interface/Secure_Boot#Sign_the_official_ISO_with_a_Machine_Owner_Key_for_shim)
- [Main References for my Script](https://blog.azurezeng.com/arch-linux-grub-sb-with-font-and-some-optimization)
- [Video corresponding to the Blog](https://www.youtube.com/watch?v=1KXJ8v3b5jM)
- [My Script](https://github.com/FuFu-Official/dotfiles/blob/main/.scripts/setup_secure_boot.sh)
