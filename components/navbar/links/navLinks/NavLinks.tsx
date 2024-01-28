"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

type NavLinksProps = {
    item: {
      title: string;
      path: string;
    };
  };
  
const NavLinks: React.FC<NavLinksProps>= ({item}) => {

const pathName = usePathname();

  return (
    <div>
         <Link href={item.path} className={`min-w-100 px-10 rounded-full font-medium text-center${pathName === item.path && 'bg-gray-300 ring ring-blue-500 hover:ring-blue-700 '}`}>
          {item.title}</Link>
    </div>
  )
}

export default NavLinks