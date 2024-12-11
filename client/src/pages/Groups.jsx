import React, { memo, useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  Tooltip,
  Drawer,
  Stack,
  Typography,
  Avatar
} from "@mui/material";
import {
  AvTimer,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Link } from "../components/Style/StyledComponents";
import  AvatarCard from "../components/Shared/AvatarCard"
import { sampleChats } from "../Constants/sampleData";


const Groups = () => {
  const chatId = "adsa";

  const navigate = useNavigate();

  const [isMobilemenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateBack = () => {
    navigate("/");
  };

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => setIsMobileMenuOpen(false);

  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: "black",
            color: "white",
            ":hover": {
              bgcolor: "rgba(0,0,0,0.6)",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        sm={4}
        bgcolor={"lightslategray"}
      >
        <GroupList myGroups={sampleChats} chatId={chatId}/>
      </Grid>

      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconBtns}
      </Grid>

      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
        open={isMobilemenuOpen}
        onClose={handleMobileClose}
      >
        <GroupList w={"50vw"} />
      </Drawer>
    </Grid>
  );
};

const GroupList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack>
    {myGroups.length > 0 ? (
      myGroups.map((group) => <GroupListItem group={group} key= {group._id} />)
    ) : (
      <Typography textAlign={"center"} padding="1rem">
        No group
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link to={`?group =${_id}`}>
      <Stack>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});
export default Groups;
