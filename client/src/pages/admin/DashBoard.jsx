import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import {Box, Container, Paper, Stack, Typography } from '@mui/material'
import { AdminPanelSettings as AdminPanelSettingsIcon, Notifications as NotificationsIcons} from '@mui/icons-material';
import moment from "moment"; 
import { SearchField, CurveButton } from '../../components/Style/StyledComponents';

const DashBoard = () => {
  const Appbar = (
    <Paper
      elevation={3}
      sx={{
        padding: "2rem",
        margin: "2rem 0",
        borderRadius: "1rem"
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettingsIcon sx={{fontSize: "3rem"}}/>

        <SearchField placeholder='Search...'/>

        <CurveButton>Search</CurveButton>

        <Box flexGrow={1}/>
        <Typography
          display={{
            xs: "none",
            lg:"block",
          }}
          color={"rgba(0,0,0,0.7)"}
          textAlign={"center"}
        >{moment().format("MMMM Do YYYY")}</Typography>

        <NotificationsIcons/>
      </Stack>

    </Paper>
  );

  const widgets = <>jrhekjh</>
  return (
   <>
        <AdminLayout>
            <Container component={"main"}>{Appbar}

              <Stack direction={"row"} spacing={"2rem"} flexWrap={"wrap"}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: "2rem 3.5rem",
                    borderRadius: "1rem",
                    width: "100%",
                    maxWidth: "45rem",
                  }}
                >
                  <Typography variant={'h5'}>Last Messages</Typography>
                    {"Chat"}                  
                </Paper>
                </Stack>

              {
                widgets
              }
            </Container>
        </AdminLayout>
   </>
  )
}

export default DashBoard
