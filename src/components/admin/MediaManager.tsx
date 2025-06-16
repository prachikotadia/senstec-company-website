
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Image, FileText, Video, Trash2, Copy, Eye, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { validateFileType, validateFileSize, sanitizeInput } from '@/utils/security';

interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document' | 'audio';
  url: string;
  size: string;
  uploadDate: string;
  scanStatus: 'clean' | 'scanning' | 'suspicious';
}

const MediaManager = () => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([
    {
      id: '1',
      name: 'bridge-sensor-deployment.jpg',
      type: 'image',
      url: '/placeholder-image.jpg',
      size: '2.3 MB',
      uploadDate: '2024-01-15',
      scanStatus: 'clean'
    },
    {
      id: '2',
      name: 'infrastructure-guide.pdf',
      type: 'document',
      url: '/infrastructure-guide.pdf',
      size: '5.7 MB',
      uploadDate: '2024-01-10',
      scanStatus: 'clean'
    },
    {
      id: '3',
      name: 'sensor-demo.mp4',
      type: 'video',
      url: '/sensor-demo.mp4',
      size: '12.4 MB',
      uploadDate: '2024-01-08',
      scanStatus: 'clean'
    }
  ]);

  const { toast } = useToast();

  // Security configuration
  const ALLOWED_FILE_TYPES = {
    image: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    video: ['mp4', 'avi', 'mov', 'wmv'],
    audio: ['mp3', 'wav', 'ogg'],
    document: ['pdf', 'doc', 'docx', 'txt']
  };

  const MAX_FILE_SIZE_MB = 10;
  const MAX_FILES_PER_UPLOAD = 5;

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600" />;
      case 'video': return <Video className="w-6 h-6 lg:w-8 lg:h-8 text-purple-600" />;
      case 'document': return <FileText className="w-6 h-6 lg:w-8 lg:h-8 text-green-600" />;
      case 'audio': return <FileText className="w-6 h-6 lg:w-8 lg:h-8 text-orange-600" />;
      default: return <FileText className="w-6 h-6 lg:w-8 lg:h-8 text-gray-600" />;
    }
  };

  const getFileType = (fileName: string): 'image' | 'video' | 'document' | 'audio' => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    if (ALLOWED_FILE_TYPES.image.includes(extension || '')) return 'image';
    if (ALLOWED_FILE_TYPES.video.includes(extension || '')) return 'video';
    if (ALLOWED_FILE_TYPES.audio.includes(extension || '')) return 'audio';
    return 'document';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file: File): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    const sanitizedName = sanitizeInput(file.name);

    // Check file size
    if (!validateFileSize(file.size, MAX_FILE_SIZE_MB)) {
      errors.push(`File size must be less than ${MAX_FILE_SIZE_MB}MB`);
    }

    // Check file type
    const allAllowedTypes = Object.values(ALLOWED_FILE_TYPES).flat();
    if (!validateFileType(sanitizedName, allAllowedTypes)) {
      errors.push('File type not allowed');
    }

    // Check for suspicious file names
    if (sanitizedName.includes('..') || sanitizedName.includes('/') || sanitizedName.includes('\\')) {
      errors.push('Invalid file name');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const simulateSecurityScan = (file: MediaFile): Promise<'clean' | 'suspicious'> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate 95% clean rate
        resolve(Math.random() < 0.95 ? 'clean' : 'suspicious');
      }, 2000);
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const fileArray = Array.from(files);

    // Check upload limits
    if (fileArray.length > MAX_FILES_PER_UPLOAD) {
      toast({
        title: "Upload Limit Exceeded",
        description: `You can only upload ${MAX_FILES_PER_UPLOAD} files at once.`,
        variant: "destructive",
      });
      return;
    }

    const validFiles: File[] = [];
    const errors: string[] = [];

    // Validate each file
    fileArray.forEach(file => {
      const validation = validateFile(file);
      if (validation.isValid) {
        validFiles.push(file);
      } else {
        errors.push(`${file.name}: ${validation.errors.join(', ')}`);
      }
    });

    // Show validation errors
    if (errors.length > 0) {
      toast({
        title: "File Validation Failed",
        description: errors.join('\n'),
        variant: "destructive",
      });
    }

    // Process valid files
    for (const file of validFiles) {
      const sanitizedName = sanitizeInput(file.name);
      const newFile: MediaFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: sanitizedName,
        type: getFileType(sanitizedName),
        url: URL.createObjectURL(file),
        size: formatFileSize(file.size),
        uploadDate: new Date().toISOString().split('T')[0],
        scanStatus: 'scanning'
      };

      setMediaFiles(prev => [newFile, ...prev]);
      
      toast({
        title: "File Uploaded",
        description: `${sanitizedName} uploaded and scanning for security threats.`,
      });

      // Start security scan
      try {
        const scanResult = await simulateSecurityScan(newFile);
        setMediaFiles(prev => prev.map(f => 
          f.id === newFile.id ? { ...f, scanStatus: scanResult } : f
        ));

        if (scanResult === 'suspicious') {
          toast({
            title: "Security Alert",
            description: `${sanitizedName} flagged as potentially suspicious. Review before use.`,
            variant: "destructive",
          });
        }
      } catch (error) {
        setMediaFiles(prev => prev.map(f => 
          f.id === newFile.id ? { ...f, scanStatus: 'suspicious' } : f
        ));
      }
    }
    
    // Reset the input
    event.target.value = '';
  };

  const handleDelete = (id: string) => {
    const file = mediaFiles.find(f => f.id === id);
    setMediaFiles(prev => prev.filter(f => f.id !== id));
    
    toast({
      title: "File Deleted",
      description: `${file?.name} has been removed from your media library.`,
      variant: "destructive",
    });
  };

  const handleCopyUrl = (url: string, name: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL Copied",
      description: `URL for ${name} copied to clipboard.`,
    });
  };

  const handleView = (file: MediaFile) => {
    if (file.scanStatus === 'suspicious') {
      toast({
        title: "Security Warning",
        description: "This file has been flagged as potentially suspicious.",
        variant: "destructive",
      });
      return;
    }
    window.open(file.url, '_blank');
  };

  const getScanStatusIndicator = (status: MediaFile['scanStatus']) => {
    switch (status) {
      case 'clean':
        return <div className="w-2 h-2 bg-green-500 rounded-full" title="Security scan: Clean" />;
      case 'scanning':
        return <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" title="Security scan: In progress" />;
      case 'suspicious':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl lg:text-2xl font-bold text-foreground">Media Manager</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <Button className="gradient-purple">
              <Upload className="w-4 h-4 mr-2" />
              Upload Files
            </Button>
            <input
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.gif,.webp,.mp4,.avi,.mov,.wmv,.mp3,.wav,.ogg,.pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <Card className="glass-morphism border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <strong>Security Features Active:</strong> All uploaded files are automatically scanned for malware and validated for type and size restrictions.
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {mediaFiles.map((file) => (
          <Card key={file.id} className="glass-morphism">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  {getFileIcon(file.type)}
                  {getScanStatusIndicator(file.scanStatus)}
                </div>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => handleDelete(file.id)}
                  className="hover:bg-destructive/20"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-foreground mb-2 truncate text-sm lg:text-base">{file.name}</h3>
              <div className="space-y-1 text-xs lg:text-sm text-muted-foreground">
                <p>Size: {file.size}</p>
                <p>Uploaded: {file.uploadDate}</p>
                <p className="capitalize">Type: {file.type}</p>
                <p className="flex items-center space-x-1">
                  <span>Status:</span>
                  <span className={`capitalize ${
                    file.scanStatus === 'clean' ? 'text-green-600' :
                    file.scanStatus === 'scanning' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {file.scanStatus}
                  </span>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleView(file)}
                  disabled={file.scanStatus === 'scanning'}
                >
                  <Eye className="w-3 h-3 mr-1" />
                  View
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleCopyUrl(file.url, file.name)}
                  disabled={file.scanStatus !== 'clean'}
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy URL
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass-morphism">
        <CardHeader>
          <CardTitle className="text-lg lg:text-xl">Upload New Media</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 lg:p-8 text-center">
            <Upload className="w-8 h-8 lg:w-12 lg:h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-4 text-sm lg:text-base">
              Drag and drop files here, or click to select files
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Supported formats: JPG, PNG, PDF, DOC, MP4, MP3 (Max {MAX_FILE_SIZE_MB}MB each, {MAX_FILES_PER_UPLOAD} files max)
            </p>
            <div className="relative inline-block">
              <Button variant="outline">
                Choose Files
              </Button>
              <input
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.gif,.webp,.mp4,.avi,.mov,.wmv,.mp3,.wav,.ogg,.pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaManager;
