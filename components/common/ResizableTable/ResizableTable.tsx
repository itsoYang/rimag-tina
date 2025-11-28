'use client';

import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import type { ColumnsType, TableProps, ColumnType } from 'antd/es/table';
import { Resizable, ResizeCallbackData } from 'react-resizable';
import './styles.css';

interface ResizableTableProps<T> extends Omit<TableProps<T>, 'columns'> {
  columns: ColumnsType<T>;
  tableId: string;
  onResize?: (columnWidths: Record<string, number>) => void;
  onReset?: () => void;
}

// Custom HeaderCell property types
interface ResizableHeaderCellProps {
  width?: number;
  onResize?: (e: React.SyntheticEvent, data: ResizeCallbackData) => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any; // Allow other th element properties
}

const ResizableHeaderCell: React.FC<ResizableHeaderCellProps> = ({
  width,
  onResize,
  children,
  ...restProps
}) => {
  const [currentWidth, setCurrentWidth] = useState(width);
  const [isDragging, setIsDragging] = useState(false);

  const handleResize = (_: React.SyntheticEvent, data: ResizeCallbackData) => {
    const { size } = data;
    const newWidth = Math.max(50, size.width);
    setCurrentWidth(newWidth);
    if (onResize) {
      onResize(_, { ...data, size: { width: newWidth, height: data.size.height } });
    }
  };

  const handleResizeStart = () => {
    setIsDragging(true);
    document.body.style.userSelect = 'none';
  };

  const handleResizeStop = () => {
    setIsDragging(false);
    document.body.style.userSelect = '';
  };

  if (!width) {
    return <th {...restProps}>{children}</th>;
  }

  return (
    <Resizable
      width={currentWidth || width}
      height={0}
      handle={
        <span
          className={`react-resizable-handle ${isDragging ? 'dragging' : ''}`}
          onClick={e => e.stopPropagation()}
        />
      }
      onResize={handleResize}
      onResizeStart={handleResizeStart}
      onResizeStop={handleResizeStop}
      draggableOpts={{
        enableUserSelectHack: false,
        grid: [10, 10],
        moveThreshold: 2
      }}
    >
      <th {...restProps} style={{
        width: currentWidth || width,
        ...restProps.style
      }}>
        {children}
      </th>
    </Resizable>
  );
};

const ResizableTable = <T extends object>({
  columns,
  tableId,
  onResize,
  onReset,
  ...props
}: ResizableTableProps<T>) => {
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedWidths = localStorage.getItem(`table-columns-${tableId}`);
      if (savedWidths) {
        setColumnWidths(JSON.parse(savedWidths));
      }
    }
  }, [tableId]);

  const saveColumnWidths = (newWidths: Record<string, number>) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`table-columns-${tableId}`, JSON.stringify(newWidths));
      setColumnWidths(newWidths);
      onResize?.(newWidths);
    }
  };

  const handleResize = (columnKey: string) => (_: React.SyntheticEvent, data: ResizeCallbackData) => {
    const newWidths = {
      ...columnWidths,
      [columnKey]: data.size.width,
    };
    saveColumnWidths(newWidths);
  };

  const resizableColumns = columns.map((col: ColumnType<T>) => {
    if (!col.key) {
      return col;
    }

    const width = columnWidths[col.key as string] ||
      (typeof col.width === 'string' ? parseInt(col.width, 10) : col.width);

    return {
      ...col,
      width,
      onHeaderCell: (column: ColumnType<T>) => ({
        width: columnWidths[column.key as string] ||
          (typeof column.width === 'string' ? parseInt(column.width, 10) : column.width),
        onResize: handleResize(column.key as string),
      }),
    } as ColumnType<T>;
  });

  const resetColumnWidths = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`table-columns-${tableId}`);
      setColumnWidths({});
      onReset?.();
    }
  };

  return (
    <div className="relative">
      <Table<T>
        {...props}
        columns={resizableColumns}
        components={{
          header: {
            cell: ResizableHeaderCell,
          },
        }}
      />
    </div>
  );
};

export default ResizableTable;
