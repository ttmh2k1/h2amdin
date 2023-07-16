import './logsStyle.scss'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { getLogs } from '../../apis/logsApi'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

const LogsComponent = () => {
  const navigate = useNavigate()
  const [logs, setLogs] = useState({
    loading: true,
    rows: [],
    totalRows: 0,
    rowsPerPageOptions: [10, 20, 50],
    pageSize: 10,
    page: 1,
  })

  const logsHeader = [
    {
      field: 'stt',
      headerName: 'No',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,
    },
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => `${moment(params?.row?.time).format('YYYY-MM-DD hh:mm')}`,
    },
    {
      field: 'username',
      headerName: 'User name',
      width: 150,
      align: 'left',
      headerAlign: 'center',
    },
    {
      field: 'logType',
      headerName: 'Logs type',
      width: 180,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'content',
      headerName: 'Content',
      width: 500,
      align: 'left',
      headerAlign: 'center',
    },
  ]

  const updateData = (k, v) => setLogs((prev) => ({ ...prev, [k]: v }))

  useEffect(() => {
    updateData('loading', true)
    const handleGetLog = async () => {
      try {
        await getLogs({ page: logs.page, size: logs.pageSize, sortByDateDescending: true }).then(
          (resp) => {
            setLogs({
              ...logs,
              loading: false,
              rows: resp?.data?.data,
              totalRows: resp?.data?.totalElement,
            })
          },
        )
      } catch (error) {
        if (error?.response?.status === 403) {
          navigate('/error')
        }
      }
    }
    handleGetLog()
  }, [logs?.page, logs?.pageSize])

  return (
    <div className="logs">
      <Sidebar />
      <div className="logsContainer">
        <Navbar />
        <div className="logsBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/logs">Logs</a>
          </div>
          <div className="template">
            <div className="datatable">
              <Tab
                rows={logs.rows}
                columns={logsHeader}
                paginationMode="server"
                loading={logs.loading}
                rowCount={logs.totalRows}
                page={logs.page - 1}
                pageSize={logs.pageSize}
                rowsPerPageOptions={logs.rowsPerPageOptions}
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
          <div className="logsFooter">
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

export default LogsComponent
