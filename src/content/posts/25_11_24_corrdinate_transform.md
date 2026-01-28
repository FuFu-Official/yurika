---
title: 3D Coordinate Transformation
published: 2025-11-24
pinned: false
description: 三维坐标变换
tags: [Robot Master, CV]
category: Robot Master
licenseName: "Unlicensed"
author: FuFu
draft: true
date: 2025-11-24
pubDate: 2025-11-24
---

# 三维位姿的描述

在三维空间中，物体的位姿(Pose)由位置(Position)和姿态(Orientation)两部分组成。

## 位置的描述

给定一组基底向量 $\hat{\mathbf{e}} = [\hat{\mathbf{e}}_1, \hat{\mathbf{e}}_2, \hat{\mathbf{e}}_3]^T$，可以确定世界坐标系。

在该坐标系下，位置矢量为$\vec{\mathbf{\alpha}}$的点，其坐标为：

$$
\mathbf{a} = \vec{\mathbf{\alpha}} \cdot \hat{\mathbf{e}} =

\begin{bmatrix}
a_1 \\ a_2 \\ a_3
\end{bmatrix}

=

\begin{bmatrix}
\vec{\mathbf{\alpha}} \cdot \hat{\mathbf{e}}_1
\\ \vec{\mathbf{\alpha}} \cdot \hat{\mathbf{e}}_2
\\ \vec{\mathbf{\alpha}} \cdot \hat{\mathbf{e}}_3
\end{bmatrix}
$$

则有：

$$
\vec{\mathbf{\alpha}} = \mathbf{a}^T  \cdot \hat{\mathbf{e}} =
a_1 \hat{\mathbf{e}}_1 + a_2 \hat{\mathbf{e}}_2 + a_3 \hat{\mathbf{e}}_3
$$

## 姿态的描述

姿态的描述本质上就是描述世界坐标系 $\hat{\mathbf{e}}_{w} = [\hat{\mathbf{x}}_{w}, \hat{\mathbf{y}}_{w}, \hat{\mathbf{z}}_{w}]^T$
与物体自身坐标系 $\hat{\mathbf{e}}_{b} = [\hat{\mathbf{x}}_{b}, \hat{\mathbf{y}}_{b}, \hat{\mathbf{z}}_{b}]^T$
之间的三维旋转关系。

### 旋转矩阵

假设末个点在两个坐标系下的坐标分别为 $\mathbf{w}_a$ 和 $\mathbf{b}_a$，则有：

$$
\hat{\mathbf{e}}_{w}^T \cdot mathbf{w}_a  = \hat{\mathbf{e}}_{b}^T \cdot mathbf{b}_a
$$

同时左乘 $\hat{\mathbf{e}}_{w}$ ，得到：

$$
\mathbf{w}_a  = \underbrace{(\hat{\mathbf{e}}_{w} \cdot \hat{\mathbf{e}}_{b}^T)}_{\mathbf{R}} \cdot \mathbf{b}_a
$$

其中，$\mathbf{R}$ 即为旋转矩阵(Rotation Matrix)，描述了两个坐标系之间的旋转关系。

$$
\mathbf{R} =
\hat{\mathbf{e}}_{w} \cdot \hat{\mathbf{e}}_{b}^T =
\begin{bmatrix}
\hat{\mathbf{x}}_{w} \cdot \hat{\mathbf{x}}_{b} & \hat{\mathbf{x}}_{w} \cdot \hat{\mathbf{y}}_{b} & \hat{\mathbf{x}}_{w} \cdot \hat{\mathbf{z}}_{b} \\
\hat{\mathbf{y}}_{w} \cdot \hat{\mathbf{x}}_{b} & \hat{\mathbf{y}}_{w} \cdot \hat{\mathbf{y}}_{b} & \hat{\mathbf{y}}_{w} \cdot \hat{\mathbf{z}}_{b} \\
\hat{\mathbf{z}}_{w} \cdot \hat{\mathbf{x}}_{b} & \hat{\mathbf{z}}_{w} \cdot \hat{\mathbf{y}}_{b} & \hat{\mathbf{z}}_{w} \cdot \hat{\mathbf{z}}_{b}
\end{bmatrix}
$$

由于各基向量均为单位向量，故矩阵的元素其实均为各坐标基间夹角的余弦。因此以上矩阵也被称为方向余弦矩阵(Direction Cosine Matrix, DCM)。

此外，旋转矩阵是一个正交矩阵(Orthogonal Matrix), 即 $\mathbf{R}^T = \mathbf{R}^{-1}$。
在右手坐标系下，旋转矩阵的行列式 (Determinant) 为1，即 $\det(\mathbf{R}) = 1$。

### 旋转的其他描述

用旋转矩阵描述三维旋转虽然直观，但存在一定的缺陷，例如需要9个参数描述3个自由度，且存在万向锁(Gimbal Lock)问题。
因此，实际应用中常用其他方法描述三维旋传。

#### 旋转向量

给定其上单位向量为 $\hat{\mathbf{n}}$ 的某一旋转轴和旋转角度 $\theta$ (右手为正方向)，则旋转向量为：

$$


$$

#### 欧拉角

#### 四元数
