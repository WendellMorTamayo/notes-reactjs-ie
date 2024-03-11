import React, { useEffect, useState } from "react";
import axios from "axios";

function useNotes() {
  const [notes, setNotes] = useState([]);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const signUp = async (note) => {
    try {
      await axios
        .post(
          "http://hyeumine.com/newuser.php",
          {
            firstname: note.firstname,
            lastname: note.lastname,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        )
        .then((response) => {
          setUserId(response.data["id"]);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const addNote = async (note) => {
    setLoading(true);
    try {
      await axios
        .post(
          "http://hyeumine.com/newnote.php",
          {
            id: userId,
            note: note,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        )
        .then(() => {
          setLoading(false);
          console.log("Post added successfully!");
          setAdded(!added);
        });
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const getMyNotes = async () => {
    setLoading(true);
    try {
      await axios
        .get("http://hyeumine.com/mynotes.php", {
          params: {
            id: userId,
          },
        })
        .then((response) => {
          console.log("My Data:", response.data);
          console.log(userId);
          setNotes(response.data["notes"]);
          setLoading(false);
        });
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyNotes().then((r) => {
      console.log(r);
    });
  }, [added]);

  return { notes, setNotes, userId, loading, signUp, addNote, getMyNotes };
}

export default useNotes;
