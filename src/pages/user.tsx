import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TwitterIcon from '@mui/icons-material/Twitter';
import VerifiedIcon from '@mui/icons-material/Verified';
import {
  Alert,
  Button,
  Card,
  Chip,
  Divider,
  List,
  ListItem,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useBoolean, useEffectOnce, useToggle } from 'usehooks-ts';
import { useEtherData } from '../api/common';
import { useTotalDaoLists } from '../api/dao_manager';
import { useGetBoundWallet, useNidInfo, useUpdateNID } from '../api/nid';
import { arrToMap, briefName, getTotalBalance } from '../common/helper';
import { LoadingIndicator } from '../components/loading';
import LoadingWrapper from '../components/LoadingWrapper';
import LoginDialog from '../components/LoginDialog';
import Upload from '../components/Upload';
import WalletSelector from '../components/WalletSelector';
import { useGlobalState } from '../hooks/globalState';
import { useUserStore } from '../hooks/userStore';
import RwoDaoList from './home/daoList/list/Index';
dayjs.extend(relativeTime);

function User() {
  const [selectedMenu, setSelectedMenu] = React.useState(0);
  const [userStore] = useUserStore();
  const nidInfo = useNidInfo();
  const social: any = arrToMap(nidInfo?.data?.social || []);

  const [open, toggleLogin] = useToggle();
  const DaoList = LoadingWrapper(RwoDaoList, useTotalDaoLists);
  function handleChange(e, val) {
    setSelectedMenu(val);
  }
  const menu = [
    { key: 'OverView', value: 0 },
    { key: 'Created DAOs', value: 1 },
    { key: 'Bound Wallet', value: 2 },
    { key: 'Ether', value: 3 },
  ];

  if (!userStore.isLogin) {
    return (
      <Box textAlign={'center'} p={3}>
        <Typography>Login first please!</Typography>
        <Button variant="contained" onClick={() => toggleLogin()}>
          login
        </Button>
        <LoginDialog open={open} toggleOpen={toggleLogin}></LoginDialog>
      </Box>
    );
  }
  return (
    <React.Fragment>
      <UserCard />
      <Paper sx={{ marginTop: 3 }}>
        <Tabs value={selectedMenu} onChange={handleChange}>
          {menu.map(item => {
            return <Tab sx={{ fontWeight: 'bold' }} key={item.value} label={item.key} value={item.value} />;
          })}
        </Tabs>
        <Divider></Divider>
        <TabPanel selectedIndex={selectedMenu} index={0}>
          {social.twitter ? <TwitterList link={social.twitter}></TwitterList> : <Alert>Bind your twitter first!</Alert>}
        </TabPanel>
        <TabPanel selectedIndex={selectedMenu} index={1}>
          <DaoList ownerID={userStore.principalId}></DaoList>
        </TabPanel>
        <TabPanel selectedIndex={selectedMenu} index={2}>
          <BoundWallet></BoundWallet>
        </TabPanel>
        <TabPanel selectedIndex={selectedMenu} index={3}>
          <Ether></Ether>
        </TabPanel>
      </Paper>
    </React.Fragment>
  );

  function TabPanel(props) {
    const { children, selectedIndex, index } = props;

    return (
      <Box p={2} hidden={selectedIndex !== index}>
        {children}
      </Box>
    );
  }
}
export default User;

export function TwitterList({ link }) {
  const account = link?.match(/https:\/\/twitter\.com\/(\w+)/)?.[1] || '';
  const twitterScript = `<a class="twitter-timeline" href="https://twitter.com/${account}?ref_src=twsrc%5Etfw">Tweets by ${account}</a>`;
  const twitter = React.useRef();
  useEffectOnce(() => {
    // @ts-ignore
    twitter.current.innerHTML = twitterScript;
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://platform.twitter.com/widgets.js';
    document.body.appendChild(script);
  });
  // @ts-ignore
  return <div ref={twitter}></div>;
}

