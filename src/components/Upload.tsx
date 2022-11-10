import { CloudUploadOutlined } from '@mui/icons-material';
import { Paper, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

function Upload(props) {
  async function uploadFile() {
    const ipfs = await IpfsCore.create();
    const { cid } = await ipfs.add('Hello world');
    console.info(cid);
    // QmXXY5ZxbtuYj6DnfApLiGstzPN7fvSyigrRee3hDWPCaf
  }
  return (
    <Paper
      sx={{
        width: '100px',
        height: '100px',
        textAlign: 'center',
      }}>
      <Stack justifyContent="center" direction="column" spacing={0} alignItems="center" height="100%">
        <IconButton color="primary" size="large" onClick={uploadFile}>
          <CloudUploadOutlined fontSize="inherit"></CloudUploadOutlined>
        </IconButton>
        <Typography variant="body1">upload</Typography>
      </Stack>
    </Paper>
  );
}

export default Upload;
