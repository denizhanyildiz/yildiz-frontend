import React from 'react';
import '../styles/bizkimiz.css';

export default function BizKimiz() {
  const stats = [
    { k: '+20', v: 'Tamamlanan Proje' },
    { k: '10+', v: 'Uzman Ekip' },
    { k: '%98', v: 'Zamanında Teslim' },
    { k: '7/24', v: 'Destek' },
  ];
  return (
    <main className="page-bizkimiz">
      <section className="container" style={{paddingTop:'2.2rem'}}>
        <div className="card about">
          <h2>Biz Kimiz</h2>
          <p className="muted">Mühendislik, veri ve saha deneyimini bir araya getiren multidisipliner bir ekibiz. Sahada doğrulanmış, teknoloji destekli çözümler geliştiririz.</p>
          <div className="stats">
            {stats.map((s, i) => (
              <div key={i} className="stat card">
                <strong>{s.k}</strong>
                <span>{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
