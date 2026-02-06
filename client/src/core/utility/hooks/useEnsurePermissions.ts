import { useEffect, useRef, useState } from "react";
import { useMeQuery } from "../../../shared/utility/services/auth.service";

export function useEnsurePermissions() {
  const ensuredRef = useRef(false);
  const [ensuring, setEnsuring] = useState(false);
  const permissions = sessionStorage.getItem("tm_permissions");
  const token =
    localStorage.getItem("tm_token") || sessionStorage.getItem("tm_token");
  const { refetch } = useMeQuery(undefined, { skip: !!permissions || !token });

  useEffect(() => {
    if (!token) return;

    ensuredRef.current = true;
    setEnsuring(true);
    (async () => {
      try {
        const me = await refetch();
        const payload = me.data;
        if (payload) {
          try {
            sessionStorage.setItem("tm_user", JSON.stringify(payload.user));
            sessionStorage.setItem(
              "tm_permissions",
              JSON.stringify(payload.permissions),
            );
          } catch {}
        }
      } finally {
        setEnsuring(false);
      }
    })();
  }, [refetch, token, permissions]);

  return { ensuringPermissions: ensuring };
}

export type UseEnsurePermissions = ReturnType<typeof useEnsurePermissions>;
