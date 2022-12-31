import './createProductStyle.scss'
import { Button, Grid, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  getProduct,
  createProduct,
  getListProductParent,
  getListCategory,
} from '../../../apis/productApi'
import { FaArrowCircleLeft, FaPlusSquare, FaRegTimesCircle, FaUpload } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { formatNumber } from '../../../utils/functionHelper'
import FormProduct from '../components/FormAttribute'
import FormOption from '../components/FormOption'

const ProductComponent = () => {
  const [avatar, setAvatar] = useState()
  const [images, setImages] = useState([])
  const [imageList, setImageList] = useState([])
  const [product, setProduct] = useState()
  const [listParent, setListParent] = useState([])
  const [listCategory, setListCategory] = useState([])
  const [listType, setListType] = useState([])
  const [variation, setVariation] = useState()
  const [options, setOptions] = useState()
  const [formVariation, setFormVariation] = useState([<FormProduct />])
  const [formOption, setFormOption] = useState([<FormOption />])
  const [idParent, setIdParent] = useState()
  const [idCategory, setIdCategory] = useState()
  const [idType, setIdType] = useState()
  const params = useParams()
  const productId = params.productId
  const navigate = useNavigate()

  useEffect(() => {
    const handleGetProduct = async () => {
      const resp = await getProduct(productId)
      const data = resp?.data?.data
      setProduct(data)
    }
    handleGetProduct()
  }, [])

  useEffect(() => {
    const handleGetParent = async () => {
      const resp = await getListProductParent()
      const list = resp?.data?.data
      setListParent(list)
    }
    handleGetParent()
  }, [])

  useEffect(() => {
    const handleGetCategory = async () => {
      const resp = await getListCategory(idParent)
      const list = resp?.data?.data
      setListCategory(list)
    }
    handleGetCategory()
  }, [idParent])

  useEffect(() => {
    const handleGetType = async () => {
      const resp = await getListCategory(idCategory)
      const list = resp?.data?.data
      setListType(list)
    }
    handleGetType()
  }, [idCategory])

  const style = {
    position: 'bottom-right',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  }

  const handleSave = async () => {
    const optionName = document.getElementsByClassName('optionName')
    const optionValue = document.getElementsByClassName('optionValue')
    const optionLength = optionName.length

    let options = []
    for (let i = 0; i < optionLength; i++) {
      const o = {
        optionName: optionName[i].name,
        optionValue: optionValue,
      }
      options.push(o)
    }

    const variantName = document.getElementsByClassName('variantName')
    const variantPrice = document.getElementsByClassName('variantPrice')
    const variantDiscount = document.getElementsByClassName('variantDiscount')
    const variantLength = variantName.length

    let variantions = []
    for (let i = 0; i < variantLength; i++) {
      const v = {
        variationName: variantName[i].value,
        tier: variation?.tier,
        price: formatNumber(Number(variantPrice[i].value)),
        availableQuantity: 0,
        discount: Number(variantDiscount[i].value),
      }
      variantions.push(v)
    }

    const avatar = document.getElementById('avatar').files

    const info = {
      name: product?.name,
      description: document.getElementById('description').value,
      options: options,
      variations: variantions,
      idCategory: idType,
    }
    var transform = new FormData()
    const json = JSON.stringify(info)
    const blob = new Blob([json], {
      type: 'application/json',
    })

    transform.append('info', blob)
    transform.append('avatar', avatar[0])
    for (let i = 0; i < imageList.length; i++) {
      transform.append('images', imageList[i])
    }
    try {
      await createProduct(transform)
      toast.success('Create product successful!', style)
      setTimeout(() => {
        navigate('/product')
      }, 2000)
    } catch (error) {
      toast.error('Create product failed!', style)
    }
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

  return (
    <div className="createProduct">
      <Sidebar />
      <div className="createProductContainer">
        <Navbar />
        <div className="createProductBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/productGroup">Product</a>/{' '}
            <a href=" ">Create product</a>
          </div>
          <div className="createProductForm">
            <div style={{ width: '100%', padding: '0.4rem' }}>
              <div className="createProduct">
                <Grid container spacing={0} alignItems="flex-start" alignContent="space-around">
                  <div className="form">
                    <label className="title" for="name">
                      Product name
                    </label>
                    <TextField
                      isrequired
                      className="textField"
                      id="productName"
                      value={product?.name}
                      onChange={(e) =>
                        setProduct((state) => {
                          return { ...state, name: e.target.value }
                        })
                      }
                    />
                  </div>
                  <div className="form">
                    <label className="title" for="product parents">
                      Product group
                    </label>
                    <Select
                      className="select"
                      id="productParent"
                      onChange={(e) => {
                        setIdParent(Number(e.target.value))
                      }}
                    >
                      {listParent?.map((item) => (
                        <MenuItem value={item.id} key={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div className="form">
                    <Select
                      className="select"
                      id="productGroup"
                      style={{ marginTop: '2rem' }}
                      onChange={(e) => {
                        setIdCategory(Number(e.target.value))
                      }}
                    >
                      {listCategory?.children?.map((item) => (
                        <MenuItem value={item.id} key={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div className="form">
                    <label className="title" for="product type">
                      Product type
                    </label>
                    <Select
                      className="select"
                      id="productType"
                      onChange={(e) => {
                        setIdType(Number(e.target.value))
                      }}
                    >
                      {listType?.children?.map((item) => (
                        <MenuItem value={item.id} key={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </Grid>
              </div>

              <div className="descriptionForm">
                <label className="descriptionTitle" for="name">
                  Description
                </label>
                <TextareaAutosize
                  className="description"
                  aria-label="maximum height"
                  id="description"
                />
              </div>

              <div className="groupParent">
                <label className="title">Option</label>
                <div className="option">
                  {formOption.map((item) => {
                    return item
                  })}
                  <button
                    className="newOption"
                    onClick={() =>
                      setFormOption((old) => {
                        return [...old, <FormOption />]
                      })
                    }
                  >
                    <FaPlusSquare style={{ marginRight: '0.08rem' }} />
                    New option
                  </button>
                </div>
              </div>

              <div className="groupParent">
                <label className="title">Attribute</label>
                <div className="option">
                  {formVariation.map((item) => {
                    return item
                  })}
                  <button
                    className="newVariation"
                    onClick={() => {
                      setFormVariation((old) => {
                        return [...old, <FormProduct />]
                      })
                    }}
                  >
                    <FaPlusSquare style={{ marginRight: '0.08rem' }} />
                    New variation
                  </button>
                </div>
              </div>

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
                {avatar && (
                  <div className="imageAvatar">
                    <img src={avatar.preview} height="200rem" style={{ margin: '0.06rem' }} />
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

                {images.length > 0 && images.length > 10 ? (
                  <p className="note">
                    You can't upload more than 10 images! <br />
                    <span>
                      Please delete <b style={{ color: 'red' }}> {images.length - 10} </b> of them
                    </span>
                  </p>
                ) : (
                  <>{images.length > 0 && <p className="note">Upload {images.length} images</p>}</>
                )}
                <div className="images">
                  {images &&
                    images.map((img, index) => {
                      return (
                        <div key={img} className="image">
                          <img src={img} className="img" />
                          <button
                            className="deleteButton"
                            onClick={() => setImages(images.filter((e) => e !== img))}
                          >
                            <FaRegTimesCircle />
                          </button>
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className="createProductFooter">
            <Button
              className="createButton"
              startIcon={<FaPlusSquare />}
              onClick={(e) => handleSave()}
            >
              Create
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

export default ProductComponent
