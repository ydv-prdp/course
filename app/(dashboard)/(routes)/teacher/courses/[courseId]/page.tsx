import React from 'react'

const CourseId = ({params}:{params:{courseId:string}}) => {
  return (
    <div>CourseId:{params.courseId}</div>
  )
}

export default CourseId