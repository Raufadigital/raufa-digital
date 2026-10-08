async function adminUser(){
  if(!window.sb) return null;
  const {data:{user}, error:userError}=await sb.auth.getUser();
  if(userError || !user) return null;
  const {data:profile, error:profileError}=await sb
    .from('profiles')
    .select('role,name,email')
    .eq('id',user.id)
    .single();
  if(profileError) return {user, profile:null, error:profileError};
  return {user,profile};
}

async function requireAdmin(){
  const path = location.pathname;
  if(path.endsWith('/admin/login.html') || path.endsWith('/admin/login')) return null;
  const x=await adminUser();
  if(!x || x.profile?.role!=='admin'){
    const loginPath = location.pathname.includes('/admin/') ? 'login.html' : '../admin/login.html';
    location.href=loginPath+'?error=unauthorized';
    return null;
  }
  return x;
}

async function adminLogout(){
  if(window.sb) await sb.auth.signOut();
  location.href='../index.html';
}

document.addEventListener('DOMContentLoaded',async()=>{
  const form=document.getElementById('adminLoginForm');
  const msg=document.getElementById('msg');

  if(!window.sb){
    if(msg) msg.textContent='Supabase belum terhubung. Isi Publishable Key di js/config.js.';
    return;
  }

  if(form) form.addEventListener('submit',async e=>{
    e.preventDefault();
    const emailInput=document.getElementById('email');
    const passwordInput=document.getElementById('password');
    const {error}=await sb.auth.signInWithPassword({
      email:emailInput.value.trim(),
      password:passwordInput.value
    });
    if(error){msg.textContent='Login gagal. Periksa email/password atau verifikasi email.';return;}
    const x=await adminUser();
    if(x?.profile?.role!=='admin'){
      await sb.auth.signOut();
      msg.textContent='Akun ini bukan akun admin.';
      return;
    }
    location.href='dashboard.html';
  });

  document.querySelectorAll('[data-admin-logout]').forEach(b=>b.addEventListener('click',adminLogout));
  await requireAdmin();
});
