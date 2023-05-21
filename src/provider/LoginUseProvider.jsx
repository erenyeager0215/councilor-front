import { createContext, useState } from "react";

// コンテクストを作成。外部からデータを取得できるようにexportで定義
export const CurrentUserContext = createContext(null);

const userInfo = {
  user_id: 1,
  favorite: {
    id: 1,
    user_id: 1,
    councilor_id: 0,
    category_id: 0,
  },
  prsonal: {
    birthday: "2000-01-01",
    gender: "male",
    home: "in",
  },
};

export const LoginUseProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(userInfo);

  return (
    // コンテクスト.providerとし、valueに指定した値はグローバルで参照できる
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {props.children}
    </CurrentUserContext.Provider>
  );
};
