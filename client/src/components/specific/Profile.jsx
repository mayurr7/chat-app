import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import moment from "moment";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />

      <ProfileCard heading={"bio"} text={"jdhgsdhshd"} />
      <ProfileCard
        heading={"Username"}
        text={"mayur_7_12_"}
        icon={<UserNameIcon />}
      />
      <ProfileCard
        heading={"Name"}
        text={"Mayur balbhim tekale"}
        icon={<FaceIcon />}
      />

      <ProfileCard
        heading={"Joined"}
        text={moment("2024-11-27T10:30:15.123Z").fromNow()}
        icon={<CalendarIcon />}
      />
    </Stack>
  );
};

const ProfileCard = ({ text, icon, heading }) => (
  <Stack
    direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    color={"white"}
    textAlign={"center"}
  >
    {icon && icon}

    <Stack>
      <Typography variant="body1">{text}</Typography>
      <Typography color={"grey"} variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
