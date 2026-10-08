# Raufa Digital — Supabase + Lynk

Versi ini menggunakan Supabase Auth untuk login Member/Admin. Pembayaran dan pengiriman produk tetap diarahkan ke Lynk.id.

## Sebelum upload ke GitHub
1. Buka `js/config.js`.
2. Tempel **Publishable key** Supabase pada `supabasePublishableKey`.
3. Jangan memasukkan Secret key/service_role key.
4. Simpan.
5. Upload seluruh isi folder ini ke repository GitHub.

## Login
- Member: `login.html`
- Daftar: `register.html`
- Admin: `admin/login.html`

## Supabase
Project URL sudah diisi untuk project Raufa Digital.
File `supabase/01-auth-profiles.sql` digunakan untuk membuat trigger agar member baru otomatis memiliki profil dengan role `member`.

## Lynk
Kartu produk tidak menampilkan harga. Detail produk memiliki tombol `Beli di Lynk` yang mengarah ke produk Lynk masing-masing.
