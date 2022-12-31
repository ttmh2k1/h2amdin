import { FaPlusSquare } from 'react-icons/fa'
import FormOption from '../components/FormOption'

export const ProductOption = ({ product, setProduct, isCreate = true }) => {
  const handleOnChange = (index, option) => {
    const newOptions = product.options
    newOptions[index] = option
    setProduct((prev) => ({ ...prev, options: newOptions }))
  }

  return (
    <>
      <div className="groupParent">
        <label className="title">Option</label>
        <div className="option">
          {product?.options?.map((option, index) => {
            
            return (
              <FormOption
                key={index}
                option={option}
                onChange={(option) => handleOnChange(index, option)}
                isCreate={isCreate}
              />
            )
          })}
          {isCreate &&
            <button
            className="newOption"
            onClick={() =>
              setProduct((prev) => ({
                ...prev,
                options: [...prev.options, { name: '', values: [''] }],
              }))
            }
          >
            <FaPlusSquare style={{ marginRight: '0.08rem' }} />
            New option
          </button>
          }
          
        </div>
      </div>
    </>
  )
}
