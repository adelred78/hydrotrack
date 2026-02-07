const SUPABASE_URL = 'https://ullusqudzgaqkblsrsoq.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_oNwn7Mn-zQtj-rvM62J6TA_fCIfeCrX';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('Supabase connecté :', supabase);
