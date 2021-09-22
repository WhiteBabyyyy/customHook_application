import axios from "axios";
import { useState } from "react";
import { UserProfile } from "../types/userProfile";
import { User } from "../types/api/user";

//全ユーザー一覧を取得するカスタムフック
export const useAllUsers = () => {
  const [userProfile, setUserProfile] = useState<Array<UserProfile>>([]);
  const [loading, setLoadning] = useState(false);
  const [error, setError] = useState(false);

  const getUsers = () => {
    setLoadning(true);
    setError(false);

    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`
        }));
        setUserProfile(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoadning(false);
      });
    //finallyは、処理がthen(正常終了)でもcatch(エラー)でも処理終了時に必ず実行される処理のこと
  };

  return { getUsers, userProfile, loading, error };
};
