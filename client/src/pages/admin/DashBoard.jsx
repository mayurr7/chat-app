import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcons,
  Person as PersonIcon,
} from "@mui/icons-material";
import moment from "moment";
import {
  SearchField,
  CurveButton,
} from "../../components/Style/StyledComponents";
import { DoughnutChart, LineChart } from "../../components/specific/Chart";

const DashBoard = () => {
  const Appbar = (
    <Paper
      elevation={3}
      sx={{
        padding: "2rem",
        margin: "2rem 0",
        borderRadius: "1rem",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettingsIcon sx={{ fontSize: "3rem" }} />

        <SearchField placeholder="Search..." />

        <CurveButton>Search</CurveButton>

        <Box flexGrow={1} />
        <Typography
          display={{
            xs: "none",
            lg: "block",
          }}
          color={"rgba(0,0,0,0.7)"}
          textAlign={"center"}
        >
          {moment().format("MMMM Do YYYY")}
        </Typography>

        <NotificationsIcons />
      </Stack>
    </Paper>
  );

  const widgets = (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      spacing="10rem"
      justifyContent={"center"}
      alignItems={"center"}
      margin={"2rem 0"}
    >
      <Widget title={"Users"} value={34} Icon={<PersonIcon />} />
      <Widget title={"Chats"} value={3} Icon={<GroupIcon />} />
      <Widget title={"Messages"} value={453} Icon={<MessageIcon />} />
    </Stack>
  );
  return (
    <>
      <AdminLayout>
        <Container component={"main"}>
          {Appbar}

          <Stack
            direction={{
              xs: "column",
              lg: "row",
            }}
           
            flexWrap={"wrap"}
            justifyContent={"center"}
            alignItems={{
              xs: "center",
              lg: "stretch",
            }}
            sx={{gap: "2rem"}}
          >
            <Paper
              elevation={3}
              sx={{
                padding: "2rem 3.5rem",
                borderRadius: "1rem",
                width: "100%",
                maxWidth: "45rem",
                
              }}
            >
              <Typography margin={"2rem 0"} variant={"h4"}>
              📈 Chat Activity Trends
              </Typography>

              <LineChart value={[2, 22, 9, 21]} 
              
              labels={["Jan", "Feb", "Mar", "Apr", "May"]}
            datasets={[
              {
                data: [2, 22, 9, 21, 30],
                label: "Messages Sent",
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "#4CAF50",
                tension: 0.3,
                fill: true,
                pointBackgroundColor: "#4CAF50",
                pointRadius: 5,
              },
              {
                data: [5, 15, 10, 25, 35],
                label: "Active Users",
                backgroundColor: "rgba(255,99,132,0.4)",
                borderColor: "#FF5733",
                tension: 0.3,
                fill: true,
                pointBackgroundColor: "#FF5733",
                pointRadius: 5,
              },
            ]}
              
              />
            </Paper>
          </Stack>

          <Paper
          elevation={3}
          sx={{
            padding: "1rem",
            borderRadius: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            maxWidth: "25rem",
            margin: "2rem auto",
            position: "relative",
          }}
        >
            <DoughnutChart
              labels={["Single chats", "Groups Chats"]}
              value={[23, 66]}
              datasets={[
                {
                  data: [23, 66],
                  backgroundColor: ["#3498db", "#9b59b6"],
                  hoverBackgroundColor: ["#2980b9", "#8e44ad"],
                  borderWidth: 2,
                },
              ]}
            />

            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"0.5rem"}
              width={"100%"}
              height={"100%"}
            >
              <GroupIcon sx={{ color: "rgb(230, 44, 84)" }} fontSize="large" />

              <Typography>vs</Typography>
            
              <PersonIcon sx={{ color: "#3498db" }} fontSize="large" />
            </Stack>
          </Paper>

          {widgets}
        </Container>
      </AdminLayout>
    </>
  );
};

const Widget = ({ title, value, Icon }) => (
  <Paper
    elevation={4}
    sx={{
      padding: "2rem",
      borderRadius: "1.5rem",
      width: "100%",
      margin: "2rem 0",
    }}
  >
    <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography
        sx={{
          color: "rgba(0,0,0,0.7)",
          borderRadius: "50%",
          border: "5px solid rgba(0,0,0,0.7)",
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {value}
      </Typography>
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        {Icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
);

export default DashBoard;
