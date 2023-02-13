import { Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { PulseLoader } from 'react-spinners';

export function LoadingIndicator() {
  return (
    <Container maxWidth="xl" sx={{ position: 'relative' }}>
      <Stack spacing={2} justifyContent="center" alignItems={'center'}>
        <Typography variant="button" display="block" gutterBottom>
          loading...
        </Typography>
        <PulseLoader color="#2196f3"></PulseLoader>
      </Stack>
    </Container>
  );
}
