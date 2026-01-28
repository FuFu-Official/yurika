// 本地游戏数据配置
export type GameItem = {
  title: string;
  status: "playing" | "completed" | "planned" | "onhold" | "dropped";
  rating: number;
  cover: string;
  description: string;
  playtime: string;
  year: string;
  genre: string[];
  developer: string;
  link: string;
  progress: number;
  totalProgress: number;
  platform: string;
};

const localGameList: GameItem[] = [
  {
    title: "塞尔达传说：王国之泪",
    status: "playing",
    rating: 9.8,
    cover: "/assets/game/zelda-totk.webp",
    description: "任天堂开放世界冒险游戏的巅峰之作",
    playtime: "120小时",
    year: "2023",
    genre: ["动作冒险", "开放世界"],
    developer: "Nintendo",
    link: "https://www.nintendo.com/games/detail/the-legend-of-zelda-tears-of-the-kingdom-switch/",
    progress: 75,
    totalProgress: 100,
    platform: "Nintendo Switch",
  },
  {
    title: "艾尔登法环",
    status: "completed",
    rating: 9.5,
    cover: "/assets/game/elden-ring.webp",
    description: "FromSoftware与宫崎英高的魂系开放世界大作",
    playtime: "200小时",
    year: "2022",
    genre: ["动作RPG", "魂系"],
    developer: "FromSoftware",
    link: "https://store.steampowered.com/app/1245620/ELDEN_RING/",
    progress: 100,
    totalProgress: 100,
    platform: "PC",
  },
  {
    title: "博德之门3",
    status: "planned",
    rating: 9.7,
    cover: "/assets/game/bg3.webp",
    description: "Larian Studios的CRPG杰作",
    playtime: "0小时",
    year: "2023",
    genre: ["RPG", "回合制"],
    developer: "Larian Studios",
    link: "https://store.steampowered.com/app/1086940/Baldurs_Gate_3/",
    progress: 0,
    totalProgress: 100,
    platform: "PC",
  },
];

export default localGameList;
