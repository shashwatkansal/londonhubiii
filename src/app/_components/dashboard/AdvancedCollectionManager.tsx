import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
  CollectionReference,
  FirestoreDataConverter,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { Role } from "@/app/database/models";

interface FieldDef {
  key: string;
  label: string;
  type: "text" | "email" | "textarea" | "number" | "boolean";
}

interface BadgeDef {
  key: string;
  value: any;
  label: string;
  color: string; // e.g. 'green', 'red', 'blue', etc.
}

interface ContextAction<T> {
  label: (row: T) => string;
  show: (row: T) => boolean;
  color: string;
  onClick: (row: T) => Promise<void>;
  dynamicColor?: (row: T) => string;
}

interface AdvancedCollectionManagerProps<T> {
  collectionName: string;
  fields: FieldDef[];
  converter: FirestoreDataConverter<T>;
  idField?: string;
  specialBadges?: BadgeDef[];
  contextActions?: ContextAction<T>[];
  exportToCSV?: boolean;
}

function AdvancedCollectionManager<T extends Record<string, any>>({
  collectionName,
  fields,
  converter,
  idField,
  specialBadges = [],
  contextActions = [],
  exportToCSV = false,
}: AdvancedCollectionManagerProps<T>) {
  const [docs, setDocs] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [newDoc, setNewDoc] = useState<Partial<T>>({});
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editDoc, setEditDoc] = useState<Partial<T>>({});
  const [error, setError] = useState<string | null>(null);

  const effectiveIdField = idField || (fields.find(f => f.key === "email") ? "email" : "id");

  const colRef = collection(db, collectionName).withConverter(converter) as CollectionReference<T>;

  const fetchDocs = async () => {
    setLoading(true);
    setError(null);
    try {
      const snapshot = await getDocs(colRef);
      setDocs(snapshot.docs.map(doc => ({ ...doc.data(), [effectiveIdField]: doc.id })));
    } catch (e: any) {
      setError(e.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
    // Default newDoc.role to 'Shaper' if the field exists and is not set
    if (fields.some(f => f.key === "role") && !newDoc.role) {
      setNewDoc(prev => ({ ...prev, role: Role.Shaper }));
    }
    // eslint-disable-next-line
  }, [collectionName, fields]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setter: React.Dispatch<React.SetStateAction<Partial<T>>>) => {
    const { name, value, type } = e.target;
    let fieldValue: any = value;
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      fieldValue = e.target.checked;
    }
    setter(prev => ({ ...prev, [name]: fieldValue }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, setter: React.Dispatch<React.SetStateAction<Partial<T>>>) => {
    const { name, value } = e.target;
    setter(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = async () => {
    setError(null);
    try {
      if (!newDoc[effectiveIdField]) {
        setError(`Please provide a value for ${effectiveIdField}`);
        return;
      }
      await setDoc(doc(colRef, newDoc[effectiveIdField]), newDoc as T);
      setNewDoc({});
      fetchDocs();
    } catch (e: any) {
      setError(e.message || "Failed to add document");
    }
  };

  const handleEdit = (idx: number) => {
    setEditIndex(idx);
    setEditDoc({ ...docs[idx] });
  };

  const handleSave = async () => {
    setError(null);
    try {
      if (!editDoc[effectiveIdField]) {
        setError(`Please provide a value for ${effectiveIdField}`);
        return;
      }
      await setDoc(doc(colRef, editDoc[effectiveIdField]), editDoc as T);
      setEditIndex(null);
      setEditDoc({});
      fetchDocs();
    } catch (e: any) {
      setError(e.message || "Failed to save document");
    }
  };

  const handleDelete = async (id: string) => {
    setError(null);
    try {
      await deleteDoc(doc(colRef, id));
      fetchDocs();
    } catch (e: any) {
      setError(e.message || "Failed to delete document");
    }
  };

  // CSV Export
  const handleExportCSV = () => {
    if (!docs.length) return;
    const csvRows = [
      fields.map(f => `"${f.label}"`).join(","),
      ...docs.map(doc => fields.map(f => `"${String(doc[f.key] ?? "")}"`).join(",")),
    ];
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${collectionName}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Improved error message for permissions
  const isPermissionError = error && /permission|insufficient/i.test(error);

  return (
    <div className="p-6 border rounded mb-10 bg-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{collectionName.charAt(0).toUpperCase() + collectionName.slice(1).replace(/_/g, ' ')} Manager</h2>
        {exportToCSV && (
          <button
            className="bg-gray-700 hover:bg-gray-900 text-white px-4 py-2 rounded shadow"
            onClick={handleExportCSV}
            disabled={!docs.length}
            title="Export to CSV"
          >
            Export CSV
          </button>
        )}
      </div>
      {error && (
        <div className="text-red-600 mb-4 font-semibold">
          {isPermissionError ? (
            <>You do not have permission to view or edit this collection. Please contact an admin.</>
          ) : (
            error
          )}
        </div>
      )}
      {loading ? (
        <div className="py-8 text-center text-gray-500">Loading...</div>
      ) : docs.length === 0 ? (
        <div className="py-8 text-center text-gray-400">No records found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full mb-4 border rounded">
            <thead className="bg-gray-50">
              <tr>
                {fields.map(f => (
                  <th key={f.key} className="px-3 py-2 border-b text-left font-semibold">{f.label}</th>
                ))}
                {specialBadges.length > 0 && <th className="px-3 py-2 border-b">Badges</th>}
                <th className="px-3 py-2 border-b sticky right-0 bg-gray-50 z-10">Actions</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((doc, idx) => (
                <tr key={doc[effectiveIdField] || idx} className={editIndex === idx ? "bg-blue-50" : "hover:bg-gray-100"}>
                  {fields.map(f => (
                    <td key={f.key} className="px-3 py-2 border-b align-middle">
                      {editIndex === idx ? (
                        f.key === "role" ? (
                          <select
                            name="role"
                            value={editDoc.role ?? Role.Shaper}
                            onChange={e => handleSelectChange(e, setEditDoc)}
                            className="border rounded px-2 py-1 w-full"
                          >
                            {Object.values(Role).map(role => (
                              <option key={role} value={role}>{role}</option>
                            ))}
                          </select>
                        ) : f.type === "textarea" ? (
                          <textarea
                            name={f.key}
                            value={editDoc[f.key] ?? ""}
                            onChange={e => handleInputChange(e, setEditDoc)}
                            className="border rounded px-2 py-1 w-full"
                          />
                        ) : (
                          <input
                            name={f.key}
                            type={f.type}
                            value={editDoc[f.key] ?? ""}
                            onChange={e => handleInputChange(e, setEditDoc)}
                            className="border rounded px-2 py-1 w-full"
                          />
                        )
                      ) : (
                        String(doc[f.key] ?? "")
                      )}
                    </td>
                  ))}
                  {specialBadges.length > 0 && (
                    <td className="px-3 py-2 border-b align-middle">
                      {specialBadges.map(badge =>
                        doc[badge.key] === badge.value ? (
                          <span key={badge.key} className={`inline-block px-2 py-1 rounded text-xs bg-${badge.color}-100 text-${badge.color}-800 mr-1`}>
                            {badge.label}
                          </span>
                        ) : null
                      )}
                    </td>
                  )}
                  <td className="px-3 py-2 border-b align-middle sticky right-0 bg-white z-10">
                    {editIndex === idx ? (
                      <>
                        <button className="bg-green-500 text-white px-2 py-1 rounded mr-2" onClick={handleSave}>Save</button>
                        <button className="bg-gray-400 text-white px-2 py-1 rounded" onClick={() => { setEditIndex(null); setEditDoc({}); }}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2" onClick={() => handleEdit(idx)}>Edit</button>
                        <button className="bg-red-500 text-white px-2 py-1 rounded mr-2" onClick={() => handleDelete(doc[effectiveIdField])}>Delete</button>
                        {contextActions.map((action, i) =>
                          action.show(doc) ? (
                            <button
                              key={i}
                              className={`px-2 py-1 rounded text-white bg-${action.dynamicColor ? action.dynamicColor(doc) : action.color}-500 mr-2`}
                              onClick={() => action.onClick(doc)}
                            >
                              {action.label(doc)}
                            </button>
                          ) : null
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {/* Add new row */}
              {!isPermissionError && (
                <tr className="bg-green-50">
                  {fields.map(f => (
                    <td key={f.key} className="px-3 py-2 border-b align-middle">
                      {f.key === "role" ? (
                        <select
                          name="role"
                          value={newDoc.role ?? Role.Shaper}
                          onChange={e => handleSelectChange(e, setNewDoc)}
                          className="border rounded px-2 py-1 w-full"
                        >
                          {Object.values(Role).map(role => (
                            <option key={role} value={role}>{role}</option>
                          ))}
                        </select>
                      ) : f.type === "textarea" ? (
                        <textarea
                          name={f.key}
                          value={newDoc[f.key] ?? ""}
                          onChange={e => handleInputChange(e, setNewDoc)}
                          className="border rounded px-2 py-1 w-full"
                        />
                      ) : (
                        <input
                          name={f.key}
                          type={f.type}
                          value={newDoc[f.key] ?? ""}
                          onChange={e => handleInputChange(e, setNewDoc)}
                          className="border rounded px-2 py-1 w-full"
                        />
                      )}
                    </td>
                  ))}
                  {specialBadges.length > 0 && <td className="px-3 py-2 border-b"></td>}
                  <td className="px-3 py-2 border-b align-middle">
                    <button className="bg-green-600 text-white px-2 py-1 rounded" onClick={handleAdd}>Add</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdvancedCollectionManager; 