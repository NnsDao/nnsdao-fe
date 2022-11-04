import nnsdaoLogo from '@/public/home/nnsdaoLogo.ico';
import { Avatar } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import JoinedDao from './joinedDao/Index';
export default function LeftSidePanel() {
  // const JoinedDaoWrap = LoadingWrapper(joinedDao, useTotalDaoLists);
  return (
    <>
      <Grid container direction="column" alignItems="center" spacing={5}>
        <Grid xl={1} sx={{ marginTop: '24px' }}>
          <Avatar
            alt="Remy Sharp"
            src={nnsdaoLogo}
            sx={{
              width: 63,
              height: 63,
              cursor: 'pointer',
            }}
          />
        </Grid>
        <Grid xl={10} overflow="hidden">
          <JoinedDao />
        </Grid>
        <Grid xl={1} sx={{ marginBottom: '24px' }}>
          <Avatar
            alt="Remy Sharp"
            src={nnsdaoLogo}
            sx={{
              width: 63,
              height: 63,
              cursor: 'pointer',
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
