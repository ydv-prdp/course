import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { DataTable } from './_comp/data-table'
import { columns } from './_comp/columns'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'

 
const CoursePage = async() => {
  const {userId} = auth();
  if(!userId){
    return redirect("/")
  }
  const courses = await db.course.findMany({
    where:{
      userId
    },
    orderBy:{
      createdAt:"desc"
    }
  })
  return (
    <div className='p-6'>
         <DataTable columns={columns} data={courses} />
    </div>
  )
}

export default CoursePage