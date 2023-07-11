import './importWarehouseStyle.scss'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../../components/sidebar/Sidebar'
import Navbar from '../../../components/navbar/Navbar'
import { Autocomplete, Button, Grid, MenuItem, Select, TextField } from '@mui/material'
import { FaArrowCircleLeft, FaRegPlusSquare, FaTimesCircle } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { getListProductSearch, getProduct } from '../../../apis/productApi'
import { DataGrid } from '@mui/x-data-grid'
import styled from 'styled-components'
import { formatMoney, formatNumber } from '../../../utils/functionHelper'
import { importWarehouse } from '../../../apis/warehouseApi'
import { toast } from 'react-toastify'
import _ from 'lodash-es'

const ImportWarehouseComponent = () => {
  const navigate = useNavigate()
  const [listProduct, setListProduct] = useState([]) //lấy danh sách sản phẩm
  const [productId, setProductId] = useState(null) //lấy id sản phẩm
  const [selected, setSelected] = useState(null) //lấy thông tin sản phẩm đã chọn
  const [variation, setVariation] = useState(null) //lấy thông tin thuộc tính
  const [quantity, setQuantity] = useState(null)
  const [warehouse, setWarehouse] = useState([])

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
      field: 'idProduct',
      headerName: 'Product ID',
      width: 120,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'productName',
      headerName: 'Product name',
      width: 400,
      align: 'left',
      headerAlign: 'center',
    },
    {
      field: 'id',
      headerName: 'Variation ID',
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'variationName',
      headerName: 'Variation',
      width: 180,
      align: 'left',
      headerAlign: 'center',
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
      align: 'right',
      headerAlign: 'center',
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 80,
      align: 'right',
      headerAlign: 'center',
    },
  ]

  const content = warehouse.map((item, index) => {
    return {
      stt: index + 1,
      idProduct: item?.id || 2,
      productName: item?.name,
      id: item?.variation?.id || 2,
      variationName: item?.variation?.name,
      price: formatMoney(item?.variation?.price),
      quantity: formatNumber(item?.quantity),
    }
  })

  const actionButton = [
    {
      headerName: 'Action',
      width: 80,
      align: 'center',
      headerAlign: 'center',
      renderCell: (props) => {
        return (
          <div className="cellAction">
            <div className="deleteButton">
              <FaTimesCircle onClick={() => handleDelete(props.id)} />
            </div>
          </div>
        )
      },
    },
  ]

  const [sortModel, setSortModel] = useState([
    {
      field: 'idProduct',
      sort: 'asc',
    },
  ])

  const onChange = (event, params) => {
    setSelected(params)
    setProductId(params.id)
  }

  const handleChangeVariation = (event) => {
    setVariation(event?.target?.value)
  }

  const handleChangeQuantity = (event) => {
    setQuantity(event?.target?.value)
  }

  const handleAddProduct = async () => {
    const newWarehouse = { ...selected, variation, quantity: +quantity }
    const existProduct = warehouse?.findIndex(
      (product) => product?.variation?.id === newWarehouse?.variation?.id,
    )

    // Khi da co sp trong list
    if (existProduct !== -1) {
      warehouse[existProduct].quantity += newWarehouse?.quantity
    }
    // Khi chua co sp trong list
    else if (quantity > 0) {
      setWarehouse([...warehouse, newWarehouse])
    }
    setSelected(null)
    setQuantity(null)
  }

  const handleImport = async () => {
    const list = warehouse?.map((value, index) => {
      return {
        idProduct: value.id,
        inventories: [
          {
            idVariation: value.variation.id,
            quantity: value.quantity,
          },
        ],
      }
    })
    const result = _(list)
      .groupBy('idProduct')
      .map((g) =>
        _.mergeWith({}, ...g, (obj, src) => (_.isArray(obj) ? obj.concat(src) : undefined)),
      )
      .value()
    if (result?.length > 0) {
      try {
        await importWarehouse({ inventories: result })
        toast.success('Import product successful!', style)
        setTimeout(() => {
          navigate('/warehouse')
        }, 2000)
      } catch (error) {
        toast.error('Update failed!', style)
      }
    }
  }

  const handleDelete = (tmp) => {
    const proIndex = warehouse?.findIndex((item) => item?.variation?.id === tmp)
    warehouse.splice(proIndex, 1)
    setWarehouse([...warehouse])
  }

  useEffect(() => {
    const handleListProduct = async () => {
      const resp = await getListProductSearch()
      const list = resp?.data?.data
      setListProduct(list?.filter((item) => item?.id)?.filter((item) => item?.name))
    }
    handleListProduct()
  }, [])

  useEffect(() => {
    const handleGetProduct = async () => {
      if (productId) {
        const resp = await getProduct(productId)
        const data = resp?.data?.data
        setSelected(data)
      }
    }
    handleGetProduct()
  }, [productId])

  return (
    <div className="importWarehouse">
      <Sidebar />
      <div className="importWarehouseContainer">
        <Navbar />
        <div className="importWarehouseBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/warehouse">Warehouse</a>/ <a href=" ">Import product</a>
          </div>
          <div className="importWarehouseForm">
            <div style={{ width: '100%' }}>
              <div className="product">
                <Grid container spacing={0} alignItems="flex-start" alignContent="space-around">
                  <div className="form">
                    <label className="title" for="productId">
                      Product ID
                    </label>
                    {selected ? (
                      <TextField
                        id="productId"
                        className="textField"
                        value={selected?.id ? selected?.id : ''}
                        onClick={onChange}
                      />
                    ) : (
                      <Autocomplete
                        disablePortal
                        className="textField"
                        id="productId"
                        options={listProduct || []}
                        getOptionLabel={(option) => option.id}
                        renderInput={(params) => <TextField {...params} />}
                        onChange={onChange}
                      />
                    )}
                  </div>
                  <div className="form">
                    <label className="title" for="productName">
                      Product name
                    </label>

                    {selected ? (
                      <TextField
                        id="productName"
                        className="textField"
                        value={selected?.name ? selected?.name : ''}
                        onClick={onChange}
                      />
                    ) : (
                      <Autocomplete
                        disablePortal
                        className="textField"
                        id="product"
                        options={listProduct || []}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} />}
                        onChange={onChange}
                      />
                    )}
                  </div>

                  <div className="form">
                    <label className="title" for="variation">
                      Variation
                    </label>
                    <Select
                      className="select"
                      id="variation"
                      name="variation"
                      value={variation ? variation : ''}
                      onChange={handleChangeVariation}
                    >
                      {selected &&
                        selected?.variations?.map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item?.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </div>

                  <div className="form">
                    <label className="title" for="quantity">
                      Quantity
                    </label>
                    <TextField
                      className="textField"
                      id="quantity"
                      name="quantity"
                      value={quantity ? quantity : ''}
                      onChange={handleChangeQuantity}
                    />
                    {selected && (
                      <label className="stockSum">
                        Available quantity: {variation?.availableQuantity}
                      </label>
                    )}
                  </div>
                </Grid>
              </div>
              <Button
                className="addButton"
                startIcon={<FaRegPlusSquare color="#fff" size={'1rem'} />}
                onClick={(e) => handleAddProduct(e?.target?.value)}
              >
                Add
              </Button>
              {warehouse && (
                <div className="template">
                  <div className="datatable">
                    <Tab
                      sortModel={sortModel}
                      rows={content}
                      columns={header.concat(actionButton)}
                      pageSize={5}
                      rowsPerPageOptions={[10]}
                      style={{
                        backgroundColor: '#fff',
                        fontSize: '0.8rem',
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="importWarehouseFooter">
            <Button
              className="importButton"
              startIcon={<FaRegPlusSquare color="#fff" size={'1rem'} />}
              onClick={(e) => handleImport()}
            >
              Save
            </Button>
            <Button
              startIcon={<FaArrowCircleLeft color="#fff" size={'1rem'} />}
              className="backButton"
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
    fontSize: '0.8rem',
  },
})

export default ImportWarehouseComponent
