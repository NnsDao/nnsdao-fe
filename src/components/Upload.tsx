import fleekStorage from '@fleekhq/fleek-storage-js';
import { CloudUploadOutlined } from '@mui/icons-material';
import { Avatar, CircularProgress, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/system';
import React from 'react';
import { useToggle } from 'usehooks-ts';

function readFileContents(file) {
  return new Promise(resolve => {
    const reader = new globalThis.FileReader();
    reader.onload = event => resolve(event?.target?.result);
    reader.readAsArrayBuffer(file);
  });
}

function Upload(props) {
  const { src, setSrc } = props;
  const uploaderRef = React.useRef<any>();
  const [progress, setProgress] = React.useState(0);
  const [isUploading, toggleIsUploading] = useToggle(false);
  async function uploadFile() {
    setSrc('');
    toggleIsUploading();
    const file = uploaderRef.current.files[0];
    const buffer = await readFileContents(file);

    const uploadedFile = await fleekStorage.upload({
      apiKey: 'tY/tQQtffm+CEqHFHmQXqQ==',
      apiSecret: 'fgjadsHiuaBA5kT1QSlVIcemrp97XZWW9sEBL6YS3+E=',
      key: (Date.now() * Math.random() * 1e6).toString(16),
      // @ts-ignore
      ContentType: file.type,
      data: buffer,
      httpUploadProgressCallback: event => {
        setProgress(Math.round((event.loaded / event.total) * 100));
      },
    });
    //
    setSrc(`${uploadedFile.publicUrl}?hash=${uploadedFile.hash}`);
    console.log('file url', uploadedFile);
    toggleIsUploading();
    setProgress(0);
  }

  return (
    <IconButton disableRipple color="primary" size="large" component="label" sx={{ width: '108px', height: '108px' }}>
      {src ? (
        <Avatar src={src} sizes="large" sx={{ width: '108px', height: '108px' }}></Avatar>
      ) : isUploading ? (
        <UploadingProgress></UploadingProgress>
      ) : (
        <Avatar sx={{ width: '108px', height: '108px' }}>
          <CloudUploadOutlined sx={{ width: '48px', height: '48px' }}></CloudUploadOutlined>
        </Avatar>
      )}
      <input
        type="file"
        name="uploader"
        ref={uploaderRef}
        id="uploader"
        hidden
        accept="image/*"
        onChange={uploadFile}
      />
    </IconButton>
  );

  function UploadingProgress() {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" value={progress} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Typography variant="caption" component="div" color="text.secondary">{`${progress}%`}</Typography>
        </Box>
      </Box>
    );
  }
}

export default Upload;
