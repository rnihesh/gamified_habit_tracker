import { createContext, useEffect, useState } from "react";
export const userAuthorContextObj = createContext();
function UserAuthorContext({ children }) {
  const [currentUser, setCurrentUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profileImageUrl: "",
    score: 0,
    nscore: 0,
  });

  useEffect(() => {
    const userInStorage = localStorage.getItem("currentuser");
    if (userInStorage) {
      setCurrentUser(JSON.parse(userInStorage));
    }
  }, []);
  return (
    <userAuthorContextObj.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </userAuthorContextObj.Provider>
  );
}

export default UserAuthorContext;
