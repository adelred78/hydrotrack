const SUPABASE_URL = 'https://ullusqudzgaqkblsrsoq.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_oNwn7Mn-zQtj-rvM62J6TA_fCIfeCrX';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('Supabase connecté :', supabaseClient);

/* =========================
   LOGIN (connexion.html)
========================= */
const loginForm = document.getElementById('login-form');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username')?.value.trim();
    const password = document.getElementById('password')?.value;

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
}

/* =========================
   SIGNUP (inscription.html)
========================= */
const signupForm = document.getElementById('signup-form');

if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // ⚠️ Ici on lit les champs de TON HTML inscription (name="...")
    const username = document
      .querySelector('input[name="username"]')
      ?.value.trim();
    const email = document.querySelector('input[name="email"]')?.value.trim(); // pas stocké si ta table n’a pas la colonne
    const password = document.querySelector('input[name="password"]')?.value;

    const superficie = document.querySelector(
      'input[name="superficie"]'
    )?.value;
    const ville = document.querySelector('input[name="ville"]')?.value;
    const frequence = document.querySelector('select[name="frequence"]')?.value;

    // Zone d’erreur (si tu n’en as pas, on fallback sur alert)
    const errorMessage = document.getElementById('signup-error');

    const showError = (msg) => {
      if (errorMessage) {
        errorMessage.textContent = msg;
        errorMessage.style.display = 'block';
      } else {
        alert(msg);
      }
    };

    if (errorMessage) {
      errorMessage.style.display = 'none';
      errorMessage.textContent = '';
    }

    if (!username || !password) {
      showError('Username et mot de passe requis.');
      return;
    }

    // Vérifier si username existe déjà
    const { data: existingUser, error: existsErr } = await supabaseClient
      .from('utilisateurs')
      .select('id')
      .eq('nom_utilisateur', username)
      .maybeSingle();

    if (existsErr) {
      showError('Erreur vérification utilisateur: ' + existsErr.message);
      return;
    }

    if (existingUser) {
      showError("Nom d'utilisateur déjà utilisé.");
      return;
    }

    // Insérer le nouvel utilisateur (on ne met que les colonnes qui existent vraiment)
    const { data: newUser, error: insertErr } = await supabaseClient
      .from('utilisateurs')
      .insert([
        {
          nom_utilisateur: username,
          mot_de_passe: password,
        },
      ])
      .select()
      .single();

    if (insertErr) {
      showError('Erreur inscription: ' + insertErr.message);
      return;
    }

    // Stocker l’utilisateur (comme ton login)
    localStorage.setItem('user', JSON.stringify(newUser));

    // (Optionnel) stocker la config localement si tu veux l’utiliser dans app.html
    localStorage.setItem(
      'hydrotrack_config',
      JSON.stringify({ email, superficie, ville, frequence })
    );

    alert('Inscription réussie 🚀');
    window.location.href = 'app.html';
  });
}
