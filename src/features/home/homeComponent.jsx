import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import './homeStyle.scss'

const HomeComponent = () => {
  return (
    <div className="homePage">
      <Sidebar />
      <div className="homeContainer"></div>
    </div>
  )
}
export default HomeComponent
