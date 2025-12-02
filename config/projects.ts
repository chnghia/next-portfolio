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
    "companyLogoImg": "/next-portfolio/showcases/portfolio-1@2x.png",
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
    "companyLogoImg": "/next-portfolio/showcases/golf-2@2x.png",
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
        "imgArr": ["/next-portfolio/showcases/golf-3@2x.png"]
      },
      {
        "title": "Trajectory & Effect Visualization",
        "description": "Advanced tracking module that renders the ball's flight path and swing effects, providing immediate visual feedback on shot quality.",
        "imgArr": ["/next-portfolio/showcases/golf-4@2x.png"]
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
    "companyLogoImg": "/next-portfolio/showcases/ball-1@2x.png",
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
        "imgArr": ["/next-portfolio/showcases/ball-2@2x.png"]
      },
      {
        "title": "Analysis Dashboard",
        "description": "Post-capture review screen allowing users to replay tracked shots and view derived metrics.",
        "imgArr": ["/next-portfolio/showcases/ball-3@2x.png"]
      },
    ]
  },
  {
    id: "attendance-emotion",
    companyName: "Attendance with emotion",
    type: "Personal",
    category: ["Mobile Dev", "Full Stack", "UI/UX"],
    shortDescription:
      "Developed a feature-rich mobile shopping application with admin panel, user authentication, and seamless product management using React Native and Firebase.",
    // githubLink: "https://github.com/namanbarkiya/apex-shopping-app",
    techStack: ["React Native", "Javascript", "Redux", "Node.js", "express.js"],
    startDate: new Date("2021-07-14"),
    endDate: new Date("2022-07-01"),
    companyLogoImg: "/next-portfolio/showcases/attendance-1@2x.png",
    pagesInfoArr: [
    ],
    descriptionDetails: {
      paragraphs: [
        "The Apex Shopping App represents a comprehensive mobile e-commerce solution that I developed from the ground up using React Native and Firebase. This project showcases my ability to create a full-featured shopping application with both user and admin functionalities.",
        "The application features a robust authentication system, allowing users to securely sign up and log in. The product exploration interface is designed with user experience in mind, incorporating smooth navigation and intuitive filtering options.",
        "One of the key highlights is the admin panel, which provides complete control over product management, order processing, and inventory tracking. The integration with Firebase ensures real-time data synchronization and reliable data persistence.",
        "The app's architecture emphasizes scalability and performance, utilizing Redux for state management and following best practices for mobile app development. The UI/UX design focuses on providing a seamless shopping experience across different device sizes.",
      ],
      bullets: [
        "Implemented secure user authentication and authorization using Firebase",
        "Designed and developed an intuitive product browsing and shopping cart system",
        "Created a comprehensive admin panel for product and order management",
        "Integrated real-time data synchronization using Firebase Database",
        "Implemented state management using Redux for optimal performance",
        "Designed responsive UI components following mobile-first principles",
        "Incorporated smooth animations and transitions for enhanced user experience",
      ],
    },
  },
  {
    id: "counting",
    companyName: "Counting",
    type: "Professional",
    category: ["Web Dev", "Full Stack", "UI/UX"],
    shortDescription:
      "Crafted Builtdesign's vibrant Blogs Website using Netlify CMS and React for engaging content experiences.",
    // websiteLink: "https://blog.builtdesign.in",
    techStack: ["Next.js", "React", "Node.js", "MongoDB", "Typescript"],
    startDate: new Date("2022-03-01"),
    endDate: new Date("2022-07-01"),
    companyLogoImg: "/next-portfolio/showcases/counting-1@2x.png",
    pagesInfoArr: [
    ],
    descriptionDetails: {
      paragraphs: [
        "As part of the Builtdesign platform, I developed a sophisticated blog website that serves as a content hub for the company's thought leadership and industry insights. The project leveraged Next.js and React to create a fast, SEO-friendly platform.",
        "The blog platform features a modern, responsive design that prioritizes readability and user engagement. I implemented a robust content management system using Netlify CMS, enabling the content team to easily publish and manage blog posts.",
        "The architecture includes server-side rendering for optimal performance and SEO, while MongoDB provides flexible content storage. TypeScript ensures code reliability and maintainability throughout the application.",
        "Key features include category-based navigation, search functionality, and a rich text editor for content creation. The platform supports various content types including images, code snippets, and embedded media.",
      ],
      bullets: [
        "Developed a modern blog platform using Next.js and React with TypeScript",
        "Implemented Netlify CMS for efficient content management",
        "Created a responsive design that prioritizes readability and user engagement",
        "Built server-side rendering for optimal performance and SEO",
        "Integrated MongoDB for flexible content storage and management",
        "Developed category-based navigation and search functionality",
        "Implemented rich text editing capabilities for content creation",
      ],
    },
  },
  {
    id: "gesture-controller",
    companyName: "Gesture Controller Signage",
    type: "Personal",
    category: ["Web Dev", "Frontend", "3D Modeling"],
    shortDescription:
      "Forged an immersive 3D Portfolio Card utilizing the prowess of Three.js and Blender, where art and technology converge in an interactive masterpiece.",
    // websiteLink: "https://card.namanbarkiya.xyz/",
    // githubLink: "https://github.com/namanbarkiya/3d-portfolio-card",
    techStack: ["React", "Javascript", "HTML 5", "CSS 3"],
    startDate: new Date("2022-03-01"),
    endDate: new Date("2022-07-01"),
    companyLogoImg: "/next-portfolio/showcases/gesture-1@2x.png",
    pagesInfoArr: [
    ],
    descriptionDetails: {
      paragraphs: [
        "In my personal, I've ventured into the world of creativity, fashioning a distinctive portfolio card through the utilization of Three.js.",
        "This portfolio card transcends convention; it emerges as a captivating 3D model, adorned with meticulous lighting arrangements that conjure a spellbinding visual journey.",
        "To materialize this concept, I've harnessed the combined potential of Three.js and Blender, orchestrating a meticulous crafting of the central 3D model that serves as the cornerstone of the card's allure.",
        "Yet, the allure extends beyond aesthetics. I've ingeniously interwoven custom links directly into the fabric of Three.js components. Through the creation and seamless integration of novel components, these additions elegantly rest upon the card's surface, mirroring its rotations and delivering an interactive dimension to my portfolio.",
        "The portfolio card itself is an opus of motion, perpetually swaying in an auto-rotational dance that unfurls its multifaceted essence. As an enhancement, I've introduced an instinctive user interaction element. A simple, intuitive drag of the card in specific directions grants viewers a comprehensive vantage, enabling exploration from every conceivable angle.",
        "At its core, my personal epitomizes technical finesse, artistic expression, and interactive design. The amalgamation of Three.js, Blender's prowess, and the innovation of component integration has birthed not only a portfolio card, but a dynamic encounter leaving an indelible imprint on all who partake.",
      ],
      bullets: [
        "Conceptualized and realized a distinct portfolio card using Three.js, highlighting creative exploration.",
        "Crafted a mesmerizing 3D model enhanced by thoughtful lighting arrangements, resulting in a captivating visual voyage.",
        "Leveraged the synergy of Three.js and Blender to meticulously sculpt and refine the central 3D model, embodying meticulous attention to detail.",
        "Innovatively integrated custom links within Three.js components, introducing an interactive layer via seamlessly incorporated new elements.",
        "Enabled an auto-rotating feature for the portfolio card, perpetually showcasing its various facets to observers.",
        "Introduced an instinctual user interaction mechanism, allowing viewers to comprehensively explore the card's dimensions through simple, intuitive dragging motions.",
        "Represented a fusion of technical prowess, artistic ingenuity, and interactive design in a project that reshapes the boundaries of conventional portfolio representation.",
      ],
    },
  },
  {
    id: "eye-tracking",
    companyName: "Eye Tracking",
    type: "Personal",
    category: ["Web Dev", "Frontend", "UI/UX"],
    shortDescription:
      "Created a dashboard project using React and Tailwind CSS, focusing on UI design and routing implementation.",
    // websiteLink: "https://cirql-ui.namanbarkiya.xyz/",
    techStack: ["React", "Tailwind CSS", "Google Auth"],
    startDate: new Date("2023-01-01"),
    endDate: new Date("2023-02-15"),
    companyLogoImg: "/next-portfolio/showcases/eye-track-1@2x.png",
    pagesInfoArr: [
    ],
    descriptionDetails: {
      paragraphs: [
        "For the 'Cirql Dashboard' personal, I aimed to enhance my UI design skills and deepen my understanding of routing within a React application.",
        "I utilized React and Tailwind CSS to craft an intuitive dashboard interface that provides users with an organized overview of data and functionalities. The UI components were thoughtfully designed to ensure a seamless user experience.",
        "Incorporating Google Sign-In Authentication further fortified the project by adding a layer of security and convenience. Users are required to authenticate before accessing certain routes, ensuring the safety of sensitive information.",
        "The routing system was meticulously implemented to enable smooth navigation between different sections of the dashboard, simulating real-world use cases.",
        "Through this project, I've gained valuable insights into UI/UX design principles and the implementation of secure and efficient routing in React applications.",
      ],
      bullets: [
        "Created a user-friendly dashboard project using React and Tailwind CSS.",
        "Implemented Google Sign-In Authentication to ensure secure access to sensitive routes.",
        "Designed UI components to provide an intuitive and visually pleasing experience.",
        "Focused on implementing a smooth routing system to simulate real-world use cases.",
        "Enhanced my skills in UI design, routing, and component architecture.",
      ],
    },
  },
  {
    id: "inspection-factory",
    companyName: "Inspection Factory",
    type: "Personal",
    category: ["Web Dev", "UI/UX"],
    shortDescription:
      "Developed a user-friendly website for Inscript Hindi typing, addressing the need for a simple tool for Hindi writers to convey data digitally.",
    // websiteLink: "https://hindityping.namanbarkiya.xyz",
    // githubLink: "https://github.com/namanbarkiya/inscript-hindi-keyboard",
    techStack: ["HTML 5", "CSS 3", "Javascript"],
    startDate: new Date("2022-05-01"),
    endDate: new Date("2022-06-15"),
    companyLogoImg: "/next-portfolio/showcases/inspection-1@2x.png",
    pagesInfoArr: [
    ],
    descriptionDetails: {
      paragraphs: [
        "The 'Inscript Hindi Typing Website' project emerged from the need to provide a simple and accessible tool for Hindi writers, especially those in digital news and media, who wished to convey data in Hindi.",
        "Recognizing the challenges posed by complex software in the market, I set out to create a minimalistic typing area that catered to the needs of a vast community of Hindi typists in India.",
        "The project was designed to address the specific requirements of users familiar with the Inscript keyboard layout, mapping English and Hindi alphabets for seamless typing. The intuitive interface allowed users to effortlessly switch between languages, streamlining the process of content creation.",
        "Leveraging HTML and CSS, I crafted the website's UI to ensure a user-friendly experience. Additionally, Local Storage was utilized to enable users to save and retrieve their work, enhancing convenience and productivity.",
        "The website's focus on user experience and simplicity proved to be a key factor in its popularity among Hindi writers. By offering a tool that reduced the barriers to entry, I contributed to the digital empowerment of Hindi typists who previously faced challenges in conveying their message effectively.",
        "This project marked one of my initial forays into web development and highlighted the transformative potential of technology in addressing real-world challenges.",
      ],
      bullets: [
        "Developed a user-friendly website for Inscript Hindi typing.",
        "Catered to the needs of Hindi writers in digital news and media.",
        "Created a minimalistic and intuitive typing interface for the Inscript keyboard layout.",
        "Mapped English and Hindi alphabets to provide a seamless typing experience.",
        "Utilized HTML and CSS to design a user-friendly UI.",
        "Implemented Local Storage to enable users to save and retrieve their work.",
        "Contributed to the digital empowerment of Hindi typists by offering a simple tool.",
        "Marked one of my first web development projects, showcasing technology's potential for addressing real-world needs.",
      ],
    },
  },
  {
    id: "automated-structural-design",
    companyName: "Automated Structural Design",
    type: "Personal",
    category: ["Web Dev", "UI/UX"],
    shortDescription:
      "Developed a user-friendly website for Inscript Hindi typing, addressing the need for a simple tool for Hindi writers to convey data digitally.",
    // websiteLink: "https://hindityping.namanbarkiya.xyz",
    // githubLink: "https://github.com/namanbarkiya/inscript-hindi-keyboard",
    techStack: ["HTML 5", "CSS 3", "Javascript"],
    startDate: new Date("2022-05-01"),
    endDate: new Date("2022-06-15"),
    companyLogoImg: "/next-portfolio/showcases/structural-2@2x.png",
    pagesInfoArr: [
    ],
    descriptionDetails: {
      paragraphs: [
        "The 'Inscript Hindi Typing Website' project emerged from the need to provide a simple and accessible tool for Hindi writers, especially those in digital news and media, who wished to convey data in Hindi.",
        "Recognizing the challenges posed by complex software in the market, I set out to create a minimalistic typing area that catered to the needs of a vast community of Hindi typists in India.",
        "The project was designed to address the specific requirements of users familiar with the Inscript keyboard layout, mapping English and Hindi alphabets for seamless typing. The intuitive interface allowed users to effortlessly switch between languages, streamlining the process of content creation.",
        "Leveraging HTML and CSS, I crafted the website's UI to ensure a user-friendly experience. Additionally, Local Storage was utilized to enable users to save and retrieve their work, enhancing convenience and productivity.",
        "The website's focus on user experience and simplicity proved to be a key factor in its popularity among Hindi writers. By offering a tool that reduced the barriers to entry, I contributed to the digital empowerment of Hindi typists who previously faced challenges in conveying their message effectively.",
        "This project marked one of my initial forays into web development and highlighted the transformative potential of technology in addressing real-world challenges.",
      ],
      bullets: [
        "Developed a user-friendly website for Inscript Hindi typing.",
        "Catered to the needs of Hindi writers in digital news and media.",
        "Created a minimalistic and intuitive typing interface for the Inscript keyboard layout.",
        "Mapped English and Hindi alphabets to provide a seamless typing experience.",
        "Utilized HTML and CSS to design a user-friendly UI.",
        "Implemented Local Storage to enable users to save and retrieve their work.",
        "Contributed to the digital empowerment of Hindi typists by offering a simple tool.",
        "Marked one of my first web development projects, showcasing technology's potential for addressing real-world needs.",
      ],
    },
  },
];

export const featuredProjects = Projects.slice(0, 3);
