// import './App.css'
import {Routes, Route, useNavigate} from 'react-router-dom'
import {Layout} from './components/Layout'
import {Home} from './pages/Home'
import {Login} from './pages/Login'
import {Results} from './pages/Results'
import {Instructions} from './pages/Instructions'
import {About} from './pages/About'
import {useEffect} from 'react'
import {checkLocalData, getExchangeData} from './store/data-reducer'
import {useDispatch, useSelector} from 'react-redux'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  let navigate = useNavigate();

  useEffect(() => {
      dispatch(checkLocalData())
      dispatch(getExchangeData())
  }, [isLoggedIn, dispatch])

  useEffect(() => {
    if (!isLoggedIn) {
        return navigate("/login");
    }
}, [isLoggedIn, navigate]);

  return (
    <>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='results' element={<Results />} />
          <Route path='instructions' element={<Instructions />} />
          <Route path='about' element={<About />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
