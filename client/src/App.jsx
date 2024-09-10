import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import AdminProtectedroutes from './components/AdminProtectedroutes';
import DashCreateProduct from './components/DashCreateProduct';
import Testing from './pages/Testing';


function App() {
  return (

    <BrowserRouter>

      <Header />

      <Routes>

        <Route path='/' element={<Home />} />

        <Route path='/sign-up' element={<SignUp />} />

        <Route path='/sign-in' element={<SignIn />} />
        

        <Route element={<ProtectedRoute />}>

          <Route path='/dashboard' element={<Dashboard />} />

        </Route>

        <Route element={<AdminProtectedroutes />}>

          <Route path='/dashboard?tab=createProduct' element={<DashCreateProduct />} />
          <Route path='/testing' element={<Testing />} />

        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App
