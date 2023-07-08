import './updateProductGroupStyle.scss'
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
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProductGroup, updateProductGroup } from '../../../apis/productGroupApi'
import { FaArrowCircleLeft, FaSave } from 'react-icons/fa'
import { toast } from 'react-toastify'

const ProductGroupComponent = () => {
  //truyền data cho các thằng con
  const [data, setData] = useState()
  const [orgData, setOrgData] = useState()
  const params = useParams()
  const productGroupId = params.productGroupId
  const navigate = useNavigate()

  //xử lý data
  useEffect(() => {
    const handleGetProductGroup = async () => {
      const resp = await getProductGroup(productGroupId)
      const x = resp?.data?.data
      setData([x])
      setOrgData([JSON.parse(JSON.stringify(x))])
    }
    handleGetProductGroup()
  }, [])

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

  const handleUpdate = async (category, orgCategory) => {
    try {
      save(category, orgCategory)
      toast.success('Update successfully!', style)
      setTimeout(() => {
        navigate('/productGroup')
      }, 2000)
    } catch (error) {
      toast.error('Update failed!', style)
    }
  }

  const save = (category, orgCategory) => {
    for (let i = 0; i < category.length; i++) {
      let modified = distinct(orgCategory[i], category[i])
      if (modified) {
        updateProductGroup(category[i].id, modified)
      }
    }

    for (let i = 0; i < category.length; i++) {
      if (category[i].children) {
        save(category[i].children, orgCategory[i].children)
      }
    }
  }

  const distinct = (org, modify) => {
    let tmp = {}
    if (org.name !== modify.name) {
      tmp['name'] = modify.name
    }
    if (org.idParent !== modify.idParent) {
      tmp['idParent'] = modify.idParent
    }
    if (org.hidden !== modify.hidden) {
      tmp['isHidden'] = modify.hidden
    }
    if (Object.keys(tmp).length !== 0) return tmp
  }

  const handleModifiedData = (id, event) => {
    let tmp = [...data]

    if (event.target.name === 'name') findById(id, tmp).name = event.target.value
    else if (event.target.name === 'status') findById(id, tmp).hidden = event.target.value

    setData([...tmp])
  }

  const findById = (id, categories) => {
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].id === id) {
        return categories[i]
      }
    }

    for (let i = 0; i < categories.length; i++) {
      if (categories[i].children) {
        let tmp = findById(id, categories[i].children)
        if (tmp) {
          return tmp
        }
      }
    }
  }

  const renderChildren = (category) => {
    if (category) {
      return (
        <div>
          <Accordion className="group">
            <AccordionSummary className="headerGroup">
              <Typography className="titleGroup">{category?.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <Grid container spacing={0} alignItems="flex-start" alignContent="space-around">
                  <div className="level">
                    <div className="form">
                      <label className="title" for="productGroupCode">
                        Product group code
                      </label>
                      <TextField
                        disabled
                        className="textField"
                        id="productGroup"
                        value={category?.id}
                      />
                    </div>
                    <div className="form">
                      <label className="title" for="name">
                        Product group name
                      </label>
                      <TextField
                        className="textField"
                        id="name"
                        defaultValue={category?.name}
                        value={category?.name}
                        name="name"
                        onChange={(event) => handleModifiedData(category.id, event)}
                      />
                    </div>
                    <div className="form">
                      <label className="title" for="status">
                        Status
                      </label>
                      <Select
                        className="select"
                        id="status"
                        defaultValue={category?.hidden}
                        value={category?.hidden}
                        name="status"
                        onChange={(event) => handleModifiedData(category.id, event)}
                      >
                        {arrayStatus?.map((y, y1) => (
                          <MenuItem key={y1} value={y?.value}>
                            {y?.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                </Grid>
              </Typography>
            </AccordionDetails>
            {category.children && category.children.map((c) => renderChildren(c))}
          </Accordion>
        </div>
      )
    } else return null
  }

  return (
    <div className="updateProductGroup">
      <Sidebar />
      <div className="updateProductGroupContainer">
        <Navbar />
        <div className="updateProductGroupBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/productGroup">Product group</a>/{' '}
            <a href=" ">Update product group</a>
          </div>

          <div className="updateProductGroupForm">
            <div style={{ width: '100%', padding: '0.4rem' }}>
              {data && data.map((c) => renderChildren(c))}
            </div>
          </div>

          <div className="updateProductGroupFooter">
            <Button
              className="saveButton"
              startIcon={<FaSave color="#fff" size={'1rem'} />}
              onClick={() => handleUpdate(data, orgData)}
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

const arrayStatus = [
  { name: 'Active', value: false },
  { name: 'Banned', value: true },
]

export default ProductGroupComponent
