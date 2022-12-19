import { Principal } from '@dfinity/principal';
import { Alert, Button, Chip, Divider, Paper, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useToggle } from 'usehooks-ts';
import { useTotalDaoLists, useUpdateBaseDaoInfo } from '../../../../api/dao_manager';
import { useGetDaoInfo, useUpdateDaoInfo } from '../../../../api/nnsdao';
import { initDAOIntro } from '../../../../common/constant';
import LoginDialog from '../../../../components/LoginDialog';
import RichText from '../../../../components/RichText';
import Upload from '../../../../components/Upload';
import { useUserStore } from '../../../../hooks/userStore';

export default function Setting() {
  return (
    <Paper sx={{ paddingX: '12px' }}>
      <BasicSettings></BasicSettings>
      <AdminSettings></AdminSettings>
    </Paper>
  );
}

function BasicSettings() {
  const [userStore] = useUserStore();
  const [open, toggleLogin] = useToggle();
  const { cid } = useParams();
  const DaoInfo = useGetDaoInfo(cid as string);
  const updateDaoAction = useUpdateDaoInfo();
  const [form, setFormField] = React.useReducer(formReducer, {
    name: '',
    avatar: '',
    tags: [],
    intro: null,
    option: {
      email: '',
      github: '',
      twitter: '',
      telegram: '',
      discord: '',
    },
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

  async function confirmUpdate() {
    const toastID = toast.loading('Updating...');

    const params = {
      ...DaoInfo.data,
      ...form,
      option: Object.keys(form.option).reduce((acc, item) => {
        // @ts-ignore
        acc.push([item, form.option[item]]);
        return acc;
      }, []),

      intro: JSON.stringify(form.intro),
    };

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
    <React.Fragment>
      {!userStore.isLogin && (
        <Alert severity="warning" sx={{ marginX: -1.5, alignItems: 'center' }}>
          Update settings need login first! &nbsp;&nbsp;
          <Button variant="text" onClick={() => toggleLogin()}>
            login
          </Button>
        </Alert>
      )}
      <Typography sx={{ paddingY: '8px' }} variant="h6">
        Project settings
      </Typography>
      <Divider sx={{ marginX: '-12px' }}></Divider>
      <Stack spacing={{ sm: 2, lg: 3 }} py={1}>
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
            sx={{ flex: 1 }}
            label="project Name"
            required
            variant="filled"
            value={form['name']}
            onChange={e => setFormField({ type: 'set', key: 'name', value: e.target.value })}></TextField>
        </Stack>
        <Stack direction={'row'} alignItems="center">
          <Typography width={'20%'} variant="subtitle1">
            Project Tags
          </Typography>
          <Stack spacing={2} flex={1}>
            <TextField
              sx={{ flex: 1 }}
              required
              variant="filled"
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
          {form['intro'] && (
            <RichText
              initialValue={form['intro']}
              onChange={val => {
                setFormField({ type: 'set', key: 'intro', value: val });
              }}></RichText>
          )}
        </Stack>
      </Stack>
      <Stack py={4} direction="row" justifyContent={'flex-start'}>
        <Typography width={'20%'} variant="subtitle1">
          Social Bindings
        </Typography>
        <Stack flex={1} spacing={1}>
          {Object.keys(form.option).map(key => {
            return (
              <TextField
                key={key}
                label={key.toUpperCase()}
                // size="small"
                placeholder={key === 'email' ? 'xxx@xxx.com' : 'https://xxx'}
                variant="outlined"
                value={form['option'][key]}
                onChange={e =>
                  setFormField({ type: 'set', key: 'option', value: { ...form.option, [key]: e.target.value } })
                }></TextField>
            );
          })}
        </Stack>
      </Stack>
      <Divider sx={{ marginX: '-12px' }}></Divider>
      <Stack py={4} direction="row" justifyContent={'space-between'}>
        <Box></Box>
        <Button onClick={confirmUpdate} variant="contained">
          Save Changes
        </Button>
      </Stack>
      <LoginDialog open={open} toggleOpen={toggleLogin}></LoginDialog>
    </React.Fragment>
  );
}

function AdminSettings() {
  const updateBasicDaoAction = useUpdateBaseDaoInfo();
  const { cid } = useParams();

  const totalDaoList = useTotalDaoLists();
  const currentDaoInfo = totalDaoList.data?.find(item => item.canister_id.toText() == cid);
  const [controllerInput, setControllerInput] = React.useState('');
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

  return (
    <React.Fragment>
      <Typography sx={{ paddingY: '8px' }} variant="h6">
        Project Admin
      </Typography>

      <Divider sx={{ marginX: '-12px' }}></Divider>

      <Stack direction={'row'} alignItems="center" py={2}>
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
    </React.Fragment>
  );
}

function formReducer(state, { type, key, value }) {
  if (type == 'reset') {
    let op = state.option;
    return {
      ...state,
      ...value,
      intro: value.intro?.length ? JSON.parse(value.intro) : initDAOIntro,
      option: {
        ...op,
        ...value.option.reduce((acc, [key, val]) => {
          acc[key] = val;
          return acc;
        }, {}),
      },
    };
  }
  if (type == 'set') {
    return {
      ...state,
      [key]: value,
    };
  }
}
