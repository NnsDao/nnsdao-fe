import TocOutlinedIcon from '@mui/icons-material/TocOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import { Avatar, Card, FormControl, IconButton, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Stack } from '@mui/system';
import { MemberItems } from '@nnsdao/nnsdao-kit/src/nnsdao/types';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useMemberList } from '../../../../api/nnsdao';
import LoadingWrapper from '../../../../components/LoadingWrapper';

const orderList = ['Most active', 'First joined'];

export default function Users() {
  const { cid } = useParams();
  const [showType, setShowType] = React.useState('table');
  const [orderType, setOrderType] = React.useState('Most active');
  const List = LoadingWrapper(UserCard, () => useMemberList(cid as unknown as string));
  return (
    <React.Fragment>
      <TopMenu></TopMenu>
      <List></List>
    </React.Fragment>
  );

  function UserCard(props) {
    const data: MemberItems[] = props.data;
    return (
      <Grid
        container
        my={{ sm: 2, md: 4 }}
        columns={showType == 'linear' ? { xs: 11, sm: 2, md: 3 } : undefined}
        spacing={{ sm: 2 }}
        alignItems="stretch">
        {data.map(member => {
          return (
            <Grid xs={11} sm={2} md={3} key={member.principal.toText()}>
              <Card elevation={1} sx={{ height: '100%' }}>
                <Stack p={{ sm: 1, lg: 2 }} spacing={{ sm: 1 }} justifyContent="center" alignItems={'center'}>
                  <Avatar sizes="medium" src={member.avatar}></Avatar>
                  <Typography variant="h5" textOverflow="ellipsis" maxWidth={'100%'} overflow="hidden">
                    {member.nickname}
                  </Typography>
                  <Typography variant="body2" textOverflow="ellipsis" maxWidth={'100%'} overflow="hidden">
                    {member.intro}
                  </Typography>
                  <Stack direction={'row'} justifyContent="space-between">
                    <Box sx={{ border: '1px dashed #E4E6EF', padding: '6px 8px ', borderRadius: '8px' }}>
                      <Typography lineHeight={1.5} variant="subtitle1">
                        {'$1200'}
                      </Typography>
                      <Typography lineHeight={1} variant="body2" color={'gray'}>
                        {'Earings'}
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
  }

  function handleChange(e) {
    setOrderType(e.target.value);
  }

  function TopMenu() {
    return (
      <Stack direction="row" justifyContent={'space-between'} alignItems="center">
        <Box>
          <Typography component="span" variant="h5">
            User&nbsp;
          </Typography>
          <Typography component="span" variant="body1" color="gray">
            by {orderType}
          </Typography>
        </Box>
        <Stack direction={'row'} spacing={0.5} alignItems="center">
          {menuList.map(menu => {
            return (
              <IconButton
                size="medium"
                onClick={() => setShowType(menu.value)}
                color={getShowTypeColor(showType, menu.value)}>
                {menu.icon}
              </IconButton>
            );
          })}
          <FormControl sx={{ bgcolor: '#fff' }} size="small">
            <Select value={orderType} onChange={handleChange} input={<OutlinedInput />}>
              {orderList.map(name => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Stack>
    );
  }
}

function getShowTypeColor(
  showType: string,
  iconType: string
): 'inherit' | 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | undefined {
  if (showType == iconType) {
    return 'info';
  }
  return 'default';
}
const menuList = [
  {
    icon: <WidgetsOutlinedIcon></WidgetsOutlinedIcon>,
    value: 'table',
  },
  {
    icon: <TocOutlinedIcon></TocOutlinedIcon>,
    value: 'linear',
  },
];
