import React, { useState, useCallback, useEffect, useRef } from 'react';
import Seo from '../components/Seo.jsx';
import '../styles/projeler.css';
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

/* --- Helpers --- */
function ytId(input) {
  if (!input) return '';
  if (typeof input !== 'string') return '';
  const i = input.trim();
  if (!i.includes('http')) return i;
  const m =
    i.match(/[?&]v=([^&]+)/) ||
    i.match(/youtu\.be\/([^?]+)/) ||
    i.match(/youtube\.com\/embed\/([^?]+)/);
  return m?.[1] || '';
}
const ytThumb = (id) => id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '';
const ytEmbed = (id) => id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : '';

/* --- Normalizers (string veya nesne desteği) --- */
function normalizeImages(images = []) {
  return images.map((entry) => {
    if (typeof entry === 'string') {
      return {
        type: 'image',
        src: entry,
        title: '',
        desc: ''
      };
    }
    const src = entry.src || entry.url || entry.link || '';
    return {
      type: 'image',
      src,
      title: entry.title || '',
      desc: entry.desc || ''
    };
  }).filter(it => !!it.src);
}

function normalizeVideos(videos = []) {
  return videos.map((entry) => {
    // string ise ID/URL olabilir
    if (typeof entry === 'string') {
      const id = ytId(entry);
      return {
        type: 'video',
        id,
        thumb: ytThumb(id),
        embed: ytEmbed(id),
        title: '',
        desc: ''
      };
    }
    // nesne ise id | src | url olabilir
    const idRaw = entry.id || entry.src || entry.url;
    const id = ytId(idRaw);
    return {
      type: 'video',
      id,
      thumb: ytThumb(id),
      embed: ytEmbed(id),
      title: entry.title || '',
      desc: entry.desc || ''
    };
  }).filter(it => !!it.id);
}

/* --- Page --- */
export default function Projeler() {
  const { t } = useTranslation();

  const projects = [
    {
      title: t("projects.project1.title"),
      start: t("projects.project1.startTime"),
      end: t("projects.project1.endTime"),
      desc: t("projects.project1.desc"),
      images: [1, 2, 7, 8, 3, 4, 5, 6].map((n) => ({ src: `/projects/besevler/${n}.webp` })),
      videos: []
    },
    {
      title: t("projects.project2.title"),
      start: t("projects.project2.startTime"),
      end: t("projects.project2.endTime"),
      desc: t("projects.project2.desc"),
      images: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => ({ src: `/projects/tarim/${n}.webp` })),
      videos: [
        { src: "Jz8ECxTaJks" }
      ]
    }
  ];

  return (
    <main className="page-projeler">
      <Seo title={t("projects.projects")} />
      <section className="container section">
        <h2 className="section-title">{t("projects.projects")}</h2>
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
  // String/obj karışık veriyi normalize et
  const imageItems = normalizeImages(project.images);
  const videoItems = normalizeVideos(project.videos);
  const media = [...imageItems, ...videoItems];
  const rowRef = useRef(null);
  const touchX = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const openAt = (i) => { setIdx(i); setIsOpen(true); };
  const close = () => setIsOpen(false);

  const prev = useCallback(() => {
    setIdx((i) => (i - 1 + media.length) % media.length);
  }, [media.length]);

  const next = useCallback(() => {
    setIdx((i) => (i + 1) % media.length);
  }, [media.length]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, prev, next]);

  // Şeridi bir sayfa kadar kaydır (masaüstü okları)
  const scrollRow = (dir) => {
    const el = rowRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  // Lightbox'ta yatay kaydırma ile önceki/sonraki
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
  };

  return (
    <article className="project-card card">
      <h3>{project.title}</h3>
      <div className="project-dates">
        <span><strong>{t("projects.startTime")}</strong> {project.start}</span>
        <span><strong>{t("projects.endTime")}</strong> {project.end}</span>
      </div>
      <p>{project.desc}</p>

      {/* --- KART İÇİ KAYDIRILABİLİR MEDYA ŞERİDİ --- */}
      {media.length > 0 && (
        <div className="project-strip">
          <button className="strip-nav prev" type="button" aria-label={t("common.prev")} onClick={() => scrollRow(-1)}>
            <ChevronLeft size={18} />
          </button>
          <div className="strip-row" role="list" ref={rowRef}>
            {media.map((m, i) => (
              <button
                key={i}
                type="button"
                role="listitem"
                className={`thumb-btn ${m.type === 'video' ? 'thumb-video' : ''}`}
                onClick={() => openAt(i)}
              >
                {m.type === 'image' ? (
                  <img src={m.src} alt={m.title || `${project.title} ${t('common.image')} ${i + 1}`} loading="lazy" />
                ) : (
                  <>
                    <img src={m.thumb} alt={m.title || `${project.title} ${t('common.video')} ${i + 1}`} loading="lazy"
                      onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }} />
                    <span className="play-badge" aria-hidden="true">▶</span>
                  </>
                )}
              </button>
            ))}
          </div>
          <button className="strip-nav next" type="button" aria-label={t("common.next")} onClick={() => scrollRow(1)}>
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* LIGHTBOX */}
      {isOpen && media[idx] && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true" onClick={close} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <button className="lightbox-close" aria-label={t("common.close")} onClick={(e) => { e.stopPropagation(); close(); }}>
            <X size={22} />
          </button>

          <button className="lightbox-nav prev" aria-label={t("common.prev")} onClick={(e) => { e.stopPropagation(); prev(); }}>
            <ChevronLeft size={28} />
          </button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {/* Başlık ve açıklama medya öğesinden */}
            <div className="lightbox-caption">
              <h4>{media[idx].title || project.title}</h4>
              <p>{media[idx].desc || project.desc}</p>
            </div>
            {media[idx]?.type === "image" ? (
              <img
                key={media[idx].src}
                className="lightbox-img"
                src={media[idx].src}
                alt={media[idx].title || `${project.title} ${t('common.image')}`}
               
              />
            ) : (
              <iframe
                key={media[idx].id}
                className="lightbox-iframe"
                src={media[idx].embed}
                title={media[idx].title || `${project.title} ${t('common.video')}`}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          <button className="lightbox-nav next" aria-label={t("common.next")} onClick={(e) => { e.stopPropagation(); next(); }}>
            <ChevronRight size={28} />
          </button>

          <div className="lightbox-counter" onClick={(e) => e.stopPropagation()}>
            {idx + 1} / {media.length}
          </div>
        </div>
      )}
    </article>
  );
}
