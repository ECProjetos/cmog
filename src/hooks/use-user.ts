'use server';

import { createClient } from '@/utils/supabase/server';


export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  //console.log('hooks/use-user.ts')
  //console.log(user)
  return user;
}
