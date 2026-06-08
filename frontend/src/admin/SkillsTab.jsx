import { useState, useEffect } from 'react';
import API_URL from '../utils/api';

export default function SkillsTab() {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({ title: '', items: [] });
  const [itemName, setItemName] = useState('');
  const [itemValue, setItemValue] = useState('');
  const [editId, setEditId] = useState(null);

  const fetchSkills = () => fetch(`${API_URL}/api/skills`).then(res => res.json()).then(setSkills);
  useEffect(() => { fetchSkills(); }, []);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (itemName) {
      setForm({ ...form, items: [...form.items, { name: itemName, value: itemValue ? Number(itemValue) : null }] });
      setItemName(''); setItemValue('');
    }
  };

  const handleRemoveItem = (index) => {
    setForm({ ...form, items: form.items.filter((_, i) => i !== index) });
  };

  const handleSaveSkillGroup = async () => {
    if (!form.title || form.items.length === 0) return;
    
    const url = editId ? `${API_URL}/api/skills/${editId}` : `${API_URL}/api/skills`;
    const method = editId ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
      body: JSON.stringify(form)
    });
    setForm({ title: '', items: [] });
    setEditId(null);
    fetchSkills();
  };

  const handleEdit = (skill) => {
    setForm({ title: skill.title, items: [...skill.items] });
    setEditId(skill._id);
  };

  const handleCancelEdit = () => {
    setForm({ title: '', items: [] });
    setEditId(null);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/api/skills/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` } });
    fetchSkills();
  };

  return (
    <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800">
      <h2 className="text-2xl font-bold mb-6">Manage Skills</h2>
      
      <div className="mb-10 bg-neutral-50 dark:bg-neutral-950 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
        <h3 className="font-bold mb-4">{editId ? 'Edit Skill Category' : 'Add Skill Category'}</h3>
        <input placeholder="Category Title (e.g. Frontend)" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="px-4 py-2 border rounded-lg bg-transparent dark:border-neutral-700 w-full mb-4" />
        
        <form onSubmit={handleAddItem} className="flex gap-2 items-center mb-4 p-4 border border-dashed rounded-lg border-neutral-300 dark:border-neutral-600">
          <input placeholder="Skill Name (e.g. React)" value={itemName} onChange={e => setItemName(e.target.value)} className="px-4 py-2 flex-1 border rounded-lg bg-white dark:bg-neutral-900 dark:border-neutral-700" />
          <input type="number" placeholder="Value (0-100)" value={itemValue} onChange={e => setItemValue(e.target.value)} className="w-24 px-4 py-2 border rounded-lg bg-white dark:bg-neutral-900 dark:border-neutral-700" />
          <button type="submit" className="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg whitespace-nowrap">Add Item</button>
        </form>

        <ul className="mb-4 flex gap-2 flex-wrap">
          {form.items.map((it, idx) => (
            <li key={idx} className="bg-white dark:bg-neutral-800 px-3 py-1 rounded border border-neutral-200 dark:border-neutral-700 text-sm flex items-center gap-2">
              {it.name}{it.value ? `: ${it.value}%` : ''}
              <button onClick={() => handleRemoveItem(idx)} className="text-red-500 hover:text-red-700 font-bold ml-1">×</button>
            </li>
          ))}
        </ul>

        <div className="flex gap-3 mt-4">
          <button onClick={handleSaveSkillGroup} className="flex-1 px-6 py-3 bg-emerald-500 text-white rounded-lg font-bold hover:bg-emerald-600 transition">
            {editId ? 'Save Changes' : 'Save Skill Category'}
          </button>
          {editId && (
            <button onClick={handleCancelEdit} className="px-6 py-3 bg-neutral-200 dark:bg-neutral-800 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-700 transition">
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-4">
        {skills.map(s => (
          <div key={s._id} className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-xl relative">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-lg">{s.title}</h4>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(s)} className="text-emerald-500 hover:text-emerald-700 text-sm px-2">Edit</button>
                <button onClick={() => handleDelete(s._id)} className="text-red-500 hover:text-red-700 text-sm px-2">Delete</button>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap text-sm">
              {s.items.map(it => <span key={it._id || it.name} className="bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 px-2 py-1 rounded">{it.name}{it.value ? ` (${it.value}%)` : ''}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
