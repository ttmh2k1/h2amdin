import './voucherStyle.scss'
import styled from 'styled-components'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { DataGrid } from '@mui/x-data-grid'
import { FaArrowCircleLeft, FaEye, FaPen, FaPlusCircle, FaTrashAlt } from 'react-icons/fa'
import { Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { deleteVoucher, getListVoucher } from '../../apis/voucherApi'
import moment from 'moment'
import { formatMoney } from '../../utils/functionHelper'
import { toast } from 'react-toastify'

const VoucherComponent = () => {
  const navigate = useNavigate()
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
      toast.error('Delete voucher failed!', style)
    }
  }

  const actionColumn = [
    {
      headerName: 'Action',
      width: 100,
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
      width: 150,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 200,
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
      renderCell: (params) => `${moment(params?.row?.validFrom).format('LLL')}`,
    },
    {
      field: 'validTo',
      headerName: 'End date',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => `${moment(params?.row?.validTo).format('LLL')}`,
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => `${params?.row?.isActive ? 'Anable' : 'Unnable'}`,
    },
  ]

  const updateData = (k, v) => setListVoucher((prev) => ({ ...prev, [k]: v }))

  useEffect(() => {
    getListVoucher({
      page: listVoucher.page,
      size: listVoucher.pageSize,
      sortBy: 1,
      sortDescending: true,
    }).then((resp) => {
      setListVoucher({
        ...listVoucher,
        loading: false,
        rows: resp?.data?.data,
        totalRows: resp?.data?.totalElement,
      })
    })
  }, [])

  return (
    <div className="voucher">
      <Sidebar />
      <div className="voucherContainer">
        <Navbar />
        <div className="voucherBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/voucher">Voucher</a>
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

export default VoucherComponent
