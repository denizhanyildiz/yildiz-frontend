import React from 'react';
import '../styles/projeler.css';

export default function Projeler() {
  const list = [
    { title: 'Akıllı Sulama Altyapısı', desc: 'Sensör ve otomasyonla su tasarrufu sağlayan tarla altyapıları.' },
    { title: 'Tarımsal IoT İzleme', desc: 'Toprak nemi, sıcaklık ve iklim verilerini gerçek zamanlı takip.' },
    { title: 'Endüstriyel Tesis İnşaatı', desc: 'Ağır sanayi standartlarına uygun anahtar teslim projeler.' },
    { title: 'Enerji Verimli Renovasyon', desc: 'Yalıtım ve mekanik sistem iyileştirmeleriyle verimlilik artışı.' },
  ];
  return (
    <main className="page-projeler">
      <section className="container" style={{paddingTop:'2.2rem'}}>
        <h2>Projeler</h2>
        <div className="projects">
          {list.map((p, i) => (
            <article key={i} className="project-card card">
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
