import React, { PureComponent } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Title from './Title';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function InfoBarChart()  {

  const theme = useTheme();

    return (
      <React.Fragment>
        <Title>Week</Title>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
            }}
            data={data}>
            <Bar dataKey="uv" style={{ textAnchor: 'middle', fill: theme.palette.text.primary }} />
          </BarChart>
        </ResponsiveContainer>
      </React.Fragment>
    );
  }
