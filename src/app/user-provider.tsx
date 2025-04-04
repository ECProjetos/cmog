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
        if (user.user_metadata?.theme === "dark") {
          document.querySelector("html")?.classList.add("dark");
        } else {
          document.querySelector("html")?.classList.remove("dark");
        }
      }
      setLoading(false);
    }
    fetchUser();
  }, [setUser]);

  if (loading) return <Loading />;

  return <>{children}</>;
}
