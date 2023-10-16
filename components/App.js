import React, { useEffect, useState } from "react"
import AppRouter from 'components/Router';
import {authService} from "fbase";


function App() {
  const [init, setInit] = useState(false) // 추가 아직은 초기화 안됨
  const  [isLoggedIn, setLoggedIn] = useState(authService.currentUser);
  useEffect(() => {
    authService.onAuthStateChanged((user)=> {
      if(user) {
        setLoggedIn(true)
      }else{
        setLoggedIn(false)
      }
      setInit(true)
    })
  }, []) // 실제 로그인이 되어있는지 알 수 있음
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "initializing..."} 
  <footer>&copy: Nwitter {new Date().getFullYear()}</footer> 
  </>
  )
}



export default App;
