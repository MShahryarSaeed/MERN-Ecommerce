import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import Header from './components/Header';


// Pages
import SignUp from './pages/SignUp';
import Home from './pages/Home';

function App() {


  return (
    <BrowserRouter>

      <Header />

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
