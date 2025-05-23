'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Define skills with categories
const skillsData = [
  {
    category: "Frontend",
    skills: [
      { name: "React", level: 95 },
      { name: "Vue.js", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "JavaScript/TypeScript", level: 95 },
      { name: "HTML/CSS", level: 90 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Redux", level: 85 },
      { name: "GraphQL", level: 80 },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express", level: 85 },
      { name: "Laravel", level: 85 },
      { name: "Python", level: 80 },
      { name: "MongoDB", level: 90 },
      { name: "PostgreSQL", level: 85 },
      { name: "REST API", level: 90 },
      { name: "Docker", level: 80 },
    ],
  },
  {
    category: "Other",
    skills: [
      { name: "Git/GitHub", level: 90 },
      { name: "CI/CD", level: 85 },
      { name: "AWS", level: 80 },
      { name: "Testing", level: 85 },
      { name: "Performance Optimization", level: 85 },
      { name: "UI/UX Design", level: 80 },
      { name: "Agile/Scrum", level: 90 },
      { name: "Problem Solving", level: 95 },
    ],
  },
];

const SkillBar = ({ name, level }: { name: string; level: number }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-sm font-medium text-primary">{level}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2.5 dark:bg-muted">
        <motion.div 
          className="h-2.5 rounded-full bg-gradient-to-r from-primary to-secondary"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

  return (
    <section ref={sectionRef} id="skills" className="section-container bg-muted/30 py-20 md:py-32 section-bg section-bg-dots">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-background/80 to-background/80 z-0"></div>
      
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
            My <span className="gradient-text">Skills</span>
          </motion.h2>
          <motion.p 
            className="max-w-2xl mx-auto text-foreground/70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            I have experience with a wide range of technologies across the full stack.
            Here are some of the key skills I've developed throughout my career.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillsData.map((category, index) => (
            <motion.div
              key={category.category}
              className="bg-background p-6 rounded-lg shadow-lg border border-border"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-bold mb-4 gradient-text">{category.category}</h3>
              <div>
                {category.skills.map((skill) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-foreground/70 mb-6">
            Beyond technical skills, I value clear communication, attention to detail, and continuous learning.
            I'm always exploring new technologies and best practices to deliver the best solutions.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}