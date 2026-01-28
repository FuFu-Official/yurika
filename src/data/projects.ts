// Project data configuration file
// Used to manage data for the project display page

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: "web" | "mobile" | "desktop" | "other";
  techStack: string[];
  status: "completed" | "in-progress" | "planned";
  liveDemo?: string;
  sourceCode?: string;
  startDate: string;
  endDate?: string;
  featured?: boolean;
  tags?: string[];
  visitUrl?: string; // 添加前往项目链接字段
}

export const projectsData: Project[] = [
  {
    id: "ghostbust_hotline",
    title: "Ghostbust Hotline",
    description: "A 2D top-down dungeon-crawling shooter RPG featuring intense action and strategic gameplay.",
    image: "/posts/ghostbust_hotline/thumbnail.jpg",
    category: "web",
    techStack: ["Elm", "JavaScript"],
    status: "completed",
    liveDemo: "https://focs.ji.sjtu.edu.cn/silverfocs/demo/2025/p2team02/",
    sourceCode: "https://github.com/FuFutheBest/ENGR100/tree/main/project2", // 更改为GitHub链接
    visitUrl: "https://yur1ka.netlify.app/posts/25_10_28_ghostbust_hotline/", // 添加前往项目链接
    startDate: "2024-01-01",
    endDate: "2024-06-01",
    featured: false,
    tags: ["GameDev", "WebDev"],
  },
];

// Get project statistics
export const getProjectStats = () => {
  const total = projectsData.length;
  const completed = projectsData.filter(
    (p) => p.status === "completed",
  ).length;
  const inProgress = projectsData.filter(
    (p) => p.status === "in-progress",
  ).length;
  const planned = projectsData.filter((p) => p.status === "planned").length;

  return {
    total,
    byStatus: {
      completed,
      inProgress,
      planned,
    },
  };
};

// Get projects by category
export const getProjectsByCategory = (category?: string) => {
  if (!category || category === "all") {
    return projectsData;
  }
  return projectsData.filter((p) => p.category === category);
};

// Get featured projects
export const getFeaturedProjects = () => {
  return projectsData.filter((p) => p.featured);
};

// Get all tech stacks
export const getAllTechStack = () => {
  const techSet = new Set<string>();
  projectsData.forEach((project) => {
    project.techStack.forEach((tech) => {
      techSet.add(tech);
    });
  });
  return Array.from(techSet).sort();
};
