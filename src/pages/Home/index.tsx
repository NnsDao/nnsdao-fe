import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTotalDaoLists } from '../../api/dao_manager';
import Hello from '../../components/Hello';
import LoadingWrapper from '../../components/LoadingWrapper';
import DashBoard from './components/dashBoard/Index';
import DaoList from './daoList/Index';

export default function Home(props: any) {
  console.log('WrappedComponent');
  const HelloWrap = LoadingWrapper(Hello, useTotalDaoLists);
  return (
    <Grid container direction="column" alignItems="center" sx={{ background: ' #F9FAFB' }}>
      <Grid xs={11}>
        <DashBoard />
      </Grid>

      <Grid xs={11}>
        <Box sx={{ height: '1px', width: '100%', background: '#D7D3D3' }} />
      </Grid>
      <Grid xs={11}>
        <DaoList />
      </Grid>
    </Grid>
  );
}
