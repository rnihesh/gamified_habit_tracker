import { Children, createContext, useEffect, useState } from "react";
export const adminContextObj = createContext();

function AdminContext({ children }) {
  let [currentAdmin, setCurrentAdmin] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profileImageUrl: "",
    role: "",
  });

  useEffect(() => {
    const userInStorage = localStorage.getItem("currentadmin");
    if (userInStorage) {
      setCurrentAdmin(JSON.parse(userInStorage));
    }
  }, []);

  return (
    <adminContextObj.Provider value={{ currentAdmin, setCurrentAdmin }}>
      {children}
    </adminContextObj.Provider>
  );
}

export default AdminContext;