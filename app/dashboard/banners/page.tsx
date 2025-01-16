import DynamicTable from "@/components/dynamicTable/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { breadCrumbItems } from "@/constants/constants";



const inbox: breadCrumbItems[] = [
  {
    label: "home",
    link: "/"
  },

  {
    label: "dashboard",
    link: "/dashboard"
  },
  {
    label: "Banners",
    link: ""
  }

]

const menuData = [
  {
    name: "banner1",
    image: "/images/overview.png"
  },
  {
    name: "banner2",
    image: "/images/overview.png"
  },
  {
    name: "banner3",
    image: "/images/overview.png"
  },
];

const tableColumns = [

  
  {
    header: "Name",
    accessor: "name",
    
  },
  {
    header: "Image",
    accessor: "image",
    render: (image: string) => (
      <img src={image} alt="Product" className="w-8 h-8 object-cover" />
    ),
  },
];
const Banners = () => {
    return (  
<>
<div className="flex justify-between items-center">
<Breadcrumb>
        <BreadcrumbList>
          {inbox.map((item, index) => (
            <BreadcrumbItem key={index}>
              {index === inbox.length - 1 ? (
                // Last item displayed as the current page
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                // Other items as links
                <>
                  <BreadcrumbLink href={item.link}>{item.label}</BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <Button variant="ghost" >
Add Banner
</Button>

</div>
      <DynamicTable data={menuData} columns={tableColumns} />
</>
    );
}
 
export default Banners;