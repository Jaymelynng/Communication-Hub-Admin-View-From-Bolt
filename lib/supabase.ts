import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pgucemuyuskjvejcwtwf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBndWNlbXV5dXNranZlamN3dHdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5NzI2NTgsImV4cCI6MjA1NzU0ODY1OH0.MoHzZ5TnJI6ySBJ4pzR4cXsmQbp4SuypvxALeAklDKg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);