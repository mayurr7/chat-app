import React from 'react';
import { Dialog, DialogTitle, InputAdornment, List, ListItem, ListItemText, Stack, TextField, Typography } from '@mui/material';
 import { sampleNotifications } from '../../Constants/sampleData';

const Notifications = () => {
  return (<Dialog open>
    <Stack
      p={{
        xs: "1rem", sm:"2rem"
      }} maxWidth={"25rem"}
    >
      <DialogTitle>Notifications</DialogTitle>

      {
        sampleNotifications.length > 0 ? (
            sampleNotifications.map(({sender, _id}) =>(
              <NotificationItem 
              sender={sender}
              _id={_id}
              handler={friendRequestHandler}
              key={_id}
              />
            ))
        ): (<Typography textAlign={"center"}>0 Notifications</Typography>
     )}
    </Stack>
  </Dialog>
  );
};

const NotificationItem = ({ sender, _id, handler}) => {
  return <></>;
};


export default Notifications
