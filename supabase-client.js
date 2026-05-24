(function () {
  'use strict';

  if (typeof window.supabase === 'undefined') {
    console.warn('[CodeBook] Supabase SDK not loaded');
    return;
  }

  window.sb = window.supabase.createClient(
    'https://xcvjjqzmetkjqyurxduh.supabase.co',
    'sb_publishable_u1wCvaO-cXF9Usuc8oBb_A_CH3Uq8wa'
  );

  window.sb.auth.onAuthStateChange(function (event, session) {
    if (event === 'SIGNED_IN' && session) {
      window.currentUser = session.user;
      window.isLoggedIn = true;
      window.isGuest = false;
      var app = document.getElementById('app');
      var appVisible = app && app.style.display !== 'none' && app.style.display !== '';
      if (!appVisible && typeof loadUserFromSupabase === 'function') {
        loadUserFromSupabase(session.user).then(function () {
          if (typeof onUserLoggedIn === 'function') onUserLoggedIn();
        });
      }
    } else if (event === 'SIGNED_OUT') {
      window.currentUser = null;
      window.isLoggedIn = false;
    } else if (event === 'PASSWORD_RECOVERY') {
      if (typeof showResetForm === 'function') showResetForm(session);
    }
  });

})();
