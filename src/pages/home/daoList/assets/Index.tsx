import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CreateDao from './createDao/Index';
import SelectButton from './selectButton/Index';

export default function Assets() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid container alignItems="center" sx={{ fontFamily: 'Roboto', fontWeight: 500, fontSize: '20px' }}>
        DAOs dApp &nbsp;
        <Box sx={{ fontWeight: 700, fontSize: '12px', lineHeight: '23px', color: '#A1A5B7' }}> Active</Box>
      </Grid>
      <Grid container alignItems="center" spacing={-2}>
        <SelectButton />
        <CreateDao />
      </Grid>
    </Grid>
  );
}
