---
title: Disable Touchpad in Hyprland
published: 2025-10-29
pinned: false
description: A guide on how to disable the touchpad in Hyprland using commands and configuration files.
tags: [Hyprland, Linux, Arch, Configuration]
category: Linux
licenseName: "Unlicensed"
author: FuFu
draft: false
date: 2025-10-29
pubDate: 2025-10-29
---

Hyprland is a dynamic tiling Wayland compositor that offers extensive customization options.
If you want to disable the touchpad on your system while using Hyprland, you can do so by following these steps.

Hyprland 是一个动态平铺的 Wayland 合成器，提供了广泛的自定义选项。如果您想在使用 Hyprland 时禁用触摸板，可以按照以下步骤操作。

## Step 1: Identify Your Touchpad Device

```sh
hyprctl devices
```

Firstly, use this command to list all input devices connected to your system.
Here, `hyprctl` is the command-line tool for Hyprland.
The `devices` parameter is used to list all recognized input devices.
Find the device that contains "touchpad" in its name and note down its name.

首先，使用此命令列出连接到系统的所有输入设备。其中`hyprctl`是 Hyprland 的命令行工具。`devices`参数用于列出所有已识别的输入设备。找到带有“touchpad”字样的设备，并记下其名称。

sample output:

```sh
Mouse at 55d441d40460:
	asuf1207:00-2808:0219-touchpad  # Device name: asuf1207:00-2808:0219-touchpad
		default speed: 0.00000
		scroll factor: -1.00
```

:::note
The output of the command is typically organized by device type:

通常，这条命令的输出按设备类型组织：

- Mice: Shows the device name, speed, and other properties.
- Keyboards: Lists the name, rules, active keymap, and the status of Caps Lock and Num Lock.
- Tablets: Displays information for touchscreens and styluses.
- Touch: Provides details about touch input devices.
- Switches: Provides details about any other input-related devices, like power/lid events.

However, the touchpad does not always appear under the "Touch" category; sometimes it may be recognized as a mouse device, so make sure to check the device list carefully.

然而，触摸板并不会总是出现在“Touch”类别下，有时它会被识别为鼠标设备，因此请确保仔细检查设备列表。
:::

## Step 2: Disable the Touchpad

:::note
If you only want to disable the touchpad while typing to avoid accidental cursor movements, you can add the following section to your Hyprland configuration file:

如果您只想在打字时禁用触摸板以避免误触，可以将以下部分添加到您的 Hyprland 配置文件中：

```sh
input {
    touchpad {
        disable_while_typing = true
    }
}
```

