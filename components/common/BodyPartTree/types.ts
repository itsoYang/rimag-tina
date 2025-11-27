export interface TreeNodeData {
  id: string;
  name: string;
  level: 1 | 2 | 3;
  children: TreeNodeData[];
  expanded?: boolean;
  selected?: boolean;
  count?: number;
  parentId?: string;
}

export interface TreeContextType {
  treeData: TreeNodeData[];
  expandedNodes: Set<string>;
  selectedNodes: Set<string>;
  toggleExpand: (nodeId: string) => void;
  toggleSelect: (node: TreeNodeData) => void;
  expandAll: () => void;
  collapseAll: () => void;
  clearSelection: () => void;
}
