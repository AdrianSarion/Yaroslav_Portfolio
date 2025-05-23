'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Define experience data
const experienceData = [
  {
    role: "Senior Full-Stack Developer",
    company: "TechInnovate Solutions",
    period: "2021 - Present",
    description: "Leading the development of enterprise-level web applications using React, Node.js, and MongoDB. Implemented CI/CD pipelines and optimized application performance, resulting in a 40% reduction in load times. Mentored junior developers and introduced best practices in code quality and testing.",
    technologies: ["React", "Node.js", "MongoDB", "AWS", "Docker", "TypeScript"],
  },
  {
    role: "Full-Stack Developer",
    company: "VueX Systems",
    period: "2018 - 2021",
    description: "Developed and maintained multiple client projects using Vue.js and Laravel. Created robust RESTful APIs and implemented complex database structures. Collaborated with UX/UI designers to deliver intuitive user interfaces. Reduced server costs by 30% through infrastructure optimization.",
    technologies: ["Vue.js", "Laravel", "PostgreSQL", "Redis", "Webpack", "REST API"],
  },
  {
    role: "Backend Developer",
    company: "Python Solutions Inc.",
    period: "2016 - 2018",
    description: "Built scalable microservices using Python and Django. Developed data processing pipelines for handling large datasets. Integrated third-party APIs and payment gateways. Improved system reliability by implementing comprehensive error handling and monitoring.",
    technologies: ["Python", "Django", "Flask", "MySQL", "RabbitMQ", "Docker"],
  },
  {
    role: "Frontend Developer",
    company: "Creative Web Agency",
    period: "2014 - 2016",
    description: "Created responsive websites and interactive web applications for various clients. Implemented pixel-perfect designs and ensured cross-browser compatibility. Optimized assets for performance and improved page load speeds.",
    technologies: ["JavaScript", "HTML5", "CSS3", "jQuery", "Bootstrap", "SASS"],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

  return (
    <section ref={sectionRef} id="experience" className="section-container py-20 md:py-32 section-bg section-bg-wave">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background/80 z-0"></div>
      
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
            Work <span className="gradient-text">Experience</span>
          </motion.h2>
          <motion.p 
            className="max-w-2xl mx-auto text-foreground/70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            My professional journey as a developer, solving complex problems and delivering 
            impactful solutions across various industries.
          </motion.p>
        </div>
        
        <div className="relative border-l-2 border-primary/30 ml-6 md:ml-0 md:mx-auto md:max-w-3xl pl-6 space-y-12">
          {experienceData.map((experience, index) => (
            <motion.div
              key={experience.company}
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Timeline dot */}
              <div className="absolute -left-[37px] bg-background border-4 border-primary w-6 h-6 rounded-full" />
              
              <div className="bg-muted/20 p-6 rounded-lg shadow-lg border border-border">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                  <h3 className="text-xl font-bold">{experience.role}</h3>
                  <span className="text-primary text-sm font-medium">{experience.period}</span>
                </div>
                
                <h4 className="text-lg font-medium mb-3">{experience.company}</h4>
                
                <p className="text-foreground/70 mb-4">
                  {experience.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
} 