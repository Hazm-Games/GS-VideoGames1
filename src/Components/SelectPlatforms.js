import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [Platform, setPlatform] = React.useState('');

  const handleChange = (event) => {
    setPlatform(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Platform</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Platform}
          label="Platform"
          onChange={handleChange}
        >
          <MenuItem value={1}>XBOX</MenuItem>
          <MenuItem value={2}>PLAYSTATION</MenuItem>
          <MenuItem value={3}>NINTENDO</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}