import RefreshIcon from '@mui/icons-material/Refresh';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import type { UseQueryResult } from '@tanstack/react-query';
import { PulseLoader } from 'react-spinners';

export default (WrappedComponent, queryFn: (...arg: any[]) => UseQueryResult) => {
  const hocComponent = ({ ...props }) => {
    const data = queryFn();

    if (data.data) {
      return (
        <Container maxWidth="xl" sx={{ position: 'relative' }}>
          <WrappedComponent data={data.data} {...props} />
          {data.isFetching ? (
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, textAlign: 'center' }}>
              <CircularProgress />
            </Box>
          ) : null}
        </Container>
      );
    }
    if (data.isLoading && !data.isFetched) {
      return (
        <Stack spacing={2}>
          <Typography variant="button" display="block" gutterBottom>
            loading...
          </Typography>
          <PulseLoader color="#2196f3"></PulseLoader>
        </Stack>
      );
    }
    return (
      <Stack spacing={2} direction="row" alignItems="center">
        <Typography variant="caption" display="block" gutterBottom>
          Error Occurs!
        </Typography>
        <LoadingButton
          loading={data.isFetching}
          onClick={() => data.refetch()}
          loadingIndicator="Loading…"
          startIcon={<RefreshIcon />}
          variant="outlined">
          Refresh
        </LoadingButton>
      </Stack>
    );
  };

  return hocComponent;
};
