import React from 'react';
import '../styles/iletisim.css';

export default function Iletisim() {
  return (
    <main className="page-iletisim">
      <section className="container" style={{paddingTop:'2.2rem'}}>
        <h2>İletişim</h2>
        <div className="contact card">
          <div className="contact-row">
            <div className="info">
              <h3>Bize Ulaşın</h3>
              <p>info@yildiz-tarin-insaat.example</p>
              <p>+90 (312) 000 00 00</p>
              <p>Ankara / Türkiye</p>
              <div style={{marginTop:'1rem'}}>
                <a className="btn" href="mailto:info@yildiz-tarin-insaat.example">E-posta Gönder</a>
              </div>
            </div>
            <div className="map card" style={{background:'#eef2ff', display:'grid', placeItems:'center'}}>
              <span style={{color:'#475569'}}>Harita alanı (statik görsel veya embed ekleyin)</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
