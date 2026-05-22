"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight, Sparkles } from "lucide-react";
import Image from "next/image";

// --- Types & Interfaces ---
interface Project {
  title: string;
  category: string;
  desc: string;
  tech: string[];
  link: string;
  github: string;
  featured: boolean;
  image: string;
}

// --- Constants & Data Payloads ---
const projectData: Project[] = [
  {
    title: "AI CS Study Assistant",
    category: "Mobile App",
    desc: "[Work In Progress] My final year project: an AI-powered mobile app built from scratch to dynamically summarize Computer Science course materials and generate smart flashcards using T5 and BART models.",
    tech: ["React Native", "Python", "TensorFlow", "Custom ML"],
    link: "https://www.figma.com/design/3RemGLXHd5eSdmMX0lsBB2/Ai-in-mobile-Study?node-id=0-1&p=f&t=2Cln6dBqjltYAhrT-0",
    github: "#",
    featured: true,
    image: "/cs.png", 
  },
  {
    title: "Campus Without Wall",
    category: "Website",
    desc: "An expansive educational website built for an Upwork client to broaden access to rigorous academic courses, featuring a highly structured and engaging user interface.",
    tech: ["WIX", "UI/UX Design", "SEO"],
    link: "https://campuswithoutwalls.org/",
    github: "#",
    featured: true,
    image: "/campuswithoutwall.png",
  },
  {
    title: "DanceDirectory Booking Hub",
    category: "Marketplace",
    desc: "A seamless class booking marketplace designed for high conversion and intuitive user scheduling.",
    tech: ["Next.js", "Sharetribe", "Tailwind CSS"],
    link: "https://www.thedancedirectory.com/",
    github: "#",
    featured: true,
    image: "/dance-directory.png",
  },
  {
    title: "Authentise",
    category: "Website",
    desc: "Collaborated on an established enterprise website built on Wix. Leveraged Wix Velo to engineer custom programming features and resolve critical bugs, while also designing specific UI components to enhance the overall user experience.",
    tech: ["Wix", "Wix Velo", "JavaScript", "UI/UX Design"],
    link: "https://www.authentise.com/",
    github: "#",
    featured: true,
    image: "/authentise.png",
  },
  {
    title: "Benny Tech Hub",
    category: "Website",
    desc: "A professional, SEO-optimized portfolio website built on WordPress. Designed to elevate the client's digital presence through a clean, highly responsive layout that effectively showcases their projects and services.",
    tech: ["WordPress", "Portfolio", "SEO"],
    link: "https://portfolio.bennytechhub.com/",
    github: "#",
    featured: true,
    image: "/bennytechhub.png",
  },
  {
    title: "Ice Cold Studio Media Portal",
    category: "SaaS / Web App",
    desc: "Architected a custom CMS and lightweight SaaS media management application featuring a secure Client Vault with role-based access control.",
    tech: ["Next.js", "Headless CMS", "RBAC", "Supabase"],
    link: "https://photoweb-chi.vercel.app/",
    github: "https://github.com/yourcoderrguy/photoweb",
    featured: true,
    image: "/ice-cold-studio.png",
  },
  {
    title: "Kings LMS",
    category: "SaaS / Web App",
    desc: "Engineered a scalable, enterprise-grade LMS featuring a comprehensive 9-module architecture, including real-time video lecture rooms, automated attendance tracking, and role-based assessment engines. Built for performance using an SPA architecture with centralized state management.",
    tech: ["Next.js", "TailwindCSS", "Shadcn UI", "Zustand", "Lucide React", "WebRTC Concepts"],
    link: "https://distant-learning.vercel.app/",
    github: "https://github.com/yourcoderrguy/distant-learning",
    featured: true,
    image: "/distant-learning.png",
  },
  {
    title: "Elvaan B2B Equipment Rental",
    category: "Marketplace",
    desc: "Contributed to an established B2B equipment rental marketplace built on Sharetribe Flex. Assisted the core team by debugging complex transaction flows and integrating custom frontend features to improve the overall platform experience.",
    tech: ["Next.js", "Sharetribe Flex", "Stripe Connect", "Node.js"],
    link: "https://elvaan.com/",
    github: "#",
    featured: false,
    image: "/elvan.png",
  },
  {
    title: "Getragene Lust C2C Market",
    category: "Marketplace",
    desc: "An anonymous C2C marketplace platform built for scale, prioritizing secure user data management and seamless peer-to-peer transactions.",
    tech: ["React", "Sharetribe", "PostgreSQL"],
    link: "#",
    github: "#",
    featured: false,
    image: "/images/c2c-market.png",
  },
  {
    title: "Kings Journal",
    category: "SaaS / Web App",
    desc: "Deployed and configured a comprehensive academic publishing platform using Open Journal Systems (OJS) for a university entrepreneurship department. Focused on delivering a highly functional, robust backend for secure manuscript submissions and editorial workflows.",
    tech: ["OJS", "CMS", "PHP", "Academic Tech"],
    link: "https://kingsjournals.com.ng/index.php/KJEIM",
    github: "#",
    featured: false,
    image: "/kings-journal.png",
  },
  {
    title: "Dicta Hub",
    category: "SaaS / Web App",
    desc: "Contributed as a Junior Developer to a scalable educational platform for AI innovators. Collaborated on feature development and currently manage the system's deployment and server infrastructure on Contabo.",
    tech: ["Next.js", "Python", "Payment Gateways", "Contabo"],
    link: "https://www.dictahub.com/",
    github: "#",
    featured: false,
    image: "/dictahub-lms.png",
  },
  {
    title: "Bank Churn",
    category: "SaaS / Web App",
    desc: "Developed the frontend architecture for a proprietary AI system that identifies potential bank customer churn, prioritizing real-time data handling and an intuitive dashboard experience.",
    tech: ["Next.js", "React.js", "API Integration"],
    link: "https://bank-churn.bennytechhub.com/",
    github: "https://github.com/benniella/bank-customer-churn-fastapi",
    featured: false,
    image: "/bankchurn.png",
  },
  {
    title: "Credit Risk Prediction",
    category: "SaaS / Web App", 
    desc: "Designed and engineered the frontend interface for a machine learning model that analyzes financial data to predict credit default risks, focusing on a clean, responsive UI and seamless API integration.",
    tech: ["React", "Python", "Render", "Machine Learning"],
    link: "https://credit-risk.bennytechhub.com/",
    github: "https://github.com/benniella/Credit-Risk-Prediction",
    featured: false,
    image: "/creditrisk.png", 
  },
];

