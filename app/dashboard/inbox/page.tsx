import DynamicTable from "@/components/dynamicTable/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
    label: "My Inbox",
    link: ""
  }

]

const menuData = [
  {
    name: "inbox1",
    message: "I want biryani",
    date: "2025-01-09T03:33:21.409+00:00"
  },
  {
    name: "inbox2",
      message: "Can I buy your franchise",
         date: "2025-01-09T03:33:21.409+00:00"


  },
  {
    name: "inbox3",
    message: "Can we have a meeting",
       date: "2025-01-09T03:33:21.409+00:00"
   
  },
];

const tableColumns = [

  
  {
    header: "Name",
    accessor: "name",
    
  },
  {
    header: "Message",
    accessor: "message",
    
  },
  {
    header: "Date",
    accessor: "date",
    
  },
];
const Inbox = () => {
    return ( 
   <>
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
          <DynamicTable data={menuData} columns={tableColumns} />
   </>

     );
}
 
export default Inbox;