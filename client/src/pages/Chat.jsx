import React, { useRef } from 'react';
import AppLayout from '../components/layout/AppLayout';
import { IconButton, Stack } from '@mui/material';
import { greayColor } from '../Constants/color';
import ChatItem from '../components/Shared/ChatItem';
import { AttachFile as AttachFileIcon, Send as SendIcon} from '@mui/icons-material';
import { InputBox } from '../components/Style/StyledComponents';

const Chat = () => {
  const containerRef = useRef(null);

  return (
    <>
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
        }}
      >
          {/* Message Rnder */}
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
          <IconButton>
            <AttachFileIcon />
          </IconButton>

          <InputBox placeholder='Type Message...'/>

          <IconButton>
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
    </>
  )
}

export default AppLayout()(Chat);
