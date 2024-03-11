import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddNote = ({ onSubmit, getMyNotes }) => {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getData = () => {
    getMyNotes();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(note);
    getData();
    handleClose();
  };

  const handleChange = (event) => {
    setNote(event.target.value);
  };

  return (
    <div>
      <Button
        fullWidth
        variant="contained"
        className="p-10 justify-center items-center"
        onClick={handleOpen}
      >
        {" "}
        <AddIcon /> Add Note
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Note
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              id="note"
              label="Note"
              variant="outlined"
              fullWidth
              value={note}
              onChange={handleChange}
              autoFocus
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Add
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddNote;
