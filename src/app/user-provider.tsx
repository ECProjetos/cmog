"use client";

import { useUserStore } from "@/stores/userStore";
import { useEffect, useState } from "react";
import { getUser } from "@/hooks/use-user";
import Loading from "@/app/loading";

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useUserStore((state) => state.setUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const user = await getUser();
      if (user) {
        setUser(user);
      }
      setLoading(false);
    }
    fetchUser();
  }, [setUser]);

  if (loading) return <Loading />;

  return <>{children}</>;
}
