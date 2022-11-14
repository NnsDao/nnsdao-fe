import { Avatar, Stack, Tooltip, Zoom } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function JoinedDao() {
  const navigate = useNavigate();
  const toDetailPage = item => {
    navigate(`/daoDetail/:${item.canister}`);
  };
  const data = Array.from({ length: 12 }).map((item, i) => ({
    canister: i + 1,
    avatar: i + 1,
    name: i + 1,
  }));
  return (
    <Stack
      spacing={1}
      sx={{
        height: '100%',
        overflowY: 'auto',
        paddingX: '15px', // used to hidden scrollbar
        width: '100%',
        boxSizing: 'content-box',
      }}>
      {data.map((item, index) => (
        <Tooltip
          key={item.canister}
          title={item.name}
          TransitionComponent={Zoom}
          placement="right"
          TransitionProps={{ timeout: 200 }}>
          <Avatar
            alt="Remy Sharp"
            src={String(item.avatar)}
            onClick={() => toDetailPage(item)}
            sx={{
              width: 47,
              height: 47,
              cursor: 'pointer',
              margin: '10px !important',
              padding: '2px',
              border: '2px solid #fff',
              '&:hover': { border: '2px solid #39a8d3' },
            }}
          />
        </Tooltip>
      ))}
    </Stack>
  );
}
