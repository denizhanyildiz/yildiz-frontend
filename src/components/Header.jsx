import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Home, Building2, Users2, Phone } from 'lucide-react';

export default function Header() {
  return (
    <header className="site-header">
      <nav className="container nav">
        <Link to="/" className="brand" aria-label="Yıldız Tarım Teknoloji ve İnşaat">
          <img src="/logo.pdf" alt="Logo" onError={(e) => (e.currentTarget.style.display = 'none')} />
          <span>Yıldız Tarım Teknoloji ve İnşaat</span>
        </Link>
        <div className="menu">
          <NavLink to="/" end className={({isActive})=> isActive?'active':undefined}><Home size={18}/> Anasayfa</NavLink>
          <NavLink to="/projeler" className={({isActive})=> isActive?'active':undefined}><Building2 size={18}/> Projeler</NavLink>
          <NavLink to="/biz-kimiz" className={({isActive})=> isActive?'active':undefined}><Users2 size={18}/> Biz Kimiz</NavLink>
          <NavLink to="/iletisim" className={({isActive})=> isActive?'active':undefined}><Phone size={18}/> İletişim</NavLink>
        </div>
      </nav>
    </header>
  )
}
