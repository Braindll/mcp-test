# 🌟 Modern Portfolio Sitesi

Bu proje, modern ve etkileyici bir kişisel portfolio web sitesidir.

## 🚀 Özellikler

- Responsive tasarım
- Modern ve minimalist arayüz
- Kolay özelleştirilebilir bileşenler
- Dark/Light mod desteği
- Projeler galerisi
- İletişim formu
- Blog bölümü
- Etkileyici animasyonlar

## 🛠️ Kullanılan Teknolojiler

- Vue.js 3 (Composition API)
- Firebase
  - Authentication
  - Firestore
  - Storage
  - Hosting
- GSAP (Gelişmiş animasyonlar için)
- Animate.css (Basit ve etkili animasyonlar için)
- Vite (Build tool)
- Pinia (State management)
- Vue Router
- TailwindCSS (Styling)

## 📦 Kurulum

1. Repository'yi klonlayın:
```bash
git clone https://github.com/Braindll/mcp-test.git
cd mcp-test
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

4. Tarayıcınızda açın:
```
http://localhost:5173
```

## 🔧 Firebase Yapılandırması

`.env` dosyası oluşturup Firebase yapılandırma bilgilerinizi ekleyin:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 📝 Özelleştirme

`src/config/settings.js` dosyasını düzenleyerek kişisel bilgilerinizi güncelleyebilirsiniz:

- Kişisel bilgiler
- Sosyal medya linkleri
- Projeler
- Yetenekler
- İletişim bilgileri

## 🎨 Animasyonlar

Projede iki farklı animasyon kütüphanesi kullanılmaktadır:

### GSAP
- Sayfa geçişleri
- Kaydırma bazlı animasyonlar
- Kompleks timeline animasyonları
- Paralaks efektleri

### Animate.css
- Hover efektleri
- Giriş/çıkış animasyonları
- Dikkat çekici elementler
- Basit geçiş efektleri

## 📱 Responsive Tasarım

Site aşağıdaki ekran boyutları için optimize edilmiştir:

- Mobil: 320px - 480px
- Tablet: 481px - 768px
- Laptop: 769px - 1024px
- Masaüstü: 1025px ve üzeri

## 🤝 Katkıda Bulunma

1. Bu repository'yi fork edin
2. Feature branch'i oluşturun (`git checkout -b feature/YeniOzellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/YeniOzellik`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakın.

## 📞 İletişim

Sorularınız için issue açabilir veya doğrudan iletişime geçebilirsiniz.