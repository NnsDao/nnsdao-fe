import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import GitHubIcon from '@mui/icons-material/GitHub';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Avatar, Button, MobileStepper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/system';
export default function Introduction() {
  const activeStep = 66;
  return (
    <>
      <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} xs={12}>
        <Grid sx={{ display: 'flex', alignItems: 'center' }} xs={9}>
          <Grid xs={2.5}>
            <Avatar sx={{ width: '150px', height: '150px' }}></Avatar>
          </Grid>
          <Grid
            xs={6}
            sx={{
              fontFamily: 'Roboto',
              fontStyle: 'normal',
              fontSize: '14px',
              lineHeight: '14px',
              color: '#B5B5C3',
            }}>
            <Box
              sx={{ fontFamily: 'Roboto', fontWeight: '700', fontSize: '19px', lineHeight: '22px', color: '#3F4254' }}>
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
            <Grid container>
              <Grid container mr={1}>
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
              </Grid>
              <Grid container mr={1}>
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
              </Grid>{' '}
              <Grid container mr={1}>
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
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box></Box>
            <Button>Join </Button>
            <Button variant="contained"> + Proposals</Button>
          </Box>
          <Grid xs={12} sx={{ pt: '60px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>DAOs status</Box>
              <Box>{activeStep + '%'}</Box>
            </Box>
            <Grid xs={12}>
              <MobileStepper
                variant="progress"
                steps={100}
                position="static"
                activeStep={activeStep}
                sx={{ width: '550px' }}
                backButton={undefined}
                nextButton={undefined}></MobileStepper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ mt: '30px', pl: '30px' }}>
        <GitHubIcon sx={{ cursor: 'pointer' }}></GitHubIcon>
        <TwitterIcon sx={{ ml: '34px', cursor: 'pointer' }} htmlColor="#3191e7"></TwitterIcon>
        <TelegramIcon sx={{ ml: '34px', cursor: 'pointer' }} htmlColor="#3B9Ee2"></TelegramIcon>
      </Box>
    </>
  );
}
