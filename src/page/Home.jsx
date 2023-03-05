import { useLoginUser } from "../hooks/useLoginUser";
import { FavoriteCouncilor } from "../components/templates/FavoriteCouncilor";
import { getCouncilors, getCategory } from "../councilors";
import { useLoaderData, Form } from "react-router-dom";

import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useSubmit } from "react-router-dom";

export async function loader(request) {
  // 全議員データを取得
  const councilors = await getCouncilors();
  return { councilors };
}

export const Home = () => {
  const { councilors } = useLoaderData();
  const { currentUser } = useLoginUser();
  const councilorId = currentUser.favorite.councilor_id;
  const submit = useSubmit();

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
