import  { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from './ui/sheet';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
// import { Checkbox } from './ui/checkbox';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon, Filter, RotateCcw, Search } from 'lucide-react';
import { Badge } from './ui/badge';

import ReactSelect from "react-select";







interface FilterField {
  key: string;
  label: string;
  type: 'text' | 'select' | 'multiselect' | 'date' | 'daterange' | 'number';
  options?: string[];
  placeholder?: string;
}

interface AdvancedFilterProps {
  fields: FilterField[];
  onApplyFilter: (filters: Record<string, any>) => void;
  onClearFilter: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
}




export function AdvancedFilter({ 
  fields, 
  onApplyFilter, 
  onClearFilter, 
  title = "Advanced Filter",
  children,
  showCloseButton = false
}: AdvancedFilterProps) {
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // const handleMultiSelectChange = (key: string, option: string, checked: boolean) => {
  //   setFilters(prev => {
  //     const currentValues = prev[key] || [];
  //     if (checked) {
  //       return {
  //         ...prev,
  //         [key]: [...currentValues, option]
  //       };
  //     } else {
  //       return {
  //         ...prev,
  //         [key]: currentValues.filter((v: string) => v !== option)
  //       };
  //     }
  //   });
  // };

  const handleApplyFilter = () => {
    const processedFilters = { ...filters };
    
    // Add date range if both dates are selected
    if (startDate && endDate) {
      processedFilters.dateRange = { start: startDate, end: endDate };
    }

    onApplyFilter(processedFilters);
    setIsOpen(false);
  };

  const handleClearFilter = () => {
    setFilters({});
    setStartDate(undefined);
    setEndDate(undefined);
    onClearFilter();
  };

  const getActiveFilterCount = () => {
    let count = Object.values(filters).filter(value => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== '' && value !== undefined && value !== null && value !== 'all';
    }).length;
    
    if (startDate && endDate) count += 1;
    
    return count;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

 

  const renderFilterField = (field: FilterField) => {
    switch (field.type) {
      case 'text':
        return (
          <Input
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
            value={filters[field.key] || ''}
            onChange={(e) => handleFilterChange(field.key, e.target.value)}
            className="text-sm"
          />
        );

      case 'select':
        return (
          <Select
            value={filters[field.key] ? filters[field.key] : 'all'}
            onValueChange={(value) => handleFilterChange(field.key, value === 'all' ? '' : value)}
          >
            <SelectTrigger className="text-sm">
              <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

case 'multiselect':
  return (
    <ReactSelect
      isMulti
      className="my-3 multiselectFilter"
      options={field.options?.map(opt => ({ label: opt, value: opt })) || []}
      value={(filters[field.key] || []).map((opt: string) => ({ label: opt, value: opt }))}
      onChange={(selected: any) =>
        handleFilterChange(
          field.key,
          (selected || []).map((s: any) => s.value)
        )
      }
      placeholder={`Select ${field.label.toLowerCase()}`}
    />
  );

      case 'date':
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left text-sm"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters[field.key] ? formatDate(filters[field.key]) : `Select ${field.label.toLowerCase()}`}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={filters[field.key]}
                onSelect={(date) => handleFilterChange(field.key, date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        );

      case 'number':
        return (
          <Input
            type="number"
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
            value={filters[field.key] || ''}
            onChange={(e) => handleFilterChange(field.key, e.target.value)}
            className="text-sm"
          />
        );

      default:
        return null;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className="relative">
          {children}
          {getActiveFilterCount() > 0 && (
            <Badge 
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center"
            >
              {getActiveFilterCount()}
            </Badge>
          )}
        </div>
      </SheetTrigger>
      <SheetContent side="right" className="w-[600px] sm:max-w-lg sm:w-[700px] flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>{title}</span>
          </SheetTitle>
          <SheetDescription>
            Apply advanced filters to narrow down your search results.
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto mt-6 space-y-6 pr-1 px-4">
          {/* Date Range Filter - Common for all screens */}
          <div className="space-y-3">
            <Label className="font-medium">Date Range</Label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm text-gray-600 mb-1 block">From</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left text-sm"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? formatDate(startDate) : "Start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label className="text-sm text-gray-600 mb-1 block">To</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left text-sm"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? formatDate(endDate) : "End date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Dynamic Filter Fields */}
          {fields.map((field) => (
            <div key={field.key} className="space-y-2">
              <Label className="font-medium">{field.label}</Label>
              {renderFilterField(field)}
            </div>
          ))}
        </div>

        {/* Action Buttons - Fixed at bottom */}
        <div className="flex-shrink-0 border-t pt-4 mt-4">
          <div className="flex space-x-3">
            <Button
              onClick={handleApplyFilter}
              style={{ backgroundColor: '#2563EB' }}
              className="text-white flex-1 flex items-center space-x-2"
            >
              <Search className="w-4 h-4" />
              <span>Apply Filter</span>
            </Button>
            <Button
              variant="outline"
              onClick={handleClearFilter}
              className="flex-1 flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Clear All</span>
            </Button>
          </div>
          {showCloseButton && (
            <div className="mt-3">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="w-full"
              >
                Close
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}