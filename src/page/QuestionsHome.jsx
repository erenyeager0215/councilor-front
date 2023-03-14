import { Grid } from "@mui/material";
import * as React from "react";
import { useLoaderData } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { getCategoryList } from "../councilors";
import { LinkComponent } from "../components/atoms/LinkComponent";
import { useLoginUser } from "../hooks/useLoginUser";

export async function loader() {
  const categoryList = await getCategoryList();
  return { categoryList };
}

export const QuestionsHome = () => {
  const { categoryList } = useLoaderData();
  const { currentUser } = useLoginUser();

  console.log(categoryList);

  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {categoryList.map((category) => (
          <Grid item xs={2} sm={4} md={4} key={category}>
            <LinkComponent to={`./category/${category.id}`}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="120"
                    image="https://1.bp.blogspot.com/-tVeC6En4e_E/X96mhDTzJNI/AAAAAAABdBo/jlD_jvZvMuk3qUcNjA_XORrA4w3lhPkdQCNcBGAsYHQ/s1048/onepiece01_luffy.png"
                    alt="green iguana"
                  />
                  <CardContent>
                    <div>
                      {currentUser.favorite.category_id === category.id ? (
                        <span>★</span>
                      ) : (
                        <span></span>
                      )}
                    </div>
                    <Typography gutterBottom variant="h5" component="div">
                      {category.category_name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    ></Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </LinkComponent>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
