import { Avatar, AvatarGroup, Button, Chip, Divider, Paper, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Proposal } from '@nnsdao/nnsdao-kit/nnsdao/types';
import { useLocation, useNavigate } from 'react-router-dom';

export default function List(props) {
  const data: [bigint, Proposal][] = props.list;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const menu = ['TARGET', 'DUE DATE', 'MEMBERS', 'STATUS', ''];
  return (
    <Paper sx={{ padding: '8px' }}>
      <Stack direction={'row'} my={{ sm: 1 }} justifyContent="space-between">
        {menu.map(text => {
          return (
            <Typography key={text} variant="subtitle1" color={'GrayText'}>
              {text}
            </Typography>
          );
        })}
      </Stack>
      {data.map(([id, item]) => (
        <Stack key={Number(id)} spacing={0.5}>
          <Divider sx={{ borderStyle: 'dotted' }}></Divider>
          <Stack direction={'row'} justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle1">{item.title}</Typography>
            {/* <Chip variant="filled" color="default" label={item.property['']}></Chip> */}
            <Typography variant="subtitle2">{new Date(Number(item.end_time) / 1e6).toLocaleDateString()}</Typography>
            <AvatarGroup max={3}>
              {item.vote_data.map(vote => {
                return <Avatar key={vote[0].toHex()}></Avatar>;
              })}
            </AvatarGroup>
            <Chip label={Object.keys(item.proposal_state)?.[0]}></Chip>
            <Button>View</Button>
          </Stack>
        </Stack>
      ))}
    </Paper>
  );
}
