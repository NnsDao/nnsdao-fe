import { Avatar, Button } from '@mui/material';
import { Box } from '@mui/system';

export default function Treasury() {
  return (
    <Box bgcolor={'#fff'}>
      <Box
        sx={{
          fontFamily: 'Roboto',
          fontWeight: 700,
          fontSize: '34px',
          lineHeight: '40px',
          color: '#181C32',
        }}>
        $898989
      </Box>
      <Box
        sx={{
          fontFamily: 'Roboto',
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '30px',
          color: '#B5B5C3',
        }}>
        treasury
      </Box>
      <Box sx={{ display: 'flex', paddingTop: '23px', paddingBottom: '30px' }}>
        <Avatar></Avatar>
        <Avatar></Avatar>
        <Avatar></Avatar>
        <Avatar></Avatar>
      </Box>
      <Box>
        <Button variant="contained">Invite Contributors</Button>
        <Button>Invite New</Button>
      </Box>
    </Box>
  );
}
