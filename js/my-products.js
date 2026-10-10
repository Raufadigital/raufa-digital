async function loadMyProducts(){
 await requireLogin();
 const {data,error}=await sb.from('product_access').select('id,granted_at,products(id,name,category,price,description)').order('granted_at',{ascending:false});
 const el=document.getElementById('myProducts'); if(error){el.innerHTML='<div class="notice">Gagal memuat produk.</div>';return}
 el.innerHTML=(data||[]).map(x=>`<article class="product-card"><div class="product-image">${x.products?.icon||'📚'}</div><div class="product-body"><span class="tag">${x.products?.category||'Produk'}</span><h3>${x.products?.name||'Produk'}</h3><p>${x.products?.description||''}</p><button class="btn full" onclick="downloadProduct('${x.products.id}')">Download Produk</button></div></article>`).join('')||'<div class="notice">Belum ada produk yang dapat diunduh.</div>';
}
async function downloadProduct(productId){
 const {data:{session}}=await sb.auth.getSession();
 const res=await fetch(`${CONFIG.supabaseUrl}/functions/v1/${CONFIG.downloadFunction}`,{method:'POST',headers:{Authorization:`Bearer ${session.access_token}`,'Content-Type':'application/json'},body:JSON.stringify({product_id:productId})});
 const json=await res.json(); if(!res.ok){alert(json.error||'Download gagal');return;} location.href=json.signed_url;
}
document.addEventListener('DOMContentLoaded',loadMyProducts);
