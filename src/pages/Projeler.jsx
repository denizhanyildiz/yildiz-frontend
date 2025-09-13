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
        { src: "1CtlK1DKIolfx_3tLkZbenPVtsB8QU1Uv", title: "Görsel Başlık 1", desc: "Görsel Açıklama 1" },
        { src: "1n_uc2A1pZ-yyC6xKpCfhACx154zZYO35", title: "Görsel Başlık 2", desc: "Görsel Açıklama 2" },
        { src: "17JTmASmxS62KjbkTccv18o_aVpE7pPKQ", title: "Görsel Başlık 3", desc: "Görsel Açıklama 3" },
        { src: "1Oud9_GbF0lWZJs1nKYAmqCttEM7SiIS4", title: "Görsel Başlık 4", desc: "Görsel Açıklama 4" }
      ],
      videos: [
        // Senin gönderdiğin: src alanı kullanıyordu — artık destekli.
        { src: "kWjmhDkPQQ4", title: "Video Başlık 1", desc: "Video Açıklama 1" }
      ]
    },
    {
      title: t("projects.project2.title"),
      start: t("projects.project2.startTime"),
      end: t("projects.project2.endTime"),
      desc: t("projects.project2.desc"),
      // Bu projede string öğeler bıraktım; normalizer stringleri de destekliyor.
      images: [
        "1xYdItdShbWonJzEQAPX_bzwUF4xq895l",
        "1OBO3fpaXDkWi8PXm7TUn_cG3rAZEZo_6",
        "1Do0oN8NUqG5BYF_ka_3MUQrWFEwlyXOH",
        "1aCYcsxqgvgdSeNA9XRdgzVqKZd9Y-HuI"
      ],
      videos: [
        "kWjmhDkPQQ4"
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

  return (
    <article className="project-card card">
      <h3>{project.title}</h3>
      <p><strong>{t("projects.startTime")}</strong> {project.start}</p>
      <p><strong>{t("projects.endTime")}</strong> {project.end}</p>
      <p>{project.desc}</p>

      <div className="project-images" aria-label="Proje küçük görselleri">
        <div className="images-row">
          {media.map((m, i) => (
            <button
              key={i}
              type="button"
              className={`thumb-btn ${m.type === 'video' ? 'thumb-video' : ''}`}
              onClick={() => openAt(i)}
              aria-label={m.type === 'video'
                ? `Videoyu aç (${i + 1}/${media.length})`
                : `Görseli büyüt (${i + 1}/${media.length})`}
            >
              {m.type === 'image' ? (
                <img
                  src={m.src}
                  alt={m.title || `${project.title} görsel ${i + 1}`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={onDriveImgError}
                />
              ) : (
                <>
                  <img
                    src={m.thumb}
                    alt={m.title || `${project.title} video küçük resim ${i + 1}`}
                    loading="lazy"
                  />
                  <span className="play-badge" aria-hidden="true">▶</span>
                </>
              )}
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
