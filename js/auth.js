async function getUser(){
  if(!window.sb) return null;
  const {data:{user}}=await sb.auth.getUser();
  return user || null;
}
async function requireLogin(){
  const u=await getUser();
  if(!u) location.href='login.html?next='+encodeURIComponent(location.pathname+location.search);
  return u;
}
async function logout(){ if(window.sb){await sb.auth.signOut();} location.href='index.html'; }

document.addEventListener('DOMContentLoaded', async ()=>{
  const msg=document.getElementById('msg');
  const reg=document.getElementById('registerForm');
  const login=document.getElementById('loginForm');
  const reset=document.getElementById('resetForm');
  if(!window.sb){ if(msg) msg.textContent='Website belum terhubung ke Supabase. Isi pengaturan di js/config.js.'; return; }
  if(reg) reg.addEventListener('submit', async e=>{
    e.preventDefault();
    const name=document.getElementById('name').value.trim();
    const email=document.getElementById('email').value.trim();
    const password=document.getElementById('password').value;
    const {data,error}=await sb.auth.signUp({email,password,options:{data:{full_name:name}}});
    if(error){msg.textContent=error.message;return;}
    msg.textContent=data.session?'Akun berhasil dibuat. Mengarahkan...':'Akun dibuat. Silakan cek email untuk verifikasi.';
    if(data.session) setTimeout(()=>location.href='dashboard.html',600);
  });
  if(login) login.addEventListener('submit', async e=>{
    e.preventDefault();
    const email=document.getElementById('email').value.trim(), password=document.getElementById('password').value;
    
    const { data, error } = await sb.auth.signInWithPassword({ email, password });

    if (error) {
      msg.textContent = 'Email atau password salah / akun belum terverifikasi.';
      return;
    }

    const { data: profile, error: profileError } = await sb
      .from('profiles')
      .select('role, approval_status')
      .eq('id', data.user.id)
      .single();

    if (profileError || !profile) {
      await sb.auth.signOut();
      msg.textContent = 'Profil akun tidak ditemukan. Silakan hubungi admin.';
      return;
    }

    if (profile.role !== 'admin' && profile.approval_status !== 'approved') {
      await sb.auth.signOut();
      msg.textContent = 'Akun Anda masih menunggu persetujuan admin.';
      return;
    }

    const next = new URLSearchParams(location.search).get('next') || 'dashboard.html';
    location.href = next;
  });
  if(reset) reset.addEventListener('submit', async e=>{
    e.preventDefault(); const email=document.getElementById('email').value.trim();
    const {error}=await sb.auth.resetPasswordForEmail(email,{redirectTo:location.origin+'/forgot-password.html'});
    msg.textContent=error?error.message:'Link reset password telah dikirim ke email Anda.';
  });
  document.querySelectorAll('[data-logout]').forEach(b=>b.addEventListener('click',logout));
  const name=document.getElementById('memberName');
  if(name){const u=await getUser(); if(!u) return location.href='login.html'; name.textContent=u.user_metadata?.full_name||u.email?.split('@')[0]||'Member';}
});
