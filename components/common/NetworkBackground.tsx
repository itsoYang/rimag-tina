'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'motion/react';

const NetworkBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 使用 useMemo 固定节点位置，避免服务器端和客户端不一致
  const nodes = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
      })),
    [] // 空依赖数组，只在首次渲染时生成
  );

  return (
    <div className="absolute inset-0 overflow-hidden bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) translateZ(-200px)',
        }}
      />

      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-400/20 blur-[100px]"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-400/20 blur-[100px]"
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Network Nodes */}
      <svg className="absolute inset-0 w-full h-full opacity-40">
        {nodes.map((node, i) => (
          <g key={i}>
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size}
              fill="#3b82f6"
              className="fill-blue-500"
              animate={{
                cx: [`${node.x}%`, `${node.x + (Math.random() * 10 - 5)}%`, `${node.x}%`],
                cy: [`${node.y}%`, `${node.y + (Math.random() * 10 - 5)}%`, `${node.y}%`],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                translateX: mousePosition.x * (Math.random() + 0.5),
                translateY: mousePosition.y * (Math.random() + 0.5),
              }}
            />
            {i % 3 === 0 && (
              <motion.line
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${nodes[(i + 1) % nodes.length].x}%`}
                y2={`${nodes[(i + 1) % nodes.length].y}%`}
                className="stroke-blue-400"
                strokeWidth="0.5"
                strokeOpacity="0.3"
                animate={{
                  x1: [`${node.x}%`, `${node.x + (Math.random() * 10 - 5)}%`, `${node.x}%`],
                  y1: [`${node.y}%`, `${node.y + (Math.random() * 10 - 5)}%`, `${node.y}%`],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </g>
        ))}
      </svg>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-slate-50 dark:via-gray-900/50 dark:to-gray-900 pointer-events-none transition-colors duration-300" />
    </div>
  );
};

export default NetworkBackground;
