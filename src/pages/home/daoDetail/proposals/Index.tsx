import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Chip,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Proposal } from '@nnsdao/nnsdao-kit/src/nnsdao/types';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProposalList, useMemberList } from '../../../../api/nnsdao';
import { proposalStateToChipColor } from '../../../../common/helper';
import LoadingWrapper from '../../../../components/LoadingWrapper';
import SelectButton from './selectButton/Index';

export default function Proposals() {
  const navigate = useNavigate();
  const { cid } = useParams();
  const [page, setPage] = React.useState(1);
  const [searchFilter, setSearchFilter] = React.useState('');

  const ListWrapper = LoadingWrapper(MainList, () => useGetProposalList(cid as string));
  return (
    <React.Fragment>
      <Stack spacing={2}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Stack direction={'row'} justifyContent="center">
            <Typography component="span" variant="h6">
              Proposals&ensp;
            </Typography>
          </Stack>
          <Stack spacing={3} direction="row" alignItems={'center'}>
            <SelectButton onchange={setSearchFilter}></SelectButton>
            <Button variant="contained" onClick={() => navigate(`/dao/${cid}/Proposals/create`)}>
              New Proposal
            </Button>
          </Stack>
        </Box>
        <ListWrapper></ListWrapper>
      </Stack>
    </React.Fragment>
  );

  function MainList(props) {
    const list: [bigint, Proposal][] = props.data;

    function pageChange(e, value) {
      setPage(value);
    }
    const pageSize = 10;
    const pageCount = Math.ceil(list.length / 10);
    return (
      <React.Fragment>
        <List></List>
        <Stack direction={'row'} justifyContent="space-between" mt={{ md: 3, sm: 2 }}>
          <Box>
            Showing {(page - 1) * pageSize + 1} to {Math.min(pageSize * page, list.length)} of {list.length} entries
          </Box>
          <Box>
            <Stack spacing={2}>
              <Pagination
                showFirstButton={pageCount > 2}
                showLastButton={pageCount > 2}
                page={page}
                onChange={pageChange}
                count={pageCount}
                variant="outlined"
                color="primary"
              />
            </Stack>
          </Box>
        </Stack>
      </React.Fragment>
    );

    function List() {
      const menu = ['TARGET', 'DUE DATE', 'MEMBERS', 'STATUS', 'VIEW'];
      const member = useMemberList(cid as string);
      let combinedList = list.slice(page * pageCount, pageCount);
      if (member.data) {
        const memberMap = member.data.reduce((acc, item) => {
          acc[item.principal.toText()] = item;
          return acc;
        }, {});
        combinedList = list.map(item => {
          const [id, proposal] = item;
          proposal.vote_data = proposal.vote_data.map(data => {
            data[0] = memberMap[data[0].toText()];
            return data;
          });
          return item;
        });
      }

      return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {menu.map(item => {
                  return <TableCell key={item}>{item}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {combinedList.map(([id, row]) => (
                <TableRow key={row.title} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" sx={{ flex: 0 }}>
                    {row.title}
                  </TableCell>
                  <TableCell align="right"> {new Date(Number(row.end_time) / 1e6).toLocaleDateString()}</TableCell>
                  <TableCell align="right">
                    <AvatarGroup max={3} total={row.vote_data?.length}>
                      {row.vote_data.map(info => {
                        // @ts-ignore
                        return <Avatar key={info?.principal?.toText()} src={info?.avatar}></Avatar>;
                      })}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={Object.keys(row.proposal_state)?.[0]}
                      color={proposalStateToChipColor(row.proposal_state)}></Chip>{' '}
                  </TableCell>
                  <TableCell align="right">
                    <Button onClick={() => navigate(`/dao/${cid}/Proposals/detail/${Number(id)}`)}>View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
  }
}
