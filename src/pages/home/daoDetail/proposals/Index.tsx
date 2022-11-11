import { Box, Pagination, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useLocation, useNavigate } from 'react-router-dom';
import List from './list/Index';
import SelectButton from './selectButton/Index';

export default function Proposals() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const toDaoDetail = item => {
    navigate(`/daoDetail/${item.name}`);
  };
  return (
    <Grid container xs={12}>
      <Grid
        xs={12}
        sx={{
          fontFamily: 'Roboto',
          fontStyle: 'normal',
          fontWeight: '500',
          fontSize: '14px',
          lineHeight: '16px',
          color: ' #5E6278',
        }}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                fontFamily: 'Roboto',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: '20px',
                lineHeight: '23px',
                color: '#181C32',
                mr: '10px',
              }}>
              Proposals
            </Box>
            by Recent Updates ↓
          </Box>
          <SelectButton></SelectButton>
        </Box>
        <Box sx={{ background: '#fff', my: '25px', borderRadius: '12px', padding: '26px 30px' }}>
          <List></List>
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Box>Showing 1 to 7 of 50 entries</Box>
          <Box>
            <Stack spacing={2}>
              <Pagination count={10} variant="outlined" color="primary" />
            </Stack>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
