import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/system';

export default function ActiveUser() {
  return (
    <Grid bgcolor={'#fff'}>
      <Box
        sx={{
          fontFamily: 'Roboto',
          fontWeight: 700,
          fontSize: '34px',
          lineHeight: '40px',
          color: '#181C32',
        }}>
        271
      </Box>
      <Box
        sx={{
          fontFamily: 'Roboto',
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '30px',
          color: '#B5B5C3',
          marginBottom: '23px',
        }}>
        Active User
      </Box>
      <Box sx={{ height: '100px' }}>charts</Box>
    </Grid>
  );
}
