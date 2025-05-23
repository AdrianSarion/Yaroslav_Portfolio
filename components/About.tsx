'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  return (
    <section ref={sectionRef} id="about" className="section-container py-20 md:py-32 section-bg section-bg-grid">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background/80 z-0"></div>
      
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center relative z-10"
        style={{ opacity, y }}
      >
        <div className="order-2 md:order-1">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            About <span className="gradient-text">Me</span>
          </motion.h2>
          
          <motion.div
            className="space-y-4 text-foreground/80"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p>
              Hello! I'm Yaroslav, a Senior Full-Stack Developer with extensive experience in building robust and scalable web applications. 
              I specialize in modern JavaScript frameworks and libraries including React, Node.js, Vue.js, as well as Laravel and Python backends.
            </p>
            
            <p>
              With a passion for clean, efficient code and intuitive user experiences, I pride myself on delivering high-quality solutions 
              that meet business objectives while exceeding user expectations. I enjoy tackling complex problems and turning them into simple, 
              elegant solutions.
            </p>
            
            <p>
              Throughout my career, I've worked with startups and established companies alike, helping them scale their digital presence and 
              optimize their development workflows. My approach combines technical expertise with a deep understanding of business needs.
            </p>
            
            <div className="pt-4">
              <a 
                href="#" 
                className="inline-flex items-center text-primary hover:underline"
              >
                <span>Download Resume</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-1" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
        
        <div className="order-1 md:order-2 relative">
          <div className="w-full h-80 md:h-96 relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg z-10" />
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-secondary/20 rounded-full filter blur-3xl" />
            
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-muted flex items-center justify-center border-4 border-primary/20 overflow-hidden">
                {/* Profile image placeholder - replace with actual image */}
                <svg className="w-full h-full text-primary/30" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}