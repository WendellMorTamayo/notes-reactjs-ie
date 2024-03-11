import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const availableColors = ["#378CE7"];

const getRandomColor = () => {
  return availableColors[Math.floor(Math.random() * availableColors.length)];
};

export default function MediaCard({ note }) {
  const cardColor = getRandomColor();

  return (
    <Card sx={{ width: 250, height: 200, backgroundColor: cardColor }}>
      <CardContent>
        <Typography
          variant="body"
          color="text.primary"
          className={"font-bold p-2"}
        >
          {note[0]}
        </Typography>
      </CardContent>
      <CardContent className={"mt-24"}>
        <Typography variant="body" color="text.primary">
          {note[1]}
        </Typography>
      </CardContent>
    </Card>
  );
}
