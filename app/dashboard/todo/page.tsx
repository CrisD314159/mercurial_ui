'use client'

import SubjectCarousel from "@/app/ui/Todo/SubjectCarousel"

export default function TodoPage() {


  const filterAssignments = (id:number) => {
    console.log(id);

  }


  return (
    <div className="w-full min-h-[90%] max-h-[90%] absolute">
      <SubjectCarousel filterAssignments={filterAssignments} />
    </div>
  )
}