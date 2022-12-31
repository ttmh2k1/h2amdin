import { useEffect, useState } from 'react'
import { FaRegTimesCircle, FaUpload } from 'react-icons/fa'

export const ProductImage = ({ product, setProduct }) => {
  const [avatar, setAvatar] = useState()
  const [images, setImages] = useState([])
  const [imageList, setImageList] = useState([])

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
    <>
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
    </>
  )
}
