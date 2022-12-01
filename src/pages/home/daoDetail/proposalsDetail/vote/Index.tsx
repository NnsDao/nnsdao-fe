import { Principal } from '@dfinity/principal';
import { LinearProgress, Stack, Typography } from '@mui/material';
import { Votes } from '@nnsdao/nnsdao-kit/src/nnsdao/types';
import { useMemo } from 'react';

export default function VoteProgress({ voteData }) {
  const vote = useMemo(() => tempVote(voteData), [voteData]);
  function tempVote(votesResult: Array<[Principal, Votes]>) {
    let totalYes = 0;
    let totalNo = 0;
    votesResult.map(([id, item]) => {
      if ('Yes' in item) {
        totalYes += Number(item.Yes);
      }
      if ('No' in item) {
        totalNo += Number(item.No);
      }
    });
    let total = totalYes + totalNo;

    // console.log('yesPercent', totalYes / total);

    function divide(num: number) {
      return Number(`${num}`.replace(/(?=(\B\d{3})+$)/g, ','));
    }
    return {
      total: total,
      yes: divide(totalYes),
      yesPercent: total ? totalYes / total : 0,
      no: divide(totalNo),
      noPercent: total ? totalNo / total : 0,
    };
  }
  console.log('vote', vote);

  return (
    <Stack spacing={-0.5} mt={1}>
      <Stack direction={'row'} alignItems="center">
        <LinearProgress
          sx={{ flex: 1 }}
          variant="determinate"
          value={vote.yesPercent}
          color={'primary'}></LinearProgress>
        <Typography color={'text.secondary'}>&ensp;&ensp;{vote.yesPercent || 0}%</Typography>
      </Stack>
      <Stack direction={'row'} justifyContent="space-between">
        <Typography variant="subtitle1">YES</Typography>
        <Typography color={'text.secondary'}>{vote.yes} NDP</Typography>
      </Stack>
      <Stack direction={'row'} alignItems="center">
        <LinearProgress
          sx={{ flex: 1 }}
          variant="determinate"
          value={vote.noPercent}
          color={'primary'}></LinearProgress>
        <Typography color={'text.secondary'}>&ensp;&ensp;{vote.noPercent || 0}%</Typography>
      </Stack>
      <Stack direction={'row'} justifyContent="space-between">
        <Typography variant="subtitle1">NO</Typography>
        <Typography variant="subtitle1">{vote.no} NDP </Typography>
      </Stack>
    </Stack>
  );
}
