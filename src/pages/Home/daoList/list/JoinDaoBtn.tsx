import { Button } from '@mui/material';
import toast from 'react-hot-toast';
import { useJoin, useMemberList, useQuit } from '../../../../api/nnsdao';
import { useUserStore } from '../../../../hooks/userStore';

type JoinBtnProps = {
  cid: string;
  variant?: string;
};
export function JoinDaoBtn(props: JoinBtnProps) {
  const { cid, variant = 'contained' } = props;
  const [userInfo] = useUserStore();
  const daoMember = useMemberList(cid);
  const joinMutation = useJoin();
  const quitAction = useQuit();

  function joinDao(e) {
    e.stopPropagation();
    e.preventDefault();
    const toastId = toast.loading('updating...');
    joinMutation.mutate(
      { cid, nickname: userInfo.nickname, social: [], intro: userInfo.intro, avatar: userInfo.avatar },
      {
        onSuccess(data, variables) {
          toast.success('Joined Successfully!', { id: toastId });
        },
        onError(error) {
          toast.error(String(error), { id: toastId });
        },
      }
    );
  }

  function quitDao(e) {
    e.stopPropagation();
    e.preventDefault();
    const toastId = toast.loading('updating...');
    quitAction.mutate(cid, {
      onSuccess(data, variables) {
        toast.success('Quit Successfully!', { id: toastId });
      },
      onError(error) {
        toast.error(String(error), { id: toastId });
      },
    });
  }

  function hasJoin(principalId: string) {
    return !!daoMember.data?.find(member => member.principal.toText() === userInfo?.principalId);
  }

  if (!hasJoin(userInfo.principalId)) {
    return (
      // @ts-ignore
      <Button variant={variant} onClick={e => joinDao(e)} {...props}>
        Join
      </Button>
    );
  }
  return (
    <Button variant="text" onClick={e => quitDao(e)}>
      Quit
    </Button>
  );
}