function UserCard() {
  const nidInfo = useNidInfo();
  const navigate = useNavigate();
  const nidUpdateAction = useUpdateNID();
  const [globalStore] = useGlobalState();
  const { value: open, toggle: toggleOpen } = useBoolean(false);
  useEffect(() => {
    if (nidInfo.data) {
      const social: any = arrToMap(nidInfo?.data?.social || []);

      setFormField({
        type: 'reset',
        value: {
          avatar: nidInfo.data.avatar,
          twitter: social?.twitter || '',
        },
      });
    }
  }, [nidInfo.data]);
  const [form, setFormField] = React.useReducer(formReducer, {
    avatar: '',
    twitter: '',
  });
  async function bindWallet() {
    toggleOpen();
    // select wallet
    // click && login using selected wallet
    // store address to NID
  }
  async function updateNID() {
    console.log('form', form);
    const id = toast.loading('Updating...');
    const params: any = {
      nickname: nidInfo.data?.nickname || '',
      social: [nidInfo.data?.social.filter(([key, val]) => key !== 'twitter').concat(['twitter', form.twitter])] || [],
      intro: '',
      avatar: form['avatar'],
    };
    console.log('params', params);

    nidUpdateAction.mutate(params, {
      onSuccess(data, variables, context) {
        toast.success('Update Successfullly !', { id });
      },
      onError() {
        toast.error('Failed !', { id });
      },
    });
  }
  const cardList = [
    {
      text: ' Joined Daos',
      value: globalStore.totalDaoList?.length || '0',
    },
    {
      text: 'Reputation',
      value: Number(nidInfo.data?.credit || '0'),
    },
    // {
    //   text: 'Followers',
    //   value: 1,
    // },
  ];
  return (
    <>
      <Paper sx={{ padding: 3, marginTop: 3 }}>
        <Stack direction={'row'} alignItems="center">
          <Upload
            src={form['avatar']}
            setSrc={val => setFormField({ type: 'update', key: 'avatar', value: val })}></Upload>
          {/* <Avatar variant="rounded" src={nidInfo?.data?.avatar ?? ''} sx={{ width: '160px', height: '160px' }}></Avatar> */}
          <Box pl={3} flex={1}>
            <Stack direction={'row'} alignItems="center" justifyContent={'space-between'}>
              <Stack spacing={0.5}>
                <Stack direction={'row'} alignItems="center" spacing={1}>
                  <Typography variant="h6">{nidInfo.data?.nickname ?? ''}</Typography>
                  <VerifiedIcon color="primary" fontSize="medium"></VerifiedIcon>
                </Stack>
                <Stack spacing={2} direction={'row'} alignItems="center">
                  <Typography variant="body1" color={'GrayText'}>
                    @NID: {nidInfo.data?.nid ?? ''}
                  </Typography>

                  <Stack direction={'row'} alignItems="center" spacing={0.5}>
                    <AccessTimeIcon fontSize="small" color="secondary"></AccessTimeIcon>
                    <Typography variant="body2" color={'GrayText'}>
                      last seen: {dayjs(Number(nidInfo?.data?.last_login_at ?? 0) / 1e6).fromNow()}
                    </Typography>
                  </Stack>
                  <Stack direction={'row'} alignItems="center" spacing={0.5}>
                    <TwitterIcon fontSize="small"></TwitterIcon>
                    {/* <Typography variant="body2" color={'GrayText'}>
                    {social?.twitter || ''}
                  </Typography> */}

                    <TextField
                      placeholder="https://twitter.com/xxx"
                      value={form['twitter']}
                      onChange={e => setFormField({ type: 'update', key: 'twitter', value: e.target.value })}
                      variant="standard"></TextField>
                  </Stack>
                </Stack>
              </Stack>
              <Stack spacing={2}>
                <Button variant="contained" onClick={bindWallet}>
                  Bind Wallet
                </Button>
                <Button variant="outlined" onClick={updateNID}>
                  Update NID
                </Button>
              </Stack>
            </Stack>
            <Stack direction={'row'} alignItems="scenter" spacing={2} pt={1}>
              {cardList.map(item => {
                return (
                  <Card variant="elevation" elevation={0} sx={{ padding: 1 }} key={item.text}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {item.value}
                    </Typography>
                    <Typography variant="body2" color={'#B5B5C3'}>
                      {item.text}
                    </Typography>
                  </Card>
                );
              })}
            </Stack>
          </Box>
        </Stack>
      </Paper>
      <WalletSelector open={open} toggleOpen={toggleOpen}></WalletSelector>
    </>
  );
}

