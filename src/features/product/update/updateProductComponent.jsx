import './updateProductStyle.scss'
import { useEffect, useState } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import { ProductDetail } from '../create/detail'
import { ProductOption } from '../create/option'
import { ProductVariation } from '../create/variation'
import { FaArrowCircleLeft, FaRegTimesCircle, FaSave, FaUpload } from 'react-icons/fa'
import { Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { getProduct, updateProduct } from '../../../apis/productApi'
import { toast } from 'react-toastify'

const defaultProduct = {
  name: '',
  description: '',
  idCategory: '',
  options: [],
  variations: [
    {
      optionValues: [],
      price: 0,
      priceAfterDiscount: 0,
      discount: 0,
      quantity: 0,
    },
  ],
}

const ProductComponent = () => {
  const [product, setProduct] = useState(defaultProduct)
  const { productId } = useParams()
  const [avatar, setAvatar] = useState()
  const [images, setImages] = useState([])
  const [imageList, setImageList] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const handleGetProduct = async () => {
      const resp = await getProduct(productId)
      const data = resp?.data?.data
      setProduct(data)
    }
    handleGetProduct()
  }, [productId])

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

  const handleSave = async () => {
    const avatar = document.getElementById('avatar').files
    var transform = new FormData()
    const json = JSON.stringify(product)
    const blob = new Blob([json], {
      type: 'application/json',
    })
    transform.append('info', blob)
    transform.append('avatar', avatar[0])
    for (let i = 0; i < imageList.length; i++) {
      transform.append('images', imageList[i])
    }
    try {
      await updateProduct(transform)
      toast.success('Update product successful!', style)
      setTimeout(() => {
        navigate('/product')
      }, 2000)
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
                <ProductOption product={product} setProduct={setProduct} />
                <ProductVariation product={product} setProduct={setProduct} />
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
                    <>
                      {images.length > 0 && <p className="note">Upload {images.length} images</p>}
                    </>
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
