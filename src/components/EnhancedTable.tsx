import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Search, Settings, ChevronDown } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface EnhancedTableProps {
  columns: Column[];
  data: any[];
  searchPlaceholder?: string;
  onRowAction?: (action: string, row: any) => void;
  hideSearch?: boolean;
}

export function EnhancedTable({ 
  columns, 
  data, 
  searchPlaceholder = "Search...",
  onRowAction,
  hideSearch = false
}: EnhancedTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleColumns, setVisibleColumns] = useState<string[]>(columns.map(col => col.key));
  const [showColumnSettings, setShowColumnSettings] = useState(false);

  const filteredData = data.filter(row =>
    Object.values(row).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const visibleColumnData = columns.filter(col => visibleColumns.includes(col.key));

  const toggleColumn = (columnKey: string) => {
    setVisibleColumns(prev =>
      prev.includes(columnKey)
        ? prev.filter(key => key !== columnKey)
        : [...prev, columnKey]
    );
  };

  const toggleAllColumns = () => {
    if (visibleColumns.length === columns.length) {
      setVisibleColumns([]);
    } else {
      setVisibleColumns(columns.map(col => col.key));
    }
  };

  return (
    <div className="space-y-4">
      {/* Table Controls - Only show if not hidden */}
      {!hideSearch && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Show/Hide Columns Dropdown */}
            <Popover open={showColumnSettings} onOpenChange={setShowColumnSettings}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2 text-sm border-gray-300 rounded-lg bg-gray-50 hover:bg-white"
                  style={{ height: '36px' }}
                >
                  <Settings className="w-4 h-4" />
                  <span>Columns</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-0" align="start">
                <div className="p-3 border-b border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={visibleColumns.length === columns.length}
                      onCheckedChange={toggleAllColumns}
                      className="w-4 h-4"
                    />
                    <label className="text-sm font-medium">
                      Show All ({columns.length})
                    </label>
                  </div>
                </div>
                <div className="p-2 max-h-60 overflow-y-auto">
                  {columns.map((column) => (
                    <div key={column.key} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                      <Checkbox
                        checked={visibleColumns.includes(column.key)}
                        onCheckedChange={() => toggleColumn(column.key)}
                        className="w-4 h-4"
                      />
                      <label className="text-sm cursor-pointer flex-1">
                        {column.label}
                      </label>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 text-sm border-gray-300 rounded-lg bg-gray-50 focus:bg-white w-80"
                style={{ height: '36px' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="border border-gray-200 rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              {visibleColumnData.map((column) => (
                <TableHead key={column.key} className="text-sm font-medium text-gray-700 py-3">
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                {visibleColumnData.map((column) => (
                  <TableCell key={column.key} className="py-3 text-sm">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}