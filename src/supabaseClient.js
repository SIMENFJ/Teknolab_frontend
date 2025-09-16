import { createClient } from '@supabase/supabase-js';

// It's best practice to use environment variables for these
// You can get these from your Supabase project's API settings
const supabaseUrl = 'https://qsnlpjhytyjrtnnzekln.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzbmxwamh5dHlqcnRubnpla2xuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5OTY3NzAsImV4cCI6MjA3MzU3Mjc3MH0.HVB3dlelSE5RO3cwGFzVH9anl51UcmFZK-iiy1X7WSY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);