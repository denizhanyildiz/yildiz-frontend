import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Anasayfa from './pages/Anasayfa.jsx';
import Projeler from './pages/Projeler.jsx';
import BizKimiz from './pages/BizKimiz.jsx';
import Iletisim from './pages/Iletisim.jsx';
import "./i18n";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Anasayfa />} />
        <Route path="/projeler" element={<Projeler />} />
        <Route path="/biz-kimiz" element={<BizKimiz />} />
        <Route path="/iletisim" element={<Iletisim />} />
      </Routes>
    </BrowserRouter>
  );
}
