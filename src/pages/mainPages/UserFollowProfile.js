// 유저 팔로우 정보 페이지 

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }
  }));

export default function UserFollowProfile({userInfo}) {
  const classes = useStyles();

  return (
    <div>
    </div>
  );
}