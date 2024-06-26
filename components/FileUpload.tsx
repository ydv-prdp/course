"use client"
import { UploadDropzone } from "@uploadthing/react"
import { ourFileRouter } from "@/app/api/uploadthing/core"
import { toast } from "sonner";
import { UploadButton } from "@/lib/uploadthing";
interface FileUploadProps{
    onChange:(url?:string)=>void;
    endpoint:keyof typeof ourFileRouter;
}

export const FileUpload=({
    onChange,
    endpoint
}:FileUploadProps)=>{
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res)=>{
                onChange(res?.[0].url)
                toast.success("Image uploaded successfully!")
            }}
            onUploadError={(error: Error) => {
                // Do something with the error.
                toast.error(`ERROR! ${error.message}`);
              }}
        />
    //     <UploadButton
    //     endpoint={endpoint}
    //     onClientUploadComplete={(res) => {
    //       // Do something with the response
    //       console.log("Files: ", res);
    //       alert("Upload Completed");
    //     }}
    //     onUploadError={(error: Error) => {
    //       // Do something with the error.
    //       alert(`ERROR! ${error.message}`);
    //     }}
    //   />
        
    )
}