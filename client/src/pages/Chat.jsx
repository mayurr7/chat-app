import React, { Fragment, useRef } from 'react';
import AppLayout from '../components/layout/AppLayout';
import { IconButton, Stack } from '@mui/material';
import { greayColor } from '../Constants/color';
import ChatItem from '../components/Shared/ChatItem';
import { AttachFile as AttachFileIcon, Send as SendIcon} from '@mui/icons-material';
import { InputBox } from '../components/Style/StyledComponents';
import { orange } from '@mui/material/colors';
import FileMenu from '../components/dialogs/FileMenu';
import { sampleMessage } from '../Constants/sampleData';
import MessageComponent from '../components/Shared/MessageComponent';

const user = {
  _id: "jhgfdjgf",
  name: "mayur"
}

const Chat = () => {
  const containerRef = useRef(null);

  

  return (
    <Fragment>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={greayColor}
        height={"80vh"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
          backgroundColor: "rgba(0,0,0,0.1)"
        }}
      >
          {/* Message Rnder */}
          {
            sampleMessage.map((i) => (
              <MessageComponent key={i._id} message={i} user={user} />
            ))
          }
      </Stack>

      <form 
        style={{
          height: "10%",
        }}
      >
        <Stack direction={"row"} height={"100%"}
        padding={"1rem"}
        alignItems={"center"}
        position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
           
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox placeholder='Type Message...'/>

          <IconButton
            type='submit'
            sx={{
              rotate: "-30deg",
              bgcolor: "blueviolet",
              color: "grey",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
        
      </form>
      <FileMenu  />
    </Fragment>
  )
}

export default AppLayout()(Chat);
