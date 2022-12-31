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

const FormProduct = ({ variation, setVariation, onChangeVariation, options }) => {
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
    onChangeForm('priceAfterDiscount', Number(variation.discount) * Number(variation.price))
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
                <div className="group">
                  <div className="level">
                    <Grid container>
                      <Grid item xs={6}>
                        {options?.map((option) => (
                          <div className="form">
                            <label className="title" for="option">
                              {option.name || 'Option'}
                            </label>
                            <Select
                              className="select"
                              id="option"
                              value={
                                variation.optionValues?.find(
                                  (_option) => _option.option === option.name,
                                )?.optionValue
                              }
                              onChange={(e) => handleOptionOnChange(option.name, e.target.value)}
                            >
                              {option.values?.map((value) => (
                                <MenuItem value={value} key={value}>
                                  {value}
                                </MenuItem>
                              ))}
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
