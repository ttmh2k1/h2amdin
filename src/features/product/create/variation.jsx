import { FaPlusSquare } from 'react-icons/fa'
import FormVariation from '../components/FormVariation'

export const ProductVariation = ({ product, setProduct, isCreate = true }) => {
  const handleChangeVariation = (index, variation) => {
    const newVariations = product.variations
    newVariations[index] = variation
    setProduct((prev) => ({ ...prev, variations: newVariations }))
  }

  return (
    <>
      <div className="groupParent">
        <label className="title">Variation</label>
        <div className="option">
          {product?.variations?.map((variation, index) => (
            <FormVariation
              variation={variation}
              options={product.options}
              onChangeVariation={(e) => handleChangeVariation(index, e)}
              isCreate={isCreate}
            />
          ))}
          <button
            className="newVariation"
            onClick={() =>
              setProduct((prev) => ({
                ...prev,
                variations: [
                  ...prev.variations,
                  {
                    optionValues: [],
                    price: 0,
                    priceAfterDiscount: 0,
                    discount: 0,
                    quantity: 0,
                  },
                ],
              }))
            }
          >
            <FaPlusSquare style={{ marginRight: '0.08rem' }} />
            New variation
          </button>
        </div>
      </div>
    </>
  )
}
