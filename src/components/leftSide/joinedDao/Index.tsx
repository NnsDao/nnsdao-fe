import { Avatar, Box, Grid, Tooltip, Zoom } from '@mui/material';

export default function JoinedDao(props) {
  // const data = props.data;
  // const navigator = useNavigate();
  const data = [
    {
      canister: '1',
      avatar: '',
      name: '1',
    },
    {
      canister: '2',
      avatar: '',
      name: '1',
    },
    {
      canister: '3',
      avatar: '',
      name: '1',
    },
    {
      canister: '4',
      avatar: '',
      name: '1',
    },
    {
      canister: '5',
      avatar: '',
      name: '1',
    },
    {
      canister: '6',
      avatar: '',
      name: '1',
    },
    {
      canister: '7',
      avatar: '',
      name: '1',
    },
    {
      canister: '8',
      avatar: '',
      name: '1',
    },
    {
      canister: '9',
      avatar: '',
      name: '1',
    },
    {
      canister: '10',
      avatar: '',
      name: '1',
    },
    {
      canister: '12',
      avatar: '',
      name: '1',
    },
  ];
  const toDetailPage = item => {
    // navigator(`/daoDetail/:${item.canister}`);
  };

  return (
    <>
      <Grid container direction="column" alignItems="center" spacing={0}>
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
      </Grid>
    </>
  );
}
