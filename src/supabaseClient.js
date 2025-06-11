const supabaseURL = process.meta.env.VITE_SUPABASE_URL;
const supabaseANONKey = process.meta.env.VITE_SUPABASE_ANON_KEY;

import { createClient } from '@supabase/supabase-js';
s
const supabase = createClient(supabaseURL, supabaseANONKey);
export default supabase;