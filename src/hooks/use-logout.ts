'use client';

import { createClient } from '@/utils/supabase/client';

export async function logout() {
  try {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/login';
  } catch (error) {
    console.error('Error logging out:', error);
  }
}
