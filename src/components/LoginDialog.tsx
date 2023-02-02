import { Close as CloseIcon } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  Button,
  Dialog,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { plugLogout, stoicLogout } from '@nnsdao/nnsdao-kit';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useNidLogin } from '../api/nid';
import { login } from '../common/helper';
import { useUserStore } from '../hooks/userStore';

function LoginDialog({ open, toggleOpen }) {
  const [userInfo, dispatch] = useUserStore();
  const nidLoginAction = useNidLogin();
  const navigate = useNavigate();
  async function loginWith(type: string) {
    // user have been already log in
    if (userInfo.loginType == 'stoic' && type == 'stoic') return;
    if (userInfo.loginType == 'plug' && type == 'plug') return;

    let toastId = toast.loading('authorizing...');
    let res = await login(type);
    nidLoginAction.mutate(type, {
      onSuccess(data, variables, context) {
        dispatch({
          type: 'login',
          data: { ...res, ...data },
        });
        toggleOpen();
        toast.success('login success!', { id: toastId });
        navigate('/');
      },
    });
  }
  async function handleLogout(): Promise<void> {
    if (userInfo.loginType === 'stoic') {
      await stoicLogout();
    } else if (userInfo.loginType === 'plug') {
      await plugLogout();
    }
    dispatch({
      type: 'logout',
    });
    toggleOpen();
    navigate('/');
  }

  return (
    <>
      <Dialog maxWidth="lg" onClose={toggleOpen} open={open}>
        <DialogTitle textAlign="center">
          Select Identity
          <IconButton
            onClick={toggleOpen}
            sx={{
              position: 'absolute',
              right: 8,
              top: 13,
            }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <List sx={{ minWidth: '350px' }}>
          <ListItem>
            <ListItemButton onClick={() => loginWith('plug')}>
              <ListItemIcon>
                <div
                  style={{
                    width: 60,
                    height: 60,
                    background: 'url("/plug.png") 8px -1px / 134px no-repeat',
                  }}
                />
              </ListItemIcon>
              <ListItemText>Plug Identity</ListItemText>
              {userInfo.loginType == 'plug' && userInfo.isLogin && <CheckCircleIcon color="primary"></CheckCircleIcon>}
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => loginWith('stoic')}>
              <ListItemIcon>
                <div
                  style={{
                    width: 60,
                    height: 60,
                    background: 'url("/stoic.png") 6px 8px / 158px no-repeat',
                  }}></div>
              </ListItemIcon>
              <ListItemText>Stoic Identity</ListItemText>
              {userInfo.loginType == 'stoic' && userInfo.isLogin && <CheckCircleIcon color="primary"></CheckCircleIcon>}
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => loginWith('metamask')}>
              <ListItemIcon>
                <div
                  style={{
                    marginLeft: 8,
                    width: 48,
                    height: 48,
                    background: 'url("/metamask.svg") center/contain no-repeat',
                  }}></div>
              </ListItemIcon>
              <ListItemText>&ensp;MetaMask Wallet</ListItemText>
              {userInfo.loginType == 'metamask' && userInfo.isLogin && (
                <CheckCircleIcon color="primary"></CheckCircleIcon>
              )}
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => loginWith('petra')}>
              <ListItemIcon>
                <div
                  style={{
                    marginLeft: 8,
                    width: 48,
                    height: 48,
                    background: 'url("/petra.png") center/contain no-repeat',
                  }}></div>
              </ListItemIcon>
              <ListItemText>&ensp;Petra Wallet</ListItemText>
              {userInfo.loginType == 'petra' && userInfo.isLogin && <CheckCircleIcon color="primary"></CheckCircleIcon>}
            </ListItemButton>
          </ListItem>
        </List>
        {userInfo.isLogin ? (
          <>
            <Divider></Divider>
            <List>
              <ListItem>
                <Button sx={{ width: '100%' }} variant="text" size="large" onClick={() => handleLogout()}>
                  Logout
                </Button>
                {/* <ListItemButton onClick={() => handleLogout()}>
            <ListItemIcon>
              <LogoutIcon></LogoutIcon>
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItemButton> */}
              </ListItem>
            </List>
          </>
        ) : null}
      </Dialog>
    </>
  );
}

export default LoginDialog;
