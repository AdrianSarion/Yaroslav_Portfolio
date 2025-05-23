'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

// Define projects data
const projectsData = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with payment integration, product management, and analytics dashboard. Built with React, Node.js, Express, and MongoDB.",
    image: "/project1.jpg",
    tags: ["React", "Node.js", "MongoDB", "Express", "Redux"],
    demoLink: "#",
    codeLink: "#",
  },
  {
    title: "Task Management System",
    description: "A collaborative task management application with real-time updates, role-based permissions, and file sharing. Developed using Vue.js and Laravel.",
    image: "/project2.jpg",
    tags: ["Vue.js", "Laravel", "PostgreSQL", "Websockets", "TailwindCSS"],
    demoLink: "#",
    codeLink: "#",
  },
  {
    title: "Financial Analytics Dashboard",
    description: "Interactive financial analytics dashboard with data visualization, reporting features, and user permission management. Built with React, D3.js, and Python Django.",
    image: "/project3.jpg",
    tags: ["React", "Python", "Django", "D3.js", "PostgreSQL"],
    demoLink: "#",
    codeLink: "#",
  },
  {
    title: "Real Estate Marketplace",
    description: "A real estate listing platform with advanced search filters, map integration, and booking system. Developed with Next.js and Node.js.",
    image: "/project4.jpg",
    tags: ["Next.js", "Node.js", "MongoDB", "Google Maps API", "AWS S3"],
    demoLink: "#",
    codeLink: "#",
  },
  {
    title: "Health & Fitness App",
    description: "Mobile-first web application for tracking fitness goals, nutrition, and workout planning with personalized recommendations. Built using React Native and Firebase.",
    image: "/project5.jpg",
    tags: ["React Native", "Firebase", "Redux", "Expo", "Auth0"],
    demoLink: "#",
    codeLink: "#",
  },
  {
    title: "Content Management System",
    description: "Custom CMS with advanced content editing, publishing workflow, and media management. Developed with TypeScript, React, and Node.js.",
    image: "/project6.jpg",
    tags: ["TypeScript", "React", "Node.js", "GraphQL", "MongoDB"],
    demoLink: "#",
    codeLink: "#",
  },
];

// Placeholder image component for projects
function ProjectImage({ alt }: { alt: string }) {
  return (
    <div className="bg-gradient-to-br from-muted/80 to-muted h-64 w-full rounded-t-xl overflow-hidden relative flex items-center justify-center group-hover:from-primary/10 group-hover:to-secondary/10 transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
      
      {/* Abstract Project Shapes */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="w-40 h-40 rounded-full border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-500 animate-spin-slow" />
        <div className="absolute w-60 h-60 rounded-full border border-secondary/20 group-hover:border-secondary/40 transition-all duration-500 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '15s' }} />
        <div className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 group-hover:from-primary/40 group-hover:to-secondary/40 blur-sm transition-all duration-500" />
      </div>
      
      <div className="relative z-10 text-primary/60 group-hover:text-primary transition-colors duration-300">
        <svg 
          className="w-16 h-16" 
          fill="currentColor" 
          viewBox="0 0 20 20" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0]);
  
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const filters = ["All", "React", "Vue.js", "Node.js", "Python", "Laravel"];
  
  const filteredProjects = activeFilter === "All" 
    ? projectsData 
    : projectsData.filter(project => project.tags.includes(activeFilter));

  return (
    <section ref={sectionRef} id="projects" className="section-container py-20 md:py-32 section-bg section-bg-circuit">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/80 z-0"></div>
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/5 filter blur-3xl opacity-20 animate-pulse z-0" style={{ animationDuration: '7s' }}></div>
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-secondary/5 filter blur-3xl opacity-20 animate-pulse z-0" style={{ animationDuration: '10s' }}></div>
      
      <motion.div
        style={{ opacity, y }}
        className="space-y-12 relative z-10"
      >
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            My <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p 
            className="max-w-2xl mx-auto text-foreground/70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A selection of my recent projects showcasing my skills and experience in
            developing robust, scalable, and user-friendly applications.
          </motion.p>
        </div>
        
        {/* Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                  : "bg-muted/50 text-foreground hover:bg-muted"
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              className="group bg-gradient-to-br from-muted/20 to-muted/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl h-full flex flex-col border border-border/50 hover:border-primary/50 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <ProjectImage alt={project.title} />
              
              <div className="p-6 flex-1 flex flex-col backdrop-blur-sm bg-background/30">
                <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">{project.title}</h3>
                <p className="text-foreground/70 mb-6 flex-1 text-sm">{project.description}</p>
                
                <div className="mb-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-muted/60 text-foreground/80 text-xs font-medium rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <a
                    href={project.demoLink}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-md text-sm font-medium hover:from-primary/90 hover:to-secondary/90 transition-all shadow-md shadow-primary/10 hover:shadow-primary/20"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex items-center justify-center">
                      <span>Live Demo</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </a>
                  <a
                    href={project.codeLink}
                    className="flex-1 px-4 py-2 border border-primary text-primary rounded-md text-sm font-medium hover:bg-primary/10 transition-colors flex items-center justify-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    <span>Code</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Show more button if needed */}
        {projectsData.length > 6 && (
          <motion.div 
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <button className="px-6 py-3 bg-muted/50 hover:bg-muted text-foreground rounded-full flex items-center font-medium text-sm transition-all">
              <span>Show More Projects</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
} 