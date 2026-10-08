RAUFA DIGITAL — VERSI LYNK
==========================

Konsep versi ini:
Website Raufa Digital menjadi etalase/katalog.
Pembayaran dan pengiriman produk digital dilakukan oleh Lynk.id.

LINK WEBSITE
------------
Member login   : /login.html
Member daftar  : /register.html
Admin login    : /admin/login.html
Admin dashboard: /admin/dashboard.html

LINK LYNK
---------
Semua link Lynk yang penting dapat diedit di:
js/config.js

Yang perlu diganti:
1. lynkStoreUrl
2. lynkMemberUrl
3. lynkProducts (link masing-masing produk)
4. whatsapp
5. email
6. nama/tagline toko

PEMBAYARAN
----------
Jangan membuat QRIS sendiri di website. Tombol "Beli di Lynk" membuka halaman produk Lynk.
Lynk menangani checkout dan metode pembayaran yang tersedia di akun/produk Anda, termasuk QRIS bila tersedia.
Lynk juga dapat mengirimkan produk digital setelah pembayaran berhasil.

SUPABASE
--------
Supabase digunakan untuk login member/admin dan database website.
Isi supabaseUrl dan supabaseAnonKey di js/config.js.
Jalankan supabase/schema.sql di SQL Editor Supabase.

MEMBUAT ADMIN
-------------
1. Daftar akun melalui /register.html atau buat user melalui Supabase Auth.
2. Setelah user dibuat, buka SQL Editor Supabase.
3. Jalankan:
   update public.profiles set role='admin' where email='EMAIL_ANDA';
4. Buka /admin/login.html.

Password admin TIDAK disimpan di source code. Buat password Anda sendiri di Supabase/Auth.

PENTING
-------
- Jangan memasukkan service-role key Supabase ke file JS.
- Jangan memasukkan password admin ke HTML/JS.
- Link produk Lynk dapat diganti kapan saja dari js/config.js.
- File produk tetap dikelola oleh Lynk jika Anda memilih delivery file di Lynk.

WEBHOOK LYNK (OPSIONAL UNTUK TAHAP LANJUT)
-------------------------------------------
Lynk menyediakan webhook transaksi sukses. Jika nanti Anda ingin setiap transaksi Lynk otomatis masuk ke dashboard Raufa Digital, kita dapat menambahkan endpoint webhook dan sinkronisasi order/member.

SETELAH KONFIGURASI
-------------------
1. Upload website ke hosting.
2. Isi config.js.
3. Hubungkan Supabase.
4. Buat akun admin dan role admin.
5. Masukkan link produk Lynk.
6. Tes daftar member.
7. Tes login admin.
8. Tes tombol pembelian dari katalog sampai checkout Lynk.
