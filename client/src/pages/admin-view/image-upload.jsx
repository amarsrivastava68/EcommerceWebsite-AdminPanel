import { Label  } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { FileIcon, UploadCloudIcon ,  } from "lucide-react";
import { XIcon } from "lucide-react";
const ImageUpload = ({
  file,
  setFile,
  uploadImageUrl,
  setUploadImageUrl,
  setImageLoading , 
  ImageLoading
}) => {
  const inputref = useRef(null);
  function handleImageFileChange(event) {
    console.log(event.target.files);
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  }
  function handleDragOver(event) {
    event.preventDefault();
  }
  function handleremoveimage () {
    setFile(null)
    if (inputref.current)
    {
        inputref.current.value = ""
    }
  }
  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setFile(droppedFile);
  }

  async function uploadImagetoCloudinary() {
    setImageLoading(true)
    const data = new FormData
    data.append('my_file' , file)
    const response = await axios.post('http://localhost:5000/api/admin/products/upload-image' , data)
    if (response.data?.success) setUploadImageUrl(response.data.result.url)
      console.log(response.data.result.url) 
    setImageLoading(false)}

  useEffect(()=> {
    if(file !== null)
    {
      uploadImagetoCloudinary ()

    }

  } , [file])
  return (
    <div className="w-full max-w-md mx-auto">
      <Label className=" text-lg font-semibold mb-2 block mt-4">
        Upload Image
      </Label>

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-lg p-4 "
      >
        <Input
          id="image-upload"
          type="file"
          className=" hidden"
          ref={inputref}
          onChange={handleImageFileChange}
        />
        {!file ? (
          <Label
            htmlFor="image-upload"
            className=" flex flex-col items-center justify-center h-32 cursor-pointer "
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>click / drag and drop to upload</span>
          </Label>
        ) : (
           ImageLoading ? <Skeleton className='h-10 bg-gray-100'/>:
         ( <div className="flex items-center justify-between">
            <div className="flex items-center ">
                <FileIcon className="w-7 h-7 text-primary mr-2 "/>

            </div>
            <p className="text-small font-medium">{file.name}</p>
            <Button variant = "ghost" size="icon" className='text-muted-foreground  hover : text-foreground' onClick = {handleremoveimage}>
                <XIcon className="w-4 h-4 "/>
                <span className="sr-only">remove file </span>
            </Button>

          </div>)
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
