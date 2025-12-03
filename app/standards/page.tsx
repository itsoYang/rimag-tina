'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Table, Input, Select, Space, Tag, Button, Alert, Collapse, Drawer } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { BodyPartTree } from '@/components/common/BodyPartTree/BodyPartTree';
import type { TreeNodeData } from '@/components/common/BodyPartTree/types';
import type { BodyPartTreeRef } from '@/components/common/BodyPartTree/BodyPartTree';
import { SearchOutlined } from '@ant-design/icons';
import type { StandardItem, CurrentFilters, PopoverInfo, PaginationConfig } from '@/types/standards';
import { debounce } from 'lodash';
import ResizableTable from '@/components/common/ResizableTable/ResizableTable';
import { TableColumnService } from '@/lib/services/TableColumnService';
import { API_ENDPOINTS } from '@/lib/api.config';
import NetworkBackground from '@/components/common/NetworkBackground';
import { Activity, FileText, CreditCard, Award, X } from 'lucide-react';

const { Search } = Input;
const { Option } = Select;
const { Panel } = Collapse;

// Interface definitions
interface CodeNamePair {
  code: string;
  name: string;
}

interface FilterOptions {
  modalities: string[];
  deviceTypes: string[];
  scanTypes: CodeNamePair[];
  scopes: string[];
  tags: string[];
  postProcessingTypes: CodeNamePair[];
  positionTypes: CodeNamePair[];
}

interface FilterPanelProps {
  filters: FilterOptions;
  loading: boolean;
  onSearch: (value: string) => void;
  currentFilters: Record<string, string>;
  onQuery: () => void;
  onClear: () => void;
  onResetColumnWidths: () => void;
  selectedModality: string;
  onModalityChange: (value: string) => void;
  selectedDeviceType?: string;
  onDeviceTypeChange: (value: string | undefined) => void;
  selectedScanType?: string;
  onScanTypeChange: (value: string | undefined) => void;
  selectedScope?: string;
  onScopeChange: (value: string | undefined) => void;
  selectedTag?: string;
  onTagChange: (value: string | undefined) => void;
  selectedPostProcessing?: string;
  onPostProcessingChange: (value: string | undefined) => void;
  selectedPosition?: string;
  onPositionChange: (value: string | undefined) => void;
}

// Helper Components
const DetailItem = ({ label, value, fullWidth = false }: { label: string; value: any; fullWidth?: boolean }) => (
  <div className={`flex flex-col gap-1 ${fullWidth ? 'col-span-2' : ''}`}>
    <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
    <span className="text-sm font-medium text-gray-800 dark:text-gray-200 break-words leading-relaxed">
      {value || <span className="text-gray-400/50 italic text-xs">N/A</span>}
    </span>
  </div>
);

const DetailSection = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
  <div className="glass-card p-5 rounded-xl border border-white/40 dark:border-white/5 mb-4 shadow-sm hover:shadow-md transition-shadow duration-300">
    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100 dark:border-gray-700/50">
      <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
        <Icon className="w-4 h-4" />
      </div>
      <h3 className="text-sm font-bold text-gray-800 dark:text-white tracking-wide">{title}</h3>
    </div>
    <div className="grid grid-cols-2 gap-y-5 gap-x-6">
      {children}
    </div>
  </div>
);

