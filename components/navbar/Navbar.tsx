import Link from 'next/link'
import React from 'react'
import Links from './links/Links'


const Navbar = () => {
  return (
    <div className='h-12 p-12 flex items-center justify-between'>
      <Link href="/" className='font-bold'>Logo</Link>
      <div>
          <Links/>
      </div>
     
    </div>
  )
}

export default Navbar
