import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout';
import Table  from '../../components/Shared//Table';
import { Avatar, Stack } from '@mui/material';
import {dashboardData} from '../../Constants/sampleData';
import {transformImage} from '../../lib/features';
import AvatarCard from '../../components/Shared/AvatarCard';


const columns = [
  {
  field: "id",
  headerName: "ID",
  headerClassName: "table-header",
  width: 200,
},
{
  field: "avtar",
  headerName: "Avatar",
  headerClassName: "table-header",
  width: 150,
  renderCell:(params) => <AvatarCard avatar={params.row.avatar}/>
},
{
  field: "name",
  headerName: "Name",
  headerClassName: "table-header",
  width: 300,
},
{
  field: "totalMembers",
  headerName: "Total Members",
  headerClassName: "table-header",
  width: 120,
},
{
  field: "members",
  headerName: "Members",
  headerClassName: "table-header",
  width: 400,
  renderCell: (params) => <AvatarCard max={100} avatar={params.row.members}/>
},
{
  field: "totalMessages",
  headerName: "Total Messages",
  headerClassName: "table-header",
  width: 200,
},
{
  field: "creator",
  headerName: "Created By",
  headerClassName: "table-header",
  width: 250,

  renderCell:(params) => (
    <Stack direction="row" alignItems="center" spacing={"1rem"}>
      <Avatar alt={params.row.creator.name} src={params.row.creator.avatar}/>

      <span>{params.row.creator.name}</span>
    </Stack>
  )
}
];


const ChatManagment = () => {

  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      dashboardData.chats.map((i) => ({
      ...i,
      id: i._id,
      avatar: Array.isArray(i.avatar)
        ? i.avatar.map((img) => transformImage(img, 50))
        : transformImage(i.avatar, 50),

        members: i.members.map((i) => transformImage(i.avatar, 50)),

        creator: {
            name: i.creator.name,
            avatar: transformImage(i.creator.avatar, 50),
        },
      creator: i.creator || { name: "Unknown", avatar: "" }, 
    })));
     
  }, [])
  return (
     <AdminLayout>
        <Table heading={"All Chats"} columns={columns} rows={rows}/>
    </AdminLayout> 
  )
}


export default ChatManagment
