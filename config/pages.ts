import { ValidPages } from "./constants";

type PagesConfig = {
  [key in ValidPages]: {
    title: string;
    description: string;
    metadata: {
      title: string;
      description: string;
    };
    // featuredDescription: string;
  };
};

export const pagesConfig: PagesConfig = {
  home: {
    title: "Home",
    description: "Welcome to my portfolio website.",
    metadata: {
      title: "Home",
      description: "NghiaCH's portfolio website.",
    },
  },
  projects: {
    title: "Projects",
    description: "Showcasing impactful projects and technical achievements.",
    metadata: {
      title: "Projects",
      description: "Projects showcase",
    },
  },
  contact: {
    title: "Contact",
    description: "Let's connect and explore collaborations.",
    metadata: {
      title: "Contact",
      description: "Contact Nghia Chung.",
    },
  },
  blog: {
    title: "Blog",
    description:
      "Tổng hợp ghi chép cá nhân về kỹ thuật, kiến trúc và quy trình làm việc.",
    metadata: {
      title: "Blog",
      description: "Những bài viết ngắn gọn, thực tế từ kinh nghiệm làm việc.",
    },
  },
};
