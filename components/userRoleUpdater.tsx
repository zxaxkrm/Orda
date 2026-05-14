"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function UserRoleUpdater({
  userId,
  currentRole,
}: {
  userId: string;
  currentRole: string;
}) {
  const [role, setRole] = useState(currentRole);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async (newRole: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (res.ok) {
        setRole(newRole);
        toast.success("User role updated");
      } else {
        toast.error("Failed to update role");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <select
      value={role}
      onChange={(e) => handleChange(e.target.value)}
      disabled={isLoading}
      className={`text-xs px-2 py-1 rounded-full border-0 font-medium cursor-pointer ${
        role === "admin"
          ? "bg-purple-100 text-purple-700"
          : "bg-gray-100 text-gray-700"
      }`}
    >
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </select>
  );
}