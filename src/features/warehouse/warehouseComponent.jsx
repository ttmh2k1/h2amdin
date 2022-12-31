import './warehouseStyle.scss'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowCircleLeft, FaEye } from 'react-icons/fa'
import { getListWarehouse } from '../../apis/warehouseApi'
import { DataGrid, GridPagination } from '@mui/x-data-grid'
import styled from 'styled-components'
import { Button } from '@mui/material'

const WarehouseComponent = () => {
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
    getListWarehouse().then(resp => {
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
    getListWarehouse({page: data.page, size: data.pageSize}).then(resp => {
      setData({
        ...data,
        loading: false,
        rows: resp?.data?.data,
        totalRows: resp?.data?.totalElement,
      })
    });
  }, [data.page, data.pageSize]);

  const updateData = (k, v) => setData((prev) => ({ ...prev, [k]: v }));

  const action = [
    {
      headerName: 'Action',
      width: 60,
      align: 'center',
      headerAlign: 'center',
      renderCell: (props) => {
        return (
          <div className="cellAction">
            <Link to={`/warehouse/${props.id}`} style={{ textDecoration: 'none' }}>
              <div className="viewButton">
                <FaEye />
              </div>
            </Link>
          </div>
        )
      },
    },
  ]

  const header = [
    {
      field: 'stt',
      headerName: 'No',
      width: 80,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'id',
      headerName: 'Inventory ID',
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'importerName',
      headerName: 'Importer name',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) => {
        return params.row.importer.fullname
      }
    },
    {
      field: 'importQuantity',
      headerName: 'Import quantity',
      width: 200,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'importTime',
      headerName: 'Import time',
      width: 200,
      align: 'center',
      headerAlign: 'center',
    },
  ]

  // const content = warehouse.map((item, index) => {
  //   return {
  //     stt: index + 1,
  //     id: item?.id,
  //     importerName: item?.importer?.fullname,
  //     importQuantity: item?.importQuantity,
  //     importTime: item?.importTime,
  //   }
  // })

  return (
    <div className="warehouse">
      <Sidebar />
      <div className="warehouseContainer">
        <Navbar />
        <div className="warehouseBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/warehouse">Warehouse</a>
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
                style={{
                  backgroundColor: '#fff',
                  fontSize: '0.8rem',
                }}
              />
            </div>
          </div>
          <div className="warehouseFooter">
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

export default WarehouseComponent
