'use client';

import { motion } from 'motion/react';

interface HologramDiagramProps {
  type: 'value' | 'process' | 'impact';
}

const HologramDiagram: React.FC<HologramDiagramProps> = ({ type }) => {
  const glowFilter = "drop-shadow(0 0 10px rgba(6, 182, 212, 0.5))";

  if (type === 'value') {
    return (
      <svg viewBox="0 0 400 300" className="w-full h-full">
        <defs>
          <linearGradient id="holoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Rotating Rings */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ originX: "200px", originY: "150px" }}
        >
          <circle cx="200" cy="150" r="100" fill="none" stroke="#06b6d4" strokeWidth="1" strokeDasharray="5,5" opacity="0.5" />
          <circle cx="200" cy="150" r="120" fill="none" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="10,10" opacity="0.3" />
        </motion.g>

        {/* Center Core */}
        <motion.circle
          cx="200"
          cy="150"
          r="40"
          fill="url(#holoGradient)"
          filter={glowFilter}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Orbiting Nodes */}
        {[0, 120, 240].map((angle, i) => (
          <motion.g
            key={i}
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: i * -5 }}
            style={{ originX: "200px", originY: "150px" }}
          >
            <g transform={`rotate(${angle} 200 150) translate(0 -80)`}>
              <circle r="15" fill="#06b6d4" opacity="0.8" filter={glowFilter} />
              <text y="5" textAnchor="middle" fill="white" fontSize="10" transform={`rotate(${-angle})`}>
                {['标准', '规范', '专业'][i]}
              </text>
            </g>
          </motion.g>
        ))}

        <text x="200" y="155" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" filter={glowFilter}>
          核心价值
        </text>
      </svg>
    );
  }

  if (type === 'process') {
    return (
      <svg viewBox="0 0 400 300" className="w-full h-full">
        {/* Connecting Line */}
        <motion.path
          d="M50,150 L350,150"
          stroke="#06b6d4"
          strokeWidth="2"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Nodes */}
        {['申请', '评估', '发布'].map((step, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.5, duration: 0.5 }}
          >
            <circle cx={50 + i * 150} cy="150" r="25" fill="#0B1120" stroke="#06b6d4" strokeWidth="2" filter={glowFilter} />
            <text x={50 + i * 150} y="155" textAnchor="middle" fill="white" fontSize="12">{step}</text>

            {/* Pulse Effect */}
            <motion.circle
              cx={50 + i * 150}
              cy="150"
              r="25"
              fill="none"
              stroke="#06b6d4"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.g>
        ))}
      </svg>
    );
  }

  // Impact Visualization
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      {/* Map Grid Effect */}
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.2" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill="url(#grid)" />

      {/* Expanding Waves */}
      {[1, 2, 3].map((i) => (
        <motion.circle
          key={i}
          cx="200"
          cy="150"
          r={30 * i}
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="1"
          initial={{ opacity: 0.5, scale: 0.8 }}
          animate={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}

      {/* Data Points */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.circle
          key={i}
          cx={Math.random() * 300 + 50}
          cy={Math.random() * 200 + 50}
          r="2"
          fill="#06b6d4"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: Math.random() * 2 + 1, repeat: Infinity }}
        />
      ))}

      <text x="200" y="150" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold" filter={glowFilter}>
        影响力覆盖
      </text>
    </svg>
  );
};

export default HologramDiagram;

