import { Avatar, AvatarGroup, Box, Chip, Paper, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router-dom';
import { useGetDaoData } from '../../../../api/nnsdao';
import { useGlobalState } from '../../../../hooks/globalState';
import { JoinDaoBtn } from './JoinDaoBtn';

export default function List(props) {
  const filterStr = props.filterStr;
  const statusStr = props.statusStr;
  const [globalState] = useGlobalState();
  const data: string[] = props.data;
  const ownerID: string = props.ownerID;
  const navigate = useNavigate();
  const toDaoDetail = item => {
    navigate(`/dao/${item.name}`);
  };
  // console.log('listupdate', filterStr, data);

  let list = data;
  // only list user owned dao
  if (ownerID && globalState.totalDaoList?.length) {
    // @ts-ignore
    list = globalState.totalDaoList.filter(data => !!data.owners.find(cid => cid == ownerID));
  }
  // search
  if (filterStr) {
    // @ts-ignore
    list = globalState.totalDaoList.filter(data => new RegExp(filterStr, 'i').test(data.info?.tags?.join(' ') ?? ''));
  }
  // status filter
  if (statusStr) {
    // @ts-ignore
    list = globalState.totalDaoList.filter(data =>
      new RegExp(statusStr, 'i').test(Object.keys(data.status.status)?.['0'] ?? '')
    );
  }

  list = list.map(item => {
    if (typeof item == 'string') {
      return { canister_id: item };
    }
    // @ts-ignore
    return { canister_id: item.info.canister_id, ...item };
  });
  return (
    <Grid container spacing={{ lg: 3, sm: 2 }}>
      {list.map(item => (
        // @ts-ignore
        <Grid key={item.canister_id} xs={12} sm={6} md={4} xl={3}>
          {/* @ts-ignore */}
          <Card cid={item.canister_id}></Card>
        </Grid>
      ))}
    </Grid>
  );
}

type CardT = {
  cid: string;
};
const Card = (props: CardT) => {
  const { cid } = props;
  const daoData = useGetDaoData(cid);
  // const [globalState, dispatchAction] = useGlobalState();

  // useEffect(() => {
  //   if (daoData.data) {
  //     let list = globalState.totalDaoList?.filter(item => item.info?.canister_id !== cid);
  //     dispatchAction({
  //       type: 'changeDaoList',
  //       data: list.concat(daoData.data),
  //     });
  //   }
  // }, [daoData.data]);

  const info = daoData?.data?.info;
  const daoStatus = daoData?.data?.status;
  const daoMember = daoData.data?.member_list;
  // @ts-ignore
  const chipState: string = Object.keys(daoStatus?.status || {})?.[0];
  const navigate = useNavigate();

  return (
    <Paper elevation={3} sx={{ height: '100%' }} onClick={() => navigate(`/dao/${cid}`)}>
      <Stack spacing={{ sm: 2 }} p={'25px'}>
        <Stack direction="row" justifyContent="space-between" alignItems={'center'}>
          <Avatar
            src={info?.avatar}
            sx={{
              width: '46px',
              height: '46px',
              padding: '12px',
              background: '#F5F8FA',
              borderRadius: '6px',
            }}></Avatar>
          {chipState && (
            <Chip color={/stop/i.test(chipState) ? 'warning' : 'success'} variant="outlined" label={chipState}></Chip>
          )}
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
            {info?.name}
          </Typography>
        </Box>
        <Stack direction="row" justifyContent={'space-between'} alignItems="center">
          <Box>
            <Box
              sx={{
                fontFamily: 'Roboto',
                fontWeight: 700,
                fontSize: '14px',
                lineHeight: '16px',
                color: '#5E6278',
                paddingBottom: '3px',
              }}>
              {new Date(Number(info?.created_at || 0) / 1e6).toLocaleString()}
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
          <Stack direction={'row'} spacing={0.5}>
            {info?.tags.map(tag => {
              return <Chip key={tag} variant="outlined" label={tag} clickable></Chip>;
            })}
          </Stack>
          {/* <Box sx={{ border: '1px dashed grey', padding: '9px 33px 10px 13px' }}>
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
          </Box> */}
        </Stack>

        <Stack direction="row" justifyContent={'space-between'} alignItems="center">
          <AvatarGroup max={3}>
            {daoMember?.map(member => {
              return <Avatar key={member.principal.toText()} src={member.avatar}></Avatar>;
            })}
          </AvatarGroup>
          <JoinDaoBtn variant="outlined" cid={cid}></JoinDaoBtn>
        </Stack>
      </Stack>
    </Paper>
  );
};
