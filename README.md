# CyberHook - Discord Webhook Manager
**CyberHook** adalah aplikasi web modern yang memungkinkan komunitas cybersecurity untuk mengirim pesan ke Discord melalui webhook langsung dari browser. Dibangun khusus untuk kebutuhan profesional dengan antarmuka yang elegan dan fitur-fitur canggih.

<div align="center">
  
  [![GitHub stars](https://img.shields.io/github/stars/odaysec/CyberHook?style=for-the-badge)](https://github.com/odaysec/CyberHook/stargazers)
  [![GitHub forks](https://img.shields.io/github/forks/odaysec/CyberHook?style=for-the-badge)](https://github.com/odaysec/CyberHook/network)
  [![GitHub issues](https://img.shields.io/github/issues/odaysec/CyberHook?style=for-the-badge)](https://github.com/odaysec/CyberHook/issues)
  [![License](https://img.shields.io/github/license/odaysec/CyberHook?style=for-the-badge)](LICENSE)
</div>

## Demo Live
 CyberHook demostration live previews : **[cyberhook.zerodaysec.org](https://cyberhook.zerodaysec.org)**


## Instalasi

### Prasyarat
- Node.js 16+ 
- npm atau yarn

### Langkah Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/odaysec/CyberHook.git
   cd CyberHook
   ```

2. **Install dependencies**
   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Jalankan development server**
   ```bash
   npm run dev
   # atau
   yarn dev
   ```

4. **Buka browser**
   ```
   http://localhost:5173
   ```

### 1. Setup Webhook Discord

1. Buka Discord dan pilih server/channel yang diinginkan
2. Klik **Settings channel** → **Integrations** → **Webhooks**
3. Klik **"New Webhook"** atau **"Create Webhook"**
4. Copy URL webhook yang dihasilkan

### 2. Konfigurasi CyberHook

1. Buka aplikasi CyberHook
2. Paste URL webhook di field **"Discord Webhook URL"**
3. Atur username bot (opsional)
4. Atur avatar URL bot (opsional)
5. Klik **"Simpan Konfigurasi"**

### 3. Kirim Pesan

#### Pesan Sederhana
- Ketik pesan di text area
- Klik tombol **"Send"**

#### Pesan dengan Embed
1. Klik **"Show"** pada Embed Builder
2. Klik **"Add Embed"**
3. Isi title, description, color, dll.
4. Tambahkan fields jika diperlukan
5. Kirim pesan

#### Kirim File
- Drag & drop file ke text area, atau
- Klik icon paperclip untuk browse file
- Maksimal 10 file, 8MB per file

## 📝 Roadmap

- [ ] **Multi-webhook support** - Kelola multiple webhook dalam satu interface
- [ ] **Message templates** - Template pesan yang dapat disimpan dan digunakan kembali
- [ ] **Scheduled messages** - Penjadwalan pengiriman pesan
- [ ] **Message analytics** - Statistik pengiriman pesan
- [ ] **Team collaboration** - Fitur kolaborasi tim
- [ ] **API integration** - REST API untuk integrasi eksternal
- [ ] **Mobile app** - Aplikasi mobile native


---

<div align="center">
  <p>Made with ❤️ for the cybersecurity community</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>

[![Star History Chart](https://api.star-history.com/svg?repos=odaysec/CyberHook&type=Date)](https://www.star-history.com/#odaysec/CyberHook&Date)
