import { Principal } from '@dfinity/principal';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Stack } from '@mui/system';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { usePropose } from '../../../../api/nnsdao';
import RichText from '../../../../components/RichText';
import { getNDPActor } from '../../../../service';

export default function ProposalsCreate() {
  const { cid = '' } = useParams();
  const navigate = useNavigate();
  const proposeAction = usePropose();

  const editorRef = React.useRef([]);

  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'Proposal body' }],
    },
  ];
  const [form, setFormField] = React.useReducer(formReducer, {
    title: '',
    content: [],
    end_time: '',
  });

  const handleChange = (newValue: Dayjs | null) => {
    setFormField({ key: 'end_time', value: newValue });
  };
  async function createProposal() {
    let toastID = toast.loading('Under authorization...');
    try {
      // 1. authorize
      const proposalCost = 1;
      const NICPActor = await getNDPActor(true);
      const approve = await NICPActor.approve(Principal.fromText(cid), BigInt(Number(proposalCost) * 1e8));
      console.log(`approve`, approve);
      // 2. initiate_proposal
      const params: any = {
        title: form.title,
        content: JSON.stringify(editorRef.current),
        end_time: BigInt(dayjs(form.end_time).valueOf() * 1e6),
        property: [],
        cid,
      };
      console.log('params', params);

      toast.loading('Under creation...', { id: toastID });
      proposeAction.mutate(params, {
        onSuccess(data, variable) {
          toast.success('Successfully Created', { id: toastID });
          navigate(`/dao/${cid}/Proposals`);
        },
        onError(error: any, variables, context) {
          toast.error('Fialed, try again later', { id: toastID });
          // toast.error('error', { id: toastID });
        },
        onSettled() {
          //
        },
      });
    } catch (error) {
      toast.error('Fialed, try again later', { id: toastID });
    }
  }
  return (
    <Grid container columnSpacing={2} rowSpacing={1} columns={{ xs: 8, md: 12 }} minHeight="100%">
      <Grid sm={8} minHeight="100%">
        <Stack spacing={{ sm: 2, lg: 4 }}>
          <BackArrow></BackArrow>
          <TextField
            value={form.title}
            onChange={e => changeForm('title', e)}
            helperText="Proposal Title"
            required
            label="Title"
            variant="standard"
          />
          <RichText
            initialValue={initialValue}
            onChange={val => {
              editorRef.current = val;
            }}></RichText>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="End time picker"
              value={form['end_time']}
              onChange={handleChange}
              renderInput={params => <TextField {...params} helperText="End time" />}
            />
          </LocalizationProvider>

          <Button variant="contained" onClick={createProposal}>
            Create Proposal
          </Button>
        </Stack>
      </Grid>
      <Grid sm={4}> </Grid>
    </Grid>
  );
  function changeForm(key, e) {
    setFormField({ key, value: e.target.value });
    // console.log(key, e.target.value);
  }
  function BackArrow() {
    return (
      <Stack
        direction={'row'}
        spacing={2}
        onClick={() => navigate(`/dao/${cid}/Proposals`)}
        sx={{
          ':hover': {
            bgcolor: '#1976d2',
            cursor: 'pointer',
          },
        }}>
        <ArrowBackIcon></ArrowBackIcon>
        <Box component={'span'}>Back</Box>
      </Stack>
    );
  }
}
function formReducer(state, { key, value }) {
  return {
    ...state,
    [key]: value,
  };
}
