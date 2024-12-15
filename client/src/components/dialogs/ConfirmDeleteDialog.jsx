import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
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
   </Dialog>
  )
}

export default ConfirmDeleteDialog
