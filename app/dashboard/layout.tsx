"use client"
import Header from "@/components/nav/header";
import SideBar from "@/components/nav/sidebar";

import { ReactNode } from "react";

const Layout = ({children}: {children:ReactNode}) => {

// const router = useRouter();
//    const data = localStorage.getItem("token")
//    if(data !== "564897"){
//     router.push("/")
   
    return (  
        <div className="flex h-screen "> 
            <SideBar/>

             {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />
            {/* main content */}
            <div  className="flex-1 bg-white p-6 overflow-y-auto">{children}</div>
        </div>
        </div>
    );
}

export default Layout;