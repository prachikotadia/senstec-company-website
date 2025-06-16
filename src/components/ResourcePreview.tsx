
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Download } from 'lucide-react';

interface ResourcePreviewProps {
  resource: {
    title: string;
    type: string;
    content?: string;
    image?: string;
  };
  onClose: () => void;
  onDownload: () => void;
}

const ResourcePreview: React.FC<ResourcePreviewProps> = ({ resource, onClose, onDownload }) => {
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="glass-morphism rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-sf-pro font-bold">{resource.title}</h3>
            <span className="text-sm text-primary">{resource.type}</span>
          </div>
          <div className="flex space-x-2">
            <Button onClick={onDownload} className="gradient-purple">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="ghost" onClick={onClose}>
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {resource.image && (
            <div className="aspect-video bg-gradient-purple/20 rounded-2xl flex items-center justify-center">
              <span className="text-6xl">{resource.image}</span>
            </div>
          )}
          
          {resource.content && (
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {resource.content}
              </p>
            </div>
          )}

          <div className="bg-muted/20 rounded-2xl p-6">
            <p className="text-center text-muted-foreground">
              This is a preview. Download the full {resource.type.toLowerCase()} for complete content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcePreview;
