import { Avatar, AvatarGroup, Box, Chip, Paper, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import type { DaoInfo } from '@nnsdao/nnsdao-kit/src/dao_manager/types';
import { useNavigate } from 'react-router-dom';
import { useGetDaoInfo, useMemberList } from '../../../../api/nnsdao';
import { JoinDaoBtn } from './JoinDaoBtn';

export default function List(props) {
  const filterStr = props.filterStr;
  const data: DaoInfo[] = props.data;
  const navigate = useNavigate();
  const toDaoDetail = item => {
    navigate(`/dao/${item.name}`);
  };
  console.log('listupdate', filterStr, data);

  const list =
    // @ts-ignore
    filterStr ? data.filter(info => new RegExp(filterStr, 'i').test(info?.tags?.join(' ') ?? '')) : data;
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

type CardT = {
  metadata: DaoInfo;
};
const Card = (props: CardT) => {
  const { metadata } = props;
  const cid = metadata.canister_id.toText();
  const controller = metadata.controller.map(principal => principal.toText());
  const info = useGetDaoInfo(cid);
  const data = info.data;

  const daoMember = useMemberList(cid);
  const chipState: string = Object.keys(metadata.status)?.[0];
  const navigate = useNavigate();

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
          <Chip color={/stop/i.test(chipState) ? 'warning' : 'success'} variant="outlined" label={chipState}></Chip>
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
              {new Date(Number(metadata?.created_at || 0) / 1e6).toLocaleString()}
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
            {data?.tags.map(tag => {
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
            {daoMember.data?.map(member => {
              return <Avatar key={member.principal.toText()} src={member.avatar}></Avatar>;
            })}
          </AvatarGroup>
          <JoinDaoBtn variant="outlined" cid={cid}></JoinDaoBtn>
        </Stack>
      </Stack>
    </Paper>
  );
};