const StandardsQueryPage: React.FC = () => {
  // Data state
  const [data, setData] = useState<StandardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    modalities: [],
    deviceTypes: [],
    scanTypes: [],
    scopes: [],
    tags: [],
    postProcessingTypes: [],
    positionTypes: []
  });

  // Query parameter state
  const [searchText, setSearchText] = useState('');
  const [selectedVersion, setSelectedVersion] = useState<string>('V3.8.2');
  const [selectedModality, setSelectedModality] = useState<string>('CT');
  const [selectedDeviceType, setSelectedDeviceType] = useState<string>();
  const [selectedScope, setSelectedScope] = useState<string>();
  const [selectedTag, setSelectedTag] = useState<string>();
  const [selectedScanType, setSelectedScanType] = useState<string>();
  const [selectedPostProcessing, setSelectedPostProcessing] = useState<string>();
  const [selectedPosition, setSelectedPosition] = useState<string>();

  // Pagination state
  const [pagination, setPagination] = useState<PaginationConfig>({
    current: 1,
    pageSize: 20,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number) => `共 ${total} 条记录`,
    hideOnSinglePage: true,
    pageSizeOptions: ['10', '20', '50', '100', '200']
  });

  // Body part tree state
  const [bodyPartTree, setBodyPartTree] = useState<TreeNodeData[]>([]);
  const [selectedNode, setSelectedNode] = useState<TreeNodeData | null>(null);

  // Current filter state
  const [currentFilters, setCurrentFilters] = useState({
    modality: 'CT',
    deviceType: '',
    scanType: '',
    scope: '',
    tag: '',
    postProcessing: '',
    position: '',
    oneLevelCode: '',
    twoLevelCode: '',
    threeLevelCode: ''
  });

  // Tree reference
  const treeRef = useRef<BodyPartTreeRef>(null);

  // Original data state
  const [originalData, setOriginalData] = useState<StandardItem[]>([]);

  // Drawer state
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<PopoverInfo | null>(null);

  // Error state
  const [error, setError] = useState<string | null>(null);

  // Filter options loading state
  const [filterOptionsLoading, setFilterOptionsLoading] = useState(false);

  // Column resize handler
  const handleColumnResize = (columnWidths: Record<string, number>) => {
    TableColumnService.saveColumnWidths('standards-table', columnWidths);
  };

  // Reset column widths handler
  const handleResetColumnWidths = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('table-columns-standards-table');
      window.location.reload();
    }
  };

  // Drawer handlers
  const showDrawer = (record: StandardItem) => {
    const formData = new FormData();
    formData.append('three_level_name', record.three_level_name);
    formData.append('checkitem_name', record.checkitem_name);
    formData.append('modality', selectedModality);
    formData.append('province', '江西');

    fetch(API_ENDPOINTS.STANDARDS.POPOVER_INFO, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        setSelectedRecord(data.data);
      })
      .catch(err => {
        console.error(err);
      });

    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
    setSelectedRecord(null);
  };

  // Column definitions
  const columns: ColumnsType<StandardItem> = [
    {
      title: '检查模态',
      dataIndex: 'modality_name',
      key: 'modality_name',
      width: 80,
      fixed: 'left',
      render: (text) => text || '-',
      sorter: (a, b) => (a.modality_name || '').localeCompare(b.modality_name || '')
    },
    {
      title: '项目名称',
      dataIndex: 'checkitem_name',
      key: 'checkitem_name',
      width: 220,
      fixed: 'left',
      render: (text) => <a className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">{text}</a>,
      sorter: (a, b) => (a.checkitem_name || '').localeCompare(b.checkitem_name || ''),
      onCell: (record) => ({
        onClick: () => {
          console.log('Row data:', record);
          showDrawer(record);
        },
        style: { cursor: 'pointer' }
      })
    },
    {
      title: '标准编码',
      dataIndex: 'checkitem_code',
      key: 'checkitem_code',
      width: 200,
      render: (text) => text || '-',
      sorter: (a, b) => (a.checkitem_code || '').localeCompare(b.checkitem_code || '')
    },
    {
      title: '扫描方式',
      dataIndex: 'scan_name',
      key: 'scan_name',
      width: 120,
      render: (text: string, record: StandardItem) => {
        if (!record.scan_code && !text) return '-';
        return record.scan_code ? `${record.scan_code} - ${text || ''}` : text || '-';
      },
      sorter: (a, b) => {
        const aCode = a.scan_code || '';
        const bCode = b.scan_code || '';
        return aCode.localeCompare(bCode);
      }
    },
    {
      title: '后处理',
      dataIndex: 'post_processing_name',
      key: 'post_processing_name',
      width: 120,
      render: (text: string, record: any) => {
        if (!record.post_processing_code && !text) return '-';
        return record.post_processing_code ? `${record.post_processing_code} - ${text || ''}` : text || '-';
      },
      sorter: (a, b) => {
        const aCode = a.post_processing_code || '';
        const bCode = b.post_processing_code || '';
        return aCode.localeCompare(bCode);
      }
    },
    {
      title: '体位',
      dataIndex: 'position_name',
      key: 'position_name',
      width: 120,
      render: (text: string, record: any) => {
        if (!record.position_code && !text) return '-';
        return record.position_code ? `${record.position_code} - ${text || ''}` : text || '-';
      },
      sorter: (a, b) => {
        const aCode = a.position_code || '';
        const bCode = b.position_code || '';
        return aCode.localeCompare(bCode);
      }
    },
    {
      title: '标签',
      dataIndex: 'tag_name',
      key: 'tag_name',
      width: 100,
      render: (text) => text || '-',
      sorter: (a, b) => (a.tag_name || '').localeCompare(b.tag_name || '')
    }
  ];

  // Filter data function
  const filterData = useCallback((sourceData: StandardItem[]) => {
    console.log('开始筛选，原始数据量:', sourceData.length);

    let filteredData = sourceData;

    // Body part filter logic
    if (selectedNode) {
      console.log('筛选前数据量:', filteredData.length);
      console.log('筛选条件:', {
        level: selectedNode.level,
        id: selectedNode.id,
        name: selectedNode.name
      });

      switch (selectedNode.level) {
        case 1:
          filteredData = filteredData.filter(item => item.one_level_code === selectedNode.id);
          break;
        case 2:
          filteredData = filteredData.filter(item => item.two_level_code === selectedNode.id);
          break;
        case 3:
          filteredData = filteredData.filter(item => item.three_level_code === selectedNode.id);
          break;
      }

      console.log('筛选后数据量:', filteredData.length);
    }

    // Device type filter
    if (currentFilters.deviceType) {
      console.log('应用设备类型筛选:', currentFilters.deviceType);
      const beforeCount = filteredData.length;
      filteredData = filteredData.filter(item =>
        item.device_type_name === currentFilters.deviceType
      );
      console.log(`设备类型筛选: ${beforeCount} -> ${filteredData.length}`);
    }

    // Scan type filter
    if (currentFilters.scanType) {
      console.log('应用扫描方式筛选:', currentFilters.scanType);
      const beforeCount = filteredData.length;
      filteredData = filteredData.filter(item =>
        item.scan_code === currentFilters.scanType
      );
      console.log(`扫描方式筛选: ${beforeCount} -> ${filteredData.length}`);
    }

    // Post processing filter
    if (currentFilters.postProcessing) {
      console.log('应用后处理筛选:', currentFilters.postProcessing);
      const beforeCount = filteredData.length;
      filteredData = filteredData.filter(item =>
        item.post_processing_code === currentFilters.postProcessing
      );
      console.log(`后处理筛选: ${beforeCount} -> ${filteredData.length}`);
    }

    // Position filter
    if (currentFilters.position) {
      console.log('应用体位筛选:', currentFilters.position);
      const beforeCount = filteredData.length;
      filteredData = filteredData.filter(item =>
        item.position_code === currentFilters.position
      );
      console.log(`体位筛选: ${beforeCount} -> ${filteredData.length}`);
    }

    // Scope filter
    if (currentFilters.scope) {
      filteredData = filteredData.filter(item =>
        item.scope_name === currentFilters.scope
      );
    }

    // Tag filter
    if (currentFilters.tag) {
      filteredData = filteredData.filter(item =>
        item.tag_name === currentFilters.tag
      );
    }

    // Search text filter
    if (searchText) {
      filteredData = filteredData.filter(item =>
        item.checkitem_name.includes(searchText) ||
        item.checkitem_code.includes(searchText)
      );
    }

    console.log('最终筛选结果:', {
      totalCount: filteredData.length,
      deviceType: currentFilters.deviceType,
      scanType: currentFilters.scanType
    });

    setData(filteredData);
    setPagination((prev: PaginationConfig) => ({
      ...prev,
      total: filteredData.length,
      current: 1
    }));
  }, [selectedNode, currentFilters, searchText]);

  // Fetch data function
  const fetchData = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        version: selectedVersion,
        modality: currentFilters.modality,
        pageSize: '1000',
        current: '1'
      }).toString();

      const response = await fetch(`${API_ENDPOINTS.STANDARDS.LIST}?${params}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();

      if (result.success) {
        console.log('获取到的原始数据:', {
          totalRecords: result.data.length,
          firstItem: result.data[0],
          lastItem: result.data[result.data.length - 1]
        });

        setOriginalData(result.data);
        setData(result.data);

        setPagination(prev => ({
          ...prev,
          total: result.data.length,
          current: 1,
          pageSize: 20
        }));

        setFilters(result.filters);
        setBodyPartTree(result.bodyPartTree || []);
      } else {
        throw new Error(result.message || '获取数据失败');
      }
    } catch (error: any) {
      setError(error?.message || '未知错误');
      console.error('获取标准时出错:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedVersion, currentFilters.modality]);

  // Watch query parameter changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Search handler
  const handleSearch = (value: string) => {
    setSearchText(value);
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  // Version change handler
  const handleVersionChange = (value: string) => {
    setSelectedVersion(value || 'V3.8.2');
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  // Modality change handler
  const handleModalityChange = (value: string) => {
    console.log('模态切换:', value);
    setSelectedModality(value || 'CT');
    setSelectedScanType(undefined);
    setSelectedPostProcessing(undefined);
    setSelectedPosition(undefined);
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  // Device type change handler
  const handleDeviceTypeChange = (value: string | undefined) => {
    setSelectedDeviceType(value || undefined);
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  // Scan type change handler
  const handleScanTypeChange = (value: string | undefined) => {
    setSelectedScanType(value || undefined);
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  // Scope change handler
  const handleScopeChange = (value: string | undefined) => {
    setSelectedScope(value || undefined);
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  // Tag change handler
  const handleTagChange = (value: string | undefined) => {
    setSelectedTag(value || undefined);
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  // Table change handler
  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination((prev: PaginationConfig) => ({
      ...prev,
      current: newPagination.current || prev.current,
      pageSize: newPagination.pageSize || prev.pageSize,
      total: newPagination.total || prev.total
    }));
  };

  // Render current filters
  const renderCurrentFilters = () => {
    const items = [];

    items.push(
      <Tag key="modality" color="blue">
        模态: {currentFilters.modality}
      </Tag>
    );

    if (currentFilters.deviceType) {
      items.push(
        <Tag key="deviceType" color="green">
          设备类型: {currentFilters.deviceType}
        </Tag>
      );
    }

    if (currentFilters.scanType) {
      items.push(
        <Tag key="scanType" color="gold">
          扫描方式: {currentFilters.scanType}
        </Tag>
      );
    }

    if (currentFilters.scope) {
      items.push(
        <Tag key="scope" color="purple">
          使用范围: {currentFilters.scope}
        </Tag>
      );
    }

    if (currentFilters.tag) {
      items.push(
        <Tag key="tag" color="magenta">
          标签: {currentFilters.tag}
        </Tag>
      );
    }

    // Display selected body part
    if (selectedNode) {
      const getFullPath = (node: TreeNodeData) => {
        if (node.level === 1) {
          return node.name;
        } else if (node.level === 2) {
          const parent = bodyPartTree.find(n =>
            n.children.some(child => child.id === node.id)
          );
          return parent ? `${parent.name} > ${node.name}` : node.name;
        } else {
          const parent = bodyPartTree.find(n =>
            n.children.some(child =>
              child.children.some(grandChild => grandChild.id === node.id)
            )
          );
          const twoLevel = parent?.children.find(child =>
            child.children.some(grandChild => grandChild.id === node.id)
          );
          return parent && twoLevel ?
            `${parent.name} > ${twoLevel.name} > ${node.name}` :
            node.name;
        }
      };

      items.push(
        <Tag
          key="bodyPart"
          color="cyan"
          closable
          onClose={() => {
            setSelectedNode(null);
            setCurrentFilters(prev => ({
              ...prev,
              oneLevelCode: '',
              twoLevelCode: '',
              threeLevelCode: ''
            }));
            if (treeRef.current?.clearSelection) {
              treeRef.current.clearSelection();
            }
          }}
        >
          部位: {getFullPath(selectedNode)}
        </Tag>
      );
    }

    return items;
  };

  // Node select handler
  const handleNodeSelect = (node: TreeNodeData) => {
    console.log('选中节点:', node);

    if (selectedNode?.id === node.id) {
      setSelectedNode(null);
      const newFilters = {
        ...currentFilters,
        oneLevelCode: '',
        twoLevelCode: '',
        threeLevelCode: ''
      };
      setCurrentFilters(newFilters);
      filterData(originalData);
      return;
    }

    setSelectedNode(node);
    let newFilters = {
      ...currentFilters,
      oneLevelCode: '',
      twoLevelCode: '',
      threeLevelCode: ''
    };

    switch (node.level) {
      case 1:
        newFilters.oneLevelCode = node.id;
        break;
      case 2:
        newFilters.twoLevelCode = node.id;
        break;
      case 3:
        newFilters.threeLevelCode = node.id;
        break;
    }

    console.log('新的筛选条件:', newFilters);
    setCurrentFilters(newFilters);
    filterData(originalData);
  };

  // Query handler
  const handleQuery = () => {
    console.log('查询按钮点击，当前选择:', {
      deviceType: selectedDeviceType,
      scanType: selectedScanType,
      postProcessing: selectedPostProcessing,
      position: selectedPosition
    });

    const newFilters = {
      ...currentFilters,
      modality: selectedModality,
      deviceType: selectedDeviceType || '',
      scanType: selectedScanType || '',
      scope: selectedScope || '',
      tag: selectedTag || '',
      postProcessing: selectedPostProcessing || '',
      position: selectedPosition || ''
    };

    console.log('更新筛选条件:', newFilters);
    setCurrentFilters(newFilters);
    filterData(originalData);
  };

  // Clear handler
  const handleClear = () => {
    setSelectedModality('CT');
    setSelectedDeviceType(undefined);
    setSelectedScanType(undefined);
    setSelectedScope(undefined);
    setSelectedTag(undefined);
    setSelectedNode(null);
    setSearchText('');
    setCurrentFilters({
      modality: 'CT',
      deviceType: '',
      scanType: '',
      scope: '',
      tag: '',
      postProcessing: '',
      position: '',
      oneLevelCode: '',
      twoLevelCode: '',
      threeLevelCode: ''
    });

    if (treeRef.current?.clearSelection) {
      treeRef.current.clearSelection();
    }

    setData(originalData);
    setPagination(prev => ({
      ...prev,
      current: 1,
      total: originalData.length
    }));
  };

  // Watch filter changes
  useEffect(() => {
    if (originalData.length > 0) {
      filterData(originalData);
    }
  }, [currentFilters, selectedNode, searchText, filterData]);

  // Render statistics
  const renderStatistics = () => {
    return (
      <div className="flex items-center gap-2">
        <span className="text-gray-600 dark:text-gray-300">数据统计：</span>
        <Tag color="cyan">总数：{pagination.total || 0} 条记录</Tag>
        {selectedNode && (
          <Tag color="blue">
            当前部位：{selectedNode.name} ({selectedNode.count || 0} 条记录)
          </Tag>
        )}
      </div>
    );
  };

  // Fetch filter options
  const fetchFilterOptions = async () => {
    try {
      setFilterOptionsLoading(true);
      const response = await fetch(API_ENDPOINTS.STANDARDS.FILTERS(selectedModality));
      if (!response.ok) {
        console.warn(`API 接口暂不可用: ${response.status}`);
        // 设置默认空数据，不中断页面
        setFilters(prev => ({ 
          ...prev, 
          scanTypes: [],
          bodyParts: [],
          directions: [],
          contrasts: []
        }));
        return;
      }
      const data = await response.json();

      console.log('API返回的原始数据:', data);

      if (!data.scanTypes || !Array.isArray(data.scanTypes)) {
        console.warn('扫描方式数据无效:', data.scanTypes);
        setFilters(prev => ({ ...prev, scanTypes: [] }));
        return;
      }

      const normalizedScanTypes = data.scanTypes.map((item: unknown) => {
        if (item && typeof item === 'object' && 'code' in item && 'name' in item) {
          return item as CodeNamePair;
        }
        if (typeof item === 'string') {
          return {
            code: item,
            name: item
          } as CodeNamePair;
        }
        return null;
      }).filter((item: unknown): item is CodeNamePair =>
        item !== null &&
        typeof item === 'object' &&
        'code' in item &&
        'name' in item
      );

      console.log('规范化后的扫描方式数据:', normalizedScanTypes);

      setFilters(prev => ({
        ...prev,
        ...data,
        scanTypes: normalizedScanTypes
      }));
    } catch (error) {
      console.error('获取筛选选项失败:', error);
      setFilters(prev => ({
        ...prev,
        scanTypes: []
      }));
    } finally {
      setFilterOptionsLoading(false);
    }
  };

  useEffect(() => {
    console.log('模态变化，当前值:', selectedModality);
    if (selectedModality) {
      fetchFilterOptions();
    }
  }, [selectedModality]);

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchText(value);
      filterData(originalData);
    }, 300),
    [filterData, originalData]
  );

  // Optimize pagination data
  const filteredAndPaginatedData = useMemo(() => {
    const current = pagination.current || 1;
    const pageSize = pagination.pageSize || 20;
    const start = (current - 1) * pageSize;
    const end = start + pageSize;
    return data.slice(start, end);
  }, [data, pagination.current, pagination.pageSize]);

  // Reset column widths handler
  const handleResetColumns = () => {
    TableColumnService.resetColumnWidths('standards-table');
  };

  // Post processing change handler
  const handlePostProcessingChange = (value: string | undefined) => {
    setSelectedPostProcessing(value);
  };

  // Position change handler
  const handlePositionChange = (value: string | undefined) => {
    setSelectedPosition(value);
  };

  // Filter Panel Component
  const FilterPanel: React.FC<FilterPanelProps> = ({
    filters,
    loading,
    onSearch,
    currentFilters,
    onQuery,
    onClear,
    onResetColumnWidths,
    selectedModality,
    onModalityChange,
    selectedDeviceType,
    onDeviceTypeChange,
    selectedScanType,
    onScanTypeChange,
    selectedScope,
    onScopeChange,
    selectedTag,
    onTagChange,
    selectedPostProcessing,
    onPostProcessingChange,
    selectedPosition,
    onPositionChange
  }) => {
    const activeFiltersCount = Object.values(currentFilters).filter(Boolean).length;

    return (
      <div className="space-y-3">
        {/* Compact filter header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">筛选条件</span>
            {activeFiltersCount > 0 && (
              <Tag color="blue" className="text-xs">
                {activeFiltersCount} 个
              </Tag>
            )}
          </div>
          <Space size="small">
            <Button
              type="primary"
              icon={<SearchOutlined />}
              size="small"
              onClick={onQuery}
              className="shadow-sm"
            >
              查询
            </Button>
            <Button
              size="small"
              onClick={onClear}
            >
              清除
            </Button>
            <Button
              size="small"
              onClick={onResetColumnWidths}
              title="重置表格列宽到默认值"
            >
              重置列宽
            </Button>
          </Space>
        </div>

        {/* Optimized filter grid - 2 rows layout */}
        <div className="space-y-2">
          <div className="grid grid-cols-4 gap-2">
            <Search
              placeholder="标准编码或项目名称"
              onSearch={onSearch}
              allowClear
              size="small"
              className="col-span-2"
            />
            <Select
              placeholder="检查模态"
              value={selectedModality}
              onChange={onModalityChange}
              size="small"
            >
              {filters.modalities?.map((modality: string) => (
                <Option key={modality} value={modality}>
                  {modality}
                </Option>
              ))}
            </Select>
            <Select
              placeholder="设备类型"
              value={selectedDeviceType}
              onChange={onDeviceTypeChange}
              allowClear
              size="small"
            >
              {filters.deviceTypes?.map((type: string) => (
                <Option key={type} value={type}>{type}</Option>
              ))}
            </Select>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <Select
              placeholder="扫描方式"
              value={selectedScanType}
              onChange={onScanTypeChange}
              allowClear
              size="small"
            >
              {filters.scanTypes?.map((type: CodeNamePair) => (
                <Option key={type.code} value={type.code}>
                  {type.name}
                </Option>
              ))}
            </Select>
            <Select
              placeholder="使用范围"
              value={selectedScope}
              onChange={onScopeChange}
              allowClear
              size="small"
            >
              {filters.scopes?.map((scope: string) => (
                <Option key={scope} value={scope}>{scope}</Option>
              ))}
            </Select>
            <Select
              placeholder="后处理"
              value={selectedPostProcessing}
              onChange={onPostProcessingChange}
              allowClear
              size="small"
            >
              {filters.postProcessingTypes?.map((type: CodeNamePair) => (
                <Option key={type.code} value={type.code}>
                  {type.name}
                </Option>
              ))}
            </Select>
            <Select
              placeholder="体位"
              value={selectedPosition}
              onChange={onPositionChange}
              allowClear
              size="small"
            >
              {filters.positionTypes?.map((type: CodeNamePair) => (
                <Option key={type.code} value={type.code}>
                  {type.name}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </div>
    );
  };

  // Filter props
  const filterProps: FilterPanelProps = {
    filters,
    loading: filterOptionsLoading,
    onSearch: handleSearch,
    currentFilters,
    onQuery: handleQuery,
    onClear: handleClear,
    onResetColumnWidths: handleResetColumnWidths,
    selectedModality,
    onModalityChange: handleModalityChange,
    selectedDeviceType,
    onDeviceTypeChange: handleDeviceTypeChange,
    selectedScanType,
    onScanTypeChange: setSelectedScanType,
    selectedScope,
    onScopeChange: handleScopeChange,
    selectedTag,
    onTagChange: handleTagChange,
    selectedPostProcessing,
    onPostProcessingChange: handlePostProcessingChange,
    selectedPosition,
    onPositionChange: handlePositionChange
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] transition-colors duration-300 relative overflow-hidden standards-page">
      {/* Background */}
      <NetworkBackground />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="glass-panel p-6 rounded-2xl">
          <div className="p-4">
            {/* Title and statistics in one row */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-white dark:to-blue-200">
                医学影像检查项目标准查询
              </h1>
              {renderStatistics()}
            </div>

            <div className="flex gap-6">
              {/* Left body part tree */}
              <div className="w-[280px] flex-shrink-0 glass-card p-4 rounded-xl border border-white/20 dark:border-white/10 shadow-sm">
                <div className="mb-3">
                  <h2 className="text-sm font-semibold mb-3 text-gray-800 dark:text-white flex items-center gap-2">
                    <span className="w-1 h-5 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></span>
                    部位导航
                  </h2>
                  <BodyPartTree
                    data={bodyPartTree}
                    onSelect={handleNodeSelect}
                    ref={treeRef}
                  />
                </div>
              </div>

              {/* Right content area */}
              <div className="flex-1 min-w-0">
                {/* Current selection and filters */}
                <div className="space-y-3 mb-4">
                  {/* Current filter conditions */}
                  {Object.values(currentFilters).filter(Boolean).length > 0 && (
                    <div className="glass-card p-2.5 rounded-lg border border-white/20 dark:border-white/10">
                      {renderCurrentFilters()}
                    </div>
                  )}

                  {/* Filter panel */}
                  <div className="glass-card p-3 rounded-lg border border-white/20 dark:border-white/10">
                    <FilterPanel {...filterProps} />
                  </div>
                </div>

                {/* Table section */}
                <ResizableTable<StandardItem>
                  columns={columns}
                  dataSource={data}
                  loading={loading}
                  pagination={pagination}
                  onChange={handleTableChange}
                  scroll={{ x: 1000, y: 'calc(100vh - 400px)' }}
                  rowKey="id"
                  size="small"
                  bordered
                  sticky
                  tableId="standards-table"
                  onResize={handleColumnResize}
                  summary={() => (
                    <Table.Summary fixed>
                      <Table.Summary.Row>
                        <Table.Summary.Cell index={0} colSpan={columns.length} className="text-gray-500 dark:text-gray-400">
                          点击项目名称，查看项目内涵。
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                    </Table.Summary>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        {error && (
          <Alert
            message="错误"
            description={error}
            type="error"
            showIcon
            closable
            className="mb-4"
          />
        )}
        <div>
          <Drawer
            title={
              <div className="flex items-center gap-3">
                <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300">
                  {selectedRecord?.checkitem_name}
                </span>
              </div>
            }
            placement="right"
            onClose={onClose}
            open={drawerVisible}
            size="large"
            closeIcon={<div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"><X className="w-5 h-5 text-gray-500" /></div>}
            className="glass-drawer"
            styles={{
              header: {
                background: 'transparent',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
              },
              body: {
                background: 'transparent',
                padding: '24px'
              },
              mask: {
                backdropFilter: 'blur(4px)'
              }
            }}
          >
            {selectedRecord && (
              <div className="space-y-6 pb-8">
                {/* 1. Technical Parameters */}
                <DetailSection title="技术参数" icon={Activity}>
                  {selectedRecord.modality === 'CT' ? (
                    <>
                      <DetailItem label="扫描体位" value={selectedRecord.body_position} fullWidth />
                      <DetailItem label="扫描范围" value={selectedRecord.scan_scope} />
                      <DetailItem label="成像区域" value={selectedRecord.image_region} />
                      <DetailItem label="成像关注焦点" value={selectedRecord.image_focus} fullWidth />
                      <DetailItem label="对比剂方案" value={selectedRecord.contrast_agent} fullWidth />
                    </>
                  ) : selectedRecord.modality === 'MR' ? (
                    <>
                      <DetailItem label="线圈" value={selectedRecord.coil} />
                      <DetailItem label="体位" value={selectedRecord.body_position} />
                      <DetailItem label="扫描范围" value={selectedRecord.scan_scope} fullWidth />
                      <DetailItem label="基础序列" value={selectedRecord.base_sequence} fullWidth />
                      <DetailItem label="推荐序列" value={selectedRecord.compose_sequence} fullWidth />
                      <DetailItem label="对比剂方案" value={selectedRecord.contrast_agent} fullWidth />
                    </>
                  ) : (
                    <div className="col-span-2 text-gray-400 text-center py-4">暂无特定技术参数</div>
                  )}
                </DetailSection>

                {/* 2. Clinical Application */}
                <DetailSection title="临床应用" icon={FileText}>
                  <DetailItem label="解剖结构" value={selectedRecord.anatomical_structure} fullWidth />
                  <DetailItem label="临床意义" value={selectedRecord.clinical_significance} fullWidth />
                  <DetailItem label="适应症" value={selectedRecord.indications} fullWidth />
                </DetailSection>

                {/* 3. Medical Insurance */}
                <DetailSection title="医保信息" icon={CreditCard}>
                  <DetailItem label="地区" value="江西" />
                  <DetailItem label="项目编码" value={selectedRecord.medical_service_code} />
                  <DetailItem label="项目名称" value={selectedRecord.medical_service_name} fullWidth />
                  <DetailItem label="加收项目" value={selectedRecord.extra_name} fullWidth />
                </DetailSection>

                {/* 4. Evaluation Indicators */}
                <DetailSection title="评价指标" icon={Award}>
                  <DetailItem label="影像等级" value={selectedRecord.GradedDepart} />
                  <DetailItem label="影像分值" value={selectedRecord.AssignPointsDepart} />
                </DetailSection>
              </div>
            )}
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default StandardsQueryPage;
