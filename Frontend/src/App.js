import './App.css';

import SidebarLayout from "react-advanced/SidebarLayout";
import { AuthProvider } from './components/globalContext/AuthContext';
import Content from "./components/sidebar/Content";
import Sidebar from "./components/sidebar/Sidebar";
import AppBar from "./components/sidebar/Appbar";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ProductPage from "./components/Products/ProductPage";
import Home from './components/homePage/HomePage';
import ItemList from './components/Products/ItemList';
// import Login from './components/login/Login';
const Login = lazy(() => import('./components/login/Login'));
const Signup = lazy(() => import('./components/signup/Signup'));

const theme = createTheme();


function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
      <Router>
   <SidebarLayout Leftbar={Sidebar} Rightbar={Sidebar}>
    {({ toggleLeftbar, toggleRightbar }) => (
      <div>
        <AppBar toggleLeftbar={toggleLeftbar} toggleRightbar={toggleRightbar} />
        <Suspense fallback={<div>Loading...</div>}>
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/items/:productType" element={<ItemList />} />
        <Route path="/productPage" element={<ProductPage />} />

            </Routes>
         </Suspense>   
        <Content />
      </div>
    )}
  </SidebarLayout>
  </Router>
   </ThemeProvider>
   </AuthProvider>
  );
}

export default App;
