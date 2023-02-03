import { Close as CloseIcon } from '@mui/icons-material';
import {
  Dialog,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useNidLogin } from '../api/nid';
import { connectWallet } from '../common/helper';

export default function LoginDialog({ open, toggleOpen }) {
  const nidLoginAction = useNidLogin();
  const navigate = useNavigate();
  async function bindWith(type: string) {
    let toastId = toast.loading('authorizing...');
    let res = await connectWallet(type);
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

  return (
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
          <ListItemButton onClick={() => bindWith('plug')}>
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
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => bindWith('stoic')}>
            <ListItemIcon>
              <div
                style={{
                  width: 60,
                  height: 60,
                  background: 'url("/stoic.png") 6px 8px / 158px no-repeat',
                }}></div>
            </ListItemIcon>
            <ListItemText>Stoic Identity</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => bindWith('metamask')}>
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
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => bindWith('petra')}>
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
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}
