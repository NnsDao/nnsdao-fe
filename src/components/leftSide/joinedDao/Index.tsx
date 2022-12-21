import { Avatar, Stack, Tooltip, Zoom } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../../../hooks/globalState';
import { useUserStore } from '../../../hooks/userStore';
// const observer = new QueryObserver(queryClient, { queryKey: daoManagerKeys.lists() });

export default function JoinedDao() {
  const [globalState, dispatchAction] = useGlobalState();
  const [userStore] = useUserStore();
  const navigate = useNavigate();
  const toDetailPage = item => {
    if (item.info.canister_id) {
      navigate(`/dao/${item.info.canister_id}`);
      return;
    }
    navigate(`/createDao`);
  };
  const placeHolder = [
    {
      info: {
        name: 'Create DAOs',
        canister_id: 'xxx',
        avatar: '',
      },
    },
  ];
  let data: any = [];
  if (globalState.totalDaoList?.length) {
    data = globalState.totalDaoList.filter(item =>
      item.member_list.find(data => data.principal.toText() == userStore?.principalId)
    );
  }
  console.log('data.totalDaoList', data);
  data = data?.length ? data : placeHolder;

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
          key={item.info.canister_id}
          title={item.info.name}
          TransitionComponent={Zoom}
          placement="right"
          TransitionProps={{ timeout: 200 }}>
          <Avatar
            alt="Remy Sharp"
            src={item.info.avatar}
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
