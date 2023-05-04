import { Accordion, AccordionDetails, AccordionSummary, TextField, Typography } from '@mui/material'
import { FaPlusSquare } from 'react-icons/fa'
import FormOptionValue from './FormOptionValue'

const FormOption = ({ option, onChange, isCreate = true }) => {
  const handleChangeValue = (index, value) => {
    if (isCreate) {
      const newValues = option.values
      newValues[index] = value
      onChange({ ...option, values: newValues })
    } else {
      const newValues = option.optionValues
      newValues[index] = { ...newValues[index], value }
      onChange({ ...option, optionValues: newValues })
    }
  }

  const handleNewValue = () => {
    if (isCreate) {
      onChange({ ...option, values: [...option.values, ''] })
    } else {
      onChange({ ...option, optionValues: [...option.optionValues, { value: '' }] })
    }
  }
  const handleChangeName = (name) => {
    onChange({ ...option, name })
  }

  return (
    <>
      <AccordionDetails>
        <Accordion className="groupParent">
          <AccordionSummary className="headerParent">
            <Typography className="titleParent">{option?.optionName || 'Option'}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              className="textFieldOption optionName"
              id="optionName"
              value={isCreate ? option?.name : option?.optionName}
              onChange={(e) => handleChangeName(e.target.value)}
            />
            {isCreate
              ? option.values?.map((value, index) => {
                  return (
                    <FormOptionValue
                      key={index}
                      value={value}
                      onChange={(e) => handleChangeValue(index, e)}
                    />
                  )
                })
              : option.optionValues?.map((value, index) => {
                  return (
                    <FormOptionValue
                      key={index}
                      value={value.value}
                      onChange={(e) => handleChangeValue(index, e)}
                    />
                  )
                })}
            <button className="newOptionValue" onClick={handleNewValue}>
              <FaPlusSquare style={{ marginRight: '0.08rem' }} />
              New value
            </button>
            {/* {isCreate && 
              <button className="newOptionValue" onClick={handleNewValue}>
                <FaPlusSquare style={{ marginRight: '0.08rem' }} />
                New value
              </button>
            } */}
          </AccordionDetails>
        </Accordion>
      </AccordionDetails>
    </>
  )
}

export default FormOption
