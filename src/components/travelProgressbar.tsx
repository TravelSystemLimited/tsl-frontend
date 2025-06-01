import { Plane, Hotel, Car } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Step = 'flights' | 'hotels' | 'transport';

interface ProgressBarProps {
  currentStep: Step;
}





interface ProgressBarProps {
  currentStep: Step;
}

const TravelProgressBar = ({ currentStep }: ProgressBarProps) => {
  const router = useNavigate();

  const steps: { label: Step; icon: JSX.Element; path: string }[] = [
    {
      label: 'flights',
      icon: <Plane className="w-4 h-4" />,
      path: '/employee',
    },
    {
      label: 'hotels',
      icon: <Hotel className="w-4 h-4" />,
      path: '/hotels',
    },
    {
      label: 'transport',
      icon: <Car className="w-4 h-4" />,
      path: '/transport',
    },
  ];

  const isStepCompleted = (step: Step): boolean => {
    if (step === 'flights') return currentStep !== 'flights';
    if (step === 'hotels') return currentStep === 'transport';
    return false; // transport is the final step, not clickable
  };

  const getStepStyle = (step: Step) => {
    if (step === currentStep) return 'bg-[#ddd6d6] text-[#7d5c65]'; // Active
    if (isStepCompleted(step)) return 'bg-[#8c6d73] text-white cursor-pointer'; // Completed
    return 'bg-white text-gray-400 border border-gray-300'; // Upcoming
  };

  const handleClick = (step: Step, path: string) => {
    if (isStepCompleted(step)) {
      router(path);
    }
  };

  return (
    <div className="flex items-center justify-center mt-6 space-x-4">
      {steps.map((step, index) => (
        <div key={step.label} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors duration-200 ${getStepStyle(
              step.label
            )}`}
            onClick={() => handleClick(step.label, step.path)}
          >
            {step.icon}
          </div>
          {index < steps.length - 1 && (
            <div className="w-9 md:w-36 h-px border-dotted border-t-2 border-[#b69292] mx-2" />
          )}
        </div>
      ))}
    </div>
  );
};



export default TravelProgressBar;
