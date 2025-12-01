import { Icons } from "@/components/common/icons";

interface SocialInterface {
  name: string;
  username: string;
  icon: any;
  link: string;
}

export const SocialLinks: SocialInterface[] = [
  {
    name: "Github",
    username: "@chnghia",
    icon: Icons.gitHub,
    link: "https://github.com/chnghia",
  },
  {
    name: "LinkedIn",
    username: "Nghia Chung",
    icon: Icons.linkedin,
    link: "https://www.linkedin.com/in/nghiachung/",
  },
  {
    name: "Gmail",
    username: "chnghia",
    icon: Icons.gmail,
    link: "mailto:chnghia@gmail.com",
  },
];
