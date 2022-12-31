import { Accordion, AccordionDetails, AccordionSummary, TextField, Typography } from '@mui/material'
import { FaPlusSquare } from 'react-icons/fa'
import FormOptionValue from './FormOptionValue'

const FormOption = ({ option, onChange }) => {
  const handleChangeValue = (index, value) => {
    const newValues = option.values
    newValues[index] = value
    onChange({ ...option, values: newValues })
  }
  const handleNewValue = () => {
    onChange({ ...option, values: [...option.values, ''] })
  }
  const handleChangeName = (name) => {
    onChange({ ...option, name })
  }
  return (
    <>
      <AccordionDetails>
        <Accordion className="groupParent">
          <AccordionSummary className="headerParent">
            <Typography className="titleParent">{option?.name || 'Option'}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              className="textFieldOption optionName"
              id="optionName"
              value={option?.name}
              onChange={(e) => handleChangeName(e.target.value)}
            />

            {option.values?.map((value, index) => {
              return (
                <FormOptionValue
                  key={index}
                  value={value}
                  onChange={(e) => handleChangeValue(index, e)}
                />
              )
            })}
            <button className="newOptionValue" onClick={handleNewValue}>
              <FaPlusSquare style={{ marginRight: '0.08rem' }} />
              New value
            </button>
          </AccordionDetails>
        </Accordion>
      </AccordionDetails>
    </>
  )
}

export default FormOption
