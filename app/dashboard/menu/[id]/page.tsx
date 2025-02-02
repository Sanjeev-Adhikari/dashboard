import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import React from 'react'

const page = () => {
    const menuDetailsBreadcrumb = [

        { label: "Menu", link: "/dashboard/menu" },
        { label: "Food Details", link: "" }
      ];
  return (
    <Breadcrumb>
    <BreadcrumbList>
      {menuDetailsBreadcrumb.map((item, index) => (
        <BreadcrumbItem key={index}>
          {index === menuDetailsBreadcrumb.length - 1 ? (
            <BreadcrumbPage>{item.label}</BreadcrumbPage>
          ) : (
            <>
              <BreadcrumbLink href={item.link}>{item.label}</BreadcrumbLink>
              <BreadcrumbSeparator />
            </>
          )}
        </BreadcrumbItem>
      ))}
    </BreadcrumbList>
  </Breadcrumb>
  )
}

export default page