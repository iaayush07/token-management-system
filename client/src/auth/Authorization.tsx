import { Navigate } from "react-router-dom";
import React from "react";

interface IPermissionGuardProps {
  permission: string;
  protectedRoute?: boolean;
  allowSelf?: boolean;
  children: React.ReactNode;
}

/**
 * @param {string} permission - The permission to check
 * @returns {boolean} - True if the current user has the permission, false otherwise
 */
export const hasPermission = (
  permission: string,
  allowSelf?: boolean,
): boolean => {
  if (allowSelf) return true;
  if (!permission) return true;

  let allPermissions: string[] = [];
  try {
    const raw = sessionStorage.getItem("tm_permissions");
    allPermissions = raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    allPermissions = [];
  }

  return allPermissions.includes(permission);
};

export const PermissionGuard = ({
  permission,
  protectedRoute,
  allowSelf,
  children,
}: IPermissionGuardProps) => {
  return (
    <>
      {protectedRoute ? (
        hasPermission(permission, allowSelf) ? (
          children
        ) : (
          <Navigate to={"/access-denied"} />
        )
      ) : (
        hasPermission(permission, allowSelf) && children
      )}
    </>
  );
};

// export default Authorization;
