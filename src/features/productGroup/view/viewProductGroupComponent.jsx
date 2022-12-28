import './viewProductGroupStyle.scss'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProductGroup } from '../../../apis/productGroupApi'
import { FaArrowCircleLeft } from 'react-icons/fa'

const ProductGroupComponent = () => {
  const [productGroup, setProductGroup] = useState()
  const { productGroupId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const handleGetProductGroup = async () => {
      const resp = await getProductGroup(productGroupId)
      const data = resp?.data?.data
      setProductGroup([data])
    }
    handleGetProductGroup()
  }, [productGroupId])
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
                        disabled
                        className="textField"
                        id="name"
                        value={category?.name}
                        name="name"
                      />
                    </div>
                    <div className="form">
                      <label className="title" for="status">
                        Status
                      </label>
                      <TextField
                        disabled
                        className="textField"
                        id="status"
                        value={category?.hidden ? 'Banned' : 'Active'}
                        name="status"
                      ></TextField>
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
            <a href=" ">Product group detail</a>
          </div>

          <div className="updateProductGroupForm">
            <div style={{ width: '100%', padding: '0.4rem' }}>
              {productGroup && productGroup.map((c) => renderChildren(c))}
            </div>
          </div>

          <div className="updateProductGroupFooter">
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

export default ProductGroupComponent
