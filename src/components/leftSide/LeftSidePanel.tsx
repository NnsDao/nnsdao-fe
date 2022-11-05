import nnsdaoLogo from '@/public/home/nnsdaoLogo.ico';
import { Avatar, Box, Stack } from '@mui/material';
import JoinedDao from './joinedDao/Index';
export default function LeftSidePanel() {
  // const JoinedDaoWrap = LoadingWrapper(joinedDao, useTotalDaoLists);
  return (
    <Stack spacing={0} alignItems="center" height={'100vh'}>
      <Avatar
        alt="Remy Sharp"
        src={nnsdaoLogo}
        sx={{
          width: 63,
          height: 63,
          cursor: 'pointer',
        }}
      />
      <Box sx={{ height: 'calc( 100% - 126px)', overflow: 'hidden' }}>
        <JoinedDao />
      </Box>
      <Avatar
        alt="Remy Sharp"
        src={nnsdaoLogo}
        sx={{
          width: 63,
          height: 63,
          cursor: 'pointer',
        }}
      />
    </Stack>
  );
}
