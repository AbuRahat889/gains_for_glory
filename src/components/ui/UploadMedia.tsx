"use client";

import { useState, useRef, type DragEvent, type ChangeEvent } from "react";
import { X, Upload, Play, ImageIcon } from "lucide-react";
import Image from "next/image";
import { Card } from "antd";
import { useFormContext } from "react-hook-form";

export interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  type: "image" | "video";
}

interface UploadMediaProps {
  name: string;
  onUpload?: (formData: FormData) => Promise<string[] | void>;
}

export default function UploadMedia({ name, onUpload }: UploadMediaProps) {
  const { setValue } = useFormContext();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
      e.target.value = ""; // <-- Reset input value here to allow same file re-upload
    }
  };

  const handleFiles = async (files: File[]) => {
    const validFiles = files.filter((file) => {
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");
      return isImage || isVideo;
    });

    const newUploads: UploadedFile[] = validFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith("image/") ? "image" : "video",
    }));

    setUploadedFiles((prev) => [...prev, ...newUploads]);

    const formData = new FormData();
    validFiles.forEach((file) => formData.append("images", file));

    if (onUpload) {
      const uploadedUrls = await onUpload(formData);
      if (uploadedUrls) {
        setValue(name, uploadedUrls);
      } else {
        setValue(
          name,
          newUploads.map((f) => f.preview) // fallback to preview URLs
        );
      }
    } else {
      setValue(
        name,
        newUploads.map((f) => f.preview)
      );
    }
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => {
      const updated = prev.filter((f) => f.id !== id);

      // Clean up preview URL
      const removedFile = prev.find((f) => f.id === id);
      if (removedFile) URL.revokeObjectURL(removedFile.preview);

      // Update React Hook Form field with new URLs
      const newUrls = updated.map((f) => f.preview);
      setValue(name, newUrls); // <-- THIS IS THE FIX

      return updated;
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleBrowseClick = () => fileInputRef.current?.click();

  return (
    <>
      <Card className="bg-[#f5f5f5] border-2 border-dashed border-[#e0e0e0] max-w-3xl">
        <div className="p-5 text-center space-y-4">
          <div
            className={`${isDragOver ? "bg-white border-blue-300" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-blue-500 mx-auto" />
            <p className="text-sm md:text-lg text-gray-700 mb-3">
              Drag & Drop your files
            </p>
            <button
              type="button"
              onClick={handleBrowseClick}
              className="bg-[#f97316] text-sm rounded-md hover:bg-orange-600 text-white px-6 py-2 md:text-base font-semibold"
            >
              Browse to Upload
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      </Card>

      {uploadedFiles.length > 0 && (
        <div className="pt-6">
          <h2 className="text-xl font-semibold mb-4">
            Uploaded Files ({uploadedFiles.length})
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {uploadedFiles.map((f) => (
              <Card key={f.id} className="relative group">
                <div className="">
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 ">
                    {f.type === "image" ? (
                      <Image
                        src={f.preview}
                        alt="preview"
                        fill
                        className="object-cover "
                      />
                    ) : (
                      <div className="relative w-full h-full">
                        <video
                          src={f.preview}
                          className="w-full h-full object-cover"
                          muted
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                          <Play className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => removeFile(f.id)}
                      className="absolute top-1 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>

                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                      {f.type === "image" ? (
                        <ImageIcon className="h-3 w-3 inline mr-1" />
                      ) : (
                        <Play className="h-3 w-3 inline mr-1" />
                      )}
                      {f.file.name.length > 15
                        ? f.file.name.slice(0, 15) + "..."
                        : f.file.name}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// const methods = useForm<{ photos: string[] }>();
// const handleUpload = async (formData: FormData): Promise<string[] | void> => {
//   console.log(formData);
//   // const res = await uploadFile(formData).unwrap();

//   // return res?.success ? res?.data?.images : [];
// };
// const onSubmit = (data: { photos: string[] }) => {
//   console.log("Uploaded URLs:", data.photos);
// };

// <FormProvider {...methods}>
//   <form onSubmit={methods.handleSubmit(onSubmit)} className="p-6">
//     <UploadMedia name="photos" onUpload={handleUpload} />
//     <button
//       type="submit"
//       className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
//     >
//       Submit
//     </button>
//   </form>
// </FormProvider>;
