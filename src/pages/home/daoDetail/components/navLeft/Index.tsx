import { TreeView } from '@mui/lab';
import { Paper } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import StyledTreeItem from './component/StyledTreeItem';
import { config } from './config';

export default function NavLeft() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const toChildren = item => {
    navigate(`${item.labelText}`);
  };
  return (
    <Paper sx={{ background: '#fff', position: 'sticky', top: '10px', padding: '8px' }}>
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
            onClick={() => toChildren(item)}
          />
        ))}
      </TreeView>
    </Paper>
  );
}
