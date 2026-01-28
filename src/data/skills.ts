// Skill data configuration file
// Used to manage data for the skill display page

export interface Skill {
  id: string;
  name: string;
  description: string;
  icon: string; // Iconify icon name
  category: "frontend" | "backend" | "database" | "tools" | "other";
  level: "beginner" | "intermediate" | "advanced" | "expert";
  experience: {
    years: number;
    months: number;
  };
  projects?: string[]; // Related project IDs
  certifications?: string[];
  color?: string; // Skill card theme color
}

export const skillsData: Skill[] = [ // Frontend Skills
  {
    id: "elm",
    name: "Elm",
    description:
      "A functional programming language that compiles to JavaScript, specializing in creating reliable web-based user interfaces",
    icon: "simple-icons:elm",
    category: "frontend",
    level: "intermediate",
    experience: { years: 0, months: 6 },
    color: "#1293D8",
  },
  {
    id: "astro",
    name: "Astro",
    description: "A modern static site generator supporting multi-framework integration and excellent performance.",
    icon: "logos:astro-icon",
    category: "frontend",
    level: "beginner",
    experience: { years: 0, months: 1 },
    color: "#FF5D01",
  },
  // {
  //   id: "javascript",
  //   name: "JavaScript",
  //   description:
  //     "Modern JavaScript development, including ES6+ syntax, asynchronous programming, and modular development.",
  //   icon: "logos:javascript",
  //   category: "frontend",
  //   level: "advanced",
  //   experience: { years: 3, months: 6 },
  //   projects: ["mizuki-blog", "portfolio-website", "data-visualization-tool"],
  //   color: "#F7DF1E",
  // },
  // {
  //   id: "typescript",
  //   name: "TypeScript",
  //   description:
  //     "A type-safe superset of JavaScript that enhances code quality and development efficiency.",
  //   icon: "logos:typescript-icon",
  //   category: "frontend",
  //   level: "advanced",
  //   experience: { years: 2, months: 8 },
  //   projects: ["mizuki-blog", "portfolio-website", "task-manager-app"],
  //   color: "#3178C6",
  // },
  // {
  //   id: "react",
  //   name: "React",
  //   description:
  //     "A JavaScript library for building user interfaces, including Hooks, Context, and state management.",
  //   icon: "logos:react",
  //   category: "frontend",
  //   level: "advanced",
  //   experience: { years: 2, months: 10 },
  //   projects: ["portfolio-website", "task-manager-app"],
  //   color: "#61DAFB",
  // },
  // {
  //   id: "vue",
  //   name: "Vue.js",
  //   description:
  //     "A progressive JavaScript framework that is easy to learn and use, suitable for rapid development.",
  //   icon: "logos:vue",
  //   category: "frontend",
  //   level: "intermediate",
  //   experience: { years: 1, months: 8 },
  //   projects: ["data-visualization-tool"],
  //   color: "#4FC08D",
  // },
  // {
  //   id: "angular",
  //   name: "Angular",
  //   description:
  //     "An enterprise-level frontend framework developed by Google, a complete single-page application solution.",
  //   icon: "logos:angular-icon",
  //   category: "frontend",
  //   level: "beginner",
  //   experience: { years: 0, months: 9 },
  //   projects: ["enterprise-dashboard"],
  //   color: "#DD0031",
  // },
  // {
  //   id: "nextjs",
  //   name: "Next.js",
  //   description:
  //     "A production-level React framework supporting SSR, SSG, and full-stack development.",
  //   icon: "logos:nextjs-icon",
  //   category: "frontend",
  //   level: "intermediate",
  //   experience: { years: 1, months: 4 },
  //   projects: ["e-commerce-frontend", "blog-platform"],
  //   color: "#616161", // 更改为深灰色，避免纯黑色
  // },
  // {
  //   id: "nuxtjs",
  //   name: "Nuxt.js",
  //   description:
  //     "An intuitive Vue.js framework supporting server-side rendering and static site generation.",
  //   icon: "logos:nuxt-icon",
  //   category: "frontend",
  //   level: "beginner",
  //   experience: { years: 0, months: 6 },
  //   projects: ["vue-ssr-app"],
  //   color: "#00DC82",
  // },
  // {
  //   id: "tailwindcss",
  //   name: "Tailwind CSS",
  //   description:
  //     "A utility-first CSS framework for rapidly building modern user interfaces.",
  //   icon: "logos:tailwindcss-icon",
  //   category: "frontend",
  //   level: "advanced",
  //   experience: { years: 2, months: 0 },
  //   projects: ["mizuki-blog", "portfolio-website"],
  //   color: "#06B6D4",
  // },
  // {
  //   id: "sass",
  //   name: "Sass/SCSS",
  //   description:
  //     "A CSS preprocessor providing advanced features like variables, nesting, and mixins.",
  //   icon: "logos:sass",
  //   category: "frontend",
  //   level: "intermediate",
  //   experience: { years: 2, months: 3 },
  //   projects: ["legacy-website", "component-library"],
  //   color: "#CF649A",
  // },
  // {
  //   id: "webpack",
  //   name: "Webpack",
  //   description: "A static module bundler for modern JavaScript applications.",
  //   icon: "logos:webpack",
  //   category: "frontend",
  //   level: "intermediate",
  //   experience: { years: 1, months: 10 },
  //   projects: ["custom-build-tool", "spa-application"],
  //   color: "#8DD6F9",
  // },
  // {
  //   id: "vite",
  //   name: "Vite",
  //   description:
  //     "Next-generation frontend build tool with fast cold starts and hot updates.",
  //   icon: "logos:vitejs",
  //   category: "frontend",
  //   level: "intermediate",
  //   experience: { years: 1, months: 2 },
  //   projects: ["vue-project", "react-project"],
  //   color: "#646CFF",
  // },
];

// Get skill statistics
export const getSkillStats = () => {
  const total = skillsData.length;
  const byLevel = {
    beginner: skillsData.filter((s) => s.level === "beginner").length,
    intermediate: skillsData.filter((s) => s.level === "intermediate")
      .length,
    advanced: skillsData.filter((s) => s.level === "advanced").length,
    expert: skillsData.filter((s) => s.level === "expert").length,
  };
  const byCategory = {
    frontend: skillsData.filter((s) => s.category === "frontend").length,
    backend: skillsData.filter((s) => s.category === "backend").length,
    database: skillsData.filter((s) => s.category === "database").length,
    tools: skillsData.filter((s) => s.category === "tools").length,
    other: skillsData.filter((s) => s.category === "other").length,
  };

  return { total, byLevel, byCategory };
};

// Get skills by category
export const getSkillsByCategory = (category?: string) => {
  if (!category || category === "all") {
    return skillsData;
  }
  return skillsData.filter((s) => s.category === category);
};

// Get advanced skills
export const getAdvancedSkills = () => {
  return skillsData.filter(
    (s) => s.level === "advanced" || s.level === "expert",
  );
};

// Calculate total years of experience
export const getTotalExperience = () => {
  const totalMonths = skillsData.reduce((total, skill) => {
    return total + skill.experience.years * 12 + skill.experience.months;
  }, 0);
  return {
    years: Math.floor(totalMonths / 12),
    months: totalMonths % 12,
  };
};
