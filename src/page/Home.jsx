import { useLoginUser } from "../hooks/useLoginUser";
import { FavoriteCouncilor } from "../components/templates/FavoriteCouncilor";
import { getCouncilors, getCategoryList } from "../councilors";
import { useLoaderData, Form } from "react-router-dom";
import * as React from "react";
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

  // 現在のユーザ情報を取得
  const { currentUser } = useLoginUser();
  const councilorId = currentUser.favorite.councilor_id;
  const categoryId = currentUser.favorite.category_id;

  return (
    <>
      <p id="zero-state">
        議員appのHomeページです.
        <br />
        Check out{" "}
        <a href="https://funabashi.gijiroku.com/g07_giinlist_s.asp">
          公式の議員一覧ページ
        </a>
      </p>
      {councilors.map((councilor) => (
        <>
          {councilor.id === councilorId ? (
            <FavoriteCouncilor favCouncilor={councilor} />
          ) : (
            ""
          )}
        </>
      ))}

      <p>興味のあるカテゴリ</p>
      {categoryList.map((category) => (
        <>
          {/* ユーザのお気に入り情報とカテゴリ一覧をぶつける */}
          {category.id === categoryId ? (
            <CategoryTile category={category} />
          ) : (
            ""
          )}
        </>
      ))}
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
