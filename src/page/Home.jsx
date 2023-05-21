import { useLoginUser } from "../hooks/useLoginUser";
import { FavoriteCouncilor } from "../components/templates/FavoriteCouncilor";
import { getCouncilors, getCategoryList } from "../councilors";
import { useLoaderData, Form, useNavigate } from "react-router-dom";
import { Container, Button } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { CategoryTile } from "../components/atoms/CategoryTile";

export async function loader(request) {
  // DBから全議員データを取得
  const councilors = await getCouncilors();
  // DBからカテゴリリストを取得
  const categoryList = await getCategoryList();
  return { councilors, categoryList };
}

export const Home = () => {
  // loaderで取得した全議員情報を取得
  const { councilors, categoryList } = useLoaderData();

  const navigate = useNavigate();

  // 現在のユーザ情報を取得
  const { currentUser } = useLoginUser();
  console.log(currentUser);
  const councilorId = currentUser.favorite.councilor_id;
  const categoryId = currentUser.favorite.category_id;

  const onClick = () => {
    return navigate("/signin");
  };

  return (
    <>
      <Container maxWidth="md">
        <p id="zero-state">
          議員appのホーム画面です。
          <br />
          {currentUser.favorite.user_id === 1 ? (
            <>
              <Button variant="contained" onClick={onClick}>
                ログインする
              </Button>
              <p>
                ログインすることでお気に入りの議員やカテゴリの登録ができます
              </p>
            </>
          ) : (
            ""
          )}
        </p>
        {councilors.some((councilor) => councilor.id === councilorId) ? (
          councilors.map((councilor) =>
            councilor.id === councilorId ? (
              <FavoriteCouncilor favCouncilor={councilor} />
            ) : (
              ""
            )
          )
        ) : (
          <p>お気に入りの議員の登録がありません</p>
        )}

        {categoryList.some((category) => category.id === categoryId) ? (
          categoryList.map((category) => (
            <>
              {/* ユーザのお気に入り情報とカテゴリ一覧をぶつける */}
              {category.id === categoryId ? (
                <>
                  <p>興味のあるカテゴリ</p>
                  <CategoryTile category={category} />
                </>
              ) : (
                ""
              )}
            </>
          ))
        ) : (
          <p>興味のあるカテゴリが登録されていません</p>
        )}
      </Container>
    </>
  );
};

export default function CheckboxLabels() {
  return (
    <FormGroup>
      <Form>
        <FormControlLabel
          control={
            <Checkbox
              onChange={(event) => {
                console.log(event.currentTarget.value);
              }}
            />
          }
          label="環境"
        />
        <FormControlLabel control={<Checkbox />} label="Disabled" />
      </Form>
    </FormGroup>
  );
}
