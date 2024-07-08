import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import GlobalStyle, { Main, MainContent } from './GlobalStyle'
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Home from './pages/Home/Home'
import TopBar from './components/TopBar/TopBar'
import NavBar from './components/NavBar/NavBar'
import SearchBar from './components/SearchBar/SearchBar'
import ProfileBox from './components/ProfileBox/ProfileBox'
import Title from './pages/Title/Title';
import { createContext } from 'react';
import axios, { AxiosResponse } from 'axios'
import Profile from './pages/Profile/Profile'
import Random from './pages/Random/Random'
import Follows from './pages/Follows/Follows'
import TopRated from './pages/TopRated/TopRated'

const UserContext = createContext<UserContext>({
  user: null,
  setUser: () => {}
});
export interface UserRating {
  mangaId: string,
  score: number
}
export interface User {
  id: string,
  username: string,
  email: string,
  role: string,
  mangaFollows?: string[],
  userRatings?: UserRating[] 
}

export interface UserContext {
  user: User | null,
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export async function getUser(setUser: React.Dispatch<React.SetStateAction<User | null>>) {
  try {
    const response: AxiosResponse = await axios.get<User>("https://localhost:7245/api/user/me", { withCredentials: true});
    if (response.data) {
      setUser(prev => response.data)
    }
  }
  catch (error) {
    console.log("No user.")
  }
}

export const useUserContext = () => useContext(UserContext);
function App(){
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    getUser(setUser)
  }, [])
  
  return (
      <BrowserRouter>
        <UserContext.Provider value={{user, setUser}}>
          <GlobalStyle/>
          <Routes>
            <Route path='/login' element={<Login/>}></Route> 
            <Route path='/register' element={<Register/>}></Route> 
            <Route path='*' element={<MainRoute/>}></Route>
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>

  )
}

function MainRoute() {
  const [navBarHidden, setNavBarHidden] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  function setProfile(isShown: boolean) {
    setShowProfile(prev => isShown)
  }

  useLayoutEffect(() => {
    if (window.innerWidth < 1200) {
      setNavBarHidden(prev => true)
    } 
  }, [])

  useEffect(() => {
    function listener (this: Document, e: Event) {
      if (window.innerWidth < 1200) {
        setNavBarHidden(prev => true)
      }
      else {
        setNavBarHidden(prev => false)
      }
    }
    window.addEventListener('resize', listener)

  }, [])
  
  return ( 
    <Main>
      <>
        <SearchBar isNavBarHidden={navBarHidden} />
        <TopBar isNavBarHidden={navBarHidden} showNavBar={() => setNavBarHidden(prev => false)} setProfile={() => setProfile(true)}/>
        {!navBarHidden && <NavBar onClose={() => setNavBarHidden(prev => true)}/>}
        {showProfile && <ProfileBox onClick={() => setProfile(false)}/>}
      </>
      <MainContent isNavBarHidden={navBarHidden}>
          <Routes>
            <Route path='/' element={<Home isNavBarHidden={navBarHidden}/>}></Route>
            <Route path='/title/:id' element={<Title isNavBarHidden={navBarHidden}/>}></Route>
            <Route path='/user/me' element={<Profile profileType='user'/>}></Route>
            <Route path='/author/:authorId' element={<Profile profileType='author'/>}></Route>
            <Route path='/random' element={<Random isNavBarHidden={navBarHidden}/>}></Route>
            <Route path='/user/follows' element={<Follows isNavBarHidden={navBarHidden}/>}></Route>
            <Route path='/top-rated' element={<TopRated isNavBarHidden={navBarHidden}/>}></Route>
          </Routes>
      </MainContent>
    </Main>
  )
}

export default App
