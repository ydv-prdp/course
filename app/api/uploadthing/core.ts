import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";

 
const f = createUploadthing();

const handleAuth = ()=>{
    const {userId} = auth();
    console.log(userId)
    if(!userId) throw new Error("Unauthorized");
    return {userId}
}
 
// const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
 
    courseImage: f({ image: { maxFileSize: "4MB", maxFileCount:1 } })
        // Set permissions and file types for this FileRoute
        .middleware(()=>handleAuth())
        .onUploadComplete(()=>{}),
    courseAttachment:f(["text", "image","video","audio","pdf"])
        .middleware(()=>handleAuth())
        .onUploadComplete(()=>{}), 
    chapterVideo:f({video:{maxFileCount:1, maxFileSize:"512GB"}})
        .middleware(()=>handleAuth())
        .onUploadComplete(()=>{}),
    

} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;