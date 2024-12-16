import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Box, Typography } from '@mui/material';

const Home = () => {
  return (
   <Box bgcolor={"rgba(34, 67, 125, 0.1)"} height={"90vh"}>
    <Typography p={"2rem"} variant='h5' textAlign={"center"}>
    Select a friend to chat
   </Typography>
   </Box>
  );
};

export default AppLayout()(Home);


