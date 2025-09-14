import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import FileUploadArea from './components/FileUploadArea';
import TemplateDownload from './components/TemplateDownload';
import ValidationResults from './components/ValidationResults';
import DataPreview from './components/DataPreview';
import ImportProgress from './components/ImportProgress';
import ImportSuccess from './components/ImportSuccess';

const CSVImportManagement = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationResults, setValidationResults] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [importResults, setImportResults] = useState(null);
  const [progress, setProgress] = useState(null);

  // Mock validation function
  const validateCSVData = (data) => {
    const errors = [];
    const warnings = [];
    let validRows = 0;
    let errorRows = 0;
    let duplicateRows = 0;

    const validCities = ['Chandigarh', 'Mohali', 'Zirakpur', 'Panchkula'];
    const validPropertyTypes = ['Residential', 'Commercial', 'Plot'];
    const validBHK = ['1', '2', '3', '4', '5+'];
    const validPurpose = ['Self Use', 'Investment'];
    const validTimeline = ['Immediate', '1-3 months', '3-6 months', '6-12 months', '12+ months'];
    const validSources = ['Website', 'Referral', 'Advertisement', 'Social Media', 'Other'];

    const seenEmails = new Set();
    const seenPhones = new Set();

    data?.forEach((row, index) => {
      const rowNumber = index + 2; // +2 because index starts at 0 and we skip header
      let hasError = false;

      // Required field validation
      if (!row?.fullName || row?.fullName?.trim() === '') {
        errors?.push({
          row: rowNumber,
          field: 'fullName',
          message: 'Full name is required',
          value: row?.fullName
        });
        hasError = true;
      }

      if (!row?.email || row?.email?.trim() === '') {
        errors?.push({
          row: rowNumber,
          field: 'email',
          message: 'Email is required',
          value: row?.email
        });
        hasError = true;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(row?.email)) {
        errors?.push({
          row: rowNumber,
          field: 'email',
          message: 'Invalid email format',
          value: row?.email
        });
        hasError = true;
      } else if (seenEmails?.has(row?.email?.toLowerCase())) {
        duplicateRows++;
        warnings?.push({
          row: rowNumber,
          message: `Duplicate email: ${row?.email}`
        });
      } else {
        seenEmails?.add(row?.email?.toLowerCase());
      }

      if (!row?.phone || row?.phone?.trim() === '') {
        errors?.push({
          row: rowNumber,
          field: 'phone',
          message: 'Phone number is required',
          value: row?.phone
        });
        hasError = true;
      } else if (!/^[6-9]\d{9}$/?.test(row?.phone?.replace(/\D/g, ''))) {
        errors?.push({
          row: rowNumber,
          field: 'phone',
          message: 'Invalid Indian phone number format (10 digits starting with 6-9)',
          value: row?.phone
        });
        hasError = true;
      } else if (seenPhones?.has(row?.phone?.replace(/\D/g, ''))) {
        duplicateRows++;
        warnings?.push({
          row: rowNumber,
          message: `Duplicate phone: ${row?.phone}`
        });
      } else {
        seenPhones?.add(row?.phone?.replace(/\D/g, ''));
      }

      if (!row?.city || row?.city?.trim() === '') {
        errors?.push({
          row: rowNumber,
          field: 'city',
          message: 'City is required',
          value: row?.city
        });
        hasError = true;
      } else if (!validCities?.includes(row?.city)) {
        errors?.push({
          row: rowNumber,
          field: 'city',
          message: `Invalid city. Must be one of: ${validCities?.join(', ')}`,
          value: row?.city
        });
        hasError = true;
      }

      // Optional field validation
      if (row?.propertyType && !validPropertyTypes?.includes(row?.propertyType)) {
        errors?.push({
          row: rowNumber,
          field: 'propertyType',
          message: `Invalid property type. Must be one of: ${validPropertyTypes?.join(', ')}`,
          value: row?.propertyType
        });
        hasError = true;
      }

      if (row?.bhk && row?.propertyType !== 'Residential') {
        warnings?.push({
          row: rowNumber,
          message: 'BHK specified for non-residential property'
        });
      } else if (row?.bhk && !validBHK?.includes(row?.bhk)) {
        errors?.push({
          row: rowNumber,
          field: 'bhk',
          message: `Invalid BHK. Must be one of: ${validBHK?.join(', ')}`,
          value: row?.bhk
        });
        hasError = true;
      }

      if (row?.purpose && !validPurpose?.includes(row?.purpose)) {
        errors?.push({
          row: rowNumber,
          field: 'purpose',
          message: `Invalid purpose. Must be one of: ${validPurpose?.join(', ')}`,
          value: row?.purpose
        });
        hasError = true;
      }

      if (row?.budgetMin && (isNaN(row?.budgetMin) || parseInt(row?.budgetMin) < 0)) {
        errors?.push({
          row: rowNumber,
          field: 'budgetMin',
          message: 'Budget minimum must be a positive number',
          value: row?.budgetMin
        });
        hasError = true;
      }

      if (row?.budgetMax && (isNaN(row?.budgetMax) || parseInt(row?.budgetMax) < 0)) {
        errors?.push({
          row: rowNumber,
          field: 'budgetMax',
          message: 'Budget maximum must be a positive number',
          value: row?.budgetMax
        });
        hasError = true;
      }

      if (row?.budgetMin && row?.budgetMax && parseInt(row?.budgetMin) > parseInt(row?.budgetMax)) {
        errors?.push({
          row: rowNumber,
          field: 'budgetMax',
          message: 'Budget maximum must be greater than minimum',
          value: `${row?.budgetMin} - ${row?.budgetMax}`
        });
        hasError = true;
      }

      if (row?.timeline && !validTimeline?.includes(row?.timeline)) {
        errors?.push({
          row: rowNumber,
          field: 'timeline',
          message: `Invalid timeline. Must be one of: ${validTimeline?.join(', ')}`,
          value: row?.timeline
        });
        hasError = true;
      }

      if (row?.source && !validSources?.includes(row?.source)) {
        errors?.push({
          row: rowNumber,
          field: 'source',
          message: `Invalid source. Must be one of: ${validSources?.join(', ')}`,
          value: row?.source
        });
        hasError = true;
      }

      if (hasError) {
        errorRows++;
      } else {
        validRows++;
      }
    });

    return {
      totalRows: data?.length,
      validRows,
      errorRows,
      duplicateRows,
      errors,
      warnings,
      processedAt: new Date()?.toISOString()
    };
  };

  // Mock CSV parsing function
  const parseCSV = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const lines = text.split('\n').filter(line => line.trim());
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        
        const data = lines.slice(1).map(line => {
          const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
          const row = {};
          headers.forEach((header, index) => {
            row[header] = values[index] || '';
          });
          return row;
        });

        resolve(data);
      };
      reader.readAsText(file);
    });
  };

  const handleFileSelect = async (file) => {
    setSelectedFile(file);
    setCurrentStep(2);
    setIsProcessing(true);
    setProgress({ percentage: 0, message: 'Reading file...' });

    try {
      // Simulate file reading progress
      await new Promise(resolve => setTimeout(resolve, 500));
      setProgress({ percentage: 30, message: 'Parsing CSV data...' });

      const data = await parseCSV(file);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setProgress({ percentage: 60, message: 'Validating data...' });

      const results = validateCSVData(data);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setProgress({ percentage: 100, message: 'Validation complete' });

      setValidationResults(results);
      
      if (results?.errorRows === 0) {
        // Add default values and status to valid data
        const processedData = data?.map(row => ({
          ...row,
          status: 'New',
          createdAt: new Date()?.toISOString(),
          lastUpdated: new Date()?.toISOString()
        }));
        setPreviewData(processedData);
        setCurrentStep(3);
      }
    } catch (error) {
      console.error('Error processing file:', error);
    } finally {
      setIsProcessing(false);
      setProgress(null);
    }
  };

  const handleConfirmImport = async () => {
    setCurrentStep(4);
    setIsProcessing(true);
    setProgress({ percentage: 0, message: 'Starting import...' });

    try {
      // Simulate import process
      const totalLeads = previewData?.length;
      let imported = 0;
      
      for (let i = 0; i < totalLeads; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));
        imported++;
        const percentage = Math.round((imported / totalLeads) * 100);
        setProgress({
          percentage,
          message: `Importing lead ${imported} of ${totalLeads}...`,
          details: `Processing ${previewData?.[i]?.fullName}`
        });
      }

      // Mock import results
      const mockImportResults = {
        totalImported: totalLeads - 2, // Simulate 2 duplicates
        skippedDuplicates: 2,
        importedLeads: previewData?.slice(0, 5), // Show first 5 as examples
        processingTime: Math.floor(totalLeads / 10) + 3, // Mock processing time
        importedAt: new Date()?.toISOString()
      };

      setImportResults(mockImportResults);
      setCurrentStep(5);
    } catch (error) {
      console.error('Error importing data:', error);
    } finally {
      setIsProcessing(false);
      setProgress(null);
    }
  };

  const handleRetry = () => {
    setSelectedFile(null);
    setCurrentStep(1);
    setValidationResults(null);
    setPreviewData(null);
    setImportResults(null);
    setProgress(null);
  };

  const handleStartNew = () => {
    handleRetry();
  };

  const handleCancel = () => {
    setPreviewData(null);
    setCurrentStep(2);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">CSV Import Management</h1>
            <p className="text-muted-foreground">
              Import lead data in bulk with comprehensive validation and error reporting
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Progress Indicator */}
              <ImportProgress 
                progress={progress}
                isProcessing={isProcessing}
                currentStep={currentStep}
                totalSteps={5}
              />

              {/* Step 1: File Upload */}
              {currentStep === 1 && (
                <FileUploadArea
                  onFileSelect={handleFileSelect}
                  isProcessing={isProcessing}
                  selectedFile={selectedFile}
                />
              )}

              {/* Step 2: Validation Results */}
              {currentStep === 2 && validationResults && (
                <ValidationResults
                  validationResults={validationResults}
                  onRetry={handleRetry}
                  onDownloadErrorReport={() => {
                    // Mock function to handle error report download
                    const errorData = validationResults.errors;
                    const csvContent = "data:text/csv;charset=utf-8," 
                      + "Row,Field,Message,Value\n"
                      + errorData.map(error => 
                          `${error.row},${error.field},"${error.message}","${error.value}"`
                        ).join("\n");
                    const encodedUri = encodeURI(csvContent);
                    const link = document.createElement("a");
                    link.setAttribute("href", encodedUri);
                    link.setAttribute("download", "validation_errors.csv");
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  isProcessing={isProcessing}
                />
              )}

              {/* Step 3: Data Preview */}
              {currentStep === 3 && previewData && (
                <DataPreview
                  previewData={previewData}
                  onConfirmImport={handleConfirmImport}
                  onCancel={handleCancel}
                  isProcessing={isProcessing}
                />
              )}

              {/* Step 5: Import Success */}
              {currentStep === 5 && importResults && (
                <ImportSuccess
                  importResults={importResults}
                  onStartNew={handleStartNew}
                />
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <TemplateDownload />
              
              {/* Import Guidelines */}
              <div className="bg-card rounded-lg border border-border p-6 card-shadow">
                <h3 className="text-lg font-semibold text-foreground mb-4">Import Guidelines</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>Ensure all required fields (name, email, phone, city) are filled</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>Use Indian phone number format (10 digits starting with 6-9)</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>Budget amounts should be in rupees (numbers only)</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>BHK field only applies to residential properties</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>Duplicate emails and phone numbers will be skipped</p>
                  </div>
                </div>
              </div>

              {/* Support */}
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-accent mb-2">Need Help?</h3>
                <p className="text-sm text-accent/80 mb-4">
                  Having trouble with your CSV import? Our support team is here to help.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-accent/80">
                    <span>📧</span>
                    <span>support@buyerleadpro.com</span>
                  </div>
                  <div className="flex items-center space-x-2 text-accent/80">
                    <span>📞</span>
                    <span>+91 98765 43210</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CSVImportManagement;