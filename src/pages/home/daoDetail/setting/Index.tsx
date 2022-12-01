import { Principal } from '@dfinity/principal';
import { Button, Chip, Divider, Paper, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useTotalDaoLists, useUpdateBaseDaoInfo } from '../../../../api/dao_manager';
import { useGetDaoInfo, useUpdateDaoInfo } from '../../../../api/nnsdao';
import RichText from '../../../../components/RichText';
import Upload from '../../../../components/Upload';

export default function Setting() {
  const { cid } = useParams();
  const DaoInfo = useGetDaoInfo(cid as string);
  const totalDaoList = useTotalDaoLists();
  const updateDaoAction = useUpdateDaoInfo();
  const updateBasicDaoAction = useUpdateBaseDaoInfo();
  const currentDaoInfo = totalDaoList.data?.find(item => item.canister_id.toText() == cid);
  const [controllerInput, setControllerInput] = React.useState('');
  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'xxx' }],
    },
  ];
  const [form, setFormField] = React.useReducer(formReducer, {
    name: '',
    avatar: '',
    tags: [],
    intro: initialValue,
  });
  useEffect(() => {
    let toastID: string;
    if (DaoInfo.isLoading) {
      toastID = toast.loading('loading...');
    } else {
      setFormField({ type: 'reset', key: '', value: DaoInfo.data });
    }
    return () => {
      toastID && toast.dismiss(toastID);
    };
  }, [DaoInfo.isLoading]);

  function onEnterTag(e) {
    if (e.code === 'Enter') {
      onTagChange(e);
    }
  }
  function onTagChange(e) {
    // changeForm('tag', e);
    const value = e.target.value;
    let newList = form.tags?.concat(value?.split(/\s+/).filter(val => val));
    if (newList.length > 3) {
      toast.error('No more then 3 tags!');
      newList = newList.slice(0, 3);
    }
    e.target.value = '';

    setFormField({ type: 'set', key: 'tags', value: newList });
  }
  function deleteLabel(tag) {
    // console.log('delete tag', tag);
    setFormField({ type: 'set', key: 'tags', value: form.tags.filter(item => item !== tag) });
  }
  function updateController() {
    try {
      if (!controllerInput) {
        throw Error('xx');
      }
      let newController = Principal.fromText(controllerInput);
      updateBasicDaoAction.mutate([Principal.fromText(cid as string), { add: newController }], {
        onSuccess(data, variables, context) {
          toast.success('Added successfully');
        },
        onError() {
          toast.error('Added failed');
        },
      });
    } catch (error) {
      toast.error('Please enter valid principal ID');
    }
  }
  async function confirmUpdate() {
    const toastID = toast.loading('Updating...');

    const params = { ...DaoInfo.data, ...form, intro: JSON.stringify(form.intro), cid };
    console.log('params', params);

    updateDaoAction.mutate(params, {
      onSuccess(data, variables, context) {
        toast.success('Update successfully', { id: toastID });
      },
      onError() {
        toast.error('Update failed', { id: toastID });
      },
    });
  }
  return (
    <Paper sx={{ paddingX: '12px' }}>
      <Typography sx={{ paddingY: '8px' }} variant="h6">
        Project settings
      </Typography>
      <Divider sx={{ marginX: '-12px' }}></Divider>
      <Stack spacing={{ sm: 2, lg: 3 }}>
        <Stack direction={'row'} alignItems="center">
          <Typography width={'20%'} variant="subtitle1">
            Project Logo
          </Typography>
          <Upload
            src={form['avatar']}
            setSrc={val => setFormField({ type: 'set', key: 'avatar', value: val })}></Upload>
        </Stack>
        <Stack direction={'row'} alignItems="center">
          <Typography width={'20%'} variant="subtitle1">
            Project Name
          </Typography>
          <TextField
            label="project Name"
            required
            variant="standard"
            value={form['name']}
            onChange={e => setFormField({ type: 'set', key: 'name', value: e.target.value })}></TextField>
        </Stack>
        <Stack direction={'row'} alignItems="center">
          <Typography width={'20%'} variant="subtitle1">
            Project Tags
          </Typography>
          <Stack spacing={2}>
            <TextField
              required
              variant="standard"
              label="Tag"
              placeholder="Please create a tag."
              onKeyDown={e => onEnterTag(e)}
            />
            <Stack direction="row" spacing={1} justifyContent="flex-start" flexWrap="wrap">
              {form.tags?.map((tag, index) => {
                return (
                  <Chip color="secondary" label={tag} key={`${index}-${tag}`} onDelete={() => deleteLabel(tag)}></Chip>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
        <Stack direction={'row'} alignItems="center">
          <Typography width={'20%'} variant="subtitle1">
            Project Description
          </Typography>
          <RichText
            initialValue={form['intro']}
            onChange={val => {
              setFormField({ type: 'set', key: 'intro', value: val });
            }}></RichText>
        </Stack>
        <Stack direction={'row'} alignItems="center">
          <Typography width={'20%'} variant="subtitle1">
            Controller
          </Typography>
          <Stack spacing={2} flex={1}>
            {currentDaoInfo?.controller.map(principal => (
              <Typography key={principal.toHex()} variant="subtitle2">
                {principal.toText()}
              </Typography>
            ))}
            <Stack direction={'row'} justifyContent="center" alignItems={'center'} spacing={2}>
              <TextField
                variant="standard"
                fullWidth
                value={controllerInput}
                onChange={e => setControllerInput(e.target.value)}
                label="Add New Controller"
                helperText="Enter your principalID text"></TextField>
              <Button onClick={updateController} variant="outlined">
                Save
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Divider sx={{ marginX: '-12px' }}></Divider>
      <Stack py={4} direction="row" justifyContent={'space-between'}>
        <Box></Box>
        <Button onClick={confirmUpdate} variant="contained">
          Save Changes
        </Button>
      </Stack>
    </Paper>
  );
}

function formReducer(state, { type, key, value }) {
  if (type == 'reset') {
    return {
      ...value,
    };
  }
  if (type == 'set') {
    return {
      ...state,
      [key]: value,
    };
  }
}
