---
title: Lidar Extrinsic Calibration
published: 2025-11-17
pinned: false
encrypted: true
password: "cwlm"
description: Robot Master Lidar Extrinsic Calibration Note.
tags: [lidar]
category: Robot Master
licenseName: "Unlicensed"
author: FuFu
draft: false
date: 2025-11-17
pubDate: 2025-11-17
---

# 雷达

<img src="/posts/25_11_17_lidar_extrinsic_calib/lidar.jpg" alt="Lidar Structure" width="60%">

队内雷达由两个主要部分组成：

- 雷达主体：包含激光发射器和接收器，用于扫描环境并生成点云数据。
- 相机： 三个相机分居于雷达主体上方以及左右两侧，用于捕捉环境图像，辅助雷达数据的处理和理解。

外参标定的目的是获得雷达坐标系与相机坐标系之间的转换关系，最后的结果由一个平移向量和一个四元数组成。

应对三个相机分别进行标定，得到三组参数。以下以中间相机为例进行说明。

# 标定流程

## 获取原始数据

连接并启动雷达，确保右上角设置中`Wired`启用

启动雷达驱动

```sh
source ~/ws_livox/install/setup.sh
ros2 launch ~/ws_livox/src/livox_ros2_driver/launch/livox_lidar_launch.py
```

利用`rviz2`查看点云数据

```sh
rviz2
```

> Note:
>
> 若`Status: Transfrom`中出现以下报错：
>
> ```
> Could not transform from [livox_frame] to [map]
> ```
>
> 尝试修改`Global Options`中的`Fixed Frame`为`livox_frame`

启动雷达采集节点

```sh
cd ~/workspace/rm.cv.radar2026
source /install/setup.sh
ros2 launch radar_sensor radar_sensor.launch.py
```

记录`/livox/lidar`以及`/camera/middle/image_raw` (中间相机图像)话题数据。

```sh
ros2 bag record -o lidar_camera_bag /livox/lidar /camera/middle/image_raw
```

会将这两个话题的数据保存到当前目录下`lidar_camera_bag`文件夹中。

## 标定

使用**Direct Visual Lidar Calibration**

- [Repository](https://github.com/koide3/direct_visual_lidar_calibration)
- [Docunment](https://koide3.github.io/direct_visual_lidar_calibration/)

进入该项目后，将采集的元数据放入`calib`文件夹中(一个 bag 文件一个文件夹)

### Preprocess

查文档把将实际的相机内参和畸变系数填入命令中，执行预处理命令：

```sh
ros2 run direct_visual_lidar_calibration preprocess \
calib middle_preprocess \
--image_topic /camera/middle/image_raw \
--points_topic /livox/lidar \
--camera_model plumb_bob \
--camera_intrinsics ...... \
--camera_distortion_coeffs ......
```

<img src="/posts/25_11_17_lidar_extrinsic_calib/param.jpg" alt="Lidar Structure" width="60%">

### Initial Guess

```sh
 ros2 run direct_visual_lidar_calibration initial_guess_manual middle_preprocess
```

手动将点云数据大致对齐到图像中，保存初始猜测结果。
详细操作可参考文档，有操作视频。

### Calibration

```sh
ros2 run direct_visual_lidar_calibration calibrate middle_preprocess
```

结果会输出到`calib.json`文件中。
