import Link from 'next/link'
import React from 'react'


const Navbar = () => {
  return (
    <div className='h-12 p-12 flex items-center justify-between'>
      <Link href="/" className='font-bold'>Logo</Link>
      <div>
        <Link href="/about" ></Link>
      </div>
     
    </div>
  )
}

export default Navbar
