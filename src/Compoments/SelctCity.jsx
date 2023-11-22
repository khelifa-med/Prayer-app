
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function CitySelect ()
{
    const [name , setname] = React.useState('')

    const handleChange = (event) => {
        setname(event.target.value)
        console.log(name)
        
    };

     

    return(
        <Box sx={{ minWidth: 120 }} style={{marginTop:'50px'}}>
            <FormControl style={{width:'300px'}}>
               <InputLabel id="demo-simple-select-label" style={{fontSize:'20px',fontWeight:'bold'}}>ٱلمدينة</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label='ٱلمدينة'
                    value={name}
                    onChange={handleChange}
                >
                <MenuItem value={'Oujda'}>Oujda</MenuItem>
                <MenuItem value={'Rabat'}>Rabat</MenuItem>
                <MenuItem value={'Tanger'}>Tanger</MenuItem>
            
                </Select>
            </FormControl>
       </Box>

    )
}

export default CitySelect
