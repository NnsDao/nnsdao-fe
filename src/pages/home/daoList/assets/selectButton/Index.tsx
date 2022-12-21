import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, Fade, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useGlobalState } from '../../../../../hooks/globalState';

export default function SelectButton(props) {
  const [globalState] = useGlobalState();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const totalList = { data: [] };
  const [searchFilter, setSearchFilter] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  if (!globalState.totalDaoList?.length) {
    return null;
  }

  let MenuItemConfig: any = [...new Set(globalState.totalDaoList.map(item => Object.keys(item.status.status)?.['0']))];

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  function handleMenuItemClick(e, index: number): void {
    setSelectedIndex(index);
    handleClose();
    props.onchange(MenuItemConfig[index]);
  }

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
