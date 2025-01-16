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
import Test from './pages/Test.tsx';
import Transition from './pages/Transition.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            {/* <Container className="font-IstokWebRegular"> */}
            {/* <Navbar /> */}
            <Routes>
                <Route path="/product/:slug" element={<Product />} />
                <Route path="/" element={<App />} />
                <Route path="/configuration" element={<Configurator />} />
                <Route path="/test" element={<Transition />} />
            </Routes>
            {/* </Container> */}
        </BrowserRouter>
        {/* <Footer /> */}
    </StrictMode>,
);
