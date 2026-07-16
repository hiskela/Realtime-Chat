import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import {
  getCurrentUser,
  logoutUser
} from "../services/auth.service";


const AuthContext=createContext();



export const AuthProvider=({children})=>{


  const [user,setUser]=useState(null);

  const [loading,setLoading]=useState(true);



  useEffect(()=>{


    const checkAuth=async()=>{

      try{

        const response =
          await getCurrentUser();


        setUser(
          response.data.user
        );


      }catch(error){

        setUser(null);

      }
      finally{

        setLoading(false);

      }

    };


    checkAuth();


  },[]);





 const logout=async()=>{

  try{

    await logoutUser();

  }
  finally{

    setUser(null);

  }

};


  return (

    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        loading
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};



export const useAuth=()=>{

  return useContext(AuthContext);

};