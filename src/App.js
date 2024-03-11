import useNotes from "./hooks/useNotes";
import Button from "@mui/material/Button";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Drawer from "@mui/material/Drawer";
import React, { useEffect, useState } from "react";
import AddNote from "./components/Modal";
import MediaCard from "./components/NoteCard";
import { CircularProgress } from "@mui/material";

const drawerWidth = 240;
function App() {
  const { signUp, userId, notes, loading, addNote, getMyNotes } = useNotes();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      {!userId && <SignUp onSubmit={signUp} />}
      {userId && (
        <Box
          height={"screen"}
          sx={{
            backgroundColor: "lightgray",
            flexGrow: 1,
          }}
        >
          <Grid
            container
            spacing={0}
            justifyContent={"center"}
            alignItems={"center"}
            backgroundColor={"white"}
            width={"100%"}
            height={"100vh"}
            borderRadius={5}
          >
            <Box
              component={"nav"}
              sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
            >
              <Drawer
                variant={"permanent"}
                borderRadius={5}
                anchor={"left"}
                open={true}
                sx={{
                  display: { md: "block", sm: "none" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                  },
                }}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <span className={"text-center mt-4 font-bold text-xl"}>
                  Busico Notes
                </span>
                <AddNote
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onSubmit={addNote}
                  getMyNotes={getMyNotes}
                />
              </Drawer>
            </Box>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 8,
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                height: "100vh",
              }}
            >
              <Grid container spacing={2} direction={"column"}>
                <span className={"font-bold text-6 xl p-5"}>Notes</span>
                <Grid container direction={"row"}>
                  {notes.length >= 1 ? (
                    notes.map((note) => (
                      <div
                        className={"justify-between mr-4 mb-4"}
                        key={note.id}
                      >
                        <MediaCard note={note} />
                      </div>
                    ))
                  ) : (
                    <div>Loading...</div>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Box>
      )}
    </>
  );
}

export default App;
