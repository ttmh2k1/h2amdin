import './voucherStyle.scss'
import styled from 'styled-components'
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
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { deleteVoucher, getListVoucher, updateVoucher } from '../../apis/voucherApi'
import moment from 'moment'
import { formatMoney } from '../../utils/functionHelper'
import { toast } from 'react-toastify'

const VoucherComponent = () => {
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [description, setDescription] = useState('')
  const [discountType, setDiscountType] = useState('')
  const [isActive, setIsActive] = useState('')
  const [validFrom, setValidFrom] = useState('')
  const [validTo, setValidTo] = useState('')

  const [listVoucher, setListVoucher] = useState({
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

  const handleDelete = async (id) => {
    try {
      await deleteVoucher(id)
      toast.success('Delete voucher successfull!', style)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      toast.error(error?.response?.data?.message, style)
    }
  }

  const actionColumn = [
    {
      headerName: 'Action',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (props) => {
        return (
          <div className="cellAction">
            <Link to={`/voucher/view/${props.id}`} style={{ textDecoration: 'none' }}>
              <div className="viewButton">
                <FaEye />
              </div>
            </Link>
            <Link to={`/voucher/update/${props.id}`} style={{ textDecoration: 'none' }}>
              <div className="updateButton">
                <FaPen />
              </div>
            </Link>
            <div className="disableButton">
              {props?.row?.isActive === true ? (
                <FaLock
                  onClick={() => {
                    moment(props?.row?.validTo).format() < moment().format()
                      ? toast.error("Can't disable voucher!", style)
                      : handleDisable(props.id)
                  }}
                />
              ) : (
                <FaUnlock
                  onClick={() => {
                    moment(props?.row?.validTo).format() < moment().format()
                      ? toast.error("Can't anable voucher!", style)
                      : handleEnable(props.id)
                  }}
                />
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

  const voucherHeader = [
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
      headerName: 'Voucher ID',
      width: 80,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'code',
      headerName: 'Code',
      width: 120,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 170,
      align: 'left',
      headerAlign: 'center',
    },
    {
      field: 'discountAmount',
      headerName: 'Discount amount',
      width: 120,
      align: 'right',
      headerAlign: 'center',
      renderCell: (params) =>
        `${
          params?.row?.discountType === 'PERCENT'
            ? params?.row?.discountAmount + '%'
            : formatMoney(params?.row?.discountAmount) + 'VND'
        }`,
    },
    {
      field: 'usedLimit',
      headerName: 'Limit',
      width: 80,
      align: 'right',
      headerAlign: 'center',
    },
    {
      field: 'validFrom',
      headerName: 'Start date',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => `${moment(params?.row?.validFrom).format('YYYY-MM-DD hh:mm')}`,
    },
    {
      field: 'validTo',
      headerName: 'End date',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => `${moment(params?.row?.validTo).format('YYYY-MM-DD hh:mm')}`,
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 80,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => `${params?.row?.isActive ? 'Available' : 'Unavailable'}`,
    },
  ]

  const updateData = (k, v) => setListVoucher((prev) => ({ ...prev, [k]: v }))

  useEffect(() => {
    const handleGetVoucher = async () => {
      try {
        await getListVoucher({
          page: listVoucher.page,
          size: listVoucher.pageSize,
          sortBy: 1,
          sortDescending: true,
          code: code,
          description: description,
          discountType: discountType,
          isActive: isActive,
          validFrom: validFrom,
          validTo: validTo,
        }).then((resp) => {
          setListVoucher({
            ...listVoucher,
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
    handleGetVoucher()
  }, [code, description, discountType, isActive, validFrom, validTo])

  const handleDisable = async (id) => {
    try {
      await updateVoucher(id, { isActive: false })
      toast.success('Disable voucher successful!', style)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      toast.error('Disable voucher failed!', style)
    }
  }

  const handleEnable = async (id) => {
    try {
      await updateVoucher(id, { isActive: true })
      toast.success('Enable voucher successful!', style)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      toast.error('Enable voucher failed!', style)
    }
  }

  return (
    <div className="voucher">
      <Sidebar />
      <div className="voucherContainer">
        <Navbar />
        <div className="voucherBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/voucher">Voucher</a>
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
                        <label className="title" for="code">
                          Code
                        </label>
                        <TextField
                          className="textField"
                          id="fullname"
                          onChange={(e) => {
                            setCode(e?.target?.value)
                          }}
                        />
                      </div>
                      <div className="form">
                        <label className="title" for="description">
                          Description
                        </label>
                        <TextField
                          className="textField"
                          id="description"
                          onChange={(e) => {
                            setDescription(e?.target?.value)
                          }}
                        />
                      </div>
                      <div className="form">
                        <label className="title" for="discountType">
                          Discount type
                        </label>
                        <Select
                          className="select"
                          id="discountType"
                          onChange={(e) => {
                            setDiscountType(e?.target?.value)
                          }}
                        >
                          {arrayDiscountType?.map((item, index) => (
                            <MenuItem key={index} value={item?.value}>
                              {item?.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                      <div className="form">
                        <label className="title" for="validFrom">
                          Start date
                        </label>
                        <TextField
                          isrequired
                          className="textField"
                          id="validFrom"
                          type="datetime-local"
                          onChange={(e) => setValidFrom(moment(e?.target?.value).format())}
                        />
                      </div>
                      <div className="form">
                        <label className="title" for="validTo">
                          End date
                        </label>
                        <TextField
                          isrequired
                          className="textField"
                          id="validTo"
                          type="datetime-local"
                          onChange={(e) => setValidTo(moment(e?.target?.value).format())}
                        />
                      </div>
                      <div className="form">
                        <label className="title" for="isActive">
                          Status
                        </label>
                        <Select
                          className="select"
                          id="isActive"
                          onChange={(e) => {
                            setIsActive(e?.target?.value)
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
                rows={listVoucher.rows}
                columns={voucherHeader.concat(actionColumn)}
                paginationMode="server"
                loading={listVoucher.loading}
                rowCount={listVoucher.totalRows}
                page={listVoucher.page - 1}
                pageSize={listVoucher.pageSize}
                rowsPerPageOptions={listVoucher.rowsPerPageOptions}
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
          <div className="voucherFooter">
            <Button
              className="createButton"
              startIcon={<FaPlusCircle color="#fff" size={'1rem'} />}
              onClick={() => navigate('/voucher/create')}
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
  { name: 'Available', value: true },
  { name: 'Unavailable', value: false },
]

const arrayDiscountType = [
  { name: 'Percent', value: 'PERCENT' },
  { name: 'Amount', value: 'AMOUNT' },
]

export default VoucherComponent
