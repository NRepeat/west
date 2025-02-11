import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import './styles/index.css';
import './styles/embla.css';
import App from './App.tsx';
import Product from './pages/Product.tsx';
import Navbar from './components/ui/navbar.tsx';
import Container from './components/ui/container.tsx';
import Footer from './components/ui/footer.tsx';
import Configurator from './pages/Configurator.tsx';
import Wishlist from './pages/Wishlist.tsx';
import Checkout from './pages/Checkout.tsx';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import AuthLayout from './components/ui/layout/auth.tsx';
import Auth from './pages/Auth.tsx';
import Query from './context/Query.tsx';
import { SessionProvider } from './context/StoreSession.tsx';
import Account from './pages/Account.tsx';
import Admin from './pages/Admin.tsx';



createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Query>
            <SessionProvider>
                <BrowserRouter>
                    <Container className="font-IstokWebRegular min-h-screen">
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<App />} />
                            <Route path="/product/:slug/var/:variantId" element={<Product />} />
                            <Route path="/configuration" element={<Configurator />} />
                            <Route path="/wish" element={<Wishlist />} />
                            <Route path="/checkout/:step" element={<Checkout />} />
                            {/* <Route path="/admin" element={<Checkout />} /> */}
                            <Route path='/acount' element={<Account />} />
                            <Route path='/auth' element={<AuthLayout />}>
                                <Route index element={<Auth />} />
                                <Route path='login' element={<Login />} />
                                <Route path='signup' element={<Signup />} />
                            </Route>
                            <Route path='admin' element={<Admin />} />
                        </Routes>
                    </Container>
                </BrowserRouter>
            </SessionProvider>
        </Query>


        <Footer />
    </StrictMode>,
);
