import { IconBadge } from '@/components/icon-badge';
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server';
import { LayoutDashboard } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react'
import TitleForm from './_comp/TitleForm';
import DescriptionForm from './_comp/DescriptionForm';
import ImageForm from './_comp/ImageForm';

const CourseId = async({params}:{params:{courseId:string}}) => {
  const {userId} = auth();
  if(!userId){
    redirect("/")
  }
  
  const course = await db.course.findUnique({
    where:{
      id:params.courseId
    }
  })
  if(!course){
    return redirect("/")
  }

  const requiredFields=[
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`


 


  return (
    <div className='p-6'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-y-2'>
          <h2 className='text-2xl font-medium'>
            Course Setup
          </h2>
          <span className='text-sm text-slate-700'>
            Complete all fields {completionText}
          </span>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
        <div>
          <div className='flex items-center gap-x-2'>
            <IconBadge  icon={LayoutDashboard}/>
            <h2 className='text-xl'>
              Customise your course
            </h2>
          </div>
          <div>
            <TitleForm
              initialData={course}
              courseId={course.id}
            />
            <DescriptionForm
              initialData={course}
              courseId={course.id}
            />
            <ImageForm
              initialData={course}
              courseId={course.id}
            />
          </div>
        </div>

      </div>
    </div>
  )
}

export default CourseId