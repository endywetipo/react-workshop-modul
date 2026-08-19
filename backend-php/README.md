# Backend PHP CRUD

Backend ini adalah API sederhana untuk latihan `coba08` dan `coba09`. Data disimpan permanen ke file `products.json` pada server PHP.

## Menjalankan secara lokal

Dari folder root proyek:

```bash
php -S localhost:8000 -t backend-php
```

Endpoint utama:

```text
http://localhost:8000/products.php
```

Kemudian jalankan frontend pada terminal lain:

```bash
npm start
```

Buka modul `coba08`, lalu aktifkan tombol **Mode API PHP**. Frontend akan memuat data dari endpoint dan mengirim operasi tambah, edit, serta hapus ke backend.

## Endpoint

| Method | URL | Fungsi |
|---|---|---|
| GET | `/products.php` | Mengambil semua produk |
| POST | `/products.php` | Menambah produk |
| PUT | `/products.php?id=1` | Mengubah produk berdasarkan ID |
| DELETE | `/products.php?id=1` | Menghapus produk berdasarkan ID |

Contoh body JSON untuk `POST` atau `PUT`:

```json
{
  "nama": "Honda Civic",
  "keterangan": "Sedan sporty untuk data latihan.",
  "gambar": "https://example.com/civic.jpg",
  "link": "https://example.com"
}
```

## Penyimpanan permanen

Data ditulis ke `products.json` menggunakan `file_put_contents`. Pastikan folder backend memiliki izin tulis pada server PHP.

## Hosting online

GitHub Pages tidak menjalankan PHP. Untuk mode API online, unggah folder `backend-php` ke hosting yang mendukung PHP, misalnya shared hosting/cPanel. Setelah itu, set URL API saat build frontend:

```env
VITE_API_BASE_URL=https://domain-php-anda.com/products.php
```

Pastikan hosting PHP mengizinkan request dari domain frontend melalui header CORS. Konfigurasi default pada `config.php` sudah menyediakan:

```text
Access-Control-Allow-Origin: *
```

Untuk produksi, origin sebaiknya dibatasi ke domain frontend Anda.
