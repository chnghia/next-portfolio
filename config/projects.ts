import { ValidCategory, ValidExpType, ValidSkills } from "./constants";

interface PagesInfoInterface {
  title: string;
  imgArr: string[];
  description?: string;
}

interface DescriptionDetailsInterface {
  paragraphs: string[];
  bullets: string[];
}

export interface ProjectInterface {
  id: string;
  type: ValidExpType;
  companyName: string;
  category: ValidCategory[];
  shortDescription: string;
  websiteLink?: string;
  githubLink?: string;
  youtubeLink?: string;
  techStack: ValidSkills[];
  startDate: Date;
  endDate: Date;
  companyLogoImg: any;
  descriptionDetails: DescriptionDetailsInterface;
  pagesInfoArr: PagesInfoInterface[];
}

export const Projects: ProjectInterface[] = [
  {
    "id": "smart-portfolio-ai",
    "companyName": "Smart Portfolio AI",
    "type": "Personal",
    "category": ["Developer Tools", "Automation", "Generative AI"],
    "shortDescription": "An intelligent automation tool that leverages Generative AI to transform raw project artifacts into professional technical portfolios, streamlining documentation for developers.",
    "websiteLink": "#",
    "techStack": [
      "Python",
      "Bash",
      "Gemini API",
      "LM Studio",
      "JSON",
      "jq"
    ],
    "startDate": new Date("2025-11-21"),
    "endDate": new Date("2025-11-30"),
    "companyLogoImg": "/showcases/portfolio-1@2x.png",
    "descriptionDetails": {
      "paragraphs": [
        "For software engineers, maintaining an up-to-date portfolio is often a neglected task due to the significant time and effort required for documentation. Smart Portfolio AI solves this problem by automating the creation of technical showcases. It is designed for developers and tech leads who need to present their work professionally without diverting valuable time from coding, effectively bridging the gap between raw code and polished presentation.",
        "The system utilizes a modular architecture that integrates local file system scanning with powerful Large Language Models (LLMs). By leveraging the Gemini API and local inference via LM Studio, it ensures flexibility and data privacy. The core workflow involves a sophisticated context-splitting mechanism to handle large codebases and a robust error-handling layer. Built with Python for logic and Bash/jq for rapid data orchestration, the tool delivers a seamless, high-performance experience."
      ],
      "bullets": [
        "Designed and implemented the core automation bash script, reducing manual documentation time by approximately 80%.",
        "Integrated dual LLM support (Gemini API and local LM Studio), optimizing for both cost and high-fidelity output.",
        "Developed a resilient JSON parsing pipeline using jq to ensure strict data structure compliance and error handling."
      ]
    },
    "pagesInfoArr": [
    ]
  },
  {
    "id": "golf-detect",
    "companyName": "Golf Detect",
    "type": "Professional",
    "category": ["AI", "SportsTech", "Computer Vision"],
    "shortDescription": "A cross-platform mobile solution utilizing custom YOLO models to provide real-time automated analytics for golf swings and ball trajectory tracking.",
    "websiteLink": "#",
    "techStack": [
      "YOLO",
      "Python",
      "Swift",
      "iOS",
      "Android",
      "Computer Vision",
      "Edge AI"
    ],
    "startDate": new Date("2025-02-01"),
    "endDate": new Date("2025-05-31"),
    "companyLogoImg": "/showcases/golf-2@2x.png",
    "youtubeLink": "https://www.youtube.com/embed/IG5eS9ZTEBQ",
    "descriptionDetails": {
      "paragraphs": [
        "Golf Detect democratizes professional-level sports analytics by offering an automated tool for golfers to analyze their swing mechanics and ball trajectory. Designed for seamless use during training and practice, the application visualizes the complex physics of golf swings, providing users with immediate, actionable feedback to improve their game without the need for expensive, specialized hardware.",
        "The system architecture is built upon a robust computer vision pipeline featuring a custom-trained YOLO model optimized for edge deployment. By processing video feeds directly on iOS and Android devices, the system ensures data privacy and low-latency performance. The engineering effort focused heavily on model quantization and native integration, allowing for high-precision detection and trajectory rendering in real-time on mobile processors."
      ],
      "bullets": [
        "Spearheaded the complete AI development lifecycle, from curating a proprietary dataset to training and fine-tuning YOLO models for high-accuracy ball and club detection.",
        "Engineered an efficient deployment strategy for mobile platforms, optimizing model size and inference speed to ensure smooth performance on both iOS and Android devices.",
        "Designed and implemented post-processing algorithms to visualize trajectory effects, bridging raw detection data with intuitive user feedback mechanisms."
      ]
    },
    "pagesInfoArr": [
      {
        "title": "Swing Analysis Dashboard",
        "description": "Real-time visualization of swing mechanics with pose estimation overlays, helping users correct form instantly.",
        "imgArr": ["/showcases/golf-3@2x.png"]
      },
      {
        "title": "Trajectory & Effect Visualization",
        "description": "Advanced tracking module that renders the ball's flight path and swing effects, providing immediate visual feedback on shot quality.",
        "imgArr": ["/showcases/golf-4@2x.png"]
      }
    ]
  },
  {
    "id": "ball-tracking",
    "companyName": "Ball Tracking",
    "type": "Professional",
    "category": ["Computer Vision", "AI", "Sports Tech"],
    "shortDescription": "A real-time cross-platform mobile application for high-speed ball detection and trajectory tracking using optimized YOLO models.",
    "websiteLink": "#",
    "techStack": [
      "YOLO",
      "Python",
      "Swift",
      "iOS",
      "Android",
      "Computer Vision"
    ],
    "startDate": new Date("2025-02-01"),
    "endDate": new Date("2025-05-01"),
    "companyLogoImg": "/showcases/ball-1@2x.png",
    "youtubeLink": "https://www.youtube.com/embed/Nqo4J3zkzq8",
    "descriptionDetails": {
      "paragraphs": [
        "This project addresses the challenge of accurately capturing and analyzing high-velocity objects in sports environments without expensive hardware. Designed for coaches and enthusiasts, the application provides real-time visual feedback on ball trajectories, enabling immediate performance analysis and broadcast-quality visualization directly on consumer mobile devices.",
        "The technical architecture centers on a custom-trained YOLO neural network, fine-tuned for small object detection and rapid inference. The system was architected to bridge Python-based model training with native mobile environments (Swift for iOS, Java/Kotlin for Android), utilizing edge-optimized runtimes to ensure low-latency tracking and smooth rendering of trajectory overlays on live video feeds."
      ],
      "bullets": [
        "Engineered a high-performance Proof of Concept (PoC) utilizing YOLO to detect fast-moving balls with high precision in varying lighting conditions.",
        "Led the technical strategy and cross-platform development roadmap, successfully securing a client contract based on the PoC's performance.",
        "Optimized computer vision pipelines for mobile edge deployment, balancing detection accuracy with real-time frame rate requirements."
      ]
    },
    "pagesInfoArr": [
      {
        "title": "Real-Time Trajectory View",
        "description": "Live camera interface overlaying detection bounding boxes and historical path lines on moving balls.",
        "imgArr": ["/showcases/ball-2@2x.png"]
      },
      {
        "title": "Analysis Dashboard",
        "description": "Post-capture review screen allowing users to replay tracked shots and view derived metrics.",
        "imgArr": ["/showcases/ball-3@2x.png"]
      },
    ]
  },
  {
    id: "attendance-emotion",
    companyName: "Attendance Emotion System",
    type: "Professional",
    category: ["AI", "Mobile", "SaaS"],
    shortDescription:
      "Hệ thống chấm công thông minh sử dụng AI để nhận diện khuôn mặt, phân tích cảm xúc và cung cấp báo cáo thời gian thực trên iOS/Android.",
    // githubLink: "https://github.com/namanbarkiya/apex-shopping-app",
    techStack: ["Python", "Swift", "iOS", "Android"],
    startDate: new Date("2021-07-14"),
    endDate: new Date("2022-07-01"),
    companyLogoImg: "/showcases/attendance-1@2x.png",
    "youtubeLink": "https://www.youtube.com/embed/HaCVekv5wCo",
    pagesInfoArr: [
    ],
    descriptionDetails: {
      paragraphs: [
      ],
      bullets: [
      ],
    },
  },
  {
    id: "counting",
    companyName: "Rice Bag Counting",
    type: "Professional",
    category: ["AI", "Computer Vision", "Logistics"],
    shortDescription: "Hệ thống đếm bao gạo thời gian thực sử dụng AI giúp tối ưu quản lý tồn kho.",
    // websiteLink: "https://blog.builtdesign.in",
    techStack: ["Python", "YOLO"],
    startDate: new Date("2022-03-01"),
    endDate: new Date("2022-07-01"),
    companyLogoImg: "/showcases/counting-1@2x.png",
    youtubeLink: "https://www.youtube.com/embed/8ah5By6rRm8",
    pagesInfoArr: [
    ],
    descriptionDetails: {
      paragraphs: [
      ],
      bullets: [
      ],
    },
  },
  {
    id: "gesture-controller",
    companyName: "Gesture Controller Signage",
    type: "Personal",
    category: ["AI", "Edge Computing", "Computer Vision"],
    shortDescription:
      "Hệ thống điều khiển bằng cử chỉ sử dụng Edge AI, Mediapipe để mang lại trải nghiệm không chạm cho các thiết bị hiển thị.",
    techStack: ["Python", "Edge AI", "Mediapipe", "YOLO", "OpenCV"],
    startDate: new Date("2022-03-01"),
    endDate: new Date("2022-07-01"),
    companyLogoImg: "/showcases/gesture-1@2x.png",
    youtubeLink: "https://www.youtube.com/embed/Kyb9bFO81Qk",
    pagesInfoArr: [
    ],
    descriptionDetails: {
      paragraphs: [
      ],
      bullets: [
      ],
    },
  },
  {
    id: "eye-tracking",
    companyName: "Eye Tracking Model",
    type: "Professional",
    category: ["AI", "Computer Vision", "3D Rendering"],
    shortDescription:
      "Model theo dõi mắt bằng AI, tích hợp vào engine 3D để tạo trải nghiệm người dùng thời gian thực.",
    // websiteLink: "https://cirql-ui.namanbarkiya.xyz/",
    techStack: ["Python"],
    startDate: new Date("2023-01-01"),
    endDate: new Date("2023-02-15"),
    companyLogoImg: "/showcases/eye-track-1@2x.png",
    youtubeLink: "https://www.youtube.com/embed/JrbWkPPcGV8",
    pagesInfoArr: [
    ],
    descriptionDetails: {
      paragraphs: [
      ],
      bullets: [
      ],
    },
  },
  {
    id: "inspection-factory",
    companyName: "Inspection Factory",
    type: "Professional",
    category: ["AI", "Manufacturing", "Computer Vision"],
    shortDescription: "Tự động phát hiện lỗi sản phẩm trong dây chuyền bằng mô hình Deep Learning trên đa nền tảng.",
    // websiteLink: "https://hindityping.namanbarkiya.xyz",
    // githubLink: "https://github.com/namanbarkiya/inscript-hindi-keyboard",
    techStack: ["Python", "ResNet", "Machine Learning", "Windows"],
    startDate: new Date("2022-05-01"),
    endDate: new Date("2022-06-15"),
    companyLogoImg: "/showcases/inspection-1@2x.png",
    youtubeLink: "https://www.youtube.com/embed/3NO7bw_2yOw",
    pagesInfoArr: [
    ],
    descriptionDetails: {
      paragraphs: [
      ],
      bullets: [
      ],
    },
  },
  {
    id: "automated-structural-design",
    companyName: "Automated Structural Design",
    type: "Professional",
    category: ["AI", "ConstructionTech"],
    shortDescription:
      "Tự động hoá quy trình thiết kế kết cấu trong xây dựng với Deep Learning và ETABS, triển khai trên nền Python/FastAPI/Docker.",
    // websiteLink: "https://hindityping.namanbarkiya.xyz",
    // githubLink: "https://github.com/namanbarkiya/inscript-hindi-keyboard",
    techStack: ["HTML 5", "CSS 3", "Javascript"],
    startDate: new Date("2022-05-01"),
    endDate: new Date("2022-06-15"),
    companyLogoImg: "/showcases/structural-2@2x.png",
    pagesInfoArr: [
    ],
    descriptionDetails: {
      paragraphs: [
      ],
      bullets: [
      ],
    },
  },
  {
    id: "face-emotion",
    companyName: "Face Emotion Recognition",
    type: "Professional",
    category: ["AI", "Mobile", "Computer Vision"],
    shortDescription:
      "Hệ thống nhận diện cảm xúc khuôn mặt thời gian thực trên thiết bị di động và triển khai đa nền tảng iOS & Android.",
    techStack: ["HTML 5", "CSS 3", "Javascript"],
    startDate: new Date("2022-05-01"),
    endDate: new Date("2022-06-15"),
    companyLogoImg: "/showcases/emotion-1@2x.png",
    youtubeLink: "https://www.youtube.com/embed/eubkC2m4QAs",
    pagesInfoArr: [
    ],
    descriptionDetails: {
      paragraphs: [
      ],
      bullets: [
      ],
    },
  },
  {
    id: "hair-segmentation-model",
    companyName: "Hair Segmentation Model",
    type: "Professional",
    category: ["AI", "Mobile", "Computer Vision"],
    shortDescription: "Xây dựng mô hình phân đoạn tóc trên iOS bằng Python, MobileNet",
    techStack: ["Python", "MobileNet"],
    startDate: new Date("2022-05-01"),
    endDate: new Date("2022-06-15"),
    companyLogoImg: "/showcases/hair-1@2x.png",
    youtubeLink: "https://www.youtube.com/embed/KEBcxqcqJXA",
    pagesInfoArr: [
    ],
    descriptionDetails: {
      paragraphs: [
      ],
      bullets: [
      ],
    },
  },
  {
    id: "zitavn-property-listing-system",
    companyName: "ZITAVN - Property Listing System",
    type: "Professional",
    category: ["Real Estate", "SaaS"],
    shortDescription: "Hệ thống danh sách bất động sản dựa trên geo‑location",
    techStack: ["Python", "MobileNet"],
    startDate: new Date("2022-05-01"),
    endDate: new Date("2022-06-15"),
    companyLogoImg: "/showcases/zita-1@2x.png",
    pagesInfoArr: [
    ],
    descriptionDetails: {
      paragraphs: [
      ],
      bullets: [
      ],
    },
  },
  {
    id: "tabicajp",
    companyName: "TABICA",
    type: "Professional",
    category: ["Marketplace", "SaaS"],
    shortDescription: "Nền tảng thương mại điện tử cho việc mua‑bán tour văn hoá và hàng hóa, được xây dựng bằng Ruby on Rails & React.",
    techStack: ["Ruby", "Rails", "React", "Redux", "PostgreSQL"],
    startDate: new Date("2022-05-01"),
    endDate: new Date("2022-06-15"),
    companyLogoImg: "/showcases/tabica-1@2x.png",
    pagesInfoArr: [
    ],
    descriptionDetails: {
      paragraphs: [
      ],
      bullets: [
      ],
    },
  },
  {
    id: "integrate-human-detection-into-surveillance-systems",
    companyName: "Integrate Human Detection into Surveillance Systems",
    type: "Professional",
    category: ["AI", "Surveillance"],
    shortDescription: "Tích hợp mô hình YOLO để phát hiện người trong thời gian thực trên nền tảng CCTV platform",
    techStack: ["YOLO", "Python",],
    startDate: new Date("2022-05-01"),
    endDate: new Date("2022-06-15"),
    companyLogoImg: "/showcases/cctv-1@2x.png",
    pagesInfoArr: [
    ],
    descriptionDetails: {
      paragraphs: [
      ],
      bullets: [
      ],
    },
  },
  {
    id: "aquania",
    companyName: "Aquania",
    type: "Professional",
    category: ["IoT", "Mobile", "SaaS"],
    shortDescription: "Nền tảng quản lý hệ thống thủy sản thông minh tích hợp IoT, backend và ứng dụng di động đa nền tảng.",
    techStack: ["IoT", "Backend", "Frontend", "iOS", "Flutter"],
    startDate: new Date("2022-05-01"),
    endDate: new Date("2022-06-15"),
    companyLogoImg: "/showcases/aquania-1@2x.png",
    youtubeLink: "https://www.youtube.com/embed/mOpTAuOo_9M",
    pagesInfoArr: [
    ],
    descriptionDetails: {
      paragraphs: [
      ],
      bullets: [
      ],
    },
  },
  {
    id: "deer-detection",
    companyName: "Deer Detection",
    type: "Professional",
    category: ["AI", "Computer Vision", "Wildlife Monitoring"],
    shortDescription: "Hệ thống phát hiện hươu bằng Deep Learning trên nền Windows, hỗ trợ kiểm soát và giám sát động vật hoang dã ở phía bắc Nhật Bản.",
    techStack: ["YOLO", "Windows"],
    startDate: new Date("2022-05-01"),
    endDate: new Date("2022-06-15"),
    companyLogoImg: "/showcases/deer-1@2x.png",
    pagesInfoArr: [
    ],
    descriptionDetails: {
      paragraphs: [
      ],
      bullets: [
      ],
    },
  },
];

export const featuredProjects = Projects.slice(0, 3);
