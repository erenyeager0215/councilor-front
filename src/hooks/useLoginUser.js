import { useContext } from "react";
import {CurrentUserContext} from "../provider/LoginUseProvider"

// useContextで引数にcreateContextで作成したコンテクストのうちどれを参照するか指定
// useContextはproviderにセットしたvalueを取得する関数
// この関数をグローバルで利用するためexportで宣言する
export const useLoginUser =()=> useContext(CurrentUserContext);

//  const {currentUser,setCurrentUser}=useLoginUser()で呼び出しする
