import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tzhozbqwmjewowzmsalf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6aG96YnF3bWpld293em1zYWxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNDI0NTAsImV4cCI6MjA2NTkxODQ1MH0.MB1L2R-t_mQBswkFatNTGbzf7AqQ6k5Mq5esdgTdzh4';

export const supabase = createClient(supabaseUrl, supabaseKey);