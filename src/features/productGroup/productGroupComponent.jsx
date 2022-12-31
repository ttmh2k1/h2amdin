import './productGroupStyle.scss'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { useEffect, useState } from 'react'
import { getListProductGroup } from '../../apis/productGroupApi'
import { DataGrid } from '@mui/x-data-grid'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowCircleLeft, FaEye, FaPen } from 'react-icons/fa'
import { Button } from '@mui/material'

const ProductGroupComponent = () => {
  const [listProductGroup, setListProductGroup] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const handleListProductGroup = async () => {
      const resp = await getListProductGroup()
      const list = resp?.data?.data
      setListProductGroup(list)
    }
    handleListProductGroup()
  }, [])

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
      headerName: 'Product group ID',
      width: 300,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'name',
      headerName: 'Product group name',
      width: 400,
      align: 'left',
      headerAlign: 'center',
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      align: 'center',
      headerAlign: 'center',
    },
  ]

  const content = listProductGroup.map((item, index) => {
    return {
      stt: index + 1,
      id: item?.id,
      name: item?.name,
      status: item?.hidden ? 'Banned' : 'Active',
    }
  })

  const action = [
    {
      headerName: 'Action',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      renderCell: (props) => {
        return (
          <div className="cellAction">
            <Link to={`/productGroup/view/${props.id}`} style={{ textDecoration: 'none' }}>
              <div className="viewButton">
                <FaEye />
              </div>
            </Link>
            <Link to={`/productGroup/update/${props.id}`} style={{ textDecoration: 'none' }}>
              <div className="updateButton">
                <FaPen />
              </div>
            </Link>
          </div>
        )
      },
    },
  ]

  return (
    <div className="productGroup">
      <Sidebar />
      <div className="productGroupContainer">
        <Navbar />
        <div className="productGroupBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/productGroup">Product group</a>
          </div>
          <div className="template">
            <div className="datatable">
              <Tab
                rows={content}
                columns={header.concat(action)}
                pageSize={10}
                rowsPerPageOptions={[10]}
                style={{
                  backgroundColor: '#fff',
                  fontSize: '0.8rem',
                }}
              />
            </div>
          </div>
          <div className="productGroupFooter">
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

export default ProductGroupComponent
