# Yıldız Tarım Teknoloji ve İnşaat Tanıtım Sitesi

Bu depo, Yıldız Tarım Teknoloji ve İnşaat için hazırlanmış dört sayfalı (Anasayfa, Projeler, Biz Kimiz, İletişim) tek sayfa uygulamasını (SPA) barındırır. Proje React ve Vite ile geliştirilmiştir; içerik ve stiller tamamen statik olup kolayca özelleştirilebilir.

## Özellikler
- ⚛️ **React + Vite** mimarisi ile hızlı geliştirme ve üretim derlemesi
- 🌐 `react-router-dom` ile sayfalar arasında istemci tarafı yönlendirme
- 🧭 Dil algılama destekli `react-i18next` kurulumu (Türkçe ve İngilizce JSON içerikleri)
- 🎨 Sayfa bazlı CSS modülerliği (`src/styles`) ile özelleştirilebilir tasarım
- 📱 Mobil uyumluluk odaklı bileşenler ve başlık navigasyonu

## Gereksinimler
- Node.js 18+ (Vite 5 ile uyumlu bir sürüm)
- npm 9+ (veya uyumlu bir paket yöneticisi)

## Kurulum ve Çalıştırma
1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
2. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```
   - Varsayılan adres: <http://localhost:5173/>
3. Üretim derlemesi almak için:
   ```bash
   npm run build
   ```
4. Derlenmiş çıktıyı yerel olarak ön izlemek için:
   ```bash
   npm run preview
   ```

## Proje Yapısı
```
├── public/
│   └── logo.pdf          # Şirket logosunu ekleyin veya güncelleyin
├── src/
│   ├── components/
│   │   └── Header.jsx    # Site genelinde kullanılan üst menü
│   ├── pages/            # Her rota için sayfa bileşenleri
│   │   ├── Anasayfa.jsx
│   │   ├── BizKimiz.jsx
│   │   ├── Iletisim.jsx
│   │   └── Projeler.jsx
│   ├── locales/
│   │   ├── en/common.json
│   │   └── tr/common.json
│   ├── styles/
│   │   ├── anasayfa.css
│   │   ├── bizkimiz.css
│   │   ├── common.css
│   │   ├── iletisim.css
│   │   └── projeler.css
│   ├── App.jsx           # Router ve sayfa bileşenleri
│   ├── i18n.js           # Uluslararasılaştırma yapılandırması
│   └── main.jsx          # React giriş noktası
└── vite.config.js        # Vite yapılandırması
```

## İçerik ve Yerelleştirme
- Metin içerikleri `src/locales/tr/common.json` ve `src/locales/en/common.json` dosyalarından yüklenir.
- Yeni bir dil eklemek için ilgili dil kodu ile bir JSON dosyası oluşturun ve `src/i18n.js` içerisinde `resources` ve `supportedLngs` listelerine ekleyin.
- Tarayıcı dil algılama sırası `localStorage`, `html` etiketinin `lang` özelliği ve `navigator.language` şeklindedir.

## Dağıtım
- `npm run build` komutu `dist/` klasörü altında statik dosyalar üretir. Vercel, Netlify veya herhangi bir statik barındırma hizmeti ile dağıtılabilir.
- Vercel için örnek yapılandırma `vercel.json` dosyasında bulunmaktadır.

## Lisans
Bu projenin lisans bilgisi belirtilmemiştir. Bir lisans kullanmayı düşünüyorsanız uygun bir lisans dosyası (`LICENSE`) ekleyebilirsiniz.
