import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import Anasayfa from './pages/Anasayfa.jsx';
import Projeler from './pages/Projeler.jsx';
import BizKimiz from './pages/BizKimiz.jsx';
import Iletisim from './pages/Iletisim.jsx';
import NotFound from './pages/NotFound.jsx';
import "./i18n";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Anasayfa />} />
        <Route path="/projeler" element={<Projeler />} />
        <Route path="/biz-kimiz" element={<BizKimiz />} />
        <Route path="/iletisim" element={<Iletisim />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </BrowserRouter>
  );
}
