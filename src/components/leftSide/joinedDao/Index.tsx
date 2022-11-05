import { Avatar, Box, Stack, Tooltip, Zoom } from '@mui/material';

export default function JoinedDao(props) {
  // const data = props.data;
  // const navigator = useNavigate();
  const data = Array.from({ length: 20 }).map((item, i) => ({
    canister: i + 1,
    avatar: i + 1,
    name: i + 1,
  }));

  const toDetailPage = item => {
    // navigator(`/daoDetail/:${item.canister}`);
  };

  return (
    <Stack
      spacing={1}
      sx={{
        height: '100%',
        overflowY: 'auto',
        padding: '15px',
        width: '100%',
        boxSizing: 'content-box',
      }}>
      {data.map((item, index) => (
        <Box key={item.canister}>
          <Tooltip title={item.name} TransitionComponent={Zoom} placement="right" TransitionProps={{ timeout: 200 }}>
            <Avatar
              alt="Remy Sharp"
              src={item.avatar}
              onClick={() => toDetailPage(item)}
              sx={{
                width: 47,
                height: 47,
                cursor: 'pointer',
                margin: '10px',
                '&:hover': { border: '2px solid #39a8d3' },
              }}
            />
          </Tooltip>
        </Box>
      ))}
    </Stack>
  );
}
