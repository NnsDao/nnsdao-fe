import { Box } from '@mui/system';

export default function NewsMember() {
  return (
    <Box bgcolor={'#fff'}>
      <Box
        sx={{
          fontFamily: 'Roboto',
          fontWeight: 700,
          fontSize: '34px',
          lineHeight: '40px',
          color: '#181C32',
        }}>
        $898989
      </Box>
      <Box
        sx={{
          fontFamily: 'Roboto',
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '30px',
          color: '#B5B5C3',
          marginBottom: '23px',
        }}>
        NewsMember
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Box
          sx={{
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: '14px',
            lineHeight: '16px',
            color: '#5E6278',
          }}>
          Avg. Project Budget
        </Box>
        <Box
          sx={{
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '14px',
            lineHeight: '16px',
            color: '#181C33',
          }}>
          $6,570
        </Box>
      </Box>
      <Box sx={{ margin: '14px 0 11px 0', width: '100%', borderTop: '1px dotted #D7D3D3' }} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Box
          sx={{
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: '14px',
            lineHeight: '16px',
            color: '#5E6278',
          }}>
          Lowest Project Check
        </Box>
        <Box
          sx={{
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '14px',
            lineHeight: '16px',
            color: '#181C33',
          }}>
          $6,570
        </Box>
      </Box>
      <Box sx={{ margin: '14px 0 11px 0', width: '100%', borderTop: '1px dotted #D7D3D3' }} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Box
          sx={{
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: '14px',
            lineHeight: '16px',
            color: '#5E6278',
          }}>
          Sponor
        </Box>
        <Box
          sx={{
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '14px',
            lineHeight: '16px',
            color: '#181C33',
          }}>
          $6,570
        </Box>
      </Box>
    </Box>
  );
}
