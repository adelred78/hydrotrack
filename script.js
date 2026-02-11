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

const signupForm = document.getElementById('signup-form');

if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('signup-username').value.trim();
    const password = document.getElementById('signup-password').value;
    const errorMessage = document.getElementById('signup-error');

    if (errorMessage) {
      errorMessage.style.display = 'none';
      errorMessage.textContent = '';
    }

    // Vérifier si l'utilisateur existe déjà
    const { data: existingUser } = await supabaseClient
      .from('utilisateurs')
      .select('*')
      .eq('nom_utilisateur', username)
      .single();

    if (existingUser) {
      errorMessage.textContent = "Nom d'utilisateur déjà utilisé.";
      errorMessage.style.display = 'block';
      return;
    }

    // Insérer le nouvel utilisateur
    const { error } = await supabaseClient.from('utilisateurs').insert([
      {
        nom_utilisateur: username,
        mot_de_passe: password,
      },
    ]);

    if (error) {
      errorMessage.textContent = "Erreur lors de l'inscription.";
      errorMessage.style.display = 'block';
      return;
    }

    alert('Inscription réussie 🚀');
    window.location.href = 'connexion.html';
  });
}
