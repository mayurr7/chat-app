import { Grid } from '@mui/material';
import React from 'react';

const Sidebar = () => {
   
     return <div>sidebar</div>

};

const AdminLayout = () => {
  return (
    <>
        <Grid container minHeight={"100vh"}>
            <Grid
            item
            md={4}
            lg={3}
            sx={{
                display: {xs:"none", md: "block"}
            }}
            >
                    <Sidebar/>
            </Grid>

        </Grid>
    </>
  );
};

export default AdminLayout
