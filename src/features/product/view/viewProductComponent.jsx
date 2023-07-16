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
import { formatMoney } from '../../../utils/functionHelper'
import { FaArrowCircleLeft } from 'react-icons/fa'

const ProductComponent = () => {
  const [product, setProduct] = useState()
  const { productId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const handleGetProduct = async () => {
      try {
        const resp = await getProduct(productId)
        const data = resp?.data?.data
        setProduct(data)
      } catch (error) {
        if (error?.response?.status === 403) {
          navigate('/error')
        }
      }
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
              <div className="detail">
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
                  maxRows={5}
                  className="description"
                  aria-label="maximum height"
                  id="description"
                  value={product?.description}
                />
              </div>

              <div className="groupGroup">
                <label className="title">Option</label>
                <div className="option">
                  {product?.options?.map((option, x) => (
                    <AccordionDetails>
                      <Accordion className="groupParent">
                        <AccordionSummary className="headerParent">
                          <Typography className="titleParent">{option?.optionName}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {option?.optionValues?.map((value, y) => (
                            <AccordionDetails>
                              <Accordion className="group">
                                <AccordionDetails>
                                  <Typography>
                                    <Grid
                                      container
                                      spacing={0}
                                      alignItems="flex-start"
                                      alignContent="space-around"
                                    >
                                      <div className="form">
                                        <label className="title" for="value">
                                          Option value
                                        </label>
                                        <TextField
                                          disabled
                                          className="textField"
                                          id="value"
                                          value={value.value}
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
                                          value={value.hidden ? 'Banned' : 'Active'}
                                        />
                                      </div>
                                    </Grid>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                            </AccordionDetails>
                          ))}
                        </AccordionDetails>
                      </Accordion>
                    </AccordionDetails>
                  ))}
                </div>
              </div>

              <div className="groupGroup">
                <label className="title">Variation</label>
                <div className="variation">
                  {product?.variations &&
                    product?.variations?.map((variation, a) => (
                      <AccordionDetails>
                        <Accordion className="groupParent">
                          <AccordionSummary className="headerParent">
                            <Typography className="titleParent">{variation?.name}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <AccordionDetails>
                              <Accordion className="group">
                                <AccordionDetails>
                                  <Typography>
                                    <Grid
                                      container
                                      spacing={0}
                                      alignItems="flex-start"
                                      alignContent="space-around"
                                    >
                                      <div className="form">
                                        <label className="title" for="name">
                                          Name
                                        </label>
                                        <TextField
                                          disabled
                                          className="textField"
                                          id="name"
                                          value={formatMoney(variation?.name)}
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
                                          value={formatMoney(variation?.price)}
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
                                          value={formatMoney(variation?.discount)}
                                        />
                                      </div>
                                      <div className="form">
                                        <label className="title" for="priceAfterDiscount">
                                          Price after discount
                                        </label>
                                        <TextField
                                          disabled
                                          className="textField"
                                          id="priceAfterDiscount"
                                          value={formatMoney(variation?.priceAfterDiscount)}
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
                                          value={variation?.hidden ? 'Banned' : 'Active'}
                                        />
                                      </div>
                                    </Grid>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                            </AccordionDetails>
                          </AccordionDetails>
                        </Accordion>
                      </AccordionDetails>
                    ))}
                </div>
              </div>
            </div>

            <div className="avatar">
              <label className="titleAvatar">Avatar</label>
              <div className="imageAvatar">
                <img src={product?.avatar} alt="" height="200rem" style={{ margin: '0.06rem' }} />
              </div>
            </div>

            {product?.images?.length > 0 && (
              <Accordion className="groupParent">
                <AccordionSummary className="headerParent">
                  <Typography className="titleParent">Images</Typography>
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
                              border: '0.08rem solid #48647f',
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
