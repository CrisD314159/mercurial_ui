import React from "react";
import Header from "../ui/Header/Header";
import BottomNav from "../ui/bottomNav/BottomNav";

export default function DashboardLayout({children}:{children: React.ReactNode}) {

  return (
    <div className="relative h-full">
      <Header/>
      {children}
      <div className="absolute bottom-0 w-full">
        <BottomNav /> 
      </div>
    </div>
  )

  
}