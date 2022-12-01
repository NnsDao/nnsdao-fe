import { useGetProposal, useMemberList, useVote } from '@/api/nnsdao';
import RichText from '@/components/RichText';
import { getNDPActor } from '@/service';
import { principalToAccountIdentifier } from '@dfinity/nns';
import { Principal } from '@dfinity/principal';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Stack } from '@mui/system';
import { Proposal } from '@nnsdao/nnsdao-kit/nnsdao/types';
import React from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useToggle } from 'usehooks-ts';
import { proposalStateToChipColor } from '../../../../common/helper';
import LoadingWrapper from '../../../../components/LoadingWrapper';
import LoginDialog from '../../../../components/LoginDialog';
import { useUserStore } from '../../../../hooks/userStore';
import VoteProgress from './vote/Index';

function ProposalDetail({ data }) {
  const Proposal: Proposal = data;
  const navigate = useNavigate();
  const { cid = '', id = '' } = useParams();

  // const voteMutation = useVote();
  const StructureList = ['1', '2', '3'];
  const [open, setOpen] = React.useState(false);
  const [voteType, setVoteType] = React.useState('');
  const pendingRef = React.useRef(false);

  const [userStore, dispatch] = useUserStore();
  const isLogin = userStore.isLogin;

  const handleClickOpen = string => {
    setVoteType(string);
    setOpen(true);
  };

  const handleClose = () => {
    if (pendingRef.current) {
      toast.error('The current poll is still in progress, please wait for the operation to complete and close');
      return;
    }
    setOpen(false);
  };

  const goLogin = () => {
    navigate('/login', { replace: true });
  };

  const goBack = () => {
    navigate(`/dao/${cid}/Proposals`, { replace: true });
  };

  const MemberInfo = ({ principalID }) => {
    const user = useMemberList(
      cid,
      React.useCallback(data => {
        return data.filter(item => item?.principal?.toText() === principalID);
      }, [])
    );
    let address = principalToAccountIdentifier(Principal.fromText(principalID));
    address = address.slice(0, 6) + '...' + address.slice(-6);
    return (
      <>
        <Avatar sx={{ width: 18, height: 18, marginX: '10px', cursor: 'pointer' }} src={user.data?.avatar}></Avatar>
        <Box component={'span'} sx={{ cursor: 'pointerern' }}>
          {address}
        </Box>
      </>
    );
  };
  return (
    <React.Fragment>
      <Grid container columnSpacing={2} rowSpacing={1} columns={{ xs: 8, md: 12 }} minHeight="100%">
        <Grid sm={8} minHeight="100%">
          <Stack bgcolor={'#fff'} minHeight="100%" spacing={2} padding={1}>
            <Stack
              direction={'row'}
              spacing={2}
              onClick={goBack}
              sx={{
                ':hover': {
                  bgcolor: '#1976d2',
                  cursor: 'pointer',
                },
              }}>
              <ArrowBackIcon></ArrowBackIcon>
              <Box component={'span'}>Back</Box>
            </Stack>
            <Box>{Proposal?.title}</Box>
            <Stack direction={'row'} justifyContent="space-between" alignItems="center">
              <Chip
                label={Object.keys(Proposal?.proposal_state || {})[0]}
                color={proposalStateToChipColor(Proposal?.proposal_state)}></Chip>
              <MemberInfo key={Proposal?.proposer.toText()} principalID={Proposal?.proposer.toText()}></MemberInfo>
              <Box flex={1}></Box>
              <Button variant="text">share</Button>
            </Stack>
            <RichText initialValue={JSON.parse(Proposal?.content) || 'Blank!'}></RichText>
            <Stack justifyContent={'center'} alignItems="stretch" spacing={2}>
              <Typography variant="subtitle1" textAlign={'center'}>
                Cast Your Vote
              </Typography>
              <Divider />
              <Stack direction={'row'} alignItems="strech" spacing={2}>
                <Button sx={{ flex: 1 }} variant="outlined" onClick={() => handleClickOpen('yes')}>
                  YES
                </Button>
                <Button sx={{ flex: 1 }} variant="outlined" onClick={() => handleClickOpen('no')}>
                  NO
                </Button>
              </Stack>
            </Stack>
            <VoteDataList></VoteDataList>
          </Stack>
        </Grid>
        <Grid sm={4}>
          <Stack spacing={2}>
            <InformationCard></InformationCard>
            <VoteInfoCard />
          </Stack>
        </Grid>
      </Grid>
      <VoteDialog></VoteDialog>
    </React.Fragment>
  );

  function VoteDialog() {
    // const [NDP, setNDP] = React.useState(0);
    const [inputValue, setInput] = React.useState(0);
    const [openLogin, toggleOpenLogin] = useToggle(false);
    const voteMutation = useVote();
    let principal = userStore.principalId;

    // useEffect(() => {
    //   !!principal && getBalance();
    // }, [principal]);

    // const getBalance = async () => {
    //   const NDPActor = await getNDPActor(true);
    //   const balanceNDP = await NDPActor.balanceOf(Principal.fromText(principal)).then(res => {
    //     return res;
    //   });
    //   console.log('balanceNDP', balanceNDP);
    //   setNDP((Number(balanceNDP) / 1e8) >> 0);
    // };

    const confirm = async () => {
      // step
      // 1 isLogin
      // 2 check Balance
      // 2 approve
      // 3 vote
      if (!isLogin) {
        toast.error('Login first please!');
        toggleOpenLogin();
        return;
      }
      // if (Number(inputValue) > NDP) {
      //   toast.error(`You can provide up to your balance ${NDP}`);
      //   return;
      // }
      const toastID = toast.loading('Awaiting approve...');
      pendingRef.current = true;
      const NDPActor = await getNDPActor(true);
      const approve = await NDPActor.approve(Principal.fromText(cid), BigInt(Number(inputValue) * 1e8));
      console.log('approve', approve);
      toast.loading('Updating...', { id: toastID });
      voteMutation.mutate(
        {
          cid,
          id: BigInt(+id),
          principal: [],
          vote: voteType == 'yes' ? { Yes: BigInt(inputValue) } : { No: BigInt(inputValue) },
        },
        {
          onSettled(data, error, variables, context) {
            pendingRef.current = false;
          },
          onSuccess(data, variables, context) {
            toast.success('Successfully voted', { id: toastID });
          },
          onError(error: any, variables, context) {
            toast.error(error.toString(), { id: toastID });
          },
        }
      );
    };
    return (
      <React.Fragment>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle textAlign={'center'}>Polling Overview</DialogTitle>
          <DialogContent sx={{ minWidth: '450px' }}>
            <Stack direction={'row'} justifyContent="space-between" alignItems={'center'}>
              <Typography variant="subtitle1">Options: </Typography>
              <Alert sx={{ border: 'none' }} variant="outlined" severity={/yes/.test(voteType) ? 'success' : 'error'}>
                {voteType.toUpperCase()}
              </Alert>
              {/* <Box>{voteType.toUpperCase()}</Box> */}
            </Stack>
            <Stack direction={'row'} justifyContent="space-between" alignItems={'center'}>
              <Typography variant="subtitle1">Vote Weights: </Typography>
              <TextField
                required
                type="number"
                label="NDP Amount"
                helperText="Vote Weight / NDP Amount = 1:1"
                variant="standard"
                onChange={e => setInput(parseInt(e.target.value) ?? 0)}></TextField>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={confirm}>
              Confirm
            </Button>
            <Button variant="outlined" onClick={handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <LoginDialog open={openLogin} toggleOpen={toggleOpenLogin}></LoginDialog>
      </React.Fragment>
    );
  }

  function VoteDataList() {
    if (!Proposal?.vote_data?.length) {
      return null;
    }
    return (
      <Stack>
        <Typography variant="subtitle1" textAlign={'center'}>
          Votes Data
        </Typography>
        <Divider variant="middle"></Divider>
        {Proposal?.vote_data.map(([principal, vote]) => (
          <Stack key={principal.toText()}>
            <Divider sx={{ height: '1px', width: '618px', background: '#282828' }} orientation="vertical" />
            <Stack direction="row" justifyContent={'space-evenly'}>
              <MemberInfo key={principal.toText()} principalID={principal.toText()}></MemberInfo>
              <Box>{Object.keys(vote || {})?.[0]}</Box>
              <Box>{Number(Object.values(vote || {})?.[0])} NDP </Box>
            </Stack>
          </Stack>
        ))}
      </Stack>
    );
  }

  function VoteInfoCard() {
    return (
      <Card sx={{ padding: 2, pt: 0 }}>
        <Typography variant="subtitle1" lineHeight={3} textAlign="center">
          Vote Result
        </Typography>
        <Divider />
        <VoteProgress voteData={Proposal.vote_data}></VoteProgress>
      </Card>
    );
  }

  function InformationCard() {
    return (
      <Card sx={{ padding: 2, pt: 0 }}>
        <Typography lineHeight={3} variant="subtitle1" textAlign={'center'}>
          Information
        </Typography>
        <Divider />
        <Stack spacing={1.5} pt={1}>
          <Stack direction={'row'} justifyContent="space-between">
            <Box>Strategy</Box>
            <Box>0</Box>
          </Stack>
          <Stack direction={'row'} justifyContent="space-between">
            <Box className="py-4 text-gray-500 font-bold">Voting system</Box>
            <Box>Basic NDP Voting</Box>
          </Stack>
          <Stack direction={'row'} justifyContent="space-between">
            <Box className="py-4 text-gray-500 font-bold">Start date</Box>
            <Box>{new Date(Number(Proposal.timestamp) / 1e6).toLocaleString()}</Box>
          </Stack>
          <Stack direction={'row'} justifyContent="space-between">
            <Box className="py-4 text-gray-500 font-bold">End date</Box>
            <Box>{new Date(Number(Proposal.end_time) / 1e6).toLocaleString()}</Box>
          </Stack>
        </Stack>
      </Card>
    );
  }
}
export default function DetailWrapper() {
  const { cid = '', id = '' } = useParams();
  const Wrapper = LoadingWrapper(ProposalDetail, () => useGetProposal(cid, id));
  return <Wrapper />;
}
