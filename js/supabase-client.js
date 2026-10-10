(function(){
  if (!window.supabase) return;
  const key = CONFIG.supabasePublishableKey || CONFIG.supabaseAnonKey;
  if (!CONFIG.supabaseUrl || !key || key.includes('TEMPEL_PUBLISHABLE_KEY')) return;
  window.sb = window.supabase.createClient(CONFIG.supabaseUrl, key);
})();
