import  { useState } from 'react';
import { ArrowLeft, Save, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';

interface AddRuleProps {
  onNavigate: (page: string) => void;
}

export function AddRule({ onNavigate }: AddRuleProps) {
  const [formData, setFormData] = useState({
    ruleName: '',
    condition: '',
    operator: '',
    value: '',
    action: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating automation rule:', formData);
    // Here you would typically save the rule
    onNavigate('settings');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      ruleName: '',
      condition: '',
      operator: '',
      value: '',
      action: ''
    });
  };

  const conditions = [
    { value: 'nps', label: 'NPS Score' },
    { value: 'department', label: 'Department' },
    { value: 'priority', label: 'Priority' },
    { value: 'category', label: 'Category' },
    { value: 'status', label: 'Status' },
    { value: 'rating', label: 'Rating' },
    { value: 'response_time', label: 'Response Time' }
  ];

  const operators = [
    { value: '=', label: 'Equals (=)' },
    { value: '!=', label: 'Not Equals (≠)' },
    { value: '<', label: 'Less Than (<)' },
    { value: '<=', label: 'Less Than or Equal (≤)' },
    { value: '>', label: 'Greater Than (>)' },
    { value: '>=', label: 'Greater Than or Equal (≥)' },
    { value: 'contains', label: 'Contains' },
    { value: 'not_contains', label: 'Does Not Contain' }
  ];

  const actions = [
    { value: 'create_ticket', label: 'Create Ticket' },
    { value: 'assign_ticket', label: 'Assign Ticket' },
    { value: 'escalate', label: 'Escalate' },
    { value: 'send_notification', label: 'Send Notification' },
    { value: 'change_priority', label: 'Change Priority' },
    { value: 'close_ticket', label: 'Close Ticket' },
    { value: 'transfer_department', label: 'Transfer to Department' }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          onClick={() => onNavigate('settings')}
          className="mr-4 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-medium">Add Rule</h1>
          <p className="text-sm text-gray-600 mt-1">Create a new automation rule</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Save className="h-5 w-5 mr-2 text-blue-600" />
              Rule Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Rule Name */}
            <div>
              <Label htmlFor="ruleName">Rule Name *</Label>
              <Input 
                id="ruleName" 
                placeholder="Enter rule name"
                value={formData.ruleName}
                onChange={(e) => handleInputChange('ruleName', e.target.value)}
                required
                className="mt-1"
              />
            </div>

            {/* Condition */}
            <div>
              <Label htmlFor="condition">Select Condition *</Label>
              <Select onValueChange={(value) => handleInputChange('condition', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose a condition" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map((condition) => (
                    <SelectItem key={condition.value} value={condition.value}>
                      {condition.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Operator */}
            <div>
              <Label htmlFor="operator">Select Operator *</Label>
              <Select onValueChange={(value) => handleInputChange('operator', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose an operator" />
                </SelectTrigger>
                <SelectContent>
                  {operators.map((operator) => (
                    <SelectItem key={operator.value} value={operator.value}>
                      {operator.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Value */}
            <div>
              <Label htmlFor="value">Enter Value *</Label>
              <Input 
                id="value" 
                placeholder="Enter comparison value"
                value={formData.value}
                onChange={(e) => handleInputChange('value', e.target.value)}
                required
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Examples: For NPS use numbers (1-10), for Department use names (HR, IT), etc.
              </p>
            </div>

            {/* Action */}
            <div>
              <Label htmlFor="action">Select Action *</Label>
              <Select onValueChange={(value) => handleInputChange('action', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose an action" />
                </SelectTrigger>
                <SelectContent>
                  {actions.map((action) => (
                    <SelectItem key={action.value} value={action.value}>
                      {action.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-6 pt-6 border-t">
          <Button 
            type="button"
            variant="outline" 
            onClick={() => onNavigate('settings')}
            className="flex items-center"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          
          <div className="flex space-x-3">
            <Button 
              type="button"
              variant="outline"
              onClick={resetForm}
            >
              Reset Form
            </Button>
            <Button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white min-w-32"
              disabled={!formData.ruleName || !formData.condition || !formData.operator || !formData.value || !formData.action}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Rule
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}