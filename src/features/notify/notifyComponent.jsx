import './notifyStyle.scss'
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { useNavigate } from 'react-router-dom'
import { getNotification } from '../../apis/notificationApi'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { Button } from '@mui/material'
import moment from 'moment'
import { DataGrid } from '@mui/x-data-grid'
import styled from 'styled-components'

const NotifyComponent = () => {
  const navigate = useNavigate()
  const [notification, setNotification] = useState({
    loading: true,
    rows: [],
    totalRows: 0,
    rowsPerPageOptions: [10, 20, 50],
    pageSize: 10,
    page: 1,
  })

  const header = [
    {
      field: 'stt',
      headerName: 'No',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 400,
      align: 'left',
      headerAlign: 'center',
    },
    {
      field: 'time',
      headerName: 'Time',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => `${moment(params?.row?.time).format('YYYY-MM-DD hh:mm')}`,
    },
    {
      field: 'content',
      headerName: 'Content',
      width: 500,
      align: 'left',
      headerAlign: 'center',
    },
  ]

  useEffect(() => {
    updateData('loading', true)
    getNotification({
      page: notification?.page,
      size: notification?.pageSize,
      sortByDateDescending: true,
    }).then((resp) => {
      setNotification({
        ...notification,
        loading: false,
        rows: resp?.data?.data,
        totalRows: resp?.data?.totalElement,
      })
    })
  }, [notification?.page, notification?.pageSize])

  const updateData = (k, v) => setNotification((prev) => ({ ...prev, [k]: v }))

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
            <div className="datatable">
              <Tab
                rows={notification?.rows}
                columns={header}
                paginationMode="server"
                loading={notification?.loading}
                rowCount={notification?.totalRows}
                page={notification?.page - 1}
                pageSize={notification?.pageSize}
                rowsPerPageOptions={notification?.rowsPerPageOptions}
                onPageChange={(page) => {
                  updateData('page', page + 1)
                }}
                onPageSizeChange={(pageSize) => {
                  updateData('page', 1)
                  updateData('pageSize', pageSize)
                }}
                getRowId={(row) => row.id}
                style={{
                  backgroundColor: 'white',
                  fontSize: '0.8rem',
                }}
              />
            </div>
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

const Tab = styled(DataGrid)({
  '& .css-levciy-MuiTablePagination-displayedRows': {
    fontSize: '1rem',
  },
})

export default NotifyComponent
