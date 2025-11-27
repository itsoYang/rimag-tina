import type { TablePaginationConfig } from 'antd/es/table';

export interface BodyPartTreeNode {
  id: string;
  name: string;
  level: number;
  children: BodyPartTreeNode[];
  count: number;
}

export interface StandardItem {
  id: number;
  checkitem_code: string;
  checkitem_name: string;
  modality_name: string;
  device_type_name: string;
  one_level_code: string;
  one_level_name: string;
  two_level_code: string;
  two_level_name: string;
  three_level_code: string;
  three_level_name: string;
  scan_name: string | null;
  post_processing_name: string | null;
  position_name: string | null;
  version: string;
  scope_name: string;
  tag_name: string;
  scan_type?: string;
  device_type?: string;
  device_name?: string;
  scan_code?: string;
  post_processing_code?: string;
  position_code?: string;
}

export interface PopoverInfo {
  checkitem_code: string;
  checkitem_name: string;
  scan_param: string;
  image_region: string;
  image_focus: string;
  body_position: string;
  contrast_agent: string;
  scan_scope: string;
  indications: string;
  clinical_significance: string;
  anatomical_structure: string;
  GradedDepart: string;
  GradedHospital: string | null;
  AssignPointsDepart: string;
  AssignPointsHospital: string | null;
  medical_service_code: string;
  medical_service_name: string;
  extra_name: string | null;
  compose_sequence: string | null;
  base_sequence: string | null;
  coil: string | null;
  modality: string;
}

export interface CodeNamePair {
  code: string;
  name: string;
}

export interface Version {
  version: string;
}

export interface CurrentFilters {
  version: string;
  modality: string;
  deviceType: string;
  scanType: string;
  scope: string;
  tag: string;
  postProcessing: string;
  position: string;
  oneLevelCode: string;
  twoLevelCode: string;
  threeLevelCode: string;
}

// Add error type definitions
export interface ApiError extends Error {
  message: string;
  status?: number;
}

// Modify pagination configuration type
export interface PaginationConfig extends TablePaginationConfig {
  current: number;
  pageSize: number;
  total: number;
}

// Add FilterOptions interface
export interface FilterOptions {
  modalities: string[];
  deviceTypes: string[];
  scanTypes: CodeNamePair[];
  scopes: string[];
  tags: string[];
  postProcessingTypes: CodeNamePair[];
  positionTypes: CodeNamePair[];
  versions?: Version[];
}
