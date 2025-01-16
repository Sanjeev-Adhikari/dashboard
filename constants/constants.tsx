import {ArrowUpNarrowWide, BookHeart, ChartBarStacked, ChartNoAxesGantt, LayoutDashboard, Logs, Settings, Shuffle, Users } from "lucide-react";
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


export const cards: CardItems[] = [
    {
        title: "Total Orders",
        count: 4,
        description: "Total orders from users",
        icon: <ArrowUpNarrowWide />,
        link: "/dashboard/orders",
        color: "#EF5350"
    },
    {
        title: "Total Users",
        count: 4,
        description: "Total users regostered",
        icon: <ArrowUpNarrowWide />,
        link: "/dashboard/users",
        color: "#00C8C8"
    },
    {
        title: "Menu Items",
        count: 4,
        description: "Total items in menu",
        icon: <ArrowUpNarrowWide />,
        link: "/dashboard/menu",
        color: "#42A5F5"
    },
    {
        title: "Total Categories",
        count: 4,
        description: "Total categories created",
        icon: <ArrowUpNarrowWide />,
        link: "/dashboard/categories",
        color: "#66BB6A"
    }
]



