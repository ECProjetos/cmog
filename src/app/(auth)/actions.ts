"use server";

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

import { registerSchema } from './zod-types';

export async function getUserSession() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) {
        return null;
    }

    return { status: 'success', user: data?.user };
}

export async function login(formData: FormData) {
    // Create a new Supabase client instance using the server-side function to ensure the client is created on the server
    const supabase = await createClient();

    // Extract the email and password from the FormData object
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    // Use the signInWithPassword method to authenticate the user in Supabase node_modules@supabase/supabase-js/src/lib/auth.ts
    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        return { error: 'Falha ao fazer login. Verifique suas credenciais' };
    }

    // Revalidate the dashboard page to update the user session
    revalidatePath('/', 'layout');
    return { success: 'Login Realizado!' };
}
export async function loginWithToken(token: string) {
    const supabase = await createClient();
    // Exchange the token for a session
    const { error } = await supabase.auth.exchangeCodeForSession(token);

    if (error) {
        return { error: 'Falha ao fazer login.' };
    }

    revalidatePath('/', 'layout');
    return { success: 'Login Realizado!' };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function signup(data: any) {
    const parsedData = registerSchema.parse(data);
    const { email, password, name, phone, cpf, cnpj, razao_social } = parsedData;

    const supabase = createClient();

    const { error } = await (await supabase).auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
                phone,
                cpf,
                cnpj,
                razao_social,
            },
        },
    });

    if (error) {
        return { error: 'Falha ao fazer cadastro. Verifique suas credenciais e tente novamente.' };

    }

    revalidatePath('/');
    redirect('/confirm-acount');

}

export async function forgotPassword(formData: FormData) {
    const supabase = await createClient();

    const email = formData.get("email") as string;

    const origin =
        process.env.NEXT_PUBLIC_BASE_URL

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/reset-password`,
    });

    if (error) {
        return {
            status: error?.message,
            user: null,
        };
    }

    return { status: "success" };
}

export async function resetPassword(formData: FormData, code: string) {
    const supabase = await createClient();
    const { error: CodeError } = await supabase.auth.exchangeCodeForSession(code);

    if (CodeError) {
        return {
            status: CodeError?.message,
        };
    }

    const { error } = await supabase.auth.updateUser({
        password: formData.get("password") as string,
    });

    if (error) {
        return {
            status: error?.message,
        };
    }

    return { status: "success" };
}