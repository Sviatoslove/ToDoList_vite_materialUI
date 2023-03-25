import { Checkbox as CheckboxMUI, FormControlLabel, FormGroup } from '@mui/material';
import React from 'react';

const CheCkbox = ({value, ...rest}) => {
 return ( 
  <FormGroup>
   <FormControlLabel control={<CheckboxMUI checked={value} {...rest} />}/>
  </FormGroup>
 );
}
 
export default CheCkbox;