import './productStyle.scss'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { DataGrid } from '@mui/x-data-grid'
import {
  FaAngleDown,
  FaArrowCircleLeft,
  FaEye,
  FaLock,
  FaPen,
  FaPlusCircle,
  FaTrashAlt,
  FaUnlock,
} from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { deleteProduct, getListProduct, updateStatusProduct } from '../../apis/productApi'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { toast } from 'react-toastify'

const ProductComponent = () => {
  const navigate = useNavigate()
  const [searchName, setSearchName] = useState('')
  const [status, setStatus] = useState('')
  const [listProduct, setListProduct] = useState({
    loading: true,
    rows: [],
    totalRows: 0,
    rowsPerPageOptions: [10, 20, 50],
    pageSize: 10,
    page: 1,
  })

  const style = {
    position: 'bottom-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  }

  const handleDisable = async (id) => {
    try {
      var transform = new FormData()
      const blob = new Blob(['{"isHidden": true}'], {
        type: 'application/json',
      })
      transform.append('info', blob)
      await updateStatusProduct(id, transform)
      toast.success('Disable product successful!', style)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      toast.error(error?.response?.data?.message, style)
    }
  }

  const handleEnable = async (id) => {
    try {
      var transform = new FormData()
      const blob = new Blob(['{"isHidden": false}'], {
        type: 'application/json',
      })
      transform.append('info', blob)

      await updateStatusProduct(id, transform)
      toast.success('Enable product successful!', style)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      toast.error(error?.response?.data?.message, style)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id)
      toast.success('Delete product successfull!', style)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      toast.error(error?.response?.data?.message, style)
    }
  }

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
              {props?.row?.hidden === false ? (
                <FaLock onClick={() => handleDisable(props.id)} />
              ) : (
                <FaUnlock onClick={() => handleEnable(props.id)} />
              )}
            </div>
            <div className="deleteButton">
              <FaTrashAlt onClick={() => handleDelete(props.id)} />
            </div>
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
      renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,
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
      width: 550,
      align: 'left',
      headerAlign: 'center',
    },
    {
      field: 'groupName',
      headerName: 'Group name',
      width: 150,
      align: 'left',
      headerAlign: 'center',
      renderCell: (params) => `${params?.row?.category?.name}`,
    },
    {
      field: 'hidden',
      headerName: 'Status',
      width: 80,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => `${params?.row?.hidden ? 'Hidden' : 'Active'}`,
    },
  ]

  const updateData = (k, v) => setListProduct((prev) => ({ ...prev, [k]: v }))

  useEffect(() => {
    updateData('loading', true)
    const handleGetProduct = async () => {
      try {
        await getListProduct({
          page: listProduct.page,
          size: listProduct.pageSize,
          sortBy: 8,
          sortDescending: true,
          searchName: searchName,
          status: status,
        }).then((resp) => {
          setListProduct({
            ...listProduct,
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
    handleGetProduct()
  }, [listProduct?.page, listProduct?.pageSize, searchName, status])

  return (
    <div className="product">
      <Sidebar />
      <div className="productContainer">
        <Navbar />
        <div className="productBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/product">Product</a>
          </div>

          <div className="search">
            <Accordion style={{ borderRadius: '0.4vw' }}>
              <AccordionSummary
                expandIcon={<FaAngleDown />}
                style={{ margin: '0' }}
                id="panel1a-header"
              >
                <Typography style={{ padding: '0' }}>Search</Typography>
              </AccordionSummary>
              <AccordionDetails style={{ padding: 0 }}>
                <Typography>
                  <div style={{ width: '100%' }}>
                    <Grid container spacing={0} alignItems="flex-start" alignContent="space-around">
                      <div className="form">
                        <label className="title" for="searchName">
                          Name
                        </label>
                        <TextField
                          className="textField"
                          id="searchName"
                          onChange={(e) => {
                            setSearchName(e?.target?.value)
                          }}
                        />
                      </div>
                      <div className="form">
                        <label className="title" for="status">
                          Status
                        </label>
                        <Select
                          className="select"
                          id="status"
                          onChange={(e) => {
                            setStatus(e?.target?.value)
                          }}
                        >
                          {arrayStatus?.map((item, index) => (
                            <MenuItem key={index} value={item?.value}>
                              {item?.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                    </Grid>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>

          <div className="template">
            <div className="datatable">
              <Tab
                rows={listProduct.rows}
                columns={header.concat(action)}
                paginationMode="server"
                loading={listProduct.loading}
                rowCount={listProduct.totalRows}
                page={listProduct.page - 1}
                pageSize={listProduct.pageSize}
                rowsPerPageOptions={listProduct.rowsPerPageOptions}
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

const arrayStatus = [
  { name: 'Active', value: 'ACTIVE' },
  { name: 'Hidden', value: 'HIDDEN' },
]

export default ProductComponent
