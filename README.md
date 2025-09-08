# Yıldız Tarım Teknoloji ve İnşaat – Tanıtım Sitesi (React + Vite)

Bu proje 4 sayfalı (Anasayfa, Projeler, Biz Kimiz, İletişim) statik bir tanıtım sitesidir. Her sayfanın stilleri benzersiz bir CSS kök sınıfı altında tanımlanmıştır.

## Kurulum (IntelliJ IDEA / Terminal)
1. Projeyi açın veya zip'ten çıkarın.
2. Terminalde aşağıdakileri çalıştırın:
   ```bash
   npm install
   npm run dev
   ```
3. Geliştirme adresi: `http://localhost:5173/`

## Yapı alma
```bash
npm run build
npm run preview
```

## Logo
`public/logo.pdf` içine logonuzu koyun.

## Dosya Yapısı (özet)

src/
  components/
    Header.jsx
  pages/
    Anasayfa.jsx
    Projeler.jsx
    BizKimiz.jsx
    Iletisim.jsx
  styles/
    common.css
    anasayfa.css
    projeler.css
    bizkimiz.css
    iletisim.css
