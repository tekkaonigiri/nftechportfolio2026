"use client";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    id: 1,
    title: "Straightline",
    tagline: "ADA compliance analysis platform — DiamondHacks 2026 winner",
    description:
      "Built in 36 hours at ACM DiamondHacks 2026 (400+ participants). An ADA compliance platform that uses autonomous Browser Use agents to scrape accessibility data for real-world locations, Gaussian Splatting for 3D environment reconstruction, and Supabase for caching. Won 1st place for Best Use of Browser Use.",
    stack: ["Browser Use", "Gaussian Splatting", "Supabase", "Google Maps API", "Python", "Next.js"],
    year: "2026",
    color: "pink",
    live: "https://devpost.com/software/straightline",
    highlights: [
      "Won 1st place Best Use of Browser Use at ACM DiamondHacks 2026 among 400+ participants.",
      "Built autonomous multi-agent pipeline to scrape and analyze ADA compliance data.",
      "Integrated Gaussian Splatting for 3D reconstruction of physical locations.",
      "Designed Supabase caching layer to persist scraped compliance metadata across sessions.",
    ],
  },
  {
    id: 2,
    title: "Fruit Recognition CNN",
    tagline: "Real-time 24-layer GoogLeNet CNN — ACM AI Projects",
    description:
      "Engineered a real-time fruit recognition system for the ACM @ UCSD AI Projects Team. Designed a 24-layer GoogLeNet-inspired CNN from scratch with custom IOU and loss functions, trained on the COCO 2017 dataset.",
    stack: ["Python", "PyTorch", "GoogLeNet", "COCO 2017", "OpenCV", "NumPy"],
    year: "2025",
    color: "mint",
    highlights: [
      "Designed 24-layer GoogLeNet-inspired architecture with inception modules.",
      "Implemented custom IOU metric and composite loss function from scratch.",
      "Trained and evaluated on the COCO 2017 object detection dataset.",
    ],
  },
  {
    id: 3,
    title: "Tigers Vote",
    tagline: "SwiftUI voter registration app for ~400 students",
    description:
      "Independently built and deployed a SwiftUI iOS app that simplifies the voter registration process for students. Shipped to ~400 students with a clean, native mobile interface.",
    stack: ["Swift", "SwiftUI", "Xcode"],
    year: "2025",
    color: "orange",
    highlights: [
      "Independently designed, built, and deployed to ~400 students.",
      "Native SwiftUI interface optimized for first-time voter registration flows.",
    ],
  },
  {
    id: 4,
    title: "RechargeTeach",
    tagline: "Swift app for teacher burnout and wellness",
    description:
      "A Swift app designed to help combat teacher burnout, featuring wellness check-ins, resource recommendations, and daily reflection prompts for educators.",
    stack: ["Swift", "SwiftUI", "Xcode"],
    year: "2025",
    color: "lemon",
    github: "https://github.com/tekkaonigiri/RechargeTeach",
    highlights: [
      "Built wellness and reflection tools tailored to educator needs.",
      "Native iOS app with SwiftUI and local persistence.",
    ],
  },
  {
    id: 5,
    title: "PetHub",
    tagline: "Next.js interactive anatomy learning app — WiC",
    description:
      "An educational Next.js web app built with the Women in Computing project team. Features interactive pet anatomy explorations and learning modules, deployed on Vercel.",
    stack: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    year: "2025",
    color: "lavender",
    live: "https://wic-project-pet-smart.vercel.app/",
    highlights: [
      "Built interactive anatomy feature with layered visual exploration.",
      "Deployed and live on Vercel as a Women in Computing team project.",
    ],
  },
  {
    id: 6,
    title: "Spotify Recommender",
    tagline: "Collaborative filtering recommender — ACM AI Mentor",
    description:
      "Co-mentored a team of 4 to build a Spotify recommender system using collaborative filtering and user similarity models. Evaluation methodology included Precision@K, Recall@K, and random/popularity baselines.",
    stack: ["Python", "Collaborative Filtering", "scikit-learn", "Pandas", "Jupyter"],
    year: "2025",
    color: "pink",
    highlights: [
      "Led team of 4 as ACM AI Projects Mentor to build and evaluate a recommender system.",
      "Designed evaluation pipeline: Precision@K, Recall@K, and baseline comparisons.",
      "Applied collaborative filtering and user–item similarity models.",
    ],
  },
];

const featured = projects.slice(0, 2);
const rest = projects.slice(2);

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-charcoal px-6 pt-28 pb-20 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="mb-4"
      >
        <div className="flex items-center gap-3 mb-2">
          <div
            className="px-3 py-1 rounded-full font-mono font-black text-charcoal text-xs border-2 border-black"
            style={{ background: "#F2A7BB", boxShadow: "2px 2px 0px 0px rgba(0,0,0,1)" }}
          >
            THE CANDY SHOP
          </div>
        </div>
        <h1
          className="font-black text-4xl text-white tracking-tight"
          style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
        >
          Projects
        </h1>
        <p className="font-mono text-white/40 text-sm mt-1">
          Hover a card to unwrap. Click for the full scoop.
        </p>
      </motion.div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-candy-pink/60 via-candy-mint/40 to-transparent mb-10" />

      {/* Featured */}
      <div className="mb-3">
        <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">Featured</span>
      </div>
      <div className="grid md:grid-cols-2 gap-5 mb-10">
        {featured.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 200, damping: 22 }}
          >
            <ProjectCard project={project} featured />
          </motion.div>
        ))}
      </div>

      {/* Standard grid */}
      <div className="mb-3">
        <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">More Work</span>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rest.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.08, type: "spring", stiffness: 200, damping: 22 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
