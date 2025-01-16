import { navLinks } from "@/constants/constants";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/images/LogoRed.png"

const SideBar = () => {

    return ( 

        <aside className="w-1/7 bg-white  text-gray-900 h-full p-4">
      {/* Sidebar Header */}

      <Image src={logo} alt="site-logo" className="w-[100px] pb-4"/>

      {/* Navigation */}
      <nav className="mt-2">
        <ul className="space-y-2">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className="flex items-center gap-3 py-1 text-xs px-4 rounded transition duration-200"
              >
                <Image  src={link.icon} alt={link.label} width={18} height={18} />
                <span >{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
    );
}
 
export default SideBar;