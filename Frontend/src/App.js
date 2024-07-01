import './App.css';
import SplashScreen from './components/splashScreen/SplashScreen';
import { useState } from 'react';
import SidebarLayout from "react-advanced/SidebarLayout";
import { AuthProvider } from './components/globalContext/AuthContext';
import {  ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { blackAndWhiteTheme, pinkAndBlackTheme } from './components/themes/themes';
import Shop from './components/order/Shop';
import AddProducts from './components/Products/AddProducts';
import CustomerReport from './reports/CustomerReport';
import ProductReport from './reports/ProductReport';
import SalesReport from './reports/SalesReport';

const Login = lazy(() => import('./components/login/Login'));
const Signup = lazy(() => import('./components/signup/Signup'));

const Sidebar = lazy(()=>import("./components/sidebar/Sidebar"));
const AppBar = lazy(()=>import("./components/sidebar/Appbar"));
const ProductPage = lazy(()=>import('./components/Products/ProductPage'));
const Home = lazy(()=>import('./components/homePage/HomePage'));
const ItemList = lazy(()=>import('./components/Products/ItemList'));
const ContactUs = lazy (()=>import('./components/contactUs/contactUs'));

function App() {

  const [showSplash, setShowSplash] = useState(true);
  const [theme, setTheme] = useState(blackAndWhiteTheme);


  const handleSplashTimeout = () => {
    setShowSplash(false);
  };

  const toggleTheme = () => {
    setTheme(theme === blackAndWhiteTheme ? pinkAndBlackTheme : blackAndWhiteTheme);
  };

  return (
    <>

      {showSplash && <SplashScreen onTimeout={handleSplashTimeout} />}
      {!showSplash && <>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <Router>
              <SidebarLayout Leftbar={Sidebar} Rightbar={Sidebar} toggleTheme={toggleTheme}>
                {({ toggleLeftbar, toggleRightbar }) => (
                  <div >
                    <AppBar toggleLeftbar={toggleLeftbar} toggleRightbar={toggleRightbar} toggleTheme={toggleTheme}/>
                    <Suspense fallback={<div>Loading...</div>}>
                      <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/items/:productType" element={<ItemList />} />
                        <Route path="/productPage" element={<ProductPage />} />
                        <Route path='/contactUs' element={<ContactUs/>} />
                        <Route path='/cart' element={<Shop/>} />
                        <Route path='/addProduct' element={<AddProducts/>} />
                        <Route path='/customerReport' element={<CustomerReport/>} />
                        <Route path='/productReport' element={<ProductReport/>} />
                        <Route path='/SalesReport' element={<SalesReport/>} />

                      </Routes>
                    </Suspense>
                    {/* <Content /> */}
                  </div>
                )}
              </SidebarLayout>
            </Router>
          </ThemeProvider>
        </AuthProvider>
                </>
      }{}

    </>
  );
}

export default App;
