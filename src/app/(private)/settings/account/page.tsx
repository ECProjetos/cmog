"use client";

import AccountForm from "./account-form";
import { useUserData } from "./useUserData";
import Loading from "@/app/loading";

export default function AccountPage() {
  const { user, loading, error } = useUserData();

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen px-4 text-center">
        <h1 className="text-2xl font-bold text-red-500">{error}</h1>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-3xl font-semibold">Dados da Conta</h1>
      {user && <AccountForm profile={user} />}
    </div>
  );
}
