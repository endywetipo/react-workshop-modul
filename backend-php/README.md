# Backend PHP CRUD

Backend ini adalah contoh API sederhana untuk latihan `coba08` dan `coba09` pada modul workshop.

## Menjalankan

Dari folder root proyek:

```bash
php -S localhost:8000 -t backend-php
```

Endpoint utama:

```text
http://localhost:8000/products.php
```

## Endpoint

| Method | URL | Fungsi |
|---|---|---|
| GET | `/products.php` | Mengambil semua produk |
| POST | `/products.php` | Menambah produk |
| PUT | `/products.php?id=1` | Mengubah produk |
| DELETE | `/products.php?id=1` | Menghapus produk |

Contoh body JSON untuk `POST` atau `PUT`:

```json
{
  "nama": "Honda Civic",
  "keterangan": "Sedan sporty untuk data latihan.",
  "gambar": "https://example.com/civic.jpg",
  "link": "https://example.com"
}
```

Data disimpan dalam `products.json`, sehingga tidak memerlukan MySQL untuk menjalankan contoh ini.
