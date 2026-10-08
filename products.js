let PRODUCTS = [];

function rupiah(n){
  return new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n);
}

function lynkUrl(p){
  return p.lynk_url || (window.CONFIG && CONFIG.lynkStoreUrl) || '#';
}

function productCard(p){
  return `<article class="visual-product-card">
    <a class="visual-product-link" href="product-detail.html?id=${encodeURIComponent(p.id)}" aria-label="Lihat ${p.name}">
      <div class="visual-product-icon">${p.icon||'📚'}</div>
      <h3>${p.name}</h3>
      <span class="visual-product-category">${p.category||'Produk'}</span>
    </a>
  </article>`;
}

function getLocalProducts(){
  return (window.CONFIG && Array.isArray(CONFIG.catalogProducts)) ? CONFIG.catalogProducts : [];
}

async function loadProducts(){
  // Untuk tahap awal gratis, katalog memakai data dari js/config.js.
  // Ini membuat nama produk/link Lynk mudah diedit tanpa database.
  const local = getLocalProducts();
  if(local.length) {
    PRODUCTS = local;
    return PRODUCTS;
  }

  // Fallback jika nanti Supabase sudah diaktifkan.
  if(window.sb){
    const {data,error}=await sb.from('products').select('*').eq('is_active',true).order('created_at',{ascending:false});
    if(!error && data){ PRODUCTS=data; return data; }
  }
  return [];
}

document.addEventListener('DOMContentLoaded',async()=>{
  const data=await loadProducts();
  const featured=document.getElementById('featured');
  const catalog=document.getElementById('catalog');

  if(featured){
    const rows=data.filter(p=>p.featured);
    featured.innerHTML=rows.length?rows.map(productCard).join(''):'<div class="notice">Belum ada produk.</div>';
  }

  if(catalog){
    const params=new URLSearchParams(location.search);
    const initial=params.get('cat');
    const search=document.getElementById('search');
    const category=document.getElementById('category');
    const cats=[...new Set(data.map(p=>p.category).filter(Boolean))];
    if(category){
      category.innerHTML='<option>Semua Kategori</option>'+cats.map(c=>`<option>${c}</option>`).join('');
      if(initial) category.value=initial;
    }
    function render(){
      const q=(search?.value||'').toLowerCase();
      const c=category?.value||'Semua Kategori';
      const rows=data.filter(p=>(c==='Semua Kategori'||p.category===c)&&(!q||p.name.toLowerCase().includes(q)||(p.description||'').toLowerCase().includes(q)));
      catalog.innerHTML=rows.length?rows.map(productCard).join(''):'<div class="notice">Produk tidak ditemukan.</div>';
    }
    search?.addEventListener('input',render);
    category?.addEventListener('change',render);
    render();
  }

  const detail=document.getElementById('detail');
  if(detail){
    const id=new URLSearchParams(location.search).get('id');
    const p=data.find(x=>String(x.id)===String(id))||data[0];
    if(!p){detail.innerHTML='<div class="notice">Produk tidak ditemukan.</div>';return;}
    const buy=lynkUrl(p);
    detail.innerHTML=`<div class="detail-grid">
      <div class="detail-image">${p.icon||'📚'}</div>
      <div>
        <span class="tag">${p.category||'Produk'}</span>
        <h1>${p.name}</h1>
        <p class="price">${rupiah(p.price)}</p>
        <p>${p.description||''}</p>
        <ul class="check">
          <li>Produk digital</li>
          <li>Pembayaran diproses melalui Lynk</li>
          <li>File/akses dikirim sesuai pengaturan produk di Lynk</li>
        </ul>
        <div class="actions">
          <a class="btn" href="${buy}" target="_blank" rel="noopener">Beli di Lynk</a>
          <a class="btn btn-outline" href="login.html">Login Member</a>
        </div>
      </div>
    </div>`;
  }
});
