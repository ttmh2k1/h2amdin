import { Grid, MenuItem, TextareaAutosize, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { getListProductParent } from '../../../apis/productApi'
import MultiLevelSelect from '../../../components/MultiLevelSelect'
import { useNavigate } from 'react-router-dom'

export const ProductDetail = ({ product, setProduct }) => {
  const [listCategory, setListCategory] = useState([])
  const [idCategory, setIdCategory] = useState({ id: '', name: '' })
  const navigate = useNavigate()

  useEffect(() => {
    const handleGetParent = async () => {
      try {
        const resp = await getListProductParent()
        const list = resp?.data?.data
        setListCategory(list)
      } catch (error) {
        if (error?.response?.status === 403) {
          navigate('/error')
        }
      }
    }
    handleGetParent()
  }, [])

  const onChange = (name, value) => {
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <>
      <div className="createProduct">
        <Grid container spacing={0} alignItems="flex-start" alignContent="space-around">
          <div className="form">
            <label className="title" for="name">
              Product name
            </label>
            <TextField
              isrequired
              className="textField"
              id="name"
              value={product?.name}
              onChange={(e) => onChange('name', e.target.value)}
            />
          </div>
          <div className="form">
            <label className="title" for="productParent">
              Product group
            </label>
            <MultiLevelSelect
              className="levelSelect"
              id="productParent"
              value={idCategory}
              options={listCategory}
              onChange={(e) => {
                onChange('idCategory', e.id)
                setIdCategory(e)
              }}
            >
              {listCategory?.map((item) => (
                <MenuItem value={item.id} key={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </MultiLevelSelect>
          </div>
        </Grid>
      </div>

      <div className="descriptionForm">
        <label className="title" for="description">
          Description
        </label>
        <TextareaAutosize
          className="description"
          aria-label="maximum height"
          id="description"
          minRows={3}
          value={product?.description}
          onChange={(e) => {
            onChange('description', e.target.value)
          }}
        />
      </div>
    </>
  )
}
