import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tgmrtjawhcqrvjlkttic.supabase.co";
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
