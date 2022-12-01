import { Avatar, Stack, Tooltip, Zoom } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../../../hooks/globalState';
// const observer = new QueryObserver(queryClient, { queryKey: daoManagerKeys.lists() });

export default function JoinedDao() {
  const [globalState, dispatchAction] = useGlobalState();
  const navigate = useNavigate();
  const toDetailPage = item => {
    if (item.canister_id) {
      navigate(`/dao/:${item.canister_id}`);
      return;
    }
    navigate(`/createDao`);
  };
  const placeHoder = [
    {
      name: 'Create DAOs',
      canister_id: '',
      avatar: '',
    },
  ];
  const data = (globalState.joinedDaoList?.length && globalState.joinedDaoList) || placeHoder;
  console.log('data.joinedDaoList', data);

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
          key={item.canister_id + item.name + index}
          title={item.name}
          TransitionComponent={Zoom}
          placement="right"
          TransitionProps={{ timeout: 200 }}>
          <Avatar
            alt="Remy Sharp"
            src={item.avatar}
            onClick={() => toDetailPage(item)}
            sx={{
              width: 47,
              height: 47,
              cursor: 'pointer',
              margin: '10px !important',
              border: '2px solid #fff',
              '&:hover': { border: '2px solid #39a8d3' },
            }}
          />
        </Tooltip>
      ))}
    </Stack>
  );
}
