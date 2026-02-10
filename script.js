const SUPABASE_URL = 'https://ullusqudzgaqkblsrsoq.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_oNwn7Mn-zQtj-rvM62J6TA_fCIfeCrX';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('Supabase connecté :', supabaseClient);

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('error-message');

  if (errorMessage) {
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';
  }

  const { data, error } = await supabaseClient
    .from('utilisateurs')
    .select('*')
    .eq('nom_utilisateur', username)
    .eq('mot_de_passe', password)
    .single();

  if (error || !data) {
    if (errorMessage) {
      errorMessage.textContent = 'Identifiants incorrects.';
      errorMessage.style.display = 'block';
    } else {
      alert('Identifiants incorrects.');
    }
    return;
  }

  localStorage.setItem('user', JSON.stringify(data));
  window.location.href = 'dashboard.html';
});
