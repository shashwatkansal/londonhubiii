import { useEffect, useState } from "react";
import { directoryHelpers, Role, User } from "@/app/database/models";
import toast from "react-hot-toast";
import { FaLinkedin, FaInstagram, FaLink } from "react-icons/fa";

const roleOptions = Object.values(Role);

const UserManagementSection = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [curatorEmail, setCuratorEmail] = useState<string | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editUser, setEditUser] = useState<Partial<User> | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const allUsers = await directoryHelpers.getAll();
      // Fill missing fields with defaults
      const usersWithDefaults = allUsers.map((u) => ({
        name: u.name || "",
        bio: u.bio || "",
        linkedin: u.linkedin || "",
        instagram: u.instagram || "",
        toplink: u.toplink || "",
        profilepic: u.profilepic || "",
        externalViewEnabled: typeof u.externalViewEnabled === "boolean" ? u.externalViewEnabled : false,
        role: u.role || Role.Shaper,
        email: u.email || "",
      }));
      setUsers(usersWithDefaults);
      const curator = usersWithDefaults.find((u) => u.role === Role.Curator);
      setCuratorEmail(curator ? curator.email : null);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (email: string, newRole: Role) => {
    setLoading(true);
    try {
      await directoryHelpers.update(email, { role: newRole });
      toast.success("Role updated");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update role");
    } finally {
      setLoading(false);
    }
  };

  const handleTransferCuratorship = async (newCuratorEmail: string) => {
    if (!curatorEmail) return;
    setLoading(true);
    try {
      await directoryHelpers.update(curatorEmail, { role: Role.Shaper });
      await directoryHelpers.update(newCuratorEmail, { role: Role.Curator });
      toast.success("Curatorship transferred");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to transfer curatorship");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditUser({ ...users[index] });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setEditUser((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (email: string) => {
    if (!editUser) return;
    setLoading(true);
    try {
      // Find the original user for comparison
      const originalUser = users.find((u) => u.email === email);
      if (!originalUser) {
        toast.error("Original user not found.");
        setLoading(false);
        return;
      }

      // Remove undefined fields, but allow empty strings (to allow clearing fields)
      const { email: _email, ...updateData } = editUser;
      const filteredUpdateData: Partial<User> = Object.fromEntries(
        Object.entries(updateData).filter(([, v]) => v !== undefined)
      );

      // Ensure externalViewEnabled is boolean
      if (filteredUpdateData.externalViewEnabled !== undefined) {
        filteredUpdateData.externalViewEnabled = Boolean(filteredUpdateData.externalViewEnabled);
      }

      // Check if there are any actual changes
      const hasChanges = Object.entries(filteredUpdateData).some(
        ([key, value]) => originalUser[key as keyof User] !== value
      );

      if (!hasChanges) {
        toast.error("No changes to save.");
        setLoading(false);
        return;
      }

      await directoryHelpers.update(email, filteredUpdateData);
      toast.success("User details updated");
      setEditIndex(null);
      setEditUser(null);
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update user details");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditUser(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      {loading && <p>Loading...</p>}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white border-separate border-spacing-0">
          <thead>
            <tr>
              {["Name","Email","Role","Bio","LinkedIn","Instagram","Toplink","Profile Pic","External View","Actions"].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 bg-gray-50 text-left text-xs font-semibold text-gray-700 border-b"
                  style={{ minWidth: 100 }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => {
              const isEditing = editIndex === idx;
              return (
                <tr
                  key={user.email}
                  className={`transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} ${isEditing ? "bg-blue-50" : ""} hover:bg-blue-100`}
                >
                  {/* Name */}
                  <td className="px-4 py-2 align-middle border-b">
                    {isEditing ? (
                      <input
                        name="name"
                        value={editUser?.name ?? user.name ?? ""}
                        onChange={handleEditChange}
                        className="border rounded px-2 py-1 w-full focus:ring-2 focus:ring-blue-400"
                      />
                    ) : (
                      <span className="truncate block max-w-[120px]" title={user.name}>
                        {user.name}
                      </span>
                    )}
                  </td>
                  {/* Email */}
                  <td className="px-4 py-2 align-middle border-b">
                    <span className="truncate block max-w-[180px]" title={user.email}>
                      {user.email}
                    </span>
                  </td>
                  {/* Role */}
                  <td className="px-4 py-2 align-middle border-b">
                    {isEditing ? (
                      <select
                        name="role"
                        value={editUser?.role ?? user.role ?? Role.Shaper}
                        onChange={handleEditSelectChange}
                        className="border rounded px-2 py-1 w-full focus:ring-2 focus:ring-blue-400"
                        disabled={user.role === Role.Curator}
                      >
                        {roleOptions.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="capitalize">{user.role || Role.Shaper}</span>
                    )}
                  </td>
                  {/* Bio */}
                  <td className="px-4 py-2 align-middle border-b">
                    {isEditing ? (
                      <textarea
                        name="bio"
                        value={editUser?.bio || ""}
                        onChange={handleEditChange}
                        className="border rounded px-2 py-1 w-full focus:ring-2 focus:ring-blue-400"
                        rows={2}
                      />
                    ) : (
                      <span className="truncate block max-w-[180px]" title={user.bio}>
                        {user.bio && user.bio.length > 60
                          ? user.bio.slice(0, 60) + "..."
                          : user.bio || ""}
                      </span>
                    )}
                  </td>
                  {/* LinkedIn */}
                  <td className="px-4 py-2 align-middle border-b">
                    {isEditing ? (
                      <input
                        name="linkedin"
                        value={editUser?.linkedin || ""}
                        onChange={handleEditChange}
                        className="border rounded px-2 py-1 w-full focus:ring-2 focus:ring-blue-400"
                      />
                    ) : user.linkedin ? (
                      <a
                        href={user.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:text-blue-900 flex items-center"
                        title="View LinkedIn"
                      >
                        <FaLinkedin size={18} />
                      </a>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  {/* Instagram */}
                  <td className="px-4 py-2 align-middle border-b">
                    {isEditing ? (
                      <input
                        name="instagram"
                        value={editUser?.instagram || ""}
                        onChange={handleEditChange}
                        className="border rounded px-2 py-1 w-full focus:ring-2 focus:ring-blue-400"
                      />
                    ) : user.instagram ? (
                      <a
                        href={user.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:text-pink-800 flex items-center"
                        title="View Instagram"
                      >
                        <FaInstagram size={18} />
                      </a>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  {/* Toplink */}
                  <td className="px-4 py-2 align-middle border-b">
                    {isEditing ? (
                      <input
                        name="toplink"
                        value={editUser?.toplink || ""}
                        onChange={handleEditChange}
                        className="border rounded px-2 py-1 w-full focus:ring-2 focus:ring-blue-400"
                      />
                    ) : user.toplink ? (
                      <a
                        href={user.toplink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-700 hover:text-green-900 flex items-center"
                        title="View Toplink"
                      >
                        <FaLink size={18} />
                      </a>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  {/* Profile Pic */}
                  <td className="px-4 py-2 align-middle border-b">
                    {isEditing ? (
                      <input
                        name="profilepic"
                        value={editUser?.profilepic || ""}
                        onChange={handleEditChange}
                        className="border rounded px-2 py-1 w-full focus:ring-2 focus:ring-blue-400"
                      />
                    ) : user.profilepic ? (
                      <img
                        src={user.profilepic}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover border"
                      />
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  {/* External View */}
                  <td className="px-4 py-2 align-middle border-b text-center">
                    {isEditing ? (
                      <input
                        type="checkbox"
                        name="externalViewEnabled"
                        checked={!!editUser?.externalViewEnabled}
                        onChange={handleEditChange}
                        className="accent-blue-500"
                      />
                    ) : user.externalViewEnabled ? (
                      <span className="text-green-600 font-semibold">Yes</span>
                    ) : (
                      <span className="text-gray-400">No</span>
                    )}
                  </td>
                  {/* Actions */}
                  <td className="px-4 py-2 align-middle border-b">
                    <div className="flex gap-2">
                      {isEditing ? (
                        <>
                          <button
                            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded transition"
                            onClick={() => handleSave(user.email)}
                            disabled={loading}
                            title="Save"
                          >
                            💾
                          </button>
                          <button
                            className="bg-gray-400 hover:bg-gray-500 text-white px-2 py-1 rounded transition"
                            onClick={handleCancel}
                            disabled={loading}
                            title="Cancel"
                          >
                            ✖️
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded transition"
                            onClick={() => handleEdit(idx)}
                            disabled={loading}
                            title="Edit"
                          >
                            ✏️
                          </button>
                          {user.role !== Role.Curator && (
                            <button
                              className="bg-blue-700 hover:bg-blue-800 text-white px-2 py-1 rounded transition"
                              onClick={() => handleTransferCuratorship(user.email)}
                              disabled={loading}
                              title="Transfer Curatorship"
                            >
                              👑
                            </button>
                          )}
                          {user.role === Role.Curator && (
                            <span className="text-green-600 font-semibold" title="Curator">
                              👑 Curator
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementSection; 