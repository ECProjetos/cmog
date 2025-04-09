'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/utils/supabase/server';

export async function updateUserPreferences(formData: FormData) {
  const supabase = await createClient();

  const data = {
    data: {
      language: formData.get('language') as string,
      font_family: formData.get('font_family') as string,
      theme: formData.get('theme') as string,
    },
  };

  const { error } = await supabase.auth.updateUser(data);

  if (error) {
    return { error: 'Failed to update preferences. Please try again.' };
  }

  revalidatePath('/', 'layout');
  return { success: 'Preferences updated successfully!' };
}
