import nnsdaoLogo from '@/public/home/nnsdaoLogo.ico';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Box, Stack, Tooltip, Zoom } from '@mui/material';
import JoinedDao from './joinedDao/Index';

export default function LeftSidePanel() {
  // const JoinedDaoWrap = LoadingWrapper(joinedDao, useTotalDaoLists);
  return (
    <Stack spacing={0} alignItems="center" height={'100vh'}>
      <Avatar
        alt="Remy Sharp"
        src={nnsdaoLogo}
        sx={{
          width: 60,
          height: 60,
          cursor: 'pointer',
          margin: '24px 0 80px 0',
        }}
      />
      <Box sx={{ height: 'calc( 100% - 260px)', overflow: 'hidden' }}>
        <JoinedDao />
      </Box>
      <Tooltip title={'Logout'} TransitionComponent={Zoom} placement="right" TransitionProps={{ timeout: 200 }}>
        <LogoutIcon sx={{ width: 40, height: 40, marginY: '40px', cursor: 'pointer' }} />
      </Tooltip>
    </Stack>
  );
}
