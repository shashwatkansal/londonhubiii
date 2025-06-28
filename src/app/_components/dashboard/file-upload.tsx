import { useState } from "react";
import { RiImageAddFill } from "react-icons/ri";
import Image from "next/image";

const FileUpload = ({
  onFileChange,
}: {
  onFileChange: (file: File | null) => void;
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
      onFileChange(file); // Notify parent component
    }
  };

  // Handle drag-and-drop file selection
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
      onFileChange(file); // Notify parent component
      e.dataTransfer.clearData();
    }
  };

  // Allow dragging over the drop area
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <label className="block text-lg font-semibold mb-2">
        Upload Cover Image
      </label>
      <div
        className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-all duration-200"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {!selectedFile && (
          <div className="flex flex-col items-center justify-center space-y-2 text-gray-500">
            <RiImageAddFill className="text-4xl" />
            <p>Drag & Drop or Click to Upload</p>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleFileSelect}
        />

        {selectedFile && (
          <div className="flex flex-col items-center justify-center space-y-2">
            {filePreview && (
              <Image
                src={filePreview}
                alt="Preview"
                width={128}
                height={128}
                className="w-32 h-32 object-cover rounded-md shadow-lg"
              />
            )}
            <p className="text-sm font-medium text-gray-600">
              {selectedFile.name}
            </p>
            <button
              className="text-sm text-red-500 underline hover:text-red-700"
              onClick={() => {
                setSelectedFile(null);
                setFilePreview(null);
                onFileChange(null); // Clear file in parent component
              }}
            >
              Remove Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
