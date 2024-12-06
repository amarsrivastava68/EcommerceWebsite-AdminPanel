import { Label  , Button} from "@/components/ui/label";
import React from "react";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { FileIcon, UploadCloudIcon } from "lucide-react";
const ImageUpload = ({
  file,
  setFile,
  uploadedImageUrl,
  setUploadedImageUrl,
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
          <div className="flex items-center justify-between">
            <div className="flex items-center ">
                <FileIcon className="w-7 h-7 text-primary mr-2 "/>

            </div>
            <p className="text-small font-medium">{file.name}</p>
            <Button variant = "ghost" size="icon" className='text-muted-foreground  hover : text-foreground' onClick = {handleremoveimage}>
                <Xicon className="w-4 h-4 "/>
                <span className="sr">remove file </span>
            </Button>

          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
