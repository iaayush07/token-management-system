import { useEffect, useRef, useState } from "react";
import { useMeQuery } from "../../../shared/utility/services/auth.service";

export function useEnsurePermissions() {
  const ensuredRef = useRef(false);
  const [ensuring, setEnsuring] = useState(false);
  const permissions = sessionStorage.getItem("tm_permissions");
  const hasPermissions =
    !!permissions && permissions !== "null" && permissions !== "undefined";

  const token =
    localStorage.getItem("tm_token") || sessionStorage.getItem("tm_token");
  console.log(hasPermissions || !token);
  const { refetch } = useMeQuery(undefined, { skip: hasPermissions || !token });

  useEffect(() => {
    // Do not trigger fetch if we already have permissions in session
    if (!token || hasPermissions) return;

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
  }, [refetch, token, hasPermissions]);

  return { ensuringPermissions: ensuring };
}

export type UseEnsurePermissions = ReturnType<typeof useEnsurePermissions>;
