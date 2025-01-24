"use client"
import { getToken } from "@/utils/getToken";
import {ArrowUpNarrowWide, BookHeart, ChartBarStacked, ChartNoAxesGantt, LayoutDashboard, Logs, Settings, Shuffle, Users } from "lucide-react";
import { useEffect, useState } from "react";
 interface NavLink{
    href: string,
    label: string,
    icon: string
 }

export interface CardItems{
    title: string,
    count: number,
    description: string,
    icon: React.ReactNode | string,
    link: string,
    color: string
 }

 export interface breadCrumbItems{
    label: string,
    link: string
 }
export const navLinks:NavLink[] = [
    {
        href: "/dashboard",
        label: "Overview",
        icon: "/images/overview.png"
    },
    {
        href: "/dashboard/menu",
        label: "Menu",
        icon:"/images/menu.png"
    },
    {
    href: "/dashboard/orders",
    label: "Orders",
    icon: "/images/order.png"
},
    {
        href: "/dashboard/users",
        label: "Users",
        icon: "/images/users.png"
    },
    
   
    {
        href: "/dashboard/banners",
        label: "Banners",
        icon: "/images/banner.png"
    },
    {
        href: "/dashboard/inbox",
        label: "Inbox",
        icon: "/images/inbox.png"
    },

]








export const useDashboardData = () => {
  const [dashboardData, setDashboardData] = useState({
    totalFoodItems: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalCategories: 0,
  });

  const token = getToken();

  useEffect(() => {
    fetch("http://localhost:7000/api/admin/dashboard", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization : `${token}`
        }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setDashboardData(data.data);
        }
      })
      .catch((error) => console.error("Error fetching dashboard data", error));
  }, []);

  return dashboardData;
};

export const getCards = (dashboardData: any) => [
  {
    title: "Total Orders",
    count: dashboardData.totalOrders,
    description: "Total orders from users",
    icon: <ArrowUpNarrowWide />,
    link: "/dashboard/orders",
    color: "#EF5350",
  },
  {
    title: "Total Users",
    count: dashboardData.totalUsers,
    description: "Total users registered",
    icon: <ArrowUpNarrowWide />,
    link: "/dashboard/users",
    color: "#00C8C8",
  },
  {
    title: "Menu Items",
    count: dashboardData.totalFoodItems,
    description: "Total items in menu",
    icon: <ArrowUpNarrowWide />,
    link: "/dashboard/menu",
    color: "#42A5F5",
  },
  {
    title: "Total Categories",
    count: dashboardData.totalCategories,
    description: "Total categories created",
    icon: <ArrowUpNarrowWide />,
    link: "/dashboard/categories",
    color: "#66BB6A",
  },
];
  