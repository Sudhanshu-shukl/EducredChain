import React from 'react';
import { useForm } from 'react-hook-form';

interface CredentialFormData {
  name: string;
  issuer: string;
  issueDate: string;
}

interface CredentialFormProps {
  onSubmit: (data: CredentialFormData) => void;
}

const CredentialForm: React.FC<CredentialFormProps> = ({ onSubmit }) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid } 
  } = useForm<CredentialFormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      issuer: '',
      issueDate: new Date().toISOString().split('T')[0],
    }
  });
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Credential Name
          </label>
          <input
            id="name"
            type="text"
            className={`input ${errors.name ? 'border-error-500 focus:ring-error-500' : ''}`}
            placeholder="e.g., Introduction to Blockchain Development"
            {...register('name', { 
              required: 'Credential name is required',
              minLength: {
                value: 3,
                message: 'Name must be at least 3 characters'
              }
            })}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-error-600">{errors.name.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="issuer" className="block text-sm font-medium text-gray-700 mb-1">
            Issuing Organization
          </label>
          <input
            id="issuer"
            type="text"
            className={`input ${errors.issuer ? 'border-error-500 focus:ring-error-500' : ''}`}
            placeholder="e.g., Blockchain Academy"
            {...register('issuer', { 
              required: 'Issuer name is required' 
            })}
          />
          {errors.issuer && (
            <p className="mt-1 text-sm text-error-600">{errors.issuer.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="issueDate" className="block text-sm font-medium text-gray-700 mb-1">
            Issue Date
          </label>
          <input
            id="issueDate"
            type="date"
            className={`input ${errors.issueDate ? 'border-error-500 focus:ring-error-500' : ''}`}
            {...register('issueDate', { 
              required: 'Issue date is required' 
            })}
          />
          {errors.issueDate && (
            <p className="mt-1 text-sm text-error-600">{errors.issueDate.message}</p>
          )}
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            className="btn-primary w-full"
            disabled={!isValid}
          >
            Continue
          </button>
        </div>
      </div>
    </form>
  );
};

export default CredentialForm;