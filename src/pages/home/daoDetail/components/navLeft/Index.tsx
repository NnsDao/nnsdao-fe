import { TreeView } from '@mui/lab';
import { Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useLocation, useNavigate } from 'react-router-dom';
import StyledTreeItem from './component/StyledTreeItem';
import { config } from './config';

export default function NavLeft() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const toChilren = item => {
    navigate(`${item.labelText}`);
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center" xs={12}>
      <Stack
        spacing={0}
        alignItems="center"
        sx={{ background: '#fff' }}
        paddingTop="30px"
        paddingBottom="21px"
        paddingX={'12px'}
        width={'250px'}>
        <TreeView
          aria-label="gmail"
          defaultExpanded={['1']}
          defaultCollapseIcon={false}
          // defaultCollapseIcon={<ArrowDropDownIcon />}
          // defaultExpandIcon={<ArrowRightIcon />}
          // defaultEndIcon={<div style={{ width: 24 }} />}
          sx={{ flexGrow: 1, width: '100%', overflowY: 'auto' }}>
          {config.map((item, index) => (
            <StyledTreeItem
              key={item.labelText}
              labelType={item.labelType}
              nodeId={item.nodeId}
              labelText={item.labelText}
              labelIcon={item.labelIcon}
              labelInfo={item.labelInfo}
              color={item.color}
              bgColor={item.bgColor}
              onClick={() => toChilren(item)}
            />
          ))}
        </TreeView>
      </Stack>
    </Grid>
  );
}
