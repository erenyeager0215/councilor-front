import { memo } from "react";
import {
  Grid,
  Card,
  CardMedia,
  Container,
  CardContent,
  Typography,
} from "@mui/material";
import { TwitterEmb } from "../atoms/TwitterEmb";

export const FavoriteCouncilor = memo(({ favCouncilor }) => {
  console.log(favCouncilor.name);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Card
            sx={{
              borderRadius: "16px",
              maxWidth: { xs: "250px", md: "none" },
              width: "100%",
              margin: { xs: "0 auto", md: "initial" },
            }}
          >
            <CardMedia
              component="img"
              image={`${process.env.PUBLIC_URL}/${favCouncilor.imagepath}.jpg`}
              alt={`${favCouncilor.image}`}
              sx={{
                borderRadius: "16px",
                width: "100%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={7}>
          <CardContent>
            <Typography variant="h6" component="div" align="center">
              {favCouncilor.name}
            </Typography>
          </CardContent>
          <TwitterEmb />
        </Grid>
      </Grid>
    </>
  );
});
