import { Grid } from "@mui/material";
import * as React from "react";
import { useLoaderData, Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { getCouncilors } from "../councilors";

export async function loader() {
  const councilors = await getCouncilors();
  return { councilors };
}

export const Councilors = () => {
  const { councilors } = useLoaderData();

  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {councilors.map((councilor) => (
          <Grid item xs={2} sm={4} md={4} key={councilor.id}>
            <Link to={`${councilor.id}`}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    sx={{ borderRadius: "8px" }}
                    image={`${process.env.PUBLIC_URL}/${councilor.imagepath}.jpg`}
                    alt={`${councilor.imagepath}`}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {councilor.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    ></Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