function BoundWallet() {
  const boundWallet = useGetBoundWallet();
  const nidInfo = useNidInfo();
  // TOFIX:
  // add a new api to return current user bound wallet
  if (boundWallet.isLoading || nidInfo.isLoading) {
    return <LoadingIndicator></LoadingIndicator>;
  }
  return (
    <Box>
      {boundWallet?.data
        ?.filter(val => val[0] == nidInfo.data?.nid)
        .map(wallet => {
          return (
            <List key={wallet[2]}>
              <ListItem>
                {wallet[2]}&ensp;&ensp;
                <Chip color="primary" variant="outlined" label={wallet[1]}></Chip>
              </ListItem>
            </List>
          );
        })}
    </Box>
  );
}

function Ether() {
  const boundWallet = useGetBoundWallet();
  const nidInfo = useNidInfo();
  // @ts-ignore
  const etherData = useEtherData(boundWallet?.data?.filter(val => val[0] == nidInfo?.data?.nid).map(val => val[2]));
  const [TabIndex, setTabIndex] = React.useState(0);

  if (etherData.isLoading || boundWallet.isLoading || nidInfo.isLoading) {
    return <LoadingIndicator></LoadingIndicator>;
  }

  return (
    <Box>
      <Tabs value={TabIndex} onChange={(e, val) => setTabIndex(val)}>
        <Tab sx={{ fontWeight: 'bold' }} key={0} label={'Activity'} value={0} />
        <Tab sx={{ fontWeight: 'bold' }} key={1} label={'Profiles'} value={1} />
        <Tab sx={{ fontWeight: 'bold' }} key={2} label={'Balance'} value={2} />
      </Tabs>
      <Divider></Divider>
      <TabPanel selectedIndex={TabIndex} index={0}>
        {/* @ts-ignore */}
        {etherData?.data['0']?.total ? (
          <EtherActivity list={etherData?.data['0']?.result}></EtherActivity>
        ) : (
          <div>Empty Activity</div>
        )}
      </TabPanel>
      <TabPanel selectedIndex={TabIndex} index={1}>
        Empty
      </TabPanel>
      <TabPanel selectedIndex={TabIndex} index={2}>
        {/* @ts-ignore */}
        <EtherWalletBalance
          wallet={boundWallet?.data
            ?.filter(val => val[0] == nidInfo?.data?.nid && val[1] === 'metamask')
            .map(val => val[2])}
        />
      </TabPanel>
    </Box>
  );

  function TabPanel(props) {
    const { children, selectedIndex, index } = props;

    return (
      <Box p={2} hidden={selectedIndex !== index}>
        {children}
      </Box>
    );
  }
}

function EtherWalletBalance({ wallet }: { wallet: any }) {
  const [walletBalance, setBalance] = useState([]);
  useEffect(() => {
    getTotalBalance(wallet).then(res => setBalance(res));
  }, wallet || []);

  if (!wallet?.length) {
    return <Typography>Please bind your ETH wallet first!</Typography>;
  }
  return (
    <Stack direction={'row'} flexWrap="wrap" alignItems={'center'} spacing={2}>
      {walletBalance.map((balance, i) => {
        return (
          <Card key={i} sx={{ padding: '6px', textAlign: 'center' }}>
            <Typography variant="h6">{balance / 1e18} ETH</Typography>
            <Typography variant="caption">{wallet[i]}</Typography>
          </Card>
        );
      })}
    </Stack>
  );
}

function EtherActivity({ list }: { list: any }) {
  return (
    <Stack direction={'column'} spacing={1.5}>
      {list.map(val => {
        return (
          <Card sx={{ padding: '6px' }} key={val.timestamp} variant="outlined" elevation={1}>
            <Stack direction={'row'} alignItems="center">
              <Typography variant="caption">Sent:&ensp;</Typography>
              {/* @ts-ignore */}
              <Typography variant="subtitle1">
                {val?.actions?.[0]?.metadata?.value_display}&ensp;{val?.actions?.[0]?.metadata?.symbol}
              </Typography>
            </Stack>
            <Stack direction={'row'} alignItems="center">
              <Typography variant="caption">From:&ensp;</Typography>
              <Typography variant="body1">{briefName(val.address_from)}</Typography>
              <Typography variant="caption">&ensp;&ensp;&ensp;To:&ensp;&ensp;&ensp;</Typography>
              <Typography variant="body1">{briefName(val.address_to)}</Typography>
            </Stack>
            <Typography variant="overline">{val.timestamp}</Typography>
          </Card>
        );
      })}
    </Stack>
  );
}

function formReducer(state, action) {
  if (action.type == 'update') {
    return {
      ...state,
      [action.key]: action.value,
    };
  }
  if (action.type == 'reset') {
    return { ...action.value };
  }
}
