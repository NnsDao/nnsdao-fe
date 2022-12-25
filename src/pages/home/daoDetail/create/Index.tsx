import { Button, Chip, Divider, Stack, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import { payWithICP } from '@nnsdao/nnsdao-kit/helper/pay';
import { DaoInfo } from '@nnsdao/nnsdao-kit/src/nnsdao/types';
import React, { useReducer, useRef } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useToggle } from 'usehooks-ts';
import { getPayInfo, useCreateAction } from '../../../../api/dao_manager';
import { useJoin, useUpdateDaoInfo } from '../../../../api/nnsdao';
import { initDAOIntro } from '../../../../common/constant';
import LoginDialog from '../../../../components/LoginDialog';
import RichText from '../../../../components/RichText';
import Upload from '../../../../components/Upload';
import { useUserStore } from '../../../../hooks/userStore';

const steps = [
  {
    label: 'Before You Create',
    description: `Creation needs to consume ICP TOKEN, and the ownership belongs to the creator.`,
    btnText: 'Continue',
  },
  {
    label: 'Complete DAO Information',
    description: 'Complete the required information.',
    btnText: 'Continue',
  },
  {
    label: 'Confirm Creation',
    description: `Confirm DAO creation.`,
    btnText: 'Confirm',
  },
];

export default function CreateDao() {
  const [openLogin, toggleOpenLogin] = useToggle(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [userStore, dispatch] = useUserStore();
  const isLogin = userStore.isLogin;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Stack direction={'column'} justifyContent={'center'} alignItems="center" spacing={{ sm: 4, lg: 8 }}>
      <Stepper activeStep={activeStep} sx={{ minWidth: '80%', pt: 8 }}>
        {steps.map((item, index) => {
          return (
            <Step key={item.label}>
              <StepLabel>
                <Typography variant="h6">{item.label}</Typography>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <ActiveContent></ActiveContent>
      <LoginDialog open={openLogin} toggleOpen={toggleOpenLogin}></LoginDialog>
    </Stack>
  );

  function ActiveContent() {
    const createAction = useCreateAction();
    const navigator = useNavigate();
    const updateAction = useUpdateDaoInfo();
    const [userStore] = useUserStore();
    const joinAction = useJoin();

    const editorRef = useRef([]);

    const [form, setFormField] = useReducer(
      (state, { key, value }) => {
        return {
          ...state,
          [key]: value,
        };
      },
      {
        name: '',
        poster: '',
        avatar: '',
        tag: ['demo'] as string[],
        intro: '',
      } as const
    );

    if (activeStep == 0) {
      return (
        <React.Fragment>
          <Typography variant="subtitle1">{steps[activeStep].description}</Typography>
          <Button variant="outlined" onClick={handleNext}>
            {steps[activeStep].btnText}
          </Button>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Stack spacing={2} maxWidth="450px">
          <Stack alignItems={'center'}>
            <Upload src={form['avatar']} setSrc={val => setFormField({ key: 'avatar', value: val })}></Upload>
            <Typography variant="h6">Avatar</Typography>
          </Stack>
          <TextField
            variant="standard"
            required
            id="name"
            label="DAOs Name"
            key="DaoName"
            placeholder="DAOs Name"
            value={form.name}
            onChange={e => changeForm('name', e)}
          />
          {/* <TextField
            variant="standard"
            required
            id="poster"
            value={form.poster}
            label="Poster"
            key="Poster"
            placeholder="url"
            onChange={e => changeForm('poster', e)}
          /> */}
          {/* <TextField
            required
            variant="standard"
            value={form.avatar}
            id="avatar"
            label="PFPs"
            key="Avatar"
            placeholder="IC NFTs Url"
            onChange={e => changeForm('avatar', e)}
          /> */}
          <Divider>Tags</Divider>
          <TextField
            required
            variant="standard"
            id="tag"
            fullWidth
            label="Tag"
            placeholder="Please create a tag."
            onKeyDown={e => onEnterTag(e)}
          />
          <Stack direction="row" spacing={1} justifyContent="flex-start" flexWrap="wrap">
            {form.tag.map((tag, index) => {
              return (
                <Chip color="secondary" label={tag} key={`${index}-${tag}`} onDelete={() => deleteLabel(tag)}></Chip>
              );
            })}
          </Stack>
          <Divider>Abstract</Divider>
          <RichText
            initialValue={initDAOIntro}
            onChange={val => {
              editorRef.current = val;
              console.log('RichText', val);
            }}></RichText>

          <Divider sx={{ my: 4, border: 'none' }}></Divider>
          <Button sx={{ margin: '16px 0' }} size="large" fullWidth variant="contained" type="submit" onClick={confirm}>
            Confirm
          </Button>
          <Button sx={{ margin: '16px 0' }} size="large" fullWidth variant="outlined" onClick={handleBack}>
            Back
          </Button>
        </Stack>
      </React.Fragment>
    );

    function checkField(key, value) {
      if (!value || !value?.length) {
        toast.error(`${key} field cannot be empty!`);
        return false;
      }
      return true;
    }
    function deleteLabel(tag) {
      console.log('delete tag', tag);
      setFormField({ key: 'tag', value: form.tag.filter(item => item !== tag) });
    }

    function changeForm(key, e) {
      setFormField({ key, value: e.target.value });
    }
    function onEnterTag(e) {
      if (e.code === 'Enter') {
        onTagChange(e);
      }
    }
    function onTagChange(e) {
      // changeForm('tag', e);
      const value = e.target.value;
      let newList = form.tag.concat(value?.split(/\s+/).filter(val => val));
      if (newList.length > 3) {
        toast.error('No more then 3 tags!');
        newList = newList.slice(0, 3);
      }
      e.target.value = '';
      setFormField({ key: 'tag', value: newList });
    }

    async function confirm() {
      if (!isLogin) {
        toast.error('Login first please!');
        toggleOpenLogin();
        return;
      }
      // validate
      const { name, poster, avatar, tag } = form;
      // @ts-ignore
      const params: DaoInfo = {
        name,
        poster,
        avatar,
        tags: tag,
        intro: JSON.stringify(editorRef.current),
        option: [],
      };
      for (const key of Object.keys(params)) {
        if (['option', 'poster'].includes(key)) {
          continue;
        }
        if (!checkField(key, params[key])) {
          return;
        }
      }
      // handleNext();
      const toastID = toast.loading('Getting Payment Information...');
      // console.log('confirm', params);
      try {
        const payInfo = await getPayInfo().catch(() => null);
        if (!payInfo) {
          toast.error(`Failed getPayInfo`);
          return;
        }
        // params.memo = payInfo.memo;
        toast.loading('Paying...', { id: toastID });
        // transfer
        const blockHeight = await payWithICP(payInfo.amount, payInfo.to, payInfo.memo);
        console.log('blockHeight', blockHeight);
        // params.block_height = BigInt(blockHeight);
        // create
        toast.loading('Initialize Canister...', { id: toastID });
        const data = await createAction.mutateAsync({
          memo: payInfo.memo,
          block_height: BigInt(blockHeight),
        });

        console.log('createAction onSuccess', data);
        await updateAction.mutateAsync({
          ...params,
          canister_id: data,
          created_at: BigInt(0),
        });
        // auto join current dao

        await joinAction.mutateAsync({
          cid: data,
          nickname: userStore.nickname,
          social: [],
          intro: userStore.intro,
          avatar: userStore.avatar,
        });
        setTimeout(() => {
          navigator(`/dao/${data}`);
        }, 0);
      } catch (error) {
        console.error('err', error);
        toast.error('Failed create', { id: toastID });
      } finally {
        toast.dismiss(toastID);
      }
    }
  }
}
