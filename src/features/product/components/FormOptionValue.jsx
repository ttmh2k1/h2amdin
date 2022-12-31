import { Accordion, AccordionDetails, Grid, TextField, Typography } from '@mui/material'

const FormOptionValue = ({ value, onChange }) => {
  return (
    <>
      <AccordionDetails>
        <Accordion className="group">
          <AccordionDetails>
            <Typography>
              <Grid container spacing={0} alignItems="flex-start" alignContent="space-around">
                <div className="level">
                  <div className="form">
                    <label className="title" for="optionValue">
                      Value
                    </label>
                    <TextField
                      className="textField optionValue"
                      id="optionValue"
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                    />
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

export default FormOptionValue
