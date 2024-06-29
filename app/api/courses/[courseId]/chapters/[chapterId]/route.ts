import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"
import Mux from "@mux/mux-node"
const {video} = new Mux(process.env.MUX_TOKEN_ID!, process.env.MUX_TOKEN_SECRET!)

export async function PATCH(
    req:Request,
    {params}:{params: {courseId:string; chapterId:string}}
){
    try{
        const {userId} = auth();
        if(!userId){
            return new NextResponse("Unauthorized",{status:401})
        }
        const {isPublished ,...values} = await req.json();
        const ownCourse = await db.course.findUnique({
            where:{
                id:params.courseId,
                userId:userId
            }
        })
        if(!ownCourse){
            return new NextResponse("Unauthorized",{status:401})
        }
       const chapter = await db.chapter.update({
            where:{
                id:params.chapterId,
                courseId:params.courseId
            },
            data:{
                ...values
            }
       })
       if(values.videoUrl){
        const exisitingMuxData = await db.muxData.findFirst({
            where:{
                chapterId:params.chapterId
            }
        })
        if(exisitingMuxData){
            await video.assets.delete(exisitingMuxData.assetId)
            await db.muxData.delete({
                where:{
                    id:exisitingMuxData.id
                }
            })
        }
        const asset = await video.assets.create({
            input:values.videoUrl,
            playback_policy:["public"],
            test:false
           })
           await db.muxData.create({
                data:{
                    chapterId:params.chapterId,
                    assetId:asset.id,
                    playbackId:asset.playback_ids?.[0]?.id,
                }
           })
       }
        return NextResponse.json(chapter)
    }catch (error){
        console.log("[COURSE_CHAPTER_ID]",error)
        return new NextResponse("Internal Error",{status:500})
    }
}