import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import GitHubIcon from '@mui/icons-material/GitHub';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Avatar, Button, LinearProgress, Paper, Stack } from '@mui/material';

import { Box } from '@mui/system';
export default function Introduction() {
  const activeStep = 66;
  return (
    <Paper>
      <Stack
        justifyContent={'space-between'}
        direction={'row'}
        alignItems="center"
        p={{ lg: 4, sm: 2 }}
        spacing={{ lg: 4, sm: 2 }}>
        <Avatar sx={{ width: '150px', height: '150px' }}></Avatar>
        <Stack
          sx={{
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontSize: '14px',
            lineHeight: '14px',
            color: '#B5B5C3',
          }}>
          <Box sx={{ fontFamily: 'Roboto', fontWeight: '700', fontSize: '19px', lineHeight: '22px', color: '#3F4254' }}>
            NnsDa inprogress |
          </Box>
          <Box sx={{ display: 'flex', my: '14px', mb: '25px' }}>
            <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
              <AdminPanelSettingsIcon sx={{ mr: '3px', fontSize: '18px' }}></AdminPanelSettingsIcon>
              NnsdaoLabs
            </Box>
            <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
              <LocationOnIcon sx={{ mr: '3px', fontSize: '18px' }}></LocationOnIcon>
              Westwood
            </Box>
            <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
              <AlternateEmailIcon sx={{ mr: '3px', fontSize: '18px' }}></AlternateEmailIcon>
              team@nnsdao.org
            </Box>
          </Box>
          <Stack>
            <Stack>
              <Box sx={{ border: '1px dashed grey', padding: '9px 33px 10px 13px' }}>
                <Box
                  sx={{
                    fontFamily: 'Roboto',
                    fontWeight: 900,
                    fontSize: '24px',
                    lineHeight: '28px',
                    color: '#3F4254',
                    paddingBottom: '3px',
                  }}>
                  $122
                </Box>
                <Box
                  sx={{
                    fontFamily: 'Roboto',
                    fontWeight: 500,
                    fontSize: '13px',
                    lineHeight: '15px',
                    color: '#B5B5C3',
                  }}>
                  Total Earnings
                </Box>
              </Box>
            </Stack>
            <Stack>
              <Box sx={{ border: '1px dashed grey', padding: '9px 33px 10px 13px' }}>
                <Box
                  sx={{
                    fontFamily: 'Roboto',
                    fontWeight: 900,
                    fontSize: '24px',
                    lineHeight: '28px',
                    color: '#3F4254',
                    paddingBottom: '3px',
                  }}>
                  133
                </Box>
                <Box
                  sx={{
                    fontFamily: 'Roboto',
                    fontWeight: 500,
                    fontSize: '13px',
                    lineHeight: '15px',
                    color: '#B5B5C3',
                  }}>
                  New NIP
                </Box>
              </Box>
            </Stack>{' '}
            <Stack>
              <Box sx={{ border: '1px dashed grey', padding: '9px 33px 10px 13px' }}>
                <Box
                  sx={{
                    fontFamily: 'Roboto',
                    fontWeight: 900,
                    fontSize: '24px',
                    lineHeight: '28px',
                    color: '#3F4254',
                    paddingBottom: '3px',
                  }}>
                  177
                </Box>
                <Box
                  sx={{
                    fontFamily: 'Roboto',
                    fontWeight: 500,
                    fontSize: '13px',
                    lineHeight: '15px',
                    color: '#B5B5C3',
                  }}>
                  New Proposals
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Stack>

        <Stack spacing={2}>
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button>Join </Button>
            <Button variant="contained"> + Proposals</Button>
          </Stack>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>DAOs status</Box>
              <Box>{activeStep + '%'}</Box>
            </Box>
            <LinearProgress sx={{ borderRadius: 8 }} variant="determinate" value={50} />
          </Stack>
        </Stack>
      </Stack>
      <Box sx={{ mt: '30px', pl: '30px' }}>
        <GitHubIcon sx={{ cursor: 'pointer' }}></GitHubIcon>
        <TwitterIcon sx={{ ml: '34px', cursor: 'pointer' }} htmlColor="#3191e7"></TwitterIcon>
        <TelegramIcon sx={{ ml: '34px', cursor: 'pointer' }} htmlColor="#3B9Ee2"></TelegramIcon>
      </Box>
    </Paper>
  );
}
