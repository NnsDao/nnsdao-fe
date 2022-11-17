import { Card, CardContent } from '@mui/material';
import { Box } from '@mui/system';

export default function ActiveUser() {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
