import { CloudUploadOutlined } from '@mui/icons-material';
import { Paper, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { IPFS } from 'ipfs-core-types';
import React from 'react';

async function IPFSCient() {
  // @ts-ignore
  let client: IPFS = null;

  return (async () => {
    if (client) {
      return client;
    }
    client = await globalThis.IpfsCore.create();
    globalThis.IPFSClient = client;
    return client;
  })();
}

function readFileContents(file) {
  return new Promise(resolve => {
    const reader = new globalThis.FileReader();
    reader.onload = event => resolve(event?.target?.result);
    reader.readAsArrayBuffer(file);
  });
}

function Upload(props) {
  const uploaderRef = React.useRef<any>();

  async function uploadFile() {
    const file = uploaderRef.current.files[0];
    const buffer = await readFileContents(file);
    const node = await IPFSCient();
    const textRes = await node.add('hello ipfs');
    // CID (Content IDentifier) uniquely addresses the data
    // and can be used to get it again.
    console.log('textRes', textRes);
    const results = await node.add(
      {
        path: file.name,
        content: buffer,
      },
      {
        wrap: true,
        progress: bytesLoaded => {
          let percent = (bytesLoaded / file.size) * 100;
          console.log('progress', percent);
        },
      }
    );

    // add your data to IPFS - this can be a string, a Buffer,
    // a stream of Buffers, etc

    console.log('results', results);
  }
  return (
    <Paper
      sx={{
        width: '100px',
        height: '100px',
        textAlign: 'center',
      }}>
      <Stack justifyContent="center" direction="column" spacing={0} alignItems="center" height="100%">
        <IconButton color="primary" size="large" sx={{ position: 'relative' }}>
          <CloudUploadOutlined fontSize="inherit"></CloudUploadOutlined>
          <input
            type="file"
            name="uploader"
            ref={uploaderRef}
            id="uploader"
            hidden
            accept="image/*"
            onChange={uploadFile}
          />
          <label htmlFor="uploader" style={{ width: '100%', height: '100%', position: 'absolute' }}></label>
        </IconButton>
        <Typography variant="body1">upload</Typography>
      </Stack>
    </Paper>
  );
}

export default Upload;
