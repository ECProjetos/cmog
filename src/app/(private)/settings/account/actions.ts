'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';

export async function updateUserProfile(formData: FormData) {
    const supabase = await createClient();

    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const cpf = formData.get('cpf') as string | null;
    const cnpj = formData.get('cnpj') as string | null;
    const razao_social = formData.get('razao_social') as string | null;

    const { error } = await supabase.auth.updateUser({
        data: {
            name,
            phone,
            cpf: cpf || null,
            cnpj: cnpj || null,
            razao_social: cnpj ? razao_social : null,
        },
    });

    if (error) {
        return { error: error.status };
    }

    revalidatePath('/', 'layout');
    return { success: 'Perfil atualizado com sucesso!', name };
    
}

export async function updateUserPassword(formData: FormData) {
    const supabase = await createClient();
  
    const currentPassword = formData.get('current_password') as string;
    const newPassword = formData.get('password') as string;
  
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: (await supabase.auth.getUser()).data.user?.email as string,
      password: currentPassword,
    });
  
    if (signInError) {
      return { error: 'Current password is incorrect.' };
    }
  
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });
  
    if (updateError) {
      return { error: 'Failed to update password. Please try again.' };
    }
  
    return { success: 'Password updated successfully!' };
  }


export async function updateUserAvatar(formData: FormData) {
    const supabase = await createClient();

    const avatarFile = formData.get('avatar') as File;
    const oldAvatar = formData.get('old_avatar') as string;
    const userId = formData.get('user_id') as string;

    if (!avatarFile) {
        return { error: 'Nenhuma imagem foi selecionada.' };
    }

    if (oldAvatar) {
        try {
            const oldAvatarPath = `private/${userId}/avatar`;
            await supabase.storage.from('avatars').remove([oldAvatarPath]);
        } catch (error) {
            console.error('Erro ao deletar avatar antigo:', error);
        }
    }

    const avatarPath = `private/${userId}/avatar`;
    const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(avatarPath, avatarFile, { upsert: true });

    if (uploadError) {
        console.error('Erro ao fazer upload do novo avatar:', uploadError);
        return { error: 'Erro ao fazer upload do novo avatar.' };
    }

    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
        .from('avatars')
        .createSignedUrl(avatarPath, 31536000);

    if (signedUrlError) {
        return { error: 'Erro ao gerar URL do avatar.' };
    }

    const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: signedUrlData.signedUrl },
    });

    if (updateError) {
        return { error: 'Erro ao atualizar URL do avatar.' };
    }

    revalidatePath('/', 'layout');
    return { success: 'Avatar atualizado com sucesso!', avatar_url: signedUrlData.signedUrl };
}

