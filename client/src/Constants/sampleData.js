
export const sampleChats = [
  {
    avatar : ["https://images.app.goo.gl/BPwZ4DJMduHaWsJHA"],
    name: "mayur tekale",
    _id: "1",
    groupchat : false,
    members: ["1", "2"], 
  },


  {
    avatar : ["https://images.app.goo.gl/GJLdoqLVsZn3vV8w5"],
    name: "mayur patil",
    _id: "2",
    groupchat : true,
    members: ["1", "2"], 
  },
  {
    avatar : ["https://images.app.goo.gl/GJLdoqLVsZn3vV8w5"],
    name: "mayur patil",
    _id: "3",
    groupchat : true,
    members: ["1", "2"], 
  },
  {
    avatar : ["https://images.app.goo.gl/GJLdoqLVsZn3vV8w5"],
    name: "mayur patil",
    _id: "4",
    groupchat : true,
    members: ["1", "2"], 
  },
  {
    avatar : ["https://images.app.goo.gl/GJLdoqLVsZn3vV8w5"],
    name: "mayur patil",
    _id: "5",
    groupchat : true,
    members: ["1", "2"], 
  },
  {
    avatar : ["https://images.app.goo.gl/GJLdoqLVsZn3vV8w5"],
    name: "mayur patil",
    _id: "6",
    groupchat : true,
    members: ["1", "2"], 
  },
  {
    avatar : ["https://images.app.goo.gl/GJLdoqLVsZn3vV8w5"],
    name: "mayur patil",
    _id: "7",
    groupchat : true,
    members: ["1", "2"], 
  },
  {
    avatar : ["https://images.app.goo.gl/GJLdoqLVsZn3vV8w5"],
    name: "mayur patil",
    _id: "8",
    groupchat : true,
    members: ["1", "2"], 
  },
  {
    avatar : ["https://images.app.goo.gl/GJLdoqLVsZn3vV8w5"],
    name: "mayur patil",
    _id: "9",
    groupchat : true,
    members: ["1", "2"], 
  },
  {
    avatar : ["https://images.app.goo.gl/GJLdoqLVsZn3vV8w5"],
    name: "mayur patil",
    _id: "10",
    groupchat : true,
    members: ["1", "2"], 
  },
  {
    avatar : ["https://images.app.goo.gl/GJLdoqLVsZn3vV8w5"],
    name: "mayur patil",
    _id: "11",
    groupchat : true,
    members: ["1", "2"], 
  },
  {
    avatar : ["https://images.app.goo.gl/GJLdoqLVsZn3vV8w5"],
    name: "mayur patil",
    _id: "12",
    groupchat : true,
    members: ["1", "2"], 
  },
];

export const sampleUsers = [
  {
    avatar : ["https://images.app.goo.gl/GJLdoqLVsZn3vV8w5"],
    name: "mayur patil",
    _id: "1",
  },
  {
    avatar : ["https://images.app.goo.gl/GJLdoqLVsZn3vV8w5"],
    name: "mayur tekale",
    _id: "2",
  },
];


export const sampleNotifications = [
  {
    sender:{
    avatar : ["https://images.app.goo.gl/GJLdoqLVsZn3vV8w5"],
    name: "mayur patil",
    },
    _id: "1",
  },
  {
    sender:{
    avatar : ["https://images.app.goo.gl/GJLdoqLVsZn3vV8w5"],
    name: "mayur tekale",
    },
    _id: "2",
  },
];

export const sampleMessage = [
  {
    attachment:[
      
    ],
    content: "hi bro",
    _id: "jhgfgfd",
    sender: {
      _id: "user._id",
      name: "mayur",
    },
    chat: "chatId",
    groupChat: false,
    createdAt: "2020-02-01T0:41:30.630Z",
  },
  {
    attachment:[
      {
        public_id: "mbhdj 2",
        url: "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png",
      },
    ],
    content: "",
    _id: "jhgfdjgf",
    sender: {
      _id: "jhgfdjgf",
      name: "kunal",
    },
    chat: "chatId",
    groupChat: true,
    createdAt: "2020-02-01T0:41:30.630Z",
  },
];

// for user maanagment
export const dashboardData = {
  users: [
    {
      _id: "1",
      name: "Mayur",
      avatar: "https://i.pravatar.cc/150?img=3",
      username: "mayur",
      friends: 20,
      groups: 5,
    },
    {
      _id: "2",
      name: "Nikita",
      avatar: "https://i.pravatar.cc/150?img=2",
      username: "niki",
      friends: 50,
      groups: 5,
    },
    {
      _id: "3",
      name: "Rahul",
      avatar: "",
      username: "rahul23",
      friends: 35,
      groups: 8,
    },
    {
      _id: "4",
      name: "Sneha",
      avatar: "https://i.pravatar.cc/150?img=4",
      username: "sneha_k",
      friends: 40,
      groups: 10,
    },
  ],

  chats: [
    {
      _id: "1",
      name: "Tatya boys",
      avatar: ["https://i.pravatar.cc/150?img=2"],
     
      members: [{_id:"1", avatar:"https://i.pravatar.cc/150?img=4"},
       {_id:"2", avatar:"https://i.pravatar.cc/150?img=4"}
       ],
      totalMembers: 2,  
      totalMessages: 20,
      creator: {
        name: "mayur",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
    },
    {
      _id: "2",
      name: "Nilu Phule",
      avatar: ["https://i.pravatar.cc/150?img=4"],
     
      members: [{_id:"1", avatar:"https://i.pravatar.cc/150?img=4"},
        {_id:"2", avatar:"https://i.pravatar.cc/150?img=4"}
        ],
      totalMembers: 3,  
      totalMessages: 40,
      creator: {
        name: "nikita",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
    },
  ],


  messages: [
    {
      attachment:["https://i.pravatar.cc/150?img=4"],
      content: "heyy budddy",
      _id: "jhgfgfd",
      sender: {
        avatar: "https://i.pravatar.cc/150?img=4",
        name: "mayur",
      },
      chat: "chatId",
      groupChat: false,
      createdAt: "2020-02-01T0:41:30.630Z",
      
    },
    {
      attachment:[
        "https://i.pravatar.cc/150?img=4"
      ],
      content: "hi bro",
      _id: "jhgfgfd",
      sender: {
       avatar: "https://i.pravatar.cc/150?img=4",
        name: "mayur",
      },
      chat: "chatId",
      groupChat: true,
      createdAt: "2020-02-01T0:41:30.630Z",
    },
  ]
};