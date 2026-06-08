import { useState, useEffect } from 'react';
import API_URL from '../utils/api';

export default function ExperienceTab() {
  const [experiences, setExperiences] = useState([]);
  const [form, setForm] = useState({ role: '', company: '', date: '', desc: '' });
  const [editId, setEditId] = useState(null);

  const fetchExp = () => fetch(`${API_URL}/api/experience`).then(res => res.json()).then(setExperiences);
  useEffect(() => { fetchExp(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editId ? `${API_URL}/api/experience/${editId}` : `${API_URL}/api/experience`;
    const method = editId ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
      body: JSON.stringify(form)
    });
    setForm({ role: '', company: '', date: '', desc: '' });
    setEditId(null);
    fetchExp();
  };

  const handleEdit = (exp) => {
    setForm({ role: exp.role, company: exp.company, date: exp.date, desc: exp.desc });
    setEditId(exp._id);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/api/experience/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` } });
    fetchExp();
  };

  return (
    <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800">
      <h2 className="text-2xl font-bold mb-6">Manage Experience</h2>
      <form onSubmit={handleSubmit} className="mb-10 grid gap-4 bg-neutral-50 dark:bg-neutral-950 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 md:grid-cols-2">
        <h3 className="col-span-full font-bold">{editId ? 'Edit Experience' : 'Add Experience'}</h3>
        <input placeholder="Role (e.g. Senior Dev)" required value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="px-4 py-2 border rounded-lg bg-transparent dark:border-neutral-700" />
        <input placeholder="Company" required value={form.company} onChange={e => setForm({...form, company: e.target.value})} className="px-4 py-2 border rounded-lg bg-transparent dark:border-neutral-700" />
        <input placeholder="Date (e.g. 2021 - Present)" required value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="px-4 py-2 border rounded-lg bg-transparent dark:border-neutral-700 md:col-span-2" />
        <textarea placeholder="Description" required value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} className="px-4 py-2 border rounded-lg bg-transparent dark:border-neutral-700 md:col-span-2" rows="3" />
        <div className="col-span-full mt-2 flex gap-3">
          <button type="submit" className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition">
            {editId ? 'Save Changes' : 'Add Experience'}
          </button>
          {editId && (
            <button type="button" onClick={() => { setEditId(null); setForm({ role: '', company: '', date: '', desc: '' }); }} className="px-6 py-3 bg-neutral-200 dark:bg-neutral-800 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-700 transition">
              Cancel
            </button>
          )}
        </div>
      </form>
      <div className="grid gap-4">
        {experiences.map(e => (
          <div key={e._id} className="flex justify-between items-center p-4 border border-neutral-200 dark:border-neutral-800 rounded-xl">
            <div><p className="font-bold">{e.role} at {e.company}</p><p className="text-sm text-neutral-500">{e.date}</p></div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(e)} className="text-emerald-500 hover:text-emerald-700 px-3">Edit</button>
              <button onClick={() => handleDelete(e._id)} className="text-red-500 hover:text-red-700 px-3">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
