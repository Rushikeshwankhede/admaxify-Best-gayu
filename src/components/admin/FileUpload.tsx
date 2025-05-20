
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Upload, Loader2, Trash2 } from 'lucide-react';

interface FileUploadProps {
  value: string;
  onChange: (url: string) => void;
  acceptedTypes?: string;
  maxSizeMB?: number;
  bucketName?: string;
  folderPath?: string;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  value,
  onChange,
  acceptedTypes = "image/*",
  maxSizeMB = 5,
  bucketName = "media",
  folderPath = "",
  className = "",
}) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;
      
      // Check file size
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxSizeMB) {
        toast.error(`File size exceeds the maximum limit of ${maxSizeMB}MB`);
        return;
      }
      
      setUploading(true);
      
      // Generate a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = folderPath ? `${folderPath}/${fileName}` : fileName;
      
      // Check if the bucket exists, create it if it doesn't
      const { data: buckets } = await supabase.storage.listBuckets();
      const bucketExists = buckets?.some(b => b.name === bucketName);
      
      if (!bucketExists) {
        await supabase.storage.createBucket(bucketName, {
          public: true,
        });
      }
      
      // Upload file
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file);
        
      if (uploadError) {
        throw uploadError;
      }
      
      // Get public URL
      const { data: publicURL } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);
        
      if (publicURL) {
        onChange(publicURL.publicUrl);
        toast.success('File uploaded successfully');
      }
    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast.error(`Upload failed: ${error.message || 'Unknown error'}`);
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  const handleRemoveFile = () => {
    onChange('');
    toast.success('File removed');
  };

  return (
    <div className={className}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={acceptedTypes}
        className="sr-only"
        disabled={uploading}
      />
      
      <div className="space-y-2">
        {value ? (
          <div className="space-y-2">
            {value.match(/\.(jpeg|jpg|gif|png)$/i) ? (
              <div className="relative overflow-hidden rounded-md">
                <img
                  src={value}
                  alt="Uploaded file"
                  className="max-h-60 w-auto object-cover"
                />
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={handleRemoveFile}
                  className="absolute bottom-2 right-2"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <a 
                  href={value} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-agency-purple hover:underline truncate max-w-xs"
                >
                  {value.split('/').pop()}
                </a>
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={handleRemoveFile}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="w-full border-dashed h-32 flex flex-col items-center justify-center"
          >
            {uploading ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="mt-2">Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="h-6 w-6" />
                <span className="mt-2">Upload file</span>
                <span className="text-xs text-muted-foreground mt-1">
                  Max size: {maxSizeMB}MB
                </span>
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
