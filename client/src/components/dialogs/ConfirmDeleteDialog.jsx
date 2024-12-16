import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

const ConfirmDeleteDialog = ({open, handleClose, deleteHandler}) => {
  return (
   <Dialog open={open} onClose ={handleClose}>
    <DialogTitle>Confirm Delete</DialogTitle>
    <DialogContent>
        <DialogContentText>
            Are you sure you want to delete this group?
        </DialogContentText>
    </DialogContent>

    <DialogActions>
      <button onClick={handleClose}>No</button>
      <button color='error' onClick={deleteHandler}>Yes</button>
    </DialogActions>
   </Dialog>
  )
}

export default ConfirmDeleteDialog