const filters: string[] = ["All", "Marketplace", "SaaS / Web App", "Mobile App", "Website"];

export default function Projects() {
  const [filter, setFilter] = useState<string>("All");

  const filtered = filter === "All" ? projectData : projectData.filter(p => p.category === filter);

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 lg:px-24 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#F8FAFC] tracking-tight mb-6">
            Selected <span className="text-[#FACC15]">Works.</span>
          </h1>
          <p className="text-slate-400 text-lg font-medium leading-relaxed">
            A comprehensive vault of scalable marketplaces, AI-integrated SaaS MVPs, and robust web applications engineered for founders and enterprise clients.
          </p>
        </motion.div>
      </div>
      
      {/* Filter Navigation */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex overflow-x-auto pb-4 mb-12 -mx-6 px-6 md:mx-0 md:px-0 hide-scrollbar gap-3"
      >
        {filters.map(t => (
          <button 
            key={t}
            onClick={() => setFilter(t)}
            aria-pressed={filter === t}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
              filter === t 
                ? "bg-[#FACC15] text-[#0F172A] shadow-[0_0_15px_rgba(250,204,21,0.3)]" 
                : "bg-slate-800/50 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700/50"
            }`}
          >
            {t}
          </button>
        ))}
      </motion.div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, index) => {
            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                key={p.title}
                className="group flex flex-col"
              >
                
                {/* Media Container */}
                <div className="w-full aspect-[4/3] md:aspect-[16/10] bg-[#1E293B] rounded-3xl overflow-hidden relative mb-6 border border-slate-700 shadow-xl group-hover:border-slate-500 transition-colors duration-500">
                  <Image
                    src={p.image}
                    alt={`${p.title} preview`}
                    fill
                    className="object-cover"
                    priority={index < 2}
                  />

                  {/* Taxonomy Badges */}
                  <div className="absolute top-5 left-5 flex flex-wrap gap-2 z-10">
                    <span className="bg-[#0F172A]/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-white border border-slate-600 shadow-sm">
                      {p.category}
                    </span>
                    {p.featured && (
                      <span className="bg-[#FACC15]/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-[#0F172A] border border-[#FACC15] shadow-sm flex items-center gap-1">
                        <Sparkles size={12} /> Featured
                      </span>
                    )}
                  </div>

                  {/* Action Overlay */}
                  <div className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 z-20">
                    {p.link !== "#" && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit live site for ${p.title}`}
                        className="w-14 h-14 bg-[#FACC15] rounded-full flex items-center justify-center text-[#0F172A] hover:scale-110 transition-transform shadow-lg"
                      >
                        <ExternalLink size={24} />
                      </a>
                    )}

                    {p.github !== "#" && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View source code for ${p.title}`}
                        className="w-14 h-14 bg-slate-800 border border-slate-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                      >
                        <Github size={24} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content Block */}
                <div className="flex flex-col flex-grow px-2">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-2xl font-bold text-[#F8FAFC] group-hover:text-[#FACC15] transition-colors">
                      {p.title}
                    </h2>
                    
                    {/* Mobile External Link Action */}
                    {p.link !== "#" && (
                      <a 
                        href={p.link} 
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${p.title}`}
                        className="text-slate-500 hover:text-[#FACC15] transition-colors md:hidden"
                      >
                        <ArrowUpRight size={24} />
                      </a>
                    )}
                  </div>

                  <p className="text-slate-400 text-base leading-relaxed mb-6 flex-grow">
                    {p.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {p.tech.map(t => (
                      <span
                        key={t}
                        className="text-[11px] font-bold uppercase tracking-wider text-slate-300 bg-slate-800/50 border border-slate-700/50 px-3 py-1.5 rounded-lg shadow-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </main>
  );
}