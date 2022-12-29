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
  const [warehouse, setWarehouse] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const handleWarehouse = async () => {
      const resp = await getListWarehouse()
      const list = resp?.data?.data
      setWarehouse(list)
    }
    handleWarehouse()
  })

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

  const content = warehouse.map((item, index) => {
    return {
      stt: index + 1,
      id: item?.id,
      importerName: item?.importer?.fullname,
      importQuantity: item?.importQuantity,
      importTime: item?.importTime,
    }
  })

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
                rows={content}
                columns={header}
                pageSize={10}
                rowsPerPageOptions={[10]}
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
