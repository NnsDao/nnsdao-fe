import { Card, CardContent } from '@mui/material';
import { Box } from '@mui/system';
import { MemberItems } from '@nnsdao/nnsdao-kit/nnsdao/types';
import EChartsReact from 'echarts-for-react';
import { useParams } from 'react-router-dom';
import { useMemberList } from '../../../../../api/nnsdao';
import LoadingWrapper from '../../../../../components/LoadingWrapper';

function ActiveUser(props) {
  const list: MemberItems[] = props.data;

  const chartOptions = {
    series: [
      {
        name: 'Active User',
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: [
          { value: 99, name: 'Active' },
          { value: 11, name: 'xxx' },
          { value: 91, name: 'xxx2' },
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
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
          {list.length}
        </Box>
        <Box
          sx={{
            fontFamily: 'Roboto',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '30px',
            color: '#B5B5C3',
          }}>
          Active User
        </Box>
        <EChartsReact style={{ height: '150px', marginTop: '-24px' }} option={chartOptions}></EChartsReact>
      </CardContent>
    </Card>
  );
}

export default function WrapperActiveUser() {
  const { cid } = useParams();
  const User = LoadingWrapper(ActiveUser, () => useMemberList(cid as string));
  return <User></User>;
}
