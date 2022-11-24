import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, Fade, Menu, MenuItem } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Proposal } from '@nnsdao/nnsdao-kit/nnsdao/types';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProposalList } from '../../../../../api/nnsdao';
export default function SelectButton(props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { cid } = useParams();
  const proposalList = useGetProposalList(cid as string);
  const totalList: [bigint, Proposal][] = proposalList.data || [];

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  let MenuItemConfig: any = ['All'].concat([
    ...new Set(totalList.map(([id, item]) => Object.keys(item.proposal_state)?.[0])),
  ]);
  const open = Boolean(anchorEl);

  useEffect(() => {
    props.onchange(MenuItemConfig[selectedIndex]);
  }, [selectedIndex]);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  function handleMenuItemClick(e, index: number): void {
    setSelectedIndex(index);
    handleClose();
  }

  return (
    <Grid container>
      <Button
        sx={{
          height: 34,
          display: 'flex',
          alignItems: 'center',
          borderRadius: '6px',
          background: '#FFFFFF',
          color: '#A1A5B7',
          border: 'none',
          paddingX: '4px',
          fontWeight: 700,
          fontSize: '12px',
          lineHeight: '14px',
        }}
        endIcon={<KeyboardArrowDownIcon />}
        variant="outlined"
        id="basic-button"
        onClick={handleClick}>
        {MenuItemConfig[selectedIndex]}
      </Button>
      <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} TransitionComponent={Fade}>
        {MenuItemConfig.map((item, index) => (
          <MenuItem
            onClick={e => handleMenuItemClick(e, index)}
            key={String(item + index)}
            sx={{ width: 122 }}
            // disabled={index === 0}
            selected={index === selectedIndex}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </Grid>
  );
}
