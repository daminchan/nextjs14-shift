"use client"
import React, { useState } from 'react'
import NavLinks from './navLinks/NavLinks';

const links = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "user",
      path: "/user",
    },
    {
      title: "contact",
      path: "/contact",
    },
  ];
const session =true;
const   admin =true;



  const Links = () => {
  const [open,setOpen] = useState(false);


  return (
    <>
      <div className="mx-auto px-50 flex flex-col justify-between">
        <div className='h-24 p-12 hidden md:flex items-center gap-10'>
            {links.map((link)=>(
            <div key={link.title}>
                <NavLinks item={link} key={link.title} />
            </div>
             ))}
           {session?(
            <>
              {
                admin &&(<NavLinks item={{title:"admin",path:"/admin"}} />)
                }
                <button>Logout</button></>
           ):(
            <NavLinks item={{title:"Login",path:"/login"}} />
           )}
        </div>
          <button className="md:hidden z-10 block cursor-pointer" onClick={()=>setOpen((prev)=>!prev)}>Menu</button>
          {open && (
        <div className='absolute top-20 right-0 w-1/2 h-[calc(50vh-50px)] z-10 flex flex-col items-center justify-center gap-10  backdrop-blur-xs  shadow-md bg-indigo-500 bg-opacity-10 md:hidden rounded-lg'>
          {links.map((link) => (
            <NavLinks item={link} key={link.title} />
          ))}
           {session?(
            <>
              {
                admin &&(<NavLinks item={{title:"admin",path:"/admin/dashboard"}} />)
                }
                <button>Logout</button></>
           ):(
            <NavLinks item={{title:"Login",path:"/login"}} />
           )}
        </div>
      )}
      </div>
    </>
  );
};

export default Links