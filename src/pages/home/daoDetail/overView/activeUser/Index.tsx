import { Card, CardContent } from '@mui/material';
import { Box } from '@mui/system';
import { MemberItems } from '@nnsdao/nnsdao-kit/nnsdao/types';
import { useParams } from 'react-router-dom';
import { useMemberList } from '../../../../../api/nnsdao';
import LoadingWrapper from '../../../../../components/LoadingWrapper';

function ActiveUser(props) {
  const list: MemberItems[] = props.data;

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box
          sx={{
            fontFamily: 'Roboto',
            fontWeight: 700,
            fontSize: '34px',
            lineHeight: '40px',
            color: '#181C32',
          }}>
          {list.length}
        </Box>
        <Box
          sx={{
            fontFamily: 'Roboto',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '30px',
            color: '#B5B5C3',
            marginBottom: '23px',
          }}>
          Active User
        </Box>
        <Box sx={{ height: '100px' }}>charts</Box>
      </CardContent>
    </Card>
  );
}

export default function WrapperActiveUser() {
  const { cid } = useParams();
  const User = LoadingWrapper(ActiveUser, () => useMemberList(cid as string));
  return <User></User>;
}
