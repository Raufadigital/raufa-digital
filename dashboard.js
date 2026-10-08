async function loadDashboard(){
 const u=await requireLogin(); if(!u) return;
 const name=document.getElementById('memberName'); if(name) name.textContent=u.user_metadata?.full_name||u.email?.split('@')[0]||'Member';
 const {data:orders}=await sb.from('orders').select('id,status,gross_amount,created_at').order('created_at',{ascending:false}).limit(10);
 const el=document.getElementById('orderList'); if(el) el.innerHTML=(orders||[]).map(o=>`<div class="order-row"><b>${o.id.slice(0,8).toUpperCase()}</b><span>${o.status}</span><strong>${rupiah(o.gross_amount)}</strong></div>`).join('')||'<div class="notice">Belum ada pesanan.</div>';
}
document.addEventListener('DOMContentLoaded',loadDashboard);