More options for touchpad configuration can be found in the [Hyprland Wiki - Touchpad Variable](https://wiki.hypr.land/Configuring/Variables/#touchpad).
:::

### Using hyprctl CLI

Use the following command to disable the touchpad by replacing `<device_name>` with the actual name of your touchpad device identified in Step1.

使用以下命令禁用触摸板，将`<device_name>`替换为在步骤 1 中识别的实际触摸板设备名称。

```sh
hyprctl keyword 'device[<device_name>]:enabled' 'false'
```

### Using Hyprland Configuration File

#### Set Keybindings

Alternatively, you can disable the touchpad by adding a line to your Hyprland configuration file, typically located at `~/.config/hypr/hyprland.conf`.
The following example maps the key combination `Super + Alt + P` to disable the touchpad and `Ctrl + Super + Alt + P` to enable it again.

另外，您也可以通过将一行添加到您的 Hyprland 配置文件（通常位于`~/.config/hypr/hyprland.conf`）中来禁用触摸板。以下示例将键组合`Super + Alt + P`映射为禁用触摸板，`Ctrl + Super + Alt + P`则重新启用它。

```sh
bind = Super+Alt, P, exec, hyprctl keyword 'device[<device_name>]:enabled' 'false' # Disable touchpad
bind = Ctrl+Super+Alt, P, exec, hyprctl keyword 'device[<device_name>]:enabled' 'true' # Enable touchpad
```

Here, `bind` is used to create key bindings. `exec` indicates that the following command should be executed when the key combination is pressed.

在这里，`bind`用于创建键绑定。`exec`表示当按下键组合时应执行后续命令。

#### Create a Toggle Script

```sh
#!/usr/bin/env bash

#
# Script to toggle a given device.
# Use the following command to choose what device you want to toggle:
#   hyprctl devices
#
# Replace <device_name> with your touchpad device name in the line below.
#
# The script will create a status file at $XDG_RUNTIME_DIR/touchpad.status
# to remember the last known status of the touchpad.
# If the file does not exist, it assumes the touchpad is enabled by default.
#

# HACK: Try to set a nonexistent config under "device:" so that
# Hyprland refreshes all properties inside.
hyprctl keyword device:a true > /dev/null 2>&1

# Set device to be toggled
HYPRLAND_DEVICE=<device_name> # Replace <device_name> with your touchpad device name
export HYPRLAND_VARIABLE="device[${HYPRLAND_DEVICE}]:enabled"

if [ -z "$XDG_RUNTIME_DIR" ]; then
  export XDG_RUNTIME_DIR=/run/user/$(id -u)
fi

# Check if device is currently enabled
export STATUS_FILE="$XDG_RUNTIME_DIR/touchpad.status"

# Try to get the touchpad status from status file.
if [ -f "$STATUS_FILE" ]; then
  export TOUCHPAD_ENABLED="$(cat "$STATUS_FILE")"
fi

# Toggle the touchpad
if [ "$TOUCHPAD_ENABLED" != "false" ]; then
  # The touchpad is known to be, or assumed to be, enabled (not disabled).
  export PREVIOUS_STATUS="true"
  export TOUCHPAD_ENABLED="false"
  # Try to disable the touchpad. If it fails, set the new status to enabled.
  hyprctl --batch -r -- keyword "$HYPRLAND_VARIABLE" $TOUCHPAD_ENABLED || export TOUCHPAD_ENABLED="true"
else
  # The touchpad is known to be disabled.
  export PREVIOUS_STATUS="false"
  export TOUCHPAD_ENABLED="true"
  # Try to enable the touchpad. If it fails, set the new status to disabled.
  hyprctl --batch -r -- keyword "$HYPRLAND_VARIABLE" $TOUCHPAD_ENABLED || export TOUCHPAD_ENABLED="false"
fi

# Write the new touchpad status into the status file.
echo "$TOUCHPAD_ENABLED" > "$STATUS_FILE"

# Generate the notification message.
export NOTIFMSG="Touchpad "

if [ "$TOUCHPAD_ENABLED" == "$PREVIOUS_STATUS" ]; then
  export NOTIFMSG+="could not be "
  # Touchpad could not be...
fi

if [ "$PREVIOUS_STATUS" == "true" ]; then
  export NOTIFMSG+="disabled."
  # Touchpad (could not be) disabled.
else
  export NOTIFMSG+="enabled."
  # Touchpad (could not be) enabled.
fi

notify-send -u normal "$NOTIFMSG" # Send notification(delete this line if you don't want notifications)
```

Save this script to a file, for example `touchpad_toggle.sh`, and make it executable with:

保存此脚本到一个文件，例如 `touchpad_toggle.sh`，并通过以下命令使其可执行：

```sh
chmod +x touchpad_toggle.sh
```

The binding in the Hyprland configuration file would look like this:

与之对应的 Hyprland 配置文件中的绑定如下所示：

```sh
bind = Super+Alt, P, exec, /path/to/touchpad_toggle.sh # Toggle touchpad
```

## Reference

- [Hyprland Wiki - Touchpad Variable](https://wiki.hypr.land/Configuring/Variables/#touchpad)
- [Hyprland Issue #6974](https://github.com/hyprwm/Hyprland/issues/6974)
- [Toggle touchpad script](https://github.com/dianaw353/dotfiles/blob/main/roles/hyprland/files/hypr/scripts/touchpad_toggle.sh)
