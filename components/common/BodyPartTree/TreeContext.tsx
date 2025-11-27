'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, forwardRef, useImperativeHandle } from 'react';
import { TreeContextType, TreeNodeData } from './types';

const TreeContext = createContext<TreeContextType | undefined>(undefined);

interface TreeProviderProps {
  children: React.ReactNode;
  initialData?: TreeNodeData[];
  onSelect?: (node: TreeNodeData) => void;
  ref?: React.Ref<TreeContextType>;
}

export const TreeProvider = forwardRef<TreeContextType, Omit<TreeProviderProps, 'ref'>>(({
  children,
  initialData = [],
  onSelect
}, ref) => {
  const [treeData, setTreeData] = useState<TreeNodeData[]>(initialData);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('treeExpandedNodes');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    }
    return new Set();
  });
  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set());

  useEffect(() => {
    setTreeData(initialData);
  }, [initialData]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('treeExpandedNodes', JSON.stringify([...expandedNodes]));
    }
  }, [expandedNodes]);

  const sortNodes = useCallback((nodes: TreeNodeData[]) => {
    return [...nodes].sort((a, b) => {
      return a.id.localeCompare(b.id);
    });
  }, []);

  const toggleExpand = useCallback((nodeId: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  }, []);

  const toggleSelect = useCallback((node: TreeNodeData) => {
    setSelectedNodes(prev => {
      const next = new Set<string>();
      if (!prev.has(node.id)) {
        next.add(node.id);
      }
      return next;
    });
    onSelect?.(node);
  }, [onSelect]);

  const expandAll = useCallback(() => {
    const getAllNodeIds = (nodes: TreeNodeData[]): string[] => {
      return nodes.reduce((acc: string[], node) => {
        return [...acc, node.id, ...getAllNodeIds(node.children)];
      }, []);
    };
    const allIds = new Set(getAllNodeIds(treeData));
    setExpandedNodes(allIds);
  }, [treeData]);

  const collapseAll = useCallback(() => {
    setExpandedNodes(new Set());
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedNodes(new Set());
  }, []);

  const contextValue = {
    treeData: sortNodes(treeData),
    expandedNodes,
    selectedNodes,
    toggleExpand,
    toggleSelect,
    expandAll,
    collapseAll,
    clearSelection
  };

  useImperativeHandle(ref, () => contextValue, [contextValue]);

  return <TreeContext.Provider value={contextValue}>{children}</TreeContext.Provider>;
});

TreeProvider.displayName = 'TreeProvider';

export const useTree = () => {
  const context = useContext(TreeContext);
  if (context === undefined) {
    throw new Error('useTree must be used within a TreeProvider');
  }
  return context;
};
