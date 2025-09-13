import React, { useState, useCallback, useEffect } from 'react';
import '../styles/projeler.css';
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

/** Google Drive görüntü linki hata verirse tek seferlik thumbnail endpoint'ine düş */
function onDriveImgError(e) {
  const img = e.currentTarget;
  if (img.dataset.fallbackDone === '1') {
    img.style.visibility = 'hidden'; // ikinci kez de olmadıysa gizle
    return;
  }
  img.dataset.fallbackDone = '1';
  const id =
    img.src.match(/[?&]id=([^&]+)/)?.[1] ||
    img.src.match(/\/d\/([^/]+)/)?.[1];
  if (id) {
    // w1600 genişliği genelde yeterli, istersen büyütebilirsin
    img.src = `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;
  } else {
    img.style.visibility = 'hidden';
  }
}

export default function Projeler() {
  const { t } = useTranslation();

  const projects = [
    {
      title: t("projects.project1.title"),
      start: t("projects.project1.startTime"),
      end: t("projects.project1.endTime"),
      desc: t("projects.project1.desc"),
      images: [
        "https://drive.google.com/uc?export=view&id=1CtlK1DKIolfx_3tLkZbenPVtsB8QU1Uv",
        "https://drive.google.com/uc?export=view&id=1n_uc2A1pZ-yyC6xKpCfhACx154zZYO35",
        "https://drive.google.com/uc?export=view&id=17JTmASmxS62KjbkTccv18o_aVpE7pPKQ",
        "https://drive.google.com/uc?export=view&id=1Oud9_GbF0lWZJs1nKYAmqCttEM7SiIS4"
      ]
    },
    {
      title: t("projects.project2.title"),
      start: t("projects.project2.startTime"),
      end: t("projects.project2.endTime"),
      desc: t("projects.project2.desc"),
      images: [
        "https://drive.google.com/uc?export=view&id=1xYdItdShbWonJzEQAPX_bzwUF4xq895l",
        "https://drive.google.com/uc?export=view&id=1OBO3fpaXDkWi8PXm7TUn_cG3rAZEZo_6",
        "https://drive.google.com/uc?export=view&id=1Do0oN8NUqG5BYF_ka_3MUQrWFEwlyXOH",
        "https://drive.google.com/uc?export=view&id=1aCYcsxqgvgdSeNA9XRdgzVqKZd9Y-HuI"
      ]
    }
  ];

  return (
    <main className="page-projeler">
      <section className="container" style={{ paddingTop: '2.2rem' }}>
        <h2>{t("projects.projects")}</h2>
        <div className="projects">
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} t={t} />
          ))}
        </div>
      </section>
    </main>
  );
}

function ProjectCard({ project, t }) {
  const thumbs = project.images.slice(0, 4);

  // Lightbox state
  const [isOpen, setIsOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const openAt = (i) => { setIdx(i); setIsOpen(true); };
  const close = () => setIsOpen(false);

  const prev = useCallback(() => {
    setIdx((i) => (i - 1 + thumbs.length) % thumbs.length);
  }, [thumbs.length]);

  const next = useCallback(() => {
    setIdx((i) => (i + 1) % thumbs.length);
  }, [thumbs.length]);

  // Klavye: Esc kapat, Sol/Sağ gezin
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, prev, next]);

  return (
    <article className="project-card card">
      <h3>{project.title}</h3>
      <p><strong>{t("projects.startTime")}</strong> {project.start}</p>
      <p><strong>{t("projects.endTime")}</strong> {project.end}</p>
      <p>{project.desc}</p>

      <div className="project-images" aria-label="Proje küçük görselleri">
        <div className="images-row">
          {thumbs.map((src, i) => (
            <button
              key={i}
              type="button"
              className="thumb-btn"
              onClick={() => openAt(i)}
              aria-label={`Görseli büyüt (${i + 1}/${thumbs.length})`}
            >
              <img
                src={src}
                alt={`${project.title} görsel ${i + 1}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={onDriveImgError}
              />
            </button>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {isOpen && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true" onClick={close}>
          <button className="lightbox-close" aria-label="Kapat" onClick={(e) => { e.stopPropagation(); close(); }}>
            <X size={22} />
          </button>

          <button className="lightbox-nav prev" aria-label="Önceki" onClick={(e) => { e.stopPropagation(); prev(); }}>
            <ChevronLeft size={28} />
          </button>

          <img
            key={thumbs[idx]}               // her değişimde yeniden mount olsun
            className="lightbox-img"
            src={thumbs[idx]}
            alt={`${project.title} büyük görsel ${idx + 1}`}
            onClick={(e) => e.stopPropagation()}
            referrerPolicy="no-referrer"
            onError={onDriveImgError}
          />

          <button className="lightbox-nav next" aria-label="Sonraki" onClick={(e) => { e.stopPropagation(); next(); }}>
            <ChevronRight size={28} />
          </button>

          <div className="lightbox-counter" onClick={(e) => e.stopPropagation()}>
            {idx + 1} / {thumbs.length}
          </div>
        </div>
      )}
    </article>
  );
}
