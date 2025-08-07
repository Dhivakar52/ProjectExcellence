
import { X } from 'lucide-react';
import { Button } from './ui/button';

interface SlidingPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
  actionButton?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  };
  showCloseButton?: boolean;
}

export function SlidingPopup({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  width = 'w-96',
  actionButton,
  showCloseButton = true
}: SlidingPopupProps) {
  return (
    <>
      {/* Right-to-left sliding popup */}
      <div className={`fixed top-0 right-0 h-full ${width} bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className="flex items-center space-x-2">
            {actionButton && (
              <Button
                onClick={actionButton.onClick}
                variant={actionButton.variant || 'default'}
                size="sm"
                style={actionButton.variant === 'default' ? { backgroundColor: '#2563EB' } : {}}
              >
                {actionButton.label}
              </Button>
            )}
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
        
        <div className="overflow-y-auto h-full pb-20">
          {children}
        </div>

        {showCloseButton && (
          <div className="absolute bottom-4 right-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="px-4 py-2 text-sm font-medium"
            >
              Close
            </Button>
          </div>
        )}
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 backdrop-blur-sm z-40"
          onClick={onClose}
          style={{ boxShadow: 'inset 0 0 200px 50px rgba(0, 0, 0, 0.3)' }}
        />
      )}
    </>
  );
}