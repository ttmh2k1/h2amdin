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

const LogsComponent = () => {
  const [data, setData] = useState({
    loading: true,
    rows: [],
    totalRows: 0,
    rowsPerPageOptions: [10, 20, 50],
    pageSize: 10,
    page: 1
  })

  const navigate = useNavigate()

  useEffect(() => {
    getLogs({page : data.page, size: data.pageSize, sortByDateDescending: true}).then(resp => {
      setData({
        ...data,
        loading: false,
        rows: resp?.data?.data,
        totalRows: resp?.data?.totalElement,
      })
    })
  }, [])

  useEffect(() => {
    updateData("loading", true);
    getLogs({page: data.page, size: data.pageSize, sortByDateDescending: true}).then(resp => {
      setData({
        ...data,
        loading: false,
        rows: resp?.data?.data,
        totalRows: resp?.data?.totalElement,
      })
    });
  }, [data.page, data.pageSize]);

  const updateData = (k, v) => setData((prev) => ({ ...prev, [k]: v }));

  const header = [
    {
      field: 'stt',
      headerName: 'No',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      renderCell:(index) => index.api.getRowIndex(index.row.id) + 1
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
        <div className="logsBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/logs">Logs</a>
          </div>
          <div className="template">
            <div className="datatable">
              <Tab
                rows={data.rows}
                columns={header}
                paginationMode="server"
                loading={data.loading}
                rowCount={data.totalRows}
                page={data.page - 1}
                pageSize={data.pageSize}
                rowsPerPageOptions={data.rowsPerPageOptions}
                onPageChange={(page) => {
                  updateData("page", page + 1);
                }}
                onPageSizeChange={(pageSize) => {
                  updateData("page", 1);
                  updateData("pageSize", pageSize);
                }}
                getRowId= {(row) => row.id}
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
