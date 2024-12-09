import React, { memo } from 'react'

const MessageComponent = ({ message, user}) => {
    const { sender, content, attachments = [], createdAt} = message;

    const sameSender = sender?._id === user?._id;
  return (
   

    <div 
        style={{
            alignSelf: sameSender ? "flex-end" : "flex-start",
            backgroundColor: "lightblue",
            color: "black",
            borderRadius: "5px",
            padding: "0.5rem",
            width: "fit-content",
        }}
    >
      ghhjjh
    </div>
  )
}

export default memo(MessageComponent)
