import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Alert, Button, Card, IconButton, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Stack } from '@mui/system';
import { CanisterStatusResponse } from '@nnsdao/nnsdao-kit/nnsdao/types';
import { useNavigate, useParams } from 'react-router-dom';
import { useCopyToClipboard } from 'usehooks-ts';
import { useGetDaoInfo, useGetDaoStatus } from '../../../../api/nnsdao';
import { arrToMap } from '../../../../common/helper';
import LoadingWrapper from '../../../../components/LoadingWrapper';
import { TwitterList } from '../../../user';
import ActiveUser from './activeUser/Index';
import Introduction from './introduction/Index';
import NewsMember from './newsMember/Index';
import Treasury from './treasury/Index';
export default function OverView() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const daoInfo = useGetDaoInfo(cid as string);
  // @ts-ignore
  const option = arrToMap(daoInfo.data?.option || []);
  const WrapDaoStatus = LoadingWrapper(DaoStatus, () => useGetDaoStatus(cid as string));
  return (
    <Stack spacing={{ lg: 4, sm: 2 }}>
      <Grid container alignItems="stretch" spacing={{ xl: 1, sm: 2 }}>
        <Grid sm={12} lg={4}>
          <ActiveUser></ActiveUser>
        </Grid>
        <Grid sm={12} lg={4}>
          <Treasury></Treasury>
        </Grid>
        <Grid sm={12} lg={4}>
          <NewsMember></NewsMember>
        </Grid>
      </Grid>
      <Introduction></Introduction>
      <Grid container alignItems="stretch" justifyContent={'space-between'} spacing={0} columnGap={{ xl: 1, sm: 3 }}>
        <Grid sm={12} lg={7}>
          {
            // @ts-ignore
            option?.twitter ? (
              <TwitterList link={option?.twitter}></TwitterList>
            ) : (
              <Paper sx={{ p: 2 }}>
                <Stack spacing={2}>
                  <Alert severity="warning">You don't bind your twitter social account — check it out!</Alert>
                  <Button variant="text" onClick={() => navigate(`/dao/${cid}/Setting`)}>
                    Go settings
                  </Button>
                </Stack>
              </Paper>
            )
          }
        </Grid>
        <Grid sm={12} lg={4}>
          <WrapDaoStatus></WrapDaoStatus>
        </Grid>
      </Grid>
    </Stack>
  );
}

export function DaoStatus(props) {
  const data: CanisterStatusResponse = props.data;
  const [, copy] = useCopyToClipboard();
  const { cid } = useParams();
  const list = [
    ['Status:', Object.keys(data.status)],
    ['Memory size:', Number(data.memory_size)],
    ['Freezing threshold:', Number(data.settings.freezing_threshold)],
    ['Memory allocation:', Number(data.settings.memory_allocation)],
    ['Compute allocation:', Number(data.settings.compute_allocation)],
  ];
  async function addCycle() {
    //
  }
  return (
    <Card sx={{ py: 1, px: 1.5 }}>
      <Stack spacing={1}>
        <Typography variant="h6" fontWeight={'bold'}>
          {(Number(data.cycles) / 1e12).toFixed(2)}T Cycles
        </Typography>
        <Button variant="outlined" onClick={addCycle}>
          Add Cycle
        </Button>

        {list.map(([key, value]) => {
          return (
            <Stack direction={'row'} key={key}>
              <Typography color="GrayText">{key}&nbsp;</Typography>
              <Typography color={'CaptionText'} variant="body1">
                {value}
              </Typography>
            </Stack>
          );
        })}
        <Stack direction={'row'} alignItems="center">
          <Typography variant="caption" fontWeight={'bold'}>
            {cid}&nbsp;&nbsp;
          </Typography>
          <IconButton onClick={() => copy(cid as string)}>
            <ContentCopyIcon></ContentCopyIcon>
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  );
}
