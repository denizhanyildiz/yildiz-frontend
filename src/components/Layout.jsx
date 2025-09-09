import React from "react";
import { Link, Outlet } from "react-router-dom";
//import "../styles/layout.css"; // Ortak CSS burada olabilir

export default function Layout() {
  return (
    <div className="layout">
      {/* Ortak Header */}
      <header className="header">
        <div className="logo">Yıldız İnşaat</div>
        <nav className="nav">
          <Link to="/">Anasayfa</Link>
          <Link to="/projeler">Projeler</Link>
          <Link to="/biz-kimiz">Biz Kimiz</Link>
          <Link to="/iletisim">İletişim</Link>
        </nav>
      </header>

      {/* Sayfa içeriği */}
      <main>
        <Outlet /> {/* Sayfaların içeriği burada render olacak */}
      </main>

      {/* Ortak Footer */}
      <footer className="footer">
        © 2025 Yıldız İnşaat - Tüm Hakları Saklıdır.
      </footer>
    </div>
  );
}