// 日记数据配置
// 用于管理日记页面的数据

export interface DiaryItem {
  id: number;
  content: string;
  date: string;
  images?: string[];
  location?: string;
  mood?: string;
  tags?: string[];
}

// 示例日记数据
const diaryData: DiaryItem[] = [
  {
    id: 3,
    content: "Enjoying the birthday surprise from my college club. 🎂",
    date: "2026-03-15T22:40:00+08:00",
    images: [
      "/images/diary/cake.jpg",
    ],
  },
  {
    id: 2,
    content:
      "五连冠～！第八冠！🏆🏆🏆🏆🏆🎉🎉🎉🎉🎉 恭喜成都AG超玩会夺得2025KPL年度总决赛总冠军！恭喜一诺拿下生涯第二个FMVP! 王朝还在继续！🔥🔥🔥",
    date: "2025-11-08T23:00:00+08:00",
    images: [
      "/images/diary/AG.avif",
      "/images/diary/AG2.avif",
      "/images/diary/yinuo3.avif",
      "/images/diary/yinuo1.avif",
      "/images/diary/yinuo2.avif",
    ],
  },
  {
    id: 1,
    content:
      "My blog got 520 views today — though most of them are probably bots, it still feels nice to see the number 🥹.",
    date: "2025-10-29T22:30:00+08:00",
    images: ["/images/diary/520.png"],
  },
];

// 获取日记统计数据
export const getDiaryStats = () => {
  const total = diaryData.length;
  const hasImages = diaryData.filter(
    (item) => item.images && item.images.length > 0,
  ).length;
  const hasLocation = diaryData.filter((item) => item.location).length;
  const hasMood = diaryData.filter((item) => item.mood).length;

  return {
    total,
    hasImages,
    hasLocation,
    hasMood,
    imagePercentage: Math.round((hasImages / total) * 100),
    locationPercentage: Math.round((hasLocation / total) * 100),
    moodPercentage: Math.round((hasMood / total) * 100),
  };
};

// 获取日记列表（按时间倒序）
export const getDiaryList = (limit?: number) => {
  const sortedData = diaryData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  if (limit && limit > 0) {
    return sortedData.slice(0, limit);
  }

  return sortedData;
};

// 获取最新的日记
export const getLatestDiary = () => {
  return getDiaryList(1)[0];
};

// 根据ID获取日记
export const getDiaryById = (id: number) => {
  return diaryData.find((item) => item.id === id);
};

// 获取包含图片的日记
export const getDiaryWithImages = () => {
  return diaryData.filter((item) => item.images && item.images.length > 0);
};

// 根据标签筛选日记
export const getDiaryByTag = (tag: string) => {
  return diaryData
    .filter((item) => item.tags?.includes(tag))
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
};

// 获取所有标签
export const getAllTags = () => {
  const tags = new Set<string>();
  diaryData.forEach((item) => {
    if (item.tags) {
      item.tags.forEach((tag) => tags.add(tag));
    }
  });
  return Array.from(tags).sort();
};

export default diaryData;
