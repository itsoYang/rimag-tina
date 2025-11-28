'use client';

import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = '' }) => {
  return (
    <section className={`py-20 ${className} transition-colors duration-300`}>
      {children}
    </section>
  );
};

export default Section;
