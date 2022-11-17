import nnsdaoLogo from '@/public/home/nnsdaoLogo.ico';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Box, Stack, Tooltip, Zoom } from '@mui/material';
import React from 'react';
import { useToggle } from 'usehooks-ts';
import { useUserStore } from '../../hooks/userStore';
import LoginDialog from '../LoginDialog';
import JoinedDao from './joinedDao/Index';

export default function LeftSidePanel(props) {
  // const JoinedDaoWrap = LoadingWrapper(joinedDao, useTotalDaoLists);
  // const navigate = useNavigate();
  // const toHome = () => {
  //   navigate(`/home`);
  // };
  const [userInfo, dispatch] = useUserStore();
  const [open, toggleOpen] = useToggle(false);

  return (
    <React.Fragment>
      <Stack spacing={1} alignItems="center" height={'100vh'} position="fixed" py={1} sx={{ background: '#fff' }}>
        <Avatar
          alt="Remy Sharp"
          src={nnsdaoLogo}
          sx={{
            width: 60,
            height: 60,
            cursor: 'pointer',
          }}
          // onClick={toHome}
        />
        <Box sx={{ height: 'calc( 100% - 100px)', overflow: 'hidden' }}>
          <JoinedDao />
        </Box>
        <Tooltip
          onClick={toggleOpen}
          title={userInfo.isLogin ? 'Logout' : 'Login'}
          TransitionComponent={Zoom}
          placement="right"
          TransitionProps={{ timeout: 200 }}>
          {userInfo.isLogin ? (
            <LogoutIcon sx={{ width: 40, height: 40, cursor: 'pointer' }} />
          ) : (
            <LoginIcon sx={{ width: 40, height: 40, cursor: 'pointer' }}></LoginIcon>
          )}
        </Tooltip>
      </Stack>
      <LoginDialog open={open} toggleOpen={toggleOpen}></LoginDialog>
    </React.Fragment>
  );
}
