import './viewProductStyle.scss'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProduct } from '../../../apis/productApi'
import { Image } from 'antd'
import { formatNumber } from '../../../utils/functionHelper'
import { FaArrowCircleLeft } from 'react-icons/fa'

const ProductComponent = () => {
  const [product, setProduct] = useState()
  const { productId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const handleGetProduct = async () => {
      const resp = await getProduct(productId)
      const data = resp?.data?.data
      setProduct(data)
    }
    handleGetProduct()
  }, [productId])

  return (
    <div className="viewProduct">
      <Sidebar />
      <div className="viewProductContainer">
        <Navbar />
        <div className="viewProductBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/product">Product</a>/ <a href=" ">Product detail</a>
          </div>
          <div className="viewProductForm">
            <div style={{ width: '100%', padding: '0.4rem' }}>
              <div className="level0">
                <label className="levelHeader">{product?.name}</label>
                <Grid container spacing={0} alignItems="flex-start" alignContent="space-around">
                  <div className="form">
                    <label className="title" for="productCode">
                      Product ID
                    </label>
                    <TextField
                      disabled
                      className="textField"
                      id="productCode"
                      value={product?.id}
                    />
                  </div>
                  <div className="form" style={{ width: '64%' }}>
                    <label className="title" for="name">
                      Product name
                    </label>
                    <TextField
                      disabled
                      className="textField"
                      id="productName"
                      value={product?.name}
                    />
                  </div>
                  <div className="form">
                    <label className="title" for="product type">
                      Product type
                    </label>
                    <TextField
                      disabled
                      className="textField"
                      id="product"
                      value={product?.category?.name}
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
                      value={product?.hidden ? 'Banned' : 'Active'}
                    />
                  </div>
                </Grid>
              </div>
              <div className="descriptionForm">
                <label className="descriptionTitle" for="name">
                  Description
                </label>
                <TextareaAutosize
                  disabled
                  className="description"
                  aria-label="maximum height"
                  id="description"
                  value={product?.description}
                />
              </div>
              {product?.tierVariations &&
                product?.tierVariations.map((item) => (
                  <div>
                    <Accordion className="groupParent">
                      <AccordionSummary className="headerGroup">
                        <Typography className="titleGroup">{item}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {product?.variations &&
                          product?.variations?.map((item1) => (
                            <Accordion className="group">
                              <AccordionSummary className="headerGroup">
                                <Typography className="titleGroup">
                                  {item1?.variationName}
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography>
                                  <Grid
                                    container
                                    spacing={0}
                                    alignItems="flex-start"
                                    alignContent="space-around"
                                  >
                                    <div className="level">
                                      <div className="form">
                                        <label className="title" for="variationID">
                                          Variation ID
                                        </label>
                                        <TextField
                                          disabled
                                          className="textField"
                                          id="variationID"
                                          value={item1?.id}
                                        />
                                      </div>
                                      <div className="form">
                                        <label className="title" for="variationName">
                                          Variation name
                                        </label>
                                        <TextField
                                          disabled
                                          className="textField"
                                          id="variationName"
                                          value={item1?.variationName}
                                        />
                                      </div>
                                      <div className="form">
                                        <label className="title" for="price">
                                          Price
                                        </label>
                                        <TextField
                                          disabled
                                          className="textField"
                                          id="price"
                                          value={formatNumber(item1?.price)}
                                        />
                                      </div>
                                      <div className="form">
                                        <label className="title" for="discount">
                                          Discount
                                        </label>
                                        <TextField
                                          disabled
                                          className="textField"
                                          id="discount"
                                          value={item1?.discount}
                                        />
                                      </div>
                                      <div className="form">
                                        <label className="title" for="availableQuantity">
                                          Available quantity
                                        </label>
                                        <TextField
                                          disabled
                                          className="textField"
                                          id="availableQuantity"
                                          value={item1?.availableQuantity}
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
                                          value={item1?.status}
                                        />
                                      </div>
                                    </div>
                                  </Grid>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                          ))}
                      </AccordionDetails>
                    </Accordion>
                  </div>
                ))}
              <div className="avatar">
                <label className="titleAvatar">Avatar</label>
                <div className="imageAvatar">
                  <img src={product?.avatar} height="200rem" style={{ margin: '0.06rem' }} />
                </div>
              </div>
              {product?.images?.length > 0 && (
                <Accordion className="groupParent">
                  <AccordionSummary className="headerGroup">
                    <Typography className="titleGroup">Images</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}
                      >
                        <Grid
                          xs={6}
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                          }}
                        >
                          {product?.images?.map((item) => (
                            <Image
                              preview={false}
                              src={item?.url}
                              style={{
                                width: '12rem',
                                height: '12rem',
                                border: '0.08rem solid #955b36',
                                margin: '1rem',
                              }}
                            />
                          ))}
                        </Grid>
                      </div>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              )}
            </div>
          </div>
          <div className="viewProductFooter">
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

export default ProductComponent
