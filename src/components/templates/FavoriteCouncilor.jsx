import { CardMedia } from "@mui/material";

export const FavoriteCouncilor = ({ favCouncilor }) => {
  console.log(favCouncilor.name);
  return (
    <>
      <h2>現在支持している議員</h2>
      <CardMedia
        component="img"
        image={`${process.env.PUBLIC_URL}/${favCouncilor.imagepath}.jpg`}
        alt={`${favCouncilor.image}`}
        sx={{ borderRadius: "16px" }}
      />
      <h2>{favCouncilor.name}</h2>
    </>
  );
};
