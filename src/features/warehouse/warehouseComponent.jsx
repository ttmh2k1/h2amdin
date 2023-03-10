import './warehouseStyle.scss'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowCircleLeft, FaEye } from 'react-icons/fa'
import { getListWarehouse } from '../../apis/warehouseApi'
import { DataGrid } from '@mui/x-data-grid'
import styled from 'styled-components'
import { Button } from '@mui/material'

const WarehouseComponent = () => {
  const navigate = useNavigate()
  const [warehouse, setWarehouse] = useState({
    loading: true,
    rows: [],
    totalRows: 0,
    rowsPerPageOptions: [10, 20, 50],
    pageSize: 10,
    page: 1,
  })

  // const action = [
  //   {
  //     headerName: 'Action',
  //     width: 60,
  //     align: 'center',
  //     headerAlign: 'center',
  //     renderCell: (props) => {
  //       return (
  //         <div className="cellAction">
  //           <Link to={`/warehouse/${props.id}`} style={{ textDecoration: 'none' }}>
  //             <div className="viewButton">
  //               <FaEye />
  //             </div>
  //           </Link>
  //         </div>
  //       )
  //     },
  //   },
  // ]

  const header = [
    {
      field: 'stt',
      headerName: 'No',
      width: 80,
      align: 'center',
      headerAlign: 'center',
      filterable: false,
      renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,
    },
    {
      field: 'id',
      headerName: 'Inventory ID',
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'variationName',
      headerName: 'Variation name',
      width: 200,
      align: 'left',
      headerAlign: 'center',
      renderCell: (params) => `${params?.row?.variation?.name}`,
    },
    {
      field: 'importerName',
      headerName: 'Importer name',
      width: 200,
      align: 'left',
      headerAlign: 'center',
      renderCell: (params) => `${params?.row?.importer?.fullname}`,
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
    {
      field: 'nSold',
      headerName: 'Quantity sold',
      width: 200,
      align: 'center',
      headerAlign: 'center',

      renderCell: (params) => `${params?.row?.variation?.nsold}`,
    },
  ]

  const updateData = (k, v) => setWarehouse((prev) => ({ ...prev, [k]: v }))

  useEffect(() => {
    getListWarehouse({
      page: warehouse.page,
      size: warehouse.pageSize,
      sortDescending: true,
    }).then((resp) => {
      setWarehouse({
        ...warehouse,
        loading: false,
        rows: resp?.data?.data,
        totalRows: resp?.data?.totalElement,
      })
    })
  }, [])

  useEffect(() => {
    updateData('loading', true)
    getListWarehouse({
      page: warehouse.page,
      size: warehouse.pageSize,
      sortDescending: true,
    }).then((resp) => {
      setWarehouse({
        ...warehouse,
        loading: false,
        rows: resp?.data?.data,
        totalRows: resp?.data?.totalElement,
      })
    })
  }, [warehouse.page, warehouse.pageSize])

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
                rows={warehouse.rows}
                columns={header}
                paginationMode="server"
                loading={warehouse.loading}
                rowCount={warehouse.totalRows}
                page={warehouse.page - 1}
                pageSize={warehouse.pageSize}
                rowsPerPageOptions={warehouse.rowsPerPageOptions}
                onPageChange={(page) => {
                  updateData('page', page + 1)
                }}
                onPageSizeChange={(pageSize) => {
                  updateData('page', 1)
                  updateData('pageSize', pageSize)
                }}
                getRowId={(row) => row.id}
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
