import { Avatar, AvatarGroup, Box, Button, Chip, Paper, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import type { DaoInfo } from '@nnsdao/nnsdao-kit/src/dao_manager/types';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useGetDaoInfo, useJoin, useMemberList } from '../../../../api/nnsdao';
import { nnsdaoKeys } from '../../../../api/nnsdao/queries';
import { useGlobalState } from '../../../../hooks/globalState';
import { useUserStore } from '../../../../hooks/userStore';

export default function List(props) {
  const filterStr = props.filterStr;
  const data: DaoInfo[] = props.data;
  const navigate = useNavigate();
  const toDaoDetail = item => {
    navigate(`/dao/${item.name}`);
  };
  const list = filterStr ? data.filter(info => new RegExp(filterStr, 'i').test(info.tags.join(' '))) : data;
  return (
    <Grid container spacing={{ lg: 3, sm: 2 }}>
      {list.map(item => (
        <Grid key={item.canister_id.toText()} xs={12} sm={6} md={4} xl={3}>
          <Card metadata={item}></Card>
        </Grid>
      ))}
    </Grid>
  );
}

const Card = ({ metadata }) => {
  const cid = metadata.canister_id.toText();
  const controller = metadata.controller.map(principal => principal.toText());
  // console.log('card,cid', cid);
  const [userInfo, dispatch] = useUserStore();
  const info = useGetDaoInfo(cid);
  const daoMember = useMemberList(cid);
  const data = info.data;
  const chipState: string = Object.keys(metadata.status)?.[0];
  const navigate = useNavigate();
  const joinMutation = useJoin();
  const [globalState, dispatchAction] = useGlobalState();

  useEffect(() => {
    if (
      info.data &&
      userInfo.isLogin &&
      hasJoin(userInfo.principalId) &&
      !globalState.joinedDaoList?.find(item => item?.canister_id.toText() == cid)
    ) {
      // console.log('globalState.joinedDaoList', globalState);
      dispatchAction({
        type: 'changeDaoList',
        data: [...globalState.joinedDaoList, { ...info.data, ...metadata }],
      });
    }
  }, [info.data, userInfo.principalId]);

  function joinDao(e) {
    e.stopPropagation();
    e.preventDefault();
    const toastId = toast.loading('loading...');
    const queryClient = useQueryClient();
    joinMutation.mutate(
      { cid, nickname: userInfo.nickname, social: [], intro: userInfo.intro, avatar: userInfo.avatar },
      {
        onSuccess(data, variables) {
          console.log('data,var', data, variables);

          const { cid } = variables;
          const queryKey = nnsdaoKeys.member_list(cid);
          const preList = queryClient.getQueryData(queryKey) ?? [];
          // @ts-ignore
          queryClient.setQueryData(queryKey, preList.concat(data));
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
    <Paper elevation={3} sx={{ height: '100%' }} onClick={() => navigate(`/dao/${cid}`)}>
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
              {new Date((data?.create_at || 0) / 1e6).toLocaleString()}
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
