import React, { useState, useCallback, useEffect } from 'react';
import '../styles/projeler.css';
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

/* --- Helpers --- */
function driveViewUrl(src) {
  if (!src) return '';
  if (typeof src !== 'string') return '';
  if (!src.includes('http')) return `https://drive.google.com/uc?export=view&id=${src}`;
  const idFromFile = src.match(/\/file\/d\/([^/]+)/)?.[1];
  const idFromOpen = src.match(/[?&]id=([^&]+)/)?.[1];
  const id = idFromFile || idFromOpen;
  if (id) return `https://drive.google.com/uc?export=view&id=${id}`;
  if (src.includes('drive.google.com/uc?')) return src;
  return src;
}

function onDriveImgError(e) {
  const img = e.currentTarget;
  if (img.dataset.fallbackDone === '1') {
    img.style.visibility = 'hidden';
    return;
  }
  img.dataset.fallbackDone = '1';
  const id = img.src.match(/[?&]id=([^&]+)/)?.[1] || img.src.match(/\/d\/([^/]+)/)?.[1];
  if (id) {
    img.src = `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;
  } else {
    img.style.visibility = 'hidden';
  }
}

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
        src: driveViewUrl(entry),
        title: '',
        desc: ''
      };
    }
    const src = driveViewUrl(entry.src || entry.url || entry.link || '');
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
      images: [
        { src: "1P2yscSfnSjvz_mE9oOqF28IbGVFx2Jg9", title: "Görsel Başlik 1", desc: "Görsel Açiklama 1" },
        { src: "1rI3EHBTwMBuPjOq4gwHK7MHuRA6maokI", title: "Görsel Başlik 2", desc: "Görsel Açiklama 2" },
        { src: "1P2yscSfnSjvz_mE9oOqF28IbGVFx2Jg9", title: "Görsel Başlik 3", desc: "Görsel Açiklama 3" },
        { src: "1rI3EHBTwMBuPjOq4gwHK7MHuRA6maokI", title: "Görsel Başlik 4", desc: "Görsel Açiklama 4" }
      ],
      videos: [
        // Senin gönderdiğin: src alanı kullanıyordu — artık destekli.
        { src: "Jz8ECxTaJks", title: "Video Başlik 1", desc: "Video Açklama 1" }
      ]
    },
    {
      title: t("projects.project2.title"),
      start: t("projects.project2.startTime"),
      end: t("projects.project2.endTime"),
      desc: t("projects.project2.desc"),
      // Bu projede string öğeler bıraktım; normalizer stringleri de destekliyor.
      images: [
        { src: "1P2yscSfnSjvz_mE9oOqF28IbGVFx2Jg9", title: "Görsel Başlik 5", desc: "Görsel Açiklama 5" },
        { src: "1rI3EHBTwMBuPjOq4gwHK7MHuRA6maokI", title: "Görsel Başlik 6", desc: "Görsel Açiklama 6" },
        { src: "1P2yscSfnSjvz_mE9oOqF28IbGVFx2Jg9", title: "Görsel Başlik 7", desc: "Görsel Açiklama 7" },
        { src: "1rI3EHBTwMBuPjOq4gwHK7MHuRA6maokI", title: "Görsel Başlik 8", desc: "Görsel Açiklama 8" }
      ],
      videos: [
        { src: "Jz8ECxTaJks", title: "Video Başlik 2", desc: "Video Açklama 2" }
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
  // String/obj karışık veriyi normalize et
  const imageItems = normalizeImages(project.images);
  const videoItems = normalizeVideos(project.videos);
  const media = [...imageItems, ...videoItems];
  const VISIBLE = 4;                          // aynı anda görünen öğe sayısı
  const [winStart, setWinStart] = useState(0); // soldaki görünür öğenin indexi

  const canPrevSmall = winStart > 0;
  const canNextSmall = winStart + VISIBLE < media.length;

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
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, prev, next]);

  const prevSmall = () => {
    if (!canPrevSmall) return;
    setWinStart((s) => s - 1);
  };
  const nextSmall = () => {
    if (!canNextSmall) return;
    setWinStart((s) => s + 1);
  };

  const visibleItems = media.slice(winStart, winStart + VISIBLE);

  return (
    <article className="project-card card">
      <h3>{project.title}</h3>
      <p><strong>{t("projects.startTime")}</strong> {project.start}</p>
      <p><strong>{t("projects.endTime")}</strong> {project.end}</p>
      <p>{project.desc}</p>

      {/* --- KART İÇİ 4’LÜ KÜÇÜK MEDYA STRİP --- */}
      <div className="project-mini4">
        <div className="mini4-wrap">
          <button
            className="mini4-nav prev"
            type="button"
            aria-label="Önceki"
            onClick={(e) => { e.stopPropagation(); prevSmall(); }}
            disabled={!canPrevSmall}
          >
            <ChevronLeft size={18} />
          </button>

          <div className="mini4-row" role="list">
            {visibleItems.map((m, i) => {
              const absIndex = winStart + i;
              return (
                <button
                  key={absIndex}
                  type="button"
                  role="listitem"
                  className={`thumb-btn ${m.type === 'video' ? 'thumb-video' : ''}`}
                  onClick={() => openAt(absIndex)}
                >
                  {m.type === 'image' ? (
                    <img src={m.src} alt={m.title || `${project.title} görsel ${absIndex + 1}`} loading="lazy"
                      referrerPolicy="no-referrer" onError={onDriveImgError} />
                  ) : (
                    <>
                      <img src={m.thumb} alt={m.title || `${project.title} video küçük resim ${absIndex + 1}`} loading="lazy" />
                      <span className="play-badge" aria-hidden="true">▶</span>
                    </>
                  )}
                </button>
              );
            })}
          </div>

          <button
            className="mini4-nav next"
            type="button"
            aria-label="Sonraki"
            onClick={(e) => { e.stopPropagation(); nextSmall(); }}
            disabled={!canNextSmall}
          >
            <ChevronRight size={18} />
          </button>
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
                alt={media[idx].title || `${project.title} görsel`}
                referrerPolicy="no-referrer"
                onError={onDriveImgError}
              />
            ) : (
              <iframe
                key={media[idx].id}
                className="lightbox-iframe"
                src={media[idx].embed}
                title={media[idx].title || `${project.title} video`}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          <button className="lightbox-nav next" aria-label="Sonraki" onClick={(e) => { e.stopPropagation(); next(); }}>
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
