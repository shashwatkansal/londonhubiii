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

interface FieldDef {
  key: string;
  label: string;
  type: "text" | "email" | "textarea" | "number" | "boolean";
}

interface CollectionManagerProps<T> {
  collectionName: string;
  fields: FieldDef[];
  converter: FirestoreDataConverter<T>;
  idField?: string; // default: "id" or "email"
}

function CollectionManager<T extends Record<string, any>>({
  collectionName,
  fields,
  converter,
  idField,
}: CollectionManagerProps<T>) {
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
    // eslint-disable-next-line
  }, [collectionName]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setter: React.Dispatch<React.SetStateAction<Partial<T>>>) => {
    const { name, value, type } = e.target;
    let fieldValue: any = value;
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      fieldValue = e.target.checked;
    }
    setter(prev => ({ ...prev, [name]: fieldValue }));
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

  return (
    <div className="p-4 border rounded mb-8 bg-white shadow">
      <h2 className="text-xl font-bold mb-2">{collectionName.charAt(0).toUpperCase() + collectionName.slice(1)} Manager</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full mb-4">
          <thead>
            <tr>
              {fields.map(f => (
                <th key={f.key} className="px-2 py-1 border-b text-left">{f.label}</th>
              ))}
              <th className="px-2 py-1 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((doc, idx) => (
              <tr key={doc[effectiveIdField] || idx} className={editIndex === idx ? "bg-blue-50" : ""}>
                {fields.map(f => (
                  <td key={f.key} className="px-2 py-1 border-b">
                    {editIndex === idx ? (
                      f.type === "textarea" ? (
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
                <td className="px-2 py-1 border-b">
                  {editIndex === idx ? (
                    <>
                      <button className="bg-green-500 text-white px-2 py-1 rounded mr-2" onClick={handleSave}>Save</button>
                      <button className="bg-gray-400 text-white px-2 py-1 rounded" onClick={() => { setEditIndex(null); setEditDoc({}); }}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2" onClick={() => handleEdit(idx)}>Edit</button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(doc[effectiveIdField])}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {/* Add new row */}
            <tr className="bg-green-50">
              {fields.map(f => (
                <td key={f.key} className="px-2 py-1 border-b">
                  {f.type === "textarea" ? (
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
              <td className="px-2 py-1 border-b">
                <button className="bg-green-600 text-white px-2 py-1 rounded" onClick={handleAdd}>Add</button>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CollectionManager; 