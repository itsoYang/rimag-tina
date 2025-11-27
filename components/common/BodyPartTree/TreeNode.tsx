'use client';

import React from 'react';
import { TreeNodeData } from './types';
import { useTree } from './TreeContext';
import { ChevronDown, ChevronRight } from 'lucide-react';

export const TreeNode: React.FC<{ node: TreeNodeData }> = ({ node }) => {
  const { expandedNodes, selectedNodes, toggleExpand, toggleSelect } = useTree();

  const isExpanded = expandedNodes.has(node.id);
  const isSelected = selectedNodes.has(node.id);
  const hasChildren = node.children && node.children.length > 0;

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleExpand(node.id);
  };

  const handleSelect = () => {
    toggleSelect(node);
  };

  return (
    <div>
      <div
        className={`
          flex items-center py-1.5 px-2 cursor-pointer rounded transition-all duration-200
          ${isSelected
            ? 'bg-blue-500/30 text-blue-600 dark:text-blue-300'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white'}
        `}
        style={{
          paddingLeft: `${node.level * 16 + 8}px`,
        }}
        onClick={handleSelect}
      >
        {hasChildren ? (
          <button
            onClick={handleExpand}
            className="p-0.5 mr-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        ) : (
          <div className="w-6 mr-1" />
        )}
        <div className={`
          flex items-center gap-1 font-mono text-[0.9rem] font-medium
          ${isSelected
            ? 'text-blue-600 dark:text-blue-300'
            : 'text-gray-900 dark:text-white'}
        `}>
          <span className={`
            ${isSelected
              ? 'text-blue-600/90 dark:text-blue-300/90'
              : 'text-gray-500 dark:text-gray-400'}
          `}>
            {node.id}
          </span>
          <span className="text-gray-400 dark:text-gray-500">-</span>
          <span>{node.name}</span>
          {node.count !== undefined && node.count > 0 && (
            <span className={`
              text-xs ml-1 font-normal
              ${isSelected
                ? 'text-blue-600/90 dark:text-blue-300/90'
                : 'text-gray-500 dark:text-gray-400'}
            `}>
              ({node.count})
            </span>
          )}
        </div>
      </div>
      {isExpanded && hasChildren && (
        <div>
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};
