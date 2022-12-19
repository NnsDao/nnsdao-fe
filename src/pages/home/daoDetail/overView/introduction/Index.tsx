import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import GitHubIcon from '@mui/icons-material/GitHub';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Avatar, Button, Card, Link, Paper, Stack } from '@mui/material';

import { Box } from '@mui/system';
import { DaoInfo } from '@nnsdao/nnsdao-kit/nnsdao/types';

import { useNavigate, useParams } from 'react-router-dom';
import { useGetDaoInfo, useGetProposalList } from '../../../../../api/nnsdao';
import LoadingWrapper from '../../../../../components/LoadingWrapper';
import { JoinDaoBtn } from '../../../daoList/list/JoinDaoBtn';

function Introduction(props) {
  const { cid } = useParams() as { cid: string };
  const navigate = useNavigate();
  const proposalList = useGetProposalList(cid);

  const info: DaoInfo = props.data;
  const option =
    // @ts-ignore
    info.option?.reduce((acc, [key, val]) => {
      acc[key] = val;
      return acc;
    }, {}) || {};
  return (
    <Paper>
      <Stack
        justifyContent={'space-between'}
        direction={{ sm: 'column', md: 'row' }}
        alignItems="center"
        p={{ lg: 4, sm: 2 }}
        spacing={{ lg: 4, sm: 2 }}>
        <Avatar sx={{ width: '150px', height: '150px' }} src={info.avatar}></Avatar>
        <Stack
          sx={{
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontSize: '14px',
            lineHeight: '14px',
            color: '#B5B5C3',
          }}>
          <Box sx={{ fontFamily: 'Roboto', fontWeight: '700', fontSize: '19px', lineHeight: '22px', color: '#3F4254' }}>
            {info.name}
          </Box>
          <Box sx={{ display: 'flex', my: '14px', mb: '25px' }}>
            {/* <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
              <AdminPanelSettingsIcon sx={{ mr: '3px', fontSize: '18px' }}></AdminPanelSettingsIcon>
              NnsdaoLabs
            </Box> */}
            <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
              <LocationOnIcon sx={{ mr: '3px', fontSize: '18px' }}></LocationOnIcon>
              CanisterID:{cid}
            </Box>
            <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
              <AlternateEmailIcon sx={{ mr: '3px', fontSize: '18px' }}></AlternateEmailIcon>
              Email: {option?.['email'] || 'not set'}
            </Box>
          </Box>
          <Stack>
            <Card variant="elevation" sx={{ p: 1 }}>
              <Box
                sx={{
                  fontFamily: 'Roboto',
                  fontWeight: 900,
                  fontSize: '24px',
                  lineHeight: '28px',
                  color: '#3F4254',
                  paddingBottom: '3px',
                }}>
                {proposalList?.data?.length || '0'}
              </Box>
              <Box
                sx={{
                  fontFamily: 'Roboto',
                  fontWeight: 500,
                  fontSize: '13px',
                  lineHeight: '15px',
                  color: '#B5B5C3',
                }}>
                Total Proposals
              </Box>
            </Card>
          </Stack>
        </Stack>

        <Stack spacing={2}>
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <JoinDaoBtn cid={cid} variant="text"></JoinDaoBtn>
            <Button variant="contained" onClick={() => navigate(`/dao/${cid}/Proposals/create`)}>
              + Proposals
            </Button>
          </Stack>
          <Stack spacing={1}>
            {/* <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>DAOs status</Box>
              <Box>{activeStep + '%'}</Box>
            </Box>
            <LinearProgress sx={{ borderRadius: 8 }} variant="determinate" value={50} /> */}
          </Stack>
        </Stack>
      </Stack>
      <Box sx={{ mt: '30px', pl: '30px' }}>
        <Link href={option?.github}>
          <GitHubIcon sx={{ cursor: 'pointer' }}></GitHubIcon>
        </Link>
        <Link href={option?.twitter}>
          <TwitterIcon sx={{ ml: '34px', cursor: 'pointer' }} htmlColor="#3191e7"></TwitterIcon>
        </Link>
        <Link href={option?.telegram}>
          <TelegramIcon sx={{ ml: '34px', cursor: 'pointer' }} htmlColor="#3B9Ee2"></TelegramIcon>
        </Link>
      </Box>
    </Paper>
  );
}

export default function wrapIntro() {
  const { cid } = useParams();
  const Component = LoadingWrapper(Introduction, () => useGetDaoInfo(cid as string));
  return <Component></Component>;
}
