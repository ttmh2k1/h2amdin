import './logsStyle.scss'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { getLogs } from '../../apis/logsApi'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid'

const LogsComponent = () => {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    const handleGetLogs = async () => {
      const resp = await getLogs()
      const list = resp?.data?.data
      setLogs(list)
    }
    handleGetLogs()
  }, [])

  const logsHeader = [
    {
      field: 'stt',
      headerName: 'No',
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'id',
      headerName: 'User ID',
      width: 150,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 250,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'logType',
      headerName: 'Logs type',
      width: 200,
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

  const logsContent = logs.map((item, index) => {
    return {
      stt: index + 1,
      id: item?.id,
      date: item?.date,
      logType: item?.logType,
      content: item?.content,
    }
  })

  return (
    <div className="logs">
      <Sidebar />
      <div className="logsContainer">
        <Navbar />
        <div className="body">
          <div className="title">
            <a href="/">Home</a>/ <a href="/logs">Logs</a>
          </div>
          <div className="template">
            <div className="datatable">
              <Tab
                rows={logsContent}
                columns={logsHeader}
                pageSize={10}
                rowsPerPageOptions={[10]}
                style={{
                  backgroundColor: 'white',
                  fontSize: '0.8rem',
                }}
              />
            </div>
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
