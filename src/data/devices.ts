// 设备数据配置文件

export interface Device {
	name: string;
	image: string;
	specs: string;
	description: string;
	link: string;
}

// 设备类别类型，支持品牌和自定义类别
export type DeviceCategory = {
	[categoryName: string]: Device[];
} & {
	自定义?: Device[];
};

export const devicesData: DeviceCategory = {
  Laptop: [
    {
      name: "ROG Zephyrus G16",
      image: "/images/device/laptop.png",
      specs: "Gray / 32G + 1TB",
      description:
        "Featuring an Intel Core Ultra 9 processor 285H and up to an NVIDIA GeForce RTX 5090 Laptop GPU.",
      link: "https://rog.asus.com/laptops/rog-zephyrus/rog-zephyrus-g16-2025-gu605/",
    },
  ],
};
