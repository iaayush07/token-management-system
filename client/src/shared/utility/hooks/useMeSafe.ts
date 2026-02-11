import { useEffect, useMemo } from "react";
import { useMeQuery } from "../services/auth.service";

export type MeUser = {
  id: number;
  full_name: string;
  email: string;
  role: string;
};

export function useMeSafe() {
  const token =
    localStorage.getItem("tm_token") || sessionStorage.getItem("tm_token");

  const cachedUser = useMemo(() => {
    const raw = sessionStorage.getItem("tm_user");
    if (!raw) return null;
    try {
      return JSON.parse(raw) as MeUser;
    } catch {
      return null;
    }
  }, []);

  const cachedPermissions = useMemo(() => {
    const raw = sessionStorage.getItem("tm_permissions");
    if (!raw) return null;
    try {
      return JSON.parse(raw) as string[];
    } catch {
      return null;
    }
  }, []);

  const { data, isFetching, refetch } = useMeQuery(undefined, {
    skip: !!cachedUser || !token,
  });

  const user = cachedUser ?? data?.user ?? null;
  const permissions = cachedPermissions ?? data?.permissions ?? null;

  useEffect(() => {
    if (data?.user && !cachedUser) {
      try {
        sessionStorage.setItem("tm_user", JSON.stringify(data.user));
        sessionStorage.setItem(
          "tm_permissions",
          JSON.stringify(data.permissions || []),
        );
      } catch {}
    }
  }, [data, cachedUser]);

  return { user, permissions, isFetching, refetch };
}
