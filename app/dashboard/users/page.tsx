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
import { getUsers } from "@/lib/actions/user.action";



const tableColumns = [

  
  {
    header: "User Name",
    accessor: "userName",
  },
  {
    header: "User Email",
    accessor: "userEmail",
  },
  {   
  header: "Role",
    accessor: "role",
  }
];

const users: breadCrumbItems[] = [
  {
    label: "home",
    link: "/"
  },

  {
    label: "dashboard",
    link: "/dashboard"
  },
  {
    label: "Users",
    link: ""
  }

]
const Users = async () => {

  const data = await getUsers()
    return ( 
       <>
        <Breadcrumb>
        <BreadcrumbList>
          {users.map((item, index) => (
            <BreadcrumbItem key={index}>
              {index === users.length - 1 ? (
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
      <DynamicTable data={data} columns={tableColumns} />
       </>
     );
}
 
export default Users;