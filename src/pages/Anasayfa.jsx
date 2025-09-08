import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/anasayfa.css';

export default function Anasayfa() {
  return (
    <main className="page-anasayfa">
      <section className="container hero">
        <div className="logo card">
          <img src="/logo.png" alt="Yıldız Tarım Teknoloji ve İnşaat Logo" onError={(e)=> (e.currentTarget.style.display='none')} />
        </div>
        <h1>Yıldız Tarım Teknoloji ve İnşaat</h1>
        <p>Tarım, teknoloji ve inşaatta sürdürülebilir ve güvenilir çözümler üreten bir ekip.</p>
        <div className="quick">
          <Link className="btn" to="/projeler">Projeler</Link>
          <Link className="btn" to="/biz-kimiz">Biz Kimiz</Link>
          <Link className="btn" to="/iletisim">İletişim</Link>
        </div>
      </section>

      <section className="container" style={{marginTop:'2.5rem'}}>
        <div className="grid-2">
          <div className="card" style={{padding:'1.25rem'}}>
            <h3>Odak Alanlarımız</h3>
            <p className="muted">Akıllı sulama, tarımsal IoT, endüstriyel tesisler ve enerji verimliliği renovasyonları.</p>
          </div>
          <div className="card" style={{padding:'1.25rem'}}>
            <h3>Yaklaşımımız</h3>
            <p className="muted">Veri odaklı planlama, kaliteli malzeme, zamanında teslim ve şeffaf iletişim.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
