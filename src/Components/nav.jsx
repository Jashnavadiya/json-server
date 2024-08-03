import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (<>
    <div className='w-100 bg-slate-100 sticky top-0 '>
        <span className='flex justify-evenly py-5'>
            <Link to="/">HOME</Link>
            <Link to="/add">Add Product</Link>
            <Link to="/test"> THis Is oNly For Testing</Link>
        </span>
    </div>
  </>
  )
}

export default Nav
