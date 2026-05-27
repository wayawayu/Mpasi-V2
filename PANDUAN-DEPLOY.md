# 🌸 MPASI Tracker — Panduan Deploy (Versi Anti-Gagal)

Versi ini sudah disusun **datar (flat)** supaya tidak gagal saat upload ke GitHub.
Semua file kode ada di satu level, cuma ada satu folder `public` (berisi ikon).

---

## ⚠️ PENTING — Penyebab Gagal Sebelumnya

Build gagal karena file di dalam folder `src` tidak ikut ter-upload ke GitHub.
Sekarang folder `src` sudah dihapus, jadi masalah itu tidak akan terulang.

---

## ✅ CARA DEPLOY (Vercel + GitHub)

### Kalau repo lama sudah ada (mpasi-tracker):
Paling aman: **buat repository BARU** supaya bersih dari file lama yang kurang lengkap.

### Langkah 1 — Buat repo baru di GitHub
1. Buka https://github.com → klik **+** → **New repository**
2. Beri nama, misal `mpasi-app` → **Create repository**

### Langkah 2 — Upload SEMUA file (cara yang benar)
1. Di halaman repo baru, klik **"uploading an existing file"**
2. Buka folder hasil extract di komputer
3. **Pilih SEMUA isi di dalamnya** (Ctrl+A / Cmd+A): `index.html`, `main.jsx`,
   `App.jsx`, `index.css`, `package.json`, `vite.config.js`, `.gitignore`,
   dan folder `public`
4. **Seret semuanya** ke jendela upload GitHub sekaligus
5. Tunggu sampai SEMUA file muncul di daftar (pastikan folder `public` ikut!)
6. Klik **Commit changes**

### Langkah 3 — Pastikan file lengkap di GitHub ✔️
Sebelum lanjut, cek halaman repo. Harus ada file-file ini terlihat:
- ✅ index.html
- ✅ main.jsx
- ✅ App.jsx
- ✅ index.css
- ✅ package.json
- ✅ vite.config.js
- ✅ folder **public** (klik untuk pastikan ada 5 file gambar di dalamnya)

Kalau ada yang kurang, upload lagi yang kurang sebelum deploy.

### Langkah 4 — Deploy di Vercel
1. Buka https://vercel.com → **Add New → Project**
2. Pilih repo baru tadi → **Import**
3. Biarkan semua pengaturan default (Framework: Vite akan terdeteksi otomatis)
4. Klik **Deploy** → tunggu ~1 menit ☕

Selesai! Dapat link seperti `https://mpasi-app.vercel.app` 🎉

---

## 💻 ALTERNATIF PALING CEPAT (tanpa GitHub)

Kalau punya Node.js di komputer (download: https://nodejs.org, pilih LTS):

```bash
npm install
npm run build
```

Lalu buka **https://app.netlify.com/drop** → seret folder **`dist`** (hasil build) ke sana.
Langsung dapat link, tanpa GitHub sama sekali. Ini cara paling anti-ribet.

---

## 📱 Cara User Pasang di HP

**Android (Chrome):** buka link → menu ⋮ → **Add to Home screen**
**iPhone (Safari):** buka link → tombol **Share** → **Add to Home Screen**

---

## ❓ FAQ

**Aman diakses banyak orang?** Sangat aman — berjalan di HP masing-masing user lewat CDN global, sanggup trafik besar.
**Data tersimpan di mana?** Di HP/browser masing-masing (localStorage), tidak dikirim ke server, privasinya aman.
**Butuh login Claude?** Tidak. Aplikasi ini 100% mandiri setelah online.
