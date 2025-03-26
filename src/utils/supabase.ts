
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../integrations/supabase/types';

// Initialize the Supabase client
const supabaseUrl = 'https://kuldzhyuqpwrcwtjvegs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1bGR6aHl1cXB3cmN3dGp2ZWdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzOTA0MjEsImV4cCI6MjA1Njk2NjQyMX0.nQ4fHtq0wQG_VuzjSfxk0_2C5-j8rIP9cTbFFq_XNaw';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
