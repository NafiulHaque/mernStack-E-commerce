import React from 'react'
import { Outlet } from 'react-router-dom'
import UserSidebar from '../Components/sidebar/UserSidebar'

const UserDashboardScreen = () => {
  return (
    <div className="grid grid-rows-1 grid-flow-col grid-cols-12">
    <div className="row-span-1 col-span-3">
      <UserSidebar/>
    </div>
    <div className="col-span-9 px-4">
        <Outlet/>
    </div>
  </div>
  )
}

export default UserDashboardScreen