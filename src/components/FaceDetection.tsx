import React, { useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { Camera, Upload } from 'lucide-react';
import { cn } from '../utils/cn';
import { useFaceDetection } from '../hooks/useFaceDetection';
import { ImageUploader } from './ImageUploader';
import { ImageDisplay } from './ImageDisplay';

export function FaceDetection() {
  const { modelsLoaded } = useFaceDetection();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageLoad = async () => {
    if (imageRef.current && canvasRef.current && modelsLoaded) {
      const detections = await faceapi
        .detectAllFaces(imageRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      // Clear previous drawings
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      // Resize canvas to match image dimensions
      canvasRef.current.width = imageRef.current.width;
      canvasRef.current.height = imageRef.current.height;

      // Draw detections
      faceapi.draw.drawDetections(canvasRef.current, detections);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, detections);
      faceapi.draw.drawFaceExpressions(canvasRef.current, detections);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-3xl mx-auto p-6">
      <ImageUploader
        modelsLoaded={modelsLoaded}
        onImageSelect={setSelectedImage}
      />
      <ImageDisplay
        selectedImage={selectedImage}
        imageRef={imageRef}
        canvasRef={canvasRef}
        onImageLoad={handleImageLoad}
      />
      {!modelsLoaded && (
        <div className="text-center text-gray-600">
          Loading face detection models...
        </div>
      )}
    </div>
  );
}