import React from 'react';
import {useInputValidation} from "6pp";
import { Dialog, DialogTitle, InputAdornment, List, ListItem, ListItemText, Stack, TextField } from '@mui/material';
import {Search as SearchIcon} from "@mui/icons-material";
import UserItem from '../Shared/UserItem';
import { sampleUsers } from '../../Constants/sampleData';
import { useState } from 'react';


const Search = () => {
  const search = useInputValidation("");

 let isLoadingSendFriendRequest = false;
 const [users, setUsers] =useState(sampleUsers);

   const addFriendHandler = (id) => {
      console.log(id);
      
  }

  
  return (
      <Dialog open>
        <Stack p={"2rem"} direction={"column"} width={"25rem"}>
          <DialogTitle textAlign={"center"}>Find People</DialogTitle>
          <TextField label=""  value={search.value} onChange={search.changeHandler}
          variant='outlined'
          size='small' 
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon/>
                
              </InputAdornment>
            )
          }}
          />

          <List>

                {
                  users.map((i) => (
                    <UserItem user={i}
                    key={i._id}
                    handler={addFriendHandler}
                    handlerIsLoading={isLoadingSendFriendRequest}
                    />
                  ))
                }
          </List>
          

        </Stack>
      </Dialog>
  )
}

export default Search
