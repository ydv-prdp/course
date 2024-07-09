import { db } from "@/lib/db"
import Categories from "./_comp/Categories"
import SearchInput from "@/components/search-input"
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getCourses } from "@/actions/get-courses";
import CoursesList from "@/components/courses-list";

interface SearchPageParams {
  searchParams:{
    title:string;
    categoryId:string;
  }
}

const Search = async({searchParams}:SearchPageParams) => {
  const {userId} = auth();
  if(!userId){
    return redirect("/")
  }
  const courses = await getCourses({
    userId,
    ...searchParams
  })
  const categories = await db.category.findMany({
    orderBy:{
      name:"asc"
    }
  })
  return (
    <>
    <div className="px-6 pt-6 md:hidden md:mb-0 block">
      <SearchInput/>
    </div>
    <div className="p-6 space-y-4">
      <Categories
        items={categories}
      />
      <CoursesList items = {courses}/>
    </div>
    </>
  )
}

export default Search