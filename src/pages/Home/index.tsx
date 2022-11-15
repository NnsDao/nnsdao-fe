import { Container } from '@mui/material';
import { useTotalDaoLists } from '../../api/dao_manager';
import Hello from '../../components/Hello';
import LoadingWrapper from '../../components/LoadingWrapper';
import DashBoard from './components/dashBoard/Index';
import DaoList from './daoList/Index';

export default function Home(props) {
  const HelloWrap = LoadingWrapper(Hello, useTotalDaoLists);
  return (
    <Container maxWidth="xl">
      <DashBoard />
      <DaoList></DaoList>
    </Container>
  );
}
