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

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Container className="font-IstokWebRegular min-h-screen">
                <Navbar />
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/product/:slug" element={<Product />} />
                    <Route path="/configuration" element={<Configurator />} />
                    <Route path="/wish" element={<Wishlist />} />
                    <Route path="/checkout/:step" element={<Checkout />} />
                    <Route path="/admin" element={<Checkout />}  />
                    
                </Routes>
            </Container>
        </BrowserRouter>
        <Footer />
    </StrictMode>,
);
