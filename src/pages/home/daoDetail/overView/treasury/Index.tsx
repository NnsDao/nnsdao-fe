import { Principal } from '@dfinity/principal';
import { Card, CardContent } from '@mui/material';
import { Box } from '@mui/system';
import { useParams } from 'react-router-dom';
import { useTokenBalance } from '../../../../../api/common';

export default function Treasury() {
  const { cid } = useParams() as { cid: string };
  const icp = useTokenBalance('ICP', Principal.fromText(cid));
  const ndp = useTokenBalance('NDP', Principal.fromText(cid));
  console.log('icp,ndp', icp.data, ndp.data);
  // console.log(AccountIdentifier.fromHex('67bzx-5iaaa-aaaam-aah5a-cai').toHex());
  // console.log(
  //   AccountIdentifier.fromPrincipal({
  //     principal: Principal.fromText('67bzx-5iaaa-aaaam-aah5a-cai'),
  //   }).toHex()
  // );

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box
          sx={{
            fontFamily: 'Roboto',
            fontWeight: 700,
            fontSize: '34px',
            lineHeight: '40px',
            color: '#181C32',
          }}>
          {Number(icp.data || '0')} ICP
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
          Treasury
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
            ICP
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
            {Number(icp.data || '0')}
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
            NDP
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
            {Number(ndp.data || '0')}
          </Box>
        </Box>
        {/* <Box sx={{ margin: '14px 0 11px 0', width: '100%', borderTop: '1px dotted #D7D3D3' }} />
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
        </Box> */}
      </CardContent>
    </Card>
  );
}
