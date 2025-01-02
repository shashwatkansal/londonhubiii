import { useEffect, useState } from "react";
import { Secret, secretsHelpers } from "@/app/database/models";

const SecretsManager = () => {
  const [secrets, setSecrets] = useState<Secret[]>([]);
  const [newSecret, setNewSecret] = useState({ key: "", value: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSecrets = async () => {
      const fetchedSecrets = await secretsHelpers.getAll();
      setSecrets(fetchedSecrets);
    };
    fetchSecrets();
  }, []);

  const handleCreateSecret = async () => {
    if (!newSecret.key || !newSecret.value)
      return alert("Key and Value are required.");
    setLoading(true);
    try {
      await secretsHelpers.create(newSecret);
      setNewSecret({ key: "", value: "" });
      const updatedSecrets = await secretsHelpers.getAll();
      setSecrets(updatedSecrets);
    } catch (error) {
      console.error("Error creating secret:", error);
      alert("Failed to create secret.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSecret = async (id: string) => {
    if (!confirm("Are you sure you want to delete this secret?")) return;
    setLoading(true);
    try {
      await secretsHelpers.delete(id);
      const updatedSecrets = await secretsHelpers.getAll();
      setSecrets(updatedSecrets);
    } catch (error) {
      console.error("Error deleting secret:", error);
      alert("Failed to delete secret.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Secrets Manager</h1>
      <div>
        <h2>Add New Secret</h2>
        <input
          type="text"
          placeholder="Key"
          value={newSecret.key}
          onChange={(e) => setNewSecret({ ...newSecret, key: e.target.value })}
        />
        <input
          type="text"
          placeholder="Value"
          value={newSecret.value}
          onChange={(e) =>
            setNewSecret({ ...newSecret, value: e.target.value })
          }
        />
        <button onClick={handleCreateSecret} disabled={loading}>
          {loading ? "Creating..." : "Create Secret"}
        </button>
      </div>
      <div>
        <h2>Existing Secrets</h2>
        <ul>
          {secrets.map((secret) => (
            <li key={secret.id}>
              <strong>{secret.key}</strong>: {secret.value}
              <button
                onClick={() => handleDeleteSecret(secret.id)}
                disabled={loading}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SecretsManager;
