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
import { useBindWallet, useNidInfo } from '../api/nid';
import { connectWallet } from '../common/helper';

export default function WalletSelector({ open, toggleOpen }) {
  const bindAction = useBindWallet();
  const nidInfo = useNidInfo();

  async function bindWith(type: string) {
    let toastId = toast.loading('authorizing...');
    let res = await connectWallet(type);
    console.log('address', res);

    // @ts-ignore
    bindAction.mutate([nidInfo?.data?.nid, type, res], {
      onSuccess(data, variables, context) {
        toggleOpen();
        toast.success('Bound success!', { id: toastId });
      },
    });
  }

  return (
    <Dialog maxWidth="lg" onClose={toggleOpen} open={open}>
      <DialogTitle textAlign="center">
        Select Wallet
        <IconButton
          onClick={() => toggleOpen() && toast.dismiss()}
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
