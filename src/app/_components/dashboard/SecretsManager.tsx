"use client";
import { useEffect, useState } from "react";
import Select from "react-select";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@/lib/auth";
import {
  Directory,
  directoryHelpers,
  Secret,
  secretsHelpers,
} from "@/app/database/models";

interface User {
  email: string;
  name: string;
}

const SecretsManager = () => {
  const { isAdmin, user } = useAuth();
  const [secrets, setSecrets] = useState<Secret[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [newSecret, setNewSecret] = useState({
    key: "",
    value: "",
    visibleTo: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [visibleSecrets, setVisibleSecrets] = useState<
    Record<string, string | null>
  >({});
  const [loadingSecrets, setLoadingSecrets] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    const fetchSecrets = async () => {
      try {
        const fetchedSecrets = await secretsHelpers.getVisibleToUser(
          user.email,
          isAdmin
        );
        setSecrets(fetchedSecrets);
      } catch (error) {
        console.error("Error fetching secrets:", error);
        toast.error("Failed to load secrets.");
      }
    };

    const fetchUsers = async () => {
      try {
        const allUsers = await directoryHelpers.getAll();
        setUsers(
          allUsers.map((u) => ({
            email: u.email,
            name: u.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users.");
      }
    };

    fetchSecrets();
    fetchUsers();
  }, [isAdmin, user.email]);

  const handleCreateSecret = async () => {
    if (!newSecret.key || !newSecret.value) {
      toast.error("Key and Value are required.");
      return;
    }

    setLoading(true);
    try {
      await secretsHelpers.create(newSecret);
      setNewSecret({ key: "", value: "", visibleTo: [] });
      const updatedSecrets = await secretsHelpers.getVisibleToUser(
        user.email,
        isAdmin
      );
      setSecrets(updatedSecrets);
      toast.success("Secret created successfully!");
    } catch (error) {
      console.error("Error creating secret:", error);
      toast.error("Failed to create secret.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSecret = async (id: string) => {
    if (!confirm("Are you sure you want to delete this secret?")) return;

    setLoading(true);
    try {
      await secretsHelpers.delete(id);
      const updatedSecrets = await secretsHelpers.getVisibleToUser(
        user.email,
        isAdmin
      );
      setSecrets(updatedSecrets);
      toast.success("Secret deleted successfully!");
    } catch (error) {
      console.error("Error deleting secret:", error);
      toast.error("Failed to delete secret.");
    } finally {
      setLoading(false);
    }
  };

  const handleVisibilityChange = (selectedOptions: any) => {
    setNewSecret((prev) => ({
      ...prev,
      visibleTo: selectedOptions.map((option: any) => option.value),
    }));
  };

  const togglePasswordVisibility = async (id: string) => {
    setLoadingSecrets((prev) => ({ ...prev, [id]: true }));

    if (visibleSecrets[id]) {
      setVisibleSecrets((prev) => ({ ...prev, [id]: null }));
    } else {
      try {
        const decryptedValue = await secretsHelpers.getById(id);
        if (decryptedValue) {
          setVisibleSecrets((prev) => ({
            ...prev,
            [id]: decryptedValue.value,
          }));
        } else {
          toast.error("Failed to fetch decrypted password.");
        }
      } catch (error) {
        console.error("Error fetching decrypted password:", error);
        toast.error("Failed to fetch decrypted password.");
      }
    }

    setLoadingSecrets((prev) => ({ ...prev, [id]: false }));
  };

  const userOptions = users.map((u) => ({
    value: u.email,
    label: `${u.name} (${u.email})`,
  }));

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Secrets Manager</h1>

      {/* Add New Secret */}
      <div className="bg-white shadow rounded p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Add New Secret</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Key"
            value={newSecret.key}
            onChange={(e) =>
              setNewSecret((prev) => ({ ...prev, key: e.target.value }))
            }
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="Value"
            value={newSecret.value}
            onChange={(e) =>
              setNewSecret((prev) => ({ ...prev, value: e.target.value }))
            }
            className="w-full px-3 py-2 border rounded"
          />
          <div>
            <h3 className="text-sm font-medium mb-2">Visible To</h3>
            <Select
              isMulti
              options={userOptions}
              onChange={handleVisibilityChange}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
          <button
            onClick={handleCreateSecret}
            disabled={loading}
            className={`bg-blue-600 text-white py-2 px-4 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {loading ? "Creating..." : "Create Secret"}
          </button>
        </div>
      </div>

      {/* Existing Secrets */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-lg font-semibold mb-4">Existing Secrets</h2>
        <ul className="divide-y divide-gray-200">
          {secrets.map((secret) => (
            <li
              key={secret.id}
              className="py-4 flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>{secret.key}</strong>:{" "}
                  {visibleSecrets[secret.id] ?? "••••••••"}
                </p>
                <p className="text-sm text-gray-500">
                  Visible to:{" "}
                  {users
                    .filter((u) => secret.visibleTo.includes(u.email))
                    .map((u) => u.name)
                    .join(", ") || "No users"}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => togglePasswordVisibility(secret.id)}
                  disabled={loadingSecrets[secret.id]}
                  className="text-gray-600 hover:text-gray-800"
                >
                  {visibleSecrets[secret.id] ? <FaEyeSlash /> : <FaEye />}
                </button>
                <button
                  onClick={() => handleDeleteSecret(secret.id)}
                  disabled={loading}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SecretsManager;
