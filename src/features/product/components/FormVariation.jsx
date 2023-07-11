import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect } from 'react'

const FormProduct = ({ variation, setVariation, onChangeVariation, options, isCreate = true }) => {
  const handleOptionOnChange = (name, value) => {
    const newOptionValues = variation.optionValues
    const index = newOptionValues.findIndex((e) => e.option === name)
    if (index > -1) newOptionValues[index].optionValue = value
    else newOptionValues.push({ option: name, optionValue: value })
    onChangeVariation({ ...variation, optionValues: newOptionValues })
  }

  const onChangeForm = (name, value) => {
    onChangeVariation({
      ...variation,
      [name]: value,
    })
  }

  useEffect(() => {
    onChangeForm(
      'priceAfterDiscount',
      (1 - Number(variation.discount) / 100.0) * Number(variation.price),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variation.price, variation.discount])

  return (
    <>
      <AccordionDetails>
        <Accordion className="groupParent">
          <AccordionSummary className="headerParent">
            <Typography className="titleParent">{variation?.name || 'Variation'}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Grid container spacing={0} alignItems="flex-start" alignContent="space-around">
                <div className="group" style={{ width: '100%' }}>
                  <div className="level">
                    <Grid container>
                      <Grid item xs={6}>
                        {options?.map((option) => (
                          <div className="form">
                            <label className="title" for="option">
                              {isCreate ? option.name || 'Option' : option.optionName || 'Option'}
                            </label>
                            <Select
                              className="select"
                              id="option"
                              value={
                                !isCreate
                                  ? option.optionValues &&
                                    (function () {
                                      for (let optionValue of option.optionValues) {
                                        if (variation.name?.includes(optionValue.value)) {
                                          return optionValue.value
                                        }
                                      }
                                    })()
                                  : undefined
                              }
                              readOnly={!isCreate && variation.name}
                              onChange={
                                isCreate
                                  ? (e) => handleOptionOnChange(option.name, e.target.value)
                                  : (e) => handleOptionOnChange(option.optionName, e.target.value)
                              }
                            >
                              {isCreate
                                ? option?.values?.map((optionValue) => (
                                    <MenuItem value={optionValue} key={optionValue}>
                                      {optionValue}
                                    </MenuItem>
                                  ))
                                : option?.optionValues?.map((optionValue) => (
                                    <MenuItem value={optionValue.value} key={optionValue.id}>
                                      {optionValue.value}
                                    </MenuItem>
                                  ))}
                              {/* {option?.optionValues?.map((optionValue) => (
                                <MenuItem value={optionValue.value} key={optionValue.id}>
                                  {optionValue.value}
                                </MenuItem>
                              ))} */}
                            </Select>
                          </div>
                        ))}
                      </Grid>
                      <Grid item xs={6}>
                        <div className="form">
                          <label className="title" for="price">
                            Price
                          </label>
                          <TextField
                            className="textField"
                            id="price"
                            value={variation?.price}
                            onChange={(e) => onChangeForm('price', e.target.value)}
                          />
                        </div>
                        <div className="form">
                          <label className="title" for="discount">
                            Discount
                          </label>
                          <TextField
                            className="textField"
                            id="discount"
                            value={variation.discount}
                            onChange={(e) => onChangeForm('discount', e.target.value)}
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
                            value={variation.priceAfterDiscount}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </Grid>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </AccordionDetails>
    </>
  )
}

export default FormProduct
