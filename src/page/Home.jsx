import { useLoginUser } from "../hooks/useLoginUser";
import { FavoriteCouncilor } from "../components/templates/FavoriteCouncilor";
import { getCouncilors } from "../councilors";
import { useLoaderData } from "react-router-dom";

export async function loader() {
  const councilors = await getCouncilors();
  return { councilors };
}

export const Home = () => {
  const { councilors } = useLoaderData();
  const { currentUser } = useLoginUser();
  const councilorId = currentUser.favorite.councilor_id;

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
    </>
  );
};
