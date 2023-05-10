import './notifyStyle.scss'
import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { useNavigate } from 'react-router-dom'
import { getNotification } from '../../apis/notificationApi'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { Button } from '@mui/material'

const NotifyComponent = () => {
  const navigate = useNavigate()

  return (
    <div className="notify">
      <Sidebar />
      <div className="notifyContainer">
        <Navbar />
        <div className="notifyBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/notification">Notification</a>
          </div>
          <div className="template">
            <div className="datatable"></div>
          </div>
          <div className="notifyFooter">
            <Button
              className="backButton"
              startIcon={<FaArrowCircleLeft color="#fff" size={'1rem'} />}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotifyComponent
