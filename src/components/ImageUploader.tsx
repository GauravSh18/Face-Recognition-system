import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { cn } from '../utils/cn';

interface ImageUploaderProps {
  modelsLoaded: boolean;
  onImageSelect: (imageUrl: string) => void;
}

export function ImageUploader({ modelsLoaded, onImageSelect }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onImageSelect(imageUrl);
    }
  };

  return (
    <div className="flex justify-center mb-4">
      <button
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "flex items-center gap-2 px-6 py-3 rounded-lg font-medium",
          "bg-blue-600 text-white hover:bg-blue-700 transition-colors",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        disabled={!modelsLoaded}
      >
        <Upload className="w-5 h-5" />
        Upload Image
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
}