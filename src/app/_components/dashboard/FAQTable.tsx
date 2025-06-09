import { useEffect, useState } from 'react';
import { FAQ, faqHelpers } from '@/app/database/models';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import TableSkeleton from './TableSkeleton';
import EmptyState from './EmptyState';

const FAQTable = () => {
  const [faqs, setFaqs] = useState<(FAQ & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<FAQ>>({});

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    setLoading(true);
    try {
      const data = await faqHelpers.getAll();
      setFaqs(data as (FAQ & { id: string })[]);
    } catch (error) {
      toast.error('Failed to load FAQs');
      setFaqs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (faq: FAQ & { id: string }) => {
    setEditingId(faq.id);
    setEditData({ question: faq.question, answer: faq.answer, category: faq.category });
  };

  const handleSave = async (id: string) => {
    try {
      await faqHelpers.update(id, editData);
      toast.success('FAQ updated');
      setEditingId(null);
      setEditData({});
      fetchFAQs();
    } catch (error) {
      toast.error('Failed to update FAQ');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      await faqHelpers.delete(id);
      toast.success('FAQ deleted');
      fetchFAQs();
    } catch (error) {
      toast.error('Failed to delete FAQ');
    }
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase()) ||
      (faq.category || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search FAQs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-64 focus:ring-2 focus:ring-blue-400"
          aria-label="Search FAQs"
        />
      </div>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white border-separate border-spacing-0">
          <thead>
            <tr>
              {['Question', 'Answer', 'Category', 'Actions'].map((header) => (
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
          {loading ? (
            <TableSkeleton />
          ) : filteredFaqs.length === 0 ? (
            <EmptyState message="No FAQs found." />
          ) : (
            <tbody>
              {filteredFaqs.map((faq) => (
                <tr key={faq.id} className="transition-colors hover:bg-blue-50">
                  <td className="px-4 py-2 align-middle border-b">
                    {editingId === faq.id ? (
                      <input
                        value={editData.question || ''}
                        onChange={(e) => setEditData((d) => ({ ...d, question: e.target.value }))}
                        className="border rounded px-2 py-1 w-full"
                        aria-label="Edit question"
                      />
                    ) : faq.question}
                  </td>
                  <td className="px-4 py-2 align-middle border-b">
                    {editingId === faq.id ? (
                      <input
                        value={editData.answer || ''}
                        onChange={(e) => setEditData((d) => ({ ...d, answer: e.target.value }))}
                        className="border rounded px-2 py-1 w-full"
                        aria-label="Edit answer"
                      />
                    ) : faq.answer}
                  </td>
                  <td className="px-4 py-2 align-middle border-b">
                    {editingId === faq.id ? (
                      <input
                        value={editData.category || ''}
                        onChange={(e) => setEditData((d) => ({ ...d, category: e.target.value }))}
                        className="border rounded px-2 py-1 w-full"
                        aria-label="Edit category"
                      />
                    ) : faq.category}
                  </td>
                  <td className="px-4 py-2 align-middle border-b">
                    {editingId === faq.id ? (
                      <>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded mr-2" onClick={() => handleSave(faq.id)} title="Save" aria-label="Save FAQ"><FaSave /></button>
                        <button className="bg-gray-400 hover:bg-gray-500 text-white px-2 py-1 rounded" onClick={() => setEditingId(null)} title="Cancel" aria-label="Cancel edit"><FaTimes /></button>
                      </>
                    ) : (
                      <>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mr-2" onClick={() => handleEdit(faq)} title="Edit" aria-label="Edit FAQ"><FaEdit /></button>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded" onClick={() => handleDelete(faq.id)} title="Delete" aria-label="Delete FAQ"><FaTrash /></button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default FAQTable; 