export interface ColumnWidth {
  key: string;
  width: number;
}

export class TableColumnService {
  private static getStorageKey(tableId: string): string {
    return `table-columns-${tableId}`;
  }

  static saveColumnWidths(tableId: string, widths: Record<string, number>): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        this.getStorageKey(tableId),
        JSON.stringify(widths)
      );
    }
  }

  static getColumnWidths(tableId: string): Record<string, number> {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(this.getStorageKey(tableId));
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  }

  static resetColumnWidths(tableId: string): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.getStorageKey(tableId));
    }
  }
}
