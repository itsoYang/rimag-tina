'use client';

import React, { forwardRef, useImperativeHandle } from 'react';
import { TreeProvider, useTree } from './TreeContext';
import { TreeNode } from './TreeNode';
import { TreeNodeData, TreeContextType } from './types';

const TreeContent: React.FC = () => {
  const { treeData, expandAll, collapseAll } = useTree();

  return (
    <div className="w-full h-full">
      <div className="flex gap-2 mb-3">
        <button
          onClick={expandAll}
          className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
        >
          展开全部
        </button>
        <button
          onClick={collapseAll}
          className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
        >
          收起全部
        </button>
      </div>
      <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {treeData.map((node) => (
          <TreeNode key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
};

interface BodyPartTreeProps {
  data: TreeNodeData[];
  onSelect?: (node: TreeNodeData) => void;
}

export interface BodyPartTreeRef {
  clearSelection: () => void;
  toggleSelect: (node: TreeNodeData) => void;
}

export const BodyPartTree = forwardRef<BodyPartTreeRef, BodyPartTreeProps>(({ data, onSelect }, ref) => {
  const treeRef = React.useRef<TreeContextType | null>(null);

  useImperativeHandle(ref, () => ({
    clearSelection: () => {
      if (treeRef.current) {
        treeRef.current.clearSelection();
      }
    },
    toggleSelect: (node: TreeNodeData) => {
      if (treeRef.current) {
        treeRef.current.toggleSelect(node);
      }
    }
  }));

  return (
    <TreeProvider
      initialData={data}
      onSelect={onSelect}
      ref={treeRef}
    >
      <TreeContent />
    </TreeProvider>
  );
});

BodyPartTree.displayName = 'BodyPartTree';
