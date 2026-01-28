// 本地书籍数据配置
export type BookItem = {
   title: string;
   status: "reading" | "completed" | "planned" | "onhold" | "dropped";
   rating: number;
   cover: string;
   description: string;
   chapters: string;
   year: string;
   genre: string[];
   author: string;
   link: string;
   progress: number;
   totalChapters: number;
   publisher: string;
};

const localBookList: BookItem[] = [
   {
      title: "三体",
      status: "completed",
      rating: 9.5,
      cover: "/assets/book/santi.webp",
      description: "刘慈欣的科幻巨作，讲述人类与三体文明的史诗对决",
      chapters: "3卷",
      year: "2008",
      genre: ["科幻", "硬科幻"],
      author: "刘慈欣",
      link: "https://book.douban.com/subject/2567698/",
      progress: 3,
      totalChapters: 3,
      publisher: "重庆出版社",
   },
   {
      title: "百年孤独",
      status: "reading",
      rating: 9.2,
      cover: "/assets/book/bainian.webp",
      description: "马尔克斯的魔幻现实主义代表作",
      chapters: "20章",
      year: "1967",
      genre: ["文学", "魔幻现实主义"],
      author: "加西亚·马尔克斯",
      link: "https://book.douban.com/subject/6082808/",
      progress: 12,
      totalChapters: 20,
      publisher: "南海出版公司",
   },
   {
      title: "1984",
      status: "planned",
      rating: 9.0,
      cover: "/assets/book/1984.webp",
      description: "乔治·奥威尔的反乌托邦经典",
      chapters: "23章",
      year: "1949",
      genre: ["反乌托邦", "政治小说"],
      author: "乔治·奥威尔",
      link: "https://book.douban.com/subject/4820710/",
      progress: 0,
      totalChapters: 23,
      publisher: "北京十月文艺出版社",
   },
];

export default localBookList;
