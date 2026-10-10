-- Jalankan SEKALI di Supabase > SQL Editor > New query > Run.
-- Menambahkan fitur kelola halaman dan pengaturan nama pribadi member.

alter table public.profiles add column if not exists store_name text;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path=public as $$
  select exists(select 1 from public.profiles where id=auth.uid() and role='admin');
$$;

-- Pastikan aturan admin untuk produk tersedia (role diperiksa di database).
alter table public.products enable row level security;
drop policy if exists products_read on public.products;
create policy products_read on public.products for select using (is_active = true or public.is_admin());
drop policy if exists products_admin_insert on public.products;
create policy products_admin_insert on public.products for insert with check (public.is_admin());
drop policy if exists products_admin_update on public.products;
create policy products_admin_update on public.products for update using (public.is_admin()) with check (public.is_admin());
drop policy if exists products_admin_delete on public.products;
create policy products_admin_delete on public.products for delete using (public.is_admin());

-- Simpan tautan member di tabel terpisah supaya tidak ikut terbaca oleh pengunjung anonim.
create table if not exists public.product_member_links (
  product_id uuid primary key references public.products(id) on delete cascade,
  member_url text not null,
  updated_at timestamptz not null default now()
);
alter table public.product_member_links enable row level security;
drop policy if exists product_member_links_member_read on public.product_member_links;
create policy product_member_links_member_read on public.product_member_links for select using (auth.uid() is not null or public.is_admin());
drop policy if exists product_member_links_admin_insert on public.product_member_links;
create policy product_member_links_admin_insert on public.product_member_links for insert with check (public.is_admin());
drop policy if exists product_member_links_admin_update on public.product_member_links;
create policy product_member_links_admin_update on public.product_member_links for update using (public.is_admin()) with check (public.is_admin());
drop policy if exists product_member_links_admin_delete on public.product_member_links;
create policy product_member_links_admin_delete on public.product_member_links for delete using (public.is_admin());

create table if not exists public.site_pages (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  content text not null default '',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.site_pages enable row level security;
drop policy if exists site_pages_public_read on public.site_pages;
create policy site_pages_public_read on public.site_pages for select using (is_active = true or public.is_admin());
drop policy if exists site_pages_admin_insert on public.site_pages;
create policy site_pages_admin_insert on public.site_pages for insert with check (public.is_admin());
drop policy if exists site_pages_admin_update on public.site_pages;
create policy site_pages_admin_update on public.site_pages for update using (public.is_admin()) with check (public.is_admin());
drop policy if exists site_pages_admin_delete on public.site_pages;
create policy site_pages_admin_delete on public.site_pages for delete using (public.is_admin());

-- Member hanya dapat mengubah full_name dan store_name lewat fungsi ini;
-- role admin/member tidak dapat diubah melalui form member.
create or replace function public.update_my_member_settings(p_full_name text, p_store_name text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'Silakan login terlebih dahulu.'; end if;
  if length(trim(coalesce(p_full_name,''))) < 1 then raise exception 'Nama tidak boleh kosong.'; end if;
  if length(trim(coalesce(p_full_name,''))) > 100 or length(trim(coalesce(p_store_name,''))) > 100 then raise exception 'Nama maksimal 100 karakter.'; end if;
  update public.profiles
  set full_name = trim(p_full_name), store_name = nullif(trim(coalesce(p_store_name,'')), '')
  where id = auth.uid();
  if not found then raise exception 'Profil tidak ditemukan.'; end if;
end; $$;
revoke all on function public.update_my_member_settings(text,text) from public;
grant execute on function public.update_my_member_settings(text,text) to authenticated;

-- Import enam produk toko ke database agar bisa dikelola lewat Admin > Produk. Tautan member disimpan terpisah.
insert into public.products(name,slug,category,description,price,lynk_url,icon,featured,is_active)
values
('Paket Bundling Worksheet Anak Premium','bundle-premium','Bundling','Paket premium worksheet anak untuk belajar, bermain, membaca, berhitung, menggambar, dan aktivitas lainnya.',99999,'https://lynk.id/fadilyusdi/w30815z44we6','🎁',true,true),
('1200++ Halaman Aktifitas Anak Islami','islami','Islami','Kumpulan aktivitas islami untuk anak agar belajar agama dengan cara menyenangkan.',24000,'https://lynk.id/fadilyusdi/zq8x7yqp3x80','🌙',true,true),
('Worksheet Matematika Dasar Anak 2–9 Tahun','matematika','Matematika','Latihan matematika dasar untuk membantu anak belajar angka dan berhitung.',20000,'https://lynk.id/fadilyusdi/ow9dr62q4wx3','🔢',true,true),
('39000+ Printable Anak Hebat','printable','Worksheet Anak','Koleksi printable anak untuk membaca, menghitung, mewarnai, dan berbagai aktivitas lainnya.',24000,'https://lynk.id/fadilyusdi/9z89j3w58e66','📚',true,true),
('Ebook Panduan Lengkap Cuan dari Lynk.id','ebook-cuan','Ebook','Panduan digital untuk membantu memahami dan memulai penjualan produk melalui Lynk.id.',10000,'https://lynk.id/fadilyusdi/d6y1zdoew5gz','💡',false,true),
('750++ Produk Digital 2026','produk-digital-2026','Produk Digital','Koleksi produk digital yang dapat menjadi referensi dan bahan untuk mengembangkan bisnis digital.',55000,'https://lynk.id/fadilyusdi/d3zr8w4ln20e','🚀',true,true)
on conflict (slug) do update set name=excluded.name,category=excluded.category,description=excluded.description,price=excluded.price,lynk_url=excluded.lynk_url,icon=excluded.icon,featured=excluded.featured,is_active=true,updated_at=now();

-- Nonaktifkan data contoh bawaan yang bukan bagian katalog Raufa Digital.
update public.products set is_active=false,updated_at=now()
where slug in ('39000-aktivitas-anak','worksheet-islami-anak','matematika-dasar-2-9','paket-mewarnai-anak','paket-bundling-premium','belajar-membaca-pemula');
