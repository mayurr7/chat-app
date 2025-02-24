import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table  from '../../components/Shared//Table';
import { dashboardData } from '../../Constants/sampleData';
import {fileFormat, transformImage} from '../../lib/features';
import moment from 'moment';
import { Avatar, Box, Stack } from '@mui/material';

import renderAttachment  from '../../components/Shared/RenderAttachment';


const columns = [
  {
  field: "id",
  headerName: "ID",
  headerClassName: "table-header",
  width: 200,
},
{
  field: "attachments",
  headerName: "Attachments",
  headerClassName: "table-header",
  width: 200,
  renderCell:(params) => {

    const {attachments} = params.row;

    return attachments?.length > 0 ? attachments.map((i) => {

      const url = i.url;
      const file = fileFormat(url);

      return (
        <Box>
          <a 
            href={url}
            download
            target='_blank'
            style={{
              color: "black",
            }}
          >
              {renderAttachment(file, url)}
          </a>
        </Box>
      )
    }) : "No attachments";


    return <Avatar alt={params.row.name} src={params.row.avatar}/>;
  }
},
{
  field: "content",
  headerName: "Content",
  headerClassName: "table-header",
  width: 400,
},
{
  field: "sender",
  headerName: "Sent By",
  headerClassName: "table-header",
  width: 200,
  renderCell:(params) => (
    <Stack direction="row" spacing="1rem" alignItems="center">
      <Avatar alt={params.row.sender.name} src={params.row.sender.avatar}/>
      <span>{params.row.sender.name}</span>
    </Stack>
  ),
},
{
  field: "chat",
  headerName: "Chat",
  headerClassName: "table-header",
  width: 220,
},
{
  field: "groupsChat",
  headerName: "Groups Chats",
  headerClassName: "table-header",
  width: 100,
},
{
  field: "createdAt",
  headerName: "Time",
  headerClassName: "table-header",
  width: 250,
}
];

const MessageManagment = () => {

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (!dashboardData?.messages) {
      console.error("dashboardData.messages is undefined");
      return;
    }

    const formattedRows = dashboardData.messages.map((i) => ({
      ...i,
      id: i._id || "N/A",
      sender: {
        name: i.sender?.name || "Unknown",
        avatar: i.sender?.avatar ? transformImage(i.sender.avatar, 50) : "",
      },
      attachments: i.attachments || "", 
      chat: i.chat || "N/A", 
      groupsChat: i.groupChat || "N/A",
      createdAt: moment(i.createdAt).isValid() ? moment(i.createdAt).format("MMMM Do YYYY, h:mm:ss a") : "Invalid Date", 
    }));

    setRows(formattedRows);
  }, []);

  return (
    <AdminLayout>
    <Table heading={"All Messages"} columns={columns} rows={rows}  rowHeight={100}/>
</AdminLayout>
  )
}

export default MessageManagment
