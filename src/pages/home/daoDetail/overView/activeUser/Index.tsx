import { Card, CardContent } from '@mui/material';
import { Box } from '@mui/system';
import { MemberItems } from '@nnsdao/nnsdao-kit/nnsdao/types';
import EChartsReact from 'echarts-for-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserInfo, useMemberList } from '../../../../../api/nnsdao';
import LoadingWrapper from '../../../../../components/LoadingWrapper';

function ActiveUser(props) {
  const { cid } = useParams() as { cid: string };
  // update last_visit_at
  useGetUserInfo(cid);
  const list: MemberItems[] = props.data;
  const recent3days = () => {
    const duration = 36e5 * 24 * 3;
    return list.filter(info => Date.now() - Number(info?.last_visit_at || 0) / 1e6 <= duration).length || 0;
  };
  const recentVisitCount = React.useMemo(recent3days, [list]);
  const chartOptions = {
    series: [
      {
        name: 'Active User',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '50%'],
        data: [
          { value: recentVisitCount, name: 'Active' },
          { value: list.length - recentVisitCount, name: 'InActive' },
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
