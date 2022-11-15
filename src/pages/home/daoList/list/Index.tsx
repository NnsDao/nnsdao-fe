import { Avatar, AvatarGroup, Box, Button, Chip, Paper, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { DaoInfo } from '@nnsdao/nnsdao-kit/src/dao_manager/types';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useGetDaoInfo, useJoin, useMemberList } from '../../../../api/nnsdao';
import { useUserStore } from '../../../../hooks/userStore';

export default function List(props) {
  const filterStr = props.filterStr;
  const data: DaoInfo[] = props.data;
  const navigate = useNavigate();
  const toDaoDetail = item => {
    navigate(`/daoDetail/${item.name}`);
  };
  const list = filterStr ? data.filter(info => new RegExp(filterStr, 'i').test(info.tags.join(' '))) : data;
  return (
    <Grid container spacing={{ lg: 3, sm: 2 }}>
      {list.map(item => (
        <Grid key={item.canister_id.toText()} xs={12} sm={6} md={4} xl={3}>
          <Card cid={item.canister_id.toText()} status={item.status}></Card>
        </Grid>
      ))}
    </Grid>
  );
}

const Card = ({ cid, status }) => {
  // console.log('card,cid', cid);
  const [userInfo, dispatch] = useUserStore();
  const info = useGetDaoInfo(cid);
  const daoMember = useMemberList(cid);
  const data = info.data;
  const chipState: string = Object.keys(status)?.[0];
  const navigate = useNavigate();
  const joinMutation = useJoin(cid);
  function joinDao(e) {
    e.stopPropagation();
    e.preventDefault();
    const toastId = toast.loading('loading...');
    joinMutation.mutate(
      { nickname: '', social: [], intro: 'blabla', avatar: 'https://www.baidu.com' },
      {
        onSuccess(data) {
          toast.success('Joined Successfully!', { id: toastId });
        },
        onError(error) {
          toast.error(String(error), { id: toastId });
        },
      }
    );
  }

  function hasJoin(principalId: string) {
    return !!daoMember.data?.find(member => member.principal.toText() === userInfo.principalId);
  }
  return (
    <Paper elevation={3} sx={{ height: '100%' }} onClick={() => navigate('/daoDetail/cid')}>
      <Stack spacing={{ sm: 2 }} p={'25px'}>
        <Stack direction="row" justifyContent="space-between" alignItems={'center'}>
          <Avatar
            src={data?.avatar}
            sx={{
              width: '46px',
              height: '46px',
              padding: '12px',
              background: '#F5F8FA',
              borderRadius: '6px',
            }}></Avatar>
          <Chip color={/stop/i.test(chipState) ? 'warning' : 'success'} label={chipState}></Chip>
        </Stack>
        <Box>
          <Typography
            variant="caption"
            sx={{
              fontFamily: 'Roboto',
              fontWeight: 700,
              fontSize: '22px',
              lineHeight: '30px',
              color: '#181C32',
            }}>
            {data?.name}
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              fontSize: '16px',
              color: '#B5B5C3',
            }}>
            {data?.intro}
          </Typography>
        </Box>
        <Stack direction="row" justifyContent={'space-between'}>
          <Box sx={{ border: '1px dashed grey', padding: '9px 33px 10px 13px' }}>
            <Box
              sx={{
                fontFamily: 'Roboto',
                fontWeight: 700,
                fontSize: '14px',
                lineHeight: '16px',
                color: '#5E6278',
                paddingBottom: '3px',
              }}>
              Feb 6, 2021
            </Box>
            <Box
              sx={{
                fontFamily: 'Roboto',
                fontWeight: 500,
                fontSize: '13px',
                lineHeight: '15px',
                color: '#B5B5C3',
              }}>
              Created At
            </Box>
          </Box>
          <Box sx={{ border: '1px dashed grey', padding: '9px 33px 10px 13px' }}>
            <Box
              sx={{
                fontFamily: 'Roboto',
                fontWeight: 700,
                fontSize: '14px',
                lineHeight: '16px',
                color: '#5E6278',
                paddingBottom: '3px',
              }}>
              $11111
            </Box>
            <Box
              sx={{
                fontFamily: 'Roboto',
                fontWeight: 500,
                fontSize: '13px',
                lineHeight: '15px',
                color: '#B5B5C3',
              }}>
              Budget
            </Box>
          </Box>
        </Stack>

        <Stack direction="row" justifyContent={'space-between'} alignItems="center">
          <AvatarGroup max={3}>
            {daoMember.data?.map(member => {
              return <Avatar key={member.principal.toText()} src={member.avatar}></Avatar>;
            })}
          </AvatarGroup>
          {(!userInfo.isLogin || !hasJoin(userInfo.principalId)) && (
            <Button variant="contained" onClick={e => joinDao(e)}>
              Join
            </Button>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};
