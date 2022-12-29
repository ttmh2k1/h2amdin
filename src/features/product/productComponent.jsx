import './productStyle.scss'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { DataGrid } from '@mui/x-data-grid'
import { FaArrowCircleLeft, FaEye, FaLock, FaPen, FaPlusCircle, FaTrashAlt } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getListProduct } from '../../apis/productApi'
import { Button } from '@mui/material'

const ProductComponent = () => {
  const [listProduct, setListProduct] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const handleListProduct = async () => {
      const resp = await getListProduct()
      const list = resp?.data?.data
      setListProduct(list)
    }
    handleListProduct()
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
      headerName: 'Product ID',
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'name',
      headerName: 'Product name',
      width: 600,
      align: 'left',
      headerAlign: 'center',
    },
    {
      field: 'groupName',
      headerName: 'Group name',
      width: 150,
      align: 'left',
      headerAlign: 'center',
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 80,
      align: 'center',
      headerAlign: 'center',
    },
  ]

  const content = listProduct.map((item, index) => {
    return {
      stt: index + 1,
      id: item?.id,
      name: item?.name,
      groupName: item?.category.name,
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
            <Link to={`/product/view/${props.id}`} style={{ textDecoration: 'none' }}>
              <div className="viewButton">
                <FaEye />
              </div>
            </Link>
            <Link to={`/product/update/${props.id}`} style={{ textDecoration: 'none' }}>
              <div className="updateButton">
                <FaPen />
              </div>
            </Link>
            <div className="disableButton">
              <FaLock />
            </div>
            <div className="deleteButton">
              <FaTrashAlt />
            </div>
          </div>
        )
      },
    },
  ]

  return (
    <div className="product">
      <Sidebar />
      <div className="productContainer">
        <Navbar />
        <div className="productBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/product">Product</a>
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
          <div className="productFooter">
            <Button
              className="createButton"
              startIcon={<FaPlusCircle color="#fff" size={'1rem'} />}
              onClick={() => navigate('/product/create')}
            >
              New
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

export default ProductComponent
