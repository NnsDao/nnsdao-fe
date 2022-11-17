import { Avatar, AvatarGroup, Button, Card, CardContent } from '@mui/material';
import { Box } from '@mui/system';

export default function Treasury() {
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
          $898989
        </Box>
        <Box
          sx={{
            fontFamily: 'Roboto',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '30px',
            color: '#B5B5C3',
          }}>
          treasury
        </Box>
        <AvatarGroup max={6} sx={{ justifyContent: 'flex-end', py: '16px' }}>
          <Avatar></Avatar>
          <Avatar></Avatar>
          <Avatar></Avatar>
          <Avatar></Avatar>
          <Avatar></Avatar>
          <Avatar></Avatar>
          <Avatar></Avatar>
          <Avatar></Avatar>
        </AvatarGroup>
        <Box>
          <Button variant="contained">Invite Contributors</Button>
          <Button>Invite New</Button>
        </Box>
      </CardContent>
    </Card>
  );
}
