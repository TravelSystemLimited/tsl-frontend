import React, { useState } from 'react';
import PolicyForm from '@/components/PolicyForm';
import { SidebarTrigger } from '@/components/ui/sidebar';
import EmployeeForm from '@/components/EmployeeForm';


const AddEmployeeAndPolicyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'employee' | 'policy'>('policy');

  return (
    <div className=" mx-auto  mt-6">
         <div className="px-4 pt-4 pb-2"> {/* Adjusted padding */}
          <div className="flex items-center gap-4">
            <SidebarTrigger className="text-[#8C6D73] h-8 w-8" />
            <div>
              <h1 className="text-[16px] md:text-2xl font-bold text-[#3b3b3b]">Add Employee and Policies</h1>
            </div>
          </div>
        </div>
      <div className="flex border-b border-gray-200 mb-6">
      <button
          className={`py-2 px-4 font-medium text-sm focus:outline-none ${
            activeTab === 'policy'
              ? 'border-b-2 border-[#8C6D73] text-[#8C6D73]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('policy')}
        >
          Add Policy
        </button>
        <button
          className={`py-2 px-4\ font-medium text-sm focus:outline-none ${
            activeTab === 'employee'
              ? 'border-b-2 border-[#8C6D73] text-[#8C6D73]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('employee')}
        >
          Add Employee
        </button>
       
      </div>

        {activeTab === 'employee' ? <EmployeeForm /> : <PolicyForm />}
    </div>
  );
};

export default AddEmployeeAndPolicyPage;