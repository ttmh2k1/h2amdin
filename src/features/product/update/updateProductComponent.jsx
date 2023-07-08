/* eslint-disable jsx-a11y/alt-text */
import './updateProductStyle.scss'
import { useEffect, useState } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import { ProductDetail } from '../update/detail'
import { ProductOption } from '../create/option'
import { ProductVariation } from '../create/variation'
import { FaArrowCircleLeft, FaRegTimesCircle, FaSave, FaUpload } from 'react-icons/fa'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Typography,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import {
  createProductImage,
  createProductVariation,
  deleteProductImages,
  getProduct,
  updateProduct,
  updateProductOptionValue,
  updateProductVariation,
} from '../../../apis/productApi'
import { toast } from 'react-toastify'

const ProductComponent = () => {
  const [product, setProduct] = useState()
  const [orgProduct, setOrgProduct] = useState()
  const { productId } = useParams()
  const [avatar, setAvatar] = useState()
  const [images, setImages] = useState([])
  const [imageList, setImageList] = useState([])
  const [defaultImages, setDefaultImage] = useState([])
  const [imageDel, setImageDel] = useState([null])
  const navigate = useNavigate()

  useEffect(() => {
    const handleGetProduct = async () => {
      const resp = await getProduct(productId)
      const data = resp?.data?.data
      setProduct(data)
      setOrgProduct(structuredClone(data))
      setDefaultImage(data.images)
    }
    handleGetProduct()
  }, [productId])

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

  const onSelectAvatar = (event) => {
    const avatarFile = event.target.files[0]
    avatarFile.preview = URL.createObjectURL(avatarFile)
    setAvatar(avatarFile)
  }

  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview)
    }
  }, [avatar])

  const onSelectImages = (event) => {
    const imageFile = event.target.files
    const selectedFile = Array.from(imageFile)
    const imageArray = selectedFile.map((file) => {
      return URL.createObjectURL(file)
    })
    setImages((previousImages) => previousImages.concat(imageArray))
    setImageList((old) => {
      return [...old, ...event.target.files]
    })
  }

  const getChangedProductOptionValue = (orgOptionValue, editedOptionValue) => {
    const changed = {}
    if (orgOptionValue['value'] !== editedOptionValue['value']) {
      changed['value'] = editedOptionValue['value']
    }
    return changed
  }

  const getChangedProductVariation = (orgVariation, editedVariation) => {
    const changed = {}
    if (orgVariation['price'] !== editedVariation['price']) {
      changed['price'] = editedVariation['price']
    }
    if (orgVariation['discount'] !== editedVariation['discount']) {
      changed['discount'] = editedVariation['discount']
    }
    return changed
  }

  const getChangedProductInfo = (org, edited) => {
    const changed = {}
    if (org['name'] !== edited['name']) {
      changed['name'] = edited['name']
    }
    if (org['description'] !== edited['description']) {
      changed['description'] = edited['description']
    }
    if (org['category']['id'] !== edited['category']['id']) {
      changed['idCategory'] = edited['category']['id']
    }
    return changed
  }

  const handleUpdateProductOptionValue = async () => {
    for (let i = 0; i < orgProduct.options.length; i++) {
      for (let j = 0; j < orgProduct.options[i].optionValues.length; j++) {
        let changed = getChangedProductOptionValue(
          orgProduct.options[i].optionValues[j],
          product.options[i].optionValues[j],
        )
        if (Object.keys(changed).length > 0) {
          try {
            await updateProductOptionValue(
              product.id,
              product.options[i].optionValues[j].id,
              changed,
            )
          } catch (error) {
            toast.error('Update product option value failed!', style)
          }
        }
      }
    }
  }

  const handleUpdateProductVariation = async () => {
    for (let i = 0; i < orgProduct.variations.length; i++) {
      let changed = getChangedProductVariation(orgProduct.variations[i], product.variations[i])
      if (Object.keys(changed).length > 0) {
        try {
          await updateProductVariation(product.id, orgProduct.variations[i].id, changed)
        } catch (error) {
          toast.error('Update product variation failed!', style)
        }
      }
    }

    var newData = { variations: [] }
    for (let i = 0; i < product.variations.length; i++) {
      if (!('id' in product.variations[i])) {
        newData['variations'].push(product.variations[i])
      }
    }

    if (newData['variations'].length === 0) return

    try {
      await createProductVariation(product.id, newData)
    } catch (error) {
      toast.error('Create product variation failed!', style)
    }
  }

  const handleSave = async () => {
    await handleUpdateProductOptionValue()
    await handleUpdateProductVariation()

    var transform = new FormData()
    var transform1 = new FormData()
    const blob = new Blob([JSON.stringify(getChangedProductInfo(orgProduct, product))], {
      type: 'application/json',
    })
    transform.append('info', blob)
    const avatar = document.getElementById('avatar').files
    if (avatar.length > 0) transform.append('avatar', avatar[0])
    for (let i = 0; i < imageList.length; i++) {
      transform1.append('images', imageList[i])
    }
    try {
      const data = {
        idProductImages: [...imageDel],
      }
      await deleteProductImages(productId, data)
      await updateProduct(product.id, transform)
      if (imageList.length > 0) {
        await createProductImage(product.id, transform1)
      }
      toast.success('Update product successful!', style)
      setTimeout(() => {
        navigate('/product')
      }, 1000)
    } catch (error) {
      toast.error('Update product failed!', style)
    }
  }

  return (
    <>
      <div className="updateProduct">
        <Sidebar />
        <div className="updateProductContainer">
          <Navbar />
          <div className="updateProductBody">
            <div className="title">
              <a href="/">Home</a>/ <a href="/product">Product</a>/ <a href=" ">Update product</a>
            </div>
            <div className="updateProductForm">
              <div style={{ width: '100%', padding: '0.4rem' }}>
                <ProductDetail product={product} setProduct={setProduct} />
                <ProductOption product={product} setProduct={setProduct} isCreate={false} />
                <ProductVariation product={product} setProduct={setProduct} isCreate={false} />
                <div className="avatar">
                  <label className="titleAvatar">Avatar</label>
                  <label className="avatarButton">
                    <FaUpload style={{ marginRight: '0.8rem' }} />
                    Add avatar
                    <input
                      type="file"
                      name="images"
                      id="avatar"
                      onChange={onSelectAvatar}
                      accept="image/png, image/jpeg, image/jpg, image/webp"
                    />
                  </label>
                  {avatar ? (
                    <div className="imageAvatar">
                      <img src={avatar.preview} height="200rem" style={{ margin: '0.06rem' }} />
                    </div>
                  ) : (
                    <div className="imageAvatar">
                      <img src={product?.avatar} height="200rem" style={{ margin: '0.06rem' }} />
                    </div>
                  )}
                </div>

                <div className="imagesGroup">
                  <label className="titleImage">Images</label>
                  <label className="imageButton">
                    <FaUpload style={{ marginRight: '0.8rem' }} />
                    Add images
                    <input
                      type="file"
                      name="images"
                      multiple
                      id="images"
                      onChange={onSelectImages}
                      accept="image/png, image/jpeg, image/jpg, image/webp"
                    />
                  </label>

                  <div className="images">
                    <Accordion className="groupImage">
                      <AccordionSummary className="headerImage">
                        <Typography className="titleImage">Images</Typography>
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
                              {images &&
                                images.map((img, index) => {
                                  return (
                                    <div key={img} className="image">
                                      <img
                                        src={img}
                                        className="img"
                                        style={{
                                          width: '10rem',
                                          height: '10rem',
                                          border: '0.08rem solid #48647f',
                                        }}
                                      />
                                      <button
                                        className="deleteButton"
                                        onClick={() => {
                                          setImages(images.filter((e) => e !== img))
                                        }}
                                      >
                                        <FaRegTimesCircle />
                                      </button>
                                    </div>
                                  )
                                })}
                              {defaultImages.map((item) => (
                                <>
                                  <div key={item} className="image">
                                    <img
                                      className="img"
                                      src={item?.url}
                                      style={{
                                        width: '10rem',
                                        height: '10rem',
                                        border: '0.08rem solid #48647f',
                                      }}
                                    />
                                    <button
                                      className="deleteButton"
                                      onClick={async () => {
                                        setImageDel((prev) => {
                                          return [...prev, item.id]
                                        })
                                        setDefaultImage(defaultImages.filter((e) => e !== item))
                                      }}
                                    >
                                      <FaRegTimesCircle />
                                    </button>
                                  </div>
                                </>
                              ))}
                            </Grid>
                          </div>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>
            <div className="updateProductFooter">
              <Button className="saveButton" startIcon={<FaSave />} onClick={(e) => handleSave()}>
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
    </>
  )
}

export default ProductComponent
