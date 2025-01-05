import React from 'react';
import { Camera } from 'lucide-react';

interface ImageDisplayProps {
  selectedImage: string | null;
  imageRef: React.RefObject<HTMLImageElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onImageLoad: () => void;
}

export function ImageDisplay({
  selectedImage,
  imageRef,
  canvasRef,
  onImageLoad
}: ImageDisplayProps) {
  return (
    <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
      {!selectedImage && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
          <Camera className="w-16 h-16 mb-2" />
          <p>Upload an image to detect faces</p>
        </div>
      )}
      {selectedImage && (
        <>
          <img
            ref={imageRef}
            src={selectedImage}
            onLoad={onImageLoad}
            className="absolute inset-0 w-full h-full object-contain"
            crossOrigin="anonymous"
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
          />
        </>
      )}
    </div>
  );
}