import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Avatar, Button, Card, Divider, Paper, Tab, Tabs, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffectOnce, useToggle } from 'usehooks-ts';
import { useTotalDaoLists } from '../api/dao_manager';
import { useNidInfo } from '../api/nid';
import LoadingWrapper from '../components/LoadingWrapper';
import LoginDialog from '../components/LoginDialog';
import { useGlobalState } from '../hooks/globalState';
import { useUserStore } from '../hooks/userStore';
import List from './home/daoList/list/Index';
dayjs.extend(relativeTime);

function User() {
  const [selectedMenu, setSelectedMenu] = React.useState(0);
  const [userStore] = useUserStore();
  const nidInfo = useNidInfo();
  const [open, toggleLogin] = useToggle();
  const DaoList = LoadingWrapper(List, useTotalDaoLists);
  function handleChange(e, val) {
    setSelectedMenu(val);
  }
  const menu = [
    { key: 'OverView', value: 0 },
    { key: 'Created DAOs', value: 1 },
    // { key: 'Followers', value: 2 },
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
          <TwitterList link={'https://twitter.com/heyibinance'}></TwitterList>
        </TabPanel>
        <TabPanel selectedIndex={selectedMenu} index={1}>
          <DaoList ownerID={userStore.principalId}></DaoList>
        </TabPanel>
        <TabPanel selectedIndex={selectedMenu} index={2}></TabPanel>
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
  const [globalStore] = useGlobalState();
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
    <Paper sx={{ padding: 3, marginTop: 3 }}>
      <Stack direction={'row'} alignItems="center">
        <Avatar variant="rounded" src={nidInfo?.data?.avatar ?? ''} sx={{ width: '160px', height: '160px' }}></Avatar>
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
              </Stack>
            </Stack>
            <Button variant="outlined" onClick={() => navigate('/createDao')}>
              Create Dao
            </Button>
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
  );
}
