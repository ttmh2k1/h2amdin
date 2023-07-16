import './warehouseStyle.scss'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowCircleLeft, FaRegPlusSquare } from 'react-icons/fa'
import { getListWarehouse } from '../../apis/warehouseApi'
import { DataGrid } from '@mui/x-data-grid'
import styled from 'styled-components'
import { Button } from '@mui/material'
import moment from 'moment'

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
      field: 'variationID',
      headerName: 'Variation ID',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => `${params?.row?.variation?.id}`,
    },
    {
      field: 'variationName',
      headerName: 'Variation name',
      width: 280,
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
      width: 150,
      align: 'right',
      headerAlign: 'center',
    },
    {
      field: 'importTime',
      headerName: 'Import time',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => `${moment(params?.row?.importTime).format('YYYY-MM-DD hh:mm')}`,
    },
    {
      field: 'nSold',
      headerName: 'Quantity sold',
      width: 100,
      align: 'right',
      headerAlign: 'center',

      renderCell: (params) => `${params?.row?.variation?.nsold}`,
    },
  ]

  const updateData = (k, v) => setWarehouse((prev) => ({ ...prev, [k]: v }))

  useEffect(() => {
    updateData('loading', true)
    const handleListWarehouse = async () => {
      try {
        await getListWarehouse({
          page: warehouse?.page,
          size: warehouse?.pageSize,
          sortDescending: true,
          sortBy: 2,
        }).then((resp) => {
          setWarehouse({
            ...warehouse,
            loading: false,
            rows: resp?.data?.data,
            totalRows: resp?.data?.totalElement,
          })
        })
      } catch (error) {
        if (error?.response?.status === 403) {
          navigate('/error')
        }
      }
    }
    handleListWarehouse()
  }, [warehouse?.page, warehouse?.pageSize])

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
                rows={warehouse?.rows}
                columns={header}
                paginationMode="server"
                loading={warehouse?.loading}
                rowCount={warehouse?.totalRows}
                page={warehouse?.page - 1}
                pageSize={warehouse?.pageSize}
                rowsPerPageOptions={warehouse?.rowsPerPageOptions}
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
              className="importButton"
              startIcon={<FaRegPlusSquare color="#fff" size={'1rem'} />}
              onClick={() => navigate('/warehouse/import')}
            >
              Import
            </Button>
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
