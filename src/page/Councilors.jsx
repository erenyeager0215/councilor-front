import { Grid } from "@mui/material";
import * as React from "react";
import { useLoaderData, Link, useFetcher } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { getCouncilors } from "../councilors";
import { useLoginUser } from "../hooks/useLoginUser";

export async function loader() {
  const councilors = await getCouncilors();
  return { councilors };
}

export const Councilors = () => {
  const { councilors } = useLoaderData();
  const { currentUser } = useLoginUser();

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
                    <div>
                      {currentUser.favorite.councilor_id === councilor.id ? (
                        <span>★</span>
                      ) : (
                        <span></span>
                      )}
                    </div>
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

function Favorite({ userInfo }) {
  const fetcher = useFetcher();
  // yes, this is a `let` for later
  let favorite = userInfo;

  // useLoadDataから送られるfavorite情報よりも早く★の表示を変えられる。
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
