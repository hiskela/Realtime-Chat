import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import {
  getCurrentUser
} from "../services/auth.service";


const AuthContext = createContext();



export const AuthProvider = ({children}) => {

  const [user,setUser] = useState(null);

  const [loading,setLoading] = useState(true);



  useEffect(()=>{

    const checkUser = async()=>{

      const token =
        localStorage.getItem("token");


      if(!token){

        setLoading(false);

        return;

      }


      try{

        const response =
          await getCurrentUser();


        setUser(response.data.user);


      }catch(error){

        localStorage.removeItem("token");

      }
      finally{

        setLoading(false);

      }

    };


    checkUser();


  },[]);



  const login = (data)=>{

    localStorage.setItem(
      "token",
      data.token
    );

    setUser(data.user);

  };



  const logout = ()=>{

    localStorage.removeItem("token");

    setUser(null);

  };



  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};



export const useAuth = ()=>{

  return useContext(AuthContext);

};