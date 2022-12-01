import { Avatar, AvatarGroup, Button, Card, CardContent } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { MemberItems } from '@nnsdao/nnsdao-kit/nnsdao/types';
import { useParams } from 'react-router-dom';
import { useMemberList } from '../../../../../api/nnsdao';
import LoadingWrapper from '../../../../../components/LoadingWrapper';
function NewsMember(props) {
  const memberList: MemberItems[] = props.data;
  let now = Date.now();
  // latest 3 days
  const newCome = memberList.filter(member => now - (Number(member?.join_at) / 1e6 || now) <= 36e5 * 24 * 3);
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
          {newCome.length}
        </Box>
        <Box
          sx={{
            fontFamily: 'Roboto',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '30px',
            color: '#B5B5C3',
          }}>
          New Member
        </Box>
        <AvatarGroup max={6} sx={{ justifyContent: 'flex-end', py: '16px' }}>
          {memberList.map(member => {
            return <Avatar key={member.principal.toHex()} src={member.avatar}></Avatar>;
          })}
        </AvatarGroup>
        <Stack spacing={{ lg: 2, sm: 1 }} direction="row">
          <Button variant="contained">Invite Contributors</Button>
          <Button>Invite New</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function wrapMember() {
  const { cid } = useParams();
  const NewMember = LoadingWrapper(NewsMember, () => useMemberList(cid as string));
  return <NewMember></NewMember>;
}
