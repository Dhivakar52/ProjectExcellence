import  { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Eye, SlidersHorizontal, ArrowLeft } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function SurveyManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showPreview, setShowPreview] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [selectedNPS, setSelectedNPS] = useState(null);

  const allSurveys = [
    { id: 1, name: 'SRM Smiles', tenant: 'SRMAP', url: 'http://srmap/survey.com', status: 'Active', feedbackSource: 'JUNO' },
    { id: 2, name: 'ProjectSmiles OPD', tenant: 'Metro Hospital', url: 'http://metro/survey.com', status: 'Active', feedbackSource: 'Survey Sparrow' },
    { id: 3, name: 'Discharge Experience', tenant: 'City Hospital', url: 'http://city/survey.com', status: 'Draft', feedbackSource: 'Camu' },
    { id: 4, name: 'Food Service Survey', tenant: 'General Hospital', url: 'http://general/survey.com', status: 'Closed', feedbackSource: 'Other' },
    { id: 5, name: 'Cleanliness Survey', tenant: 'SRMAP', url: 'http://srmap/clean.com', status: 'Active', feedbackSource: 'JUNO' },
    { id: 6, name: 'Patient Satisfaction', tenant: 'Metro Hospital', url: 'http://metro/patient.com', status: 'Scheduled', feedbackSource: 'Survey Sparrow' },
    { id: 7, name: 'Emergency Care Survey', tenant: 'City Hospital', url: 'http://city/emergency.com', status: 'Active', feedbackSource: 'Camu' },
    { id: 8, name: 'Nursing Care Survey', tenant: 'General Hospital', url: 'http://general/nursing.com', status: 'Active', feedbackSource: 'Other' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-red-100 text-red-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewSurvey = (survey: any) => {
    setSelectedSurvey(survey);
    setShowPreview(true);
  };

  const handleFilter = () => {
    console.log('Filtering surveys by:', statusFilter, searchTerm);
  };

  const getFilteredSurveys = () => {
    let filtered = allSurveys;
    
    if (searchTerm) {
      filtered = filtered.filter(survey => 
        survey.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        survey.tenant.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(survey => 
        survey.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    
    return filtered;
  };

  const SurveyPreview = () => (
    <div className="space-y-6" style={{ fontFamily: 'Roboto, system-ui, -apple-system, sans-serif' }}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Survey Preview</h2>
        <Button
          variant="outline"
          onClick={() => setShowPreview(false)}
          className="flex items-center space-x-2 text-base"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to List</span>
        </Button>
      </div>

      <Card className="border border-gray-200">
        <CardContent className="p-8">
          <div className="space-y-6 mb-8">
            <div>
              <span className="font-medium text-gray-700 text-base">Tenant: </span>
              <span className="text-gray-900 text-base">Metro Hospital</span>
            </div>
            <div>
              <span className="font-medium text-gray-700 text-base">Department: </span>
              <span className="text-gray-900 text-base">General</span>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="font-medium text-gray-900 mb-4 text-lg">1. How was the food quality?</h3>
              <div className="flex space-x-6">
                {['Excellent', 'Good', 'Average', 'Poor'].map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                    <input type="radio" name="food_quality" className="text-blue-600 w-4 h-4" />
                    <span className="text-gray-700 text-base">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-4 text-lg">2. Was the area clean?</h3>
              <div className="flex space-x-6">
                {['Yes', 'No'].map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                    <input type="radio" name="cleanliness" className="text-blue-600 w-4 h-4" />
                    <span className="text-gray-700 text-base">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-4 text-lg">3. Would you recommend us?</h3>
              <div className="flex space-x-3">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    key={num}
                    onClick={() => setSelectedNPS(num)}
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-base font-medium transition-colors ${
                      selectedNPS === num
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mt-10">
            <Button 
              className="text-white text-base px-6 py-3"
              style={{ backgroundColor: '#2563EB' }}
            >
              Submit
            </Button>
            <Button variant="outline" className="text-base px-6 py-3">Back</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (showPreview) {
    return <SurveyPreview />;
  }

  return (
    <div className="space-y-6" style={{ fontFamily: 'Roboto, system-ui, -apple-system, sans-serif' }}>
      <Card className="border border-gray-200">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-900">Survey List</CardTitle>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Input
                  placeholder="Search Surveys..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-80 text-base"
                  style={{ height: '42px' }}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-44 h-10">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleFilter} 
                className="flex items-center space-x-2 h-10 px-4 bg-white border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="text-base font-medium">Filter</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-base font-medium">Survey Name</TableHead>
                <TableHead className="text-base font-medium">Tenant</TableHead>
                <TableHead className="text-base font-medium">Survey URL</TableHead>
                <TableHead className="text-base font-medium">Feedback Source</TableHead>
                <TableHead className="text-base font-medium">Survey Status</TableHead>
                <TableHead className="text-base font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getFilteredSurveys().map((survey) => (
                <TableRow key={survey.id} className="h-16">
                  <TableCell className="font-medium text-base py-4">{survey.name}</TableCell>
                  <TableCell className="text-base py-4">{survey.tenant}</TableCell>
                  <TableCell className="text-blue-600 hover:underline cursor-pointer text-base py-4">
                    {survey.url}
                  </TableCell>
                  <TableCell className="text-base py-4">{survey.feedbackSource}</TableCell>
                  <TableCell className="py-4">
                    <Badge variant="outline" className={`${getStatusColor(survey.status)} text-sm`}>
                      {survey.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewSurvey(survey)}
                      className="p-2"
                    >
                      <Eye className="w-5 h-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}