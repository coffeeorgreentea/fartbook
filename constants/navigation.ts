import {
  CogIcon,
  HomeIcon,
  PhotoIcon,
  ShoppingBagIcon,
  DocumentTextIcon,
  MusicalNoteIcon,
  FireIcon,
  RocketLaunchIcon,
  FolderIcon,
  AcademicCapIcon,
  CloudIcon,
} from "@heroicons/react/24/outline";

export const appNavigation = [
  {
    name: "Home",
    href: "/app",
    icon: HomeIcon,
    status: true,
    activeColor: "text-purple-500",
    hoverColor: "group-hover:text-purple-400",
  },

  {
    name: "Fart",
    href: "/app/fart-generation",
    icon: PhotoIcon,
    status: true,
    activeColor: "text-purple-500",
    hoverColor: "group-hover:text-purple-400",
  },

  {
    name: "MagickML",
    href: "/about",
    icon: FolderIcon,
    status: true,
    activeColor: "text-purple-500",
    hoverColor: "group-hover:text-purple-400",
  },
];

export const siteNavigation = [
  {
    name: "Home",
    href: "/app",
    icon: HomeIcon,
    status: true,
    activeColor: "z-purple",
    hoverColor: "zh-purple",
  },
  {
    name: "Fart Generation",
    href: "/fart-generation",
    icon: CloudIcon,
    status: true,
    activeColor: "z-indigo",
    hoverColor: "zh-indigo",
  },

  {
    name: "About",
    href: "https://www.magickml.com",
    icon: MusicalNoteIcon,
    status: true,
    activeColor: "z-orange",
    hoverColor: "zh-orange",
  },
  {
    name: "Careers",
    href: "/careers",
    icon: FireIcon,
    status: true,
    activeColor: "z-red",
    hoverColor: "zh-red",
  },
];
