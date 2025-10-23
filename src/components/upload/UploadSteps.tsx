import React from 'react';
import { Check } from 'lucide-react';

interface UploadStepsProps {
  currentStep: number;
}

const UploadSteps: React.FC<UploadStepsProps> = ({ currentStep }) => {
  const steps = [
    { id: 1, name: 'Upload File' },
    { id: 2, name: 'Add Details' },
    { id: 3, name: 'Process' },
    { id: 4, name: 'Verify' },
  ];

  return (
    <div className="relative">
      <div className="hidden sm:block absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2 bg-gray-200" aria-hidden="true"></div>
      
      <ul className="relative grid grid-cols-4 gap-x-2">
        {steps.map((step) => (
          <li key={step.id} className="relative">
            <div className="flex flex-col items-center">
              {/* Step Circle */}
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 border-2 
                  ${currentStep > step.id 
                    ? 'bg-primary-600 border-primary-600' 
                    : currentStep === step.id 
                      ? 'bg-white border-primary-600' 
                      : 'bg-white border-gray-300'
                  }`}
              >
                {currentStep > step.id ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <span 
                    className={`text-sm font-medium
                      ${currentStep === step.id 
                        ? 'text-primary-600' 
                        : 'text-gray-500'
                      }`}
                  >
                    {step.id}
                  </span>
                )}
              </div>
              
              {/* Step Name */}
              <span 
                className={`text-sm font-medium mt-2 hidden sm:block
                  ${currentStep >= step.id 
                    ? 'text-primary-600' 
                    : 'text-gray-500'
                  }`}
              >
                {step.name}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UploadSteps;