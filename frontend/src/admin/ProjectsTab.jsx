import { useState, useEffect } from 'react';
import { Image, Upload, Link as LinkIcon, Trash2, Loader2 } from 'lucide-react';
import API_URL from '../utils/api';

export default function ProjectsTab() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', desc: '', image: '', demo: '', code: '', tech: '' });
  const [editId, setEditId] = useState(null);
  
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadTab, setUploadTab] = useState('upload'); // 'upload' | 'url'

  const fetchProjects = () => fetch(`${API_URL}/api/projects`).then(res => res.json()).then(setProjects);
  useEffect(() => { fetchProjects(); }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check size limit: 5MB
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size exceeds the 5MB limit.');
      return;
    }

    setUploading(true);
    setUploadError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: formData
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to upload image');
      }

      const data = await res.json();
      setForm(prev => ({ ...prev, image: data.url }));
    } catch (err) {
      console.error(err);
      setUploadError(err.message || 'Error uploading file.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.image) {
      setUploadError('An image is required.');
      return;
    }
    const payload = { ...form, tech: typeof form.tech === 'string' ? form.tech.split(',').map(t => t.trim()) : form.tech };
    
    const url = editId ? `${API_URL}/api/projects/${editId}` : `${API_URL}/api/projects`;
    const method = editId ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
      body: JSON.stringify(payload)
    });
    
    setForm({ title: '', desc: '', image: '', demo: '', code: '', tech: '' });
    setEditId(null);
    fetchProjects();
  };

  const handleEdit = (p) => {
    setForm({ ...p, tech: p.tech.join(', ') });
    setEditId(p._id);
    if (p.image && !p.image.includes('cloudinary.com')) {
      setUploadTab('url');
    } else {
      setUploadTab('upload');
    }
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/api/projects/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` } });
    fetchProjects();
  };

  return (
    <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800">
      <h2 className="text-2xl font-bold mb-6">Manage Projects</h2>
      
      <form onSubmit={handleSubmit} className="mb-10 grid gap-6 grid-cols-1 md:grid-cols-2 bg-neutral-50 dark:bg-neutral-950 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
        <h3 className="col-span-full font-bold text-lg">{editId ? '🛠️ Edit Project' : '🚀 Add New Project'}</h3>
        
        <div className="col-span-full md:col-span-1 flex flex-col gap-4">
          <input 
            placeholder="Title" 
            required 
            value={form.title} 
            onChange={e => setForm({...form, title: e.target.value})} 
            className="px-4 py-3 border rounded-xl bg-transparent dark:border-neutral-700 focus:border-emerald-500 focus:outline-none transition" 
          />
          <textarea 
            placeholder="Description" 
            required 
            value={form.desc} 
            onChange={e => setForm({...form, desc: e.target.value})} 
            className="px-4 py-3 border rounded-xl bg-transparent dark:border-neutral-700 col-span-full focus:border-emerald-500 focus:outline-none transition" 
            rows="4" 
          />
        </div>

        {/* Cloudinary Upload Section */}
        <div className="col-span-full md:col-span-1 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 bg-white dark:bg-neutral-900 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-semibold flex items-center gap-2">
              <Image size={18} className="text-neutral-500" /> Project Cover Image
            </label>
            <div className="flex gap-1 bg-neutral-100 dark:bg-neutral-800 p-0.5 rounded-lg text-xs">
              <button 
                type="button" 
                onClick={() => setUploadTab('upload')} 
                className={`px-3 py-1 rounded-md transition flex items-center gap-1 ${uploadTab === 'upload' ? 'bg-white dark:bg-neutral-700 shadow-sm font-semibold' : 'text-neutral-500'}`}
              >
                <Upload size={12} /> Upload File
              </button>
              <button 
                type="button" 
                onClick={() => setUploadTab('url')} 
                className={`px-3 py-1 rounded-md transition flex items-center gap-1 ${uploadTab === 'url' ? 'bg-white dark:bg-neutral-700 shadow-sm font-semibold' : 'text-neutral-500'}`}
              >
                <LinkIcon size={12} /> Paste URL
              </button>
            </div>
          </div>

          {uploadTab === 'upload' ? (
            <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl p-6 hover:border-emerald-500 dark:hover:border-emerald-500 transition cursor-pointer relative bg-neutral-50/50 dark:bg-neutral-950/50 min-h-[160px]">
              {uploading ? (
                <div className="flex flex-col items-center gap-2 py-4">
                  <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                  <p className="text-sm text-neutral-500 font-medium">Uploading to Cloudinary...</p>
                </div>
              ) : form.image ? (
                <div className="relative group w-full h-full max-h-[140px] flex items-center justify-center">
                  <img src={form.image} alt="Preview" className="w-auto max-w-full h-32 object-contain rounded-lg shadow-sm border dark:border-neutral-800" />
                  <button 
                    type="button" 
                    onClick={() => setForm({ ...form, image: '' })}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition shadow-md hover:scale-105"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ) : (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer py-4">
                  <Upload className="h-8 w-8 text-neutral-400 mb-2" />
                  <p className="text-sm font-medium">Click to upload image</p>
                  <p className="text-xs text-neutral-400 mt-1">PNG, JPG, GIF, WebP up to 5MB</p>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              )}
              {uploadError && <p className="text-xs text-red-500 mt-2 font-medium">{uploadError}</p>}
            </div>
          ) : (
            <div className="flex-1 flex flex-col gap-3 justify-center min-h-[160px]">
              <input 
                placeholder="https://example.com/image.jpg" 
                value={form.image} 
                onChange={e => {
                  setForm({...form, image: e.target.value});
                  setUploadError('');
                }} 
                className="w-full px-4 py-3 border rounded-xl bg-transparent dark:border-neutral-700 focus:border-emerald-500 focus:outline-none transition" 
              />
              {form.image ? (
                <div className="flex items-center gap-3 bg-neutral-50 dark:bg-neutral-950 p-2 rounded-lg border dark:border-neutral-800">
                  <img src={form.image} alt="Preview" className="w-12 h-12 object-cover rounded-md" />
                  <span className="text-xs text-neutral-500 truncate flex-1">{form.image}</span>
                </div>
              ) : (
                <p className="text-xs text-neutral-400">Enter a direct image URL to show preview</p>
              )}
            </div>
          )}
        </div>

        <input 
          placeholder="Tech tags (comma separated, e.g., React, Tailwind, Node)" 
          value={form.tech} 
          onChange={e => setForm({...form, tech: e.target.value})} 
          className="px-4 py-3 border rounded-xl bg-transparent dark:border-neutral-700 col-span-full focus:border-emerald-500 focus:outline-none transition" 
        />
        <input 
          placeholder="Demo Link (optional)" 
          value={form.demo} 
          onChange={e => setForm({...form, demo: e.target.value})} 
          className="px-4 py-3 border rounded-xl bg-transparent dark:border-neutral-700 focus:border-emerald-500 focus:outline-none transition" 
        />
        <input 
          placeholder="Code Link (optional)" 
          value={form.code} 
          onChange={e => setForm({...form, code: e.target.value})} 
          className="px-4 py-3 border rounded-xl bg-transparent dark:border-neutral-700 focus:border-emerald-500 focus:outline-none transition" 
        />
        
        <div className="col-span-full mt-2 flex gap-3">
          <button type="submit" className="px-6 py-3 bg-emerald-500 text-white font-medium rounded-xl hover:bg-emerald-600 transition shadow-lg shadow-emerald-500/10">
            {editId ? 'Save Changes' : 'Add Project'}
          </button>
          {editId && (
            <button type="button" onClick={() => { setEditId(null); setForm({ title: '', desc: '', image: '', demo: '', code: '', tech: '' }); }} className="px-6 py-3 bg-neutral-200 dark:bg-neutral-800 font-medium rounded-xl hover:bg-neutral-300 dark:hover:bg-neutral-700 transition">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="grid gap-4">
        <h3 className="font-bold text-lg">Existing Projects ({projects.length})</h3>
        {projects.map(p => (
          <div key={p._id} className="flex justify-between items-center p-4 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50/50 dark:bg-neutral-950/50 hover:bg-neutral-50 dark:hover:bg-neutral-950 transition">
            <div className="flex items-center gap-4">
              {p.image && <img src={p.image} alt={p.title} className="w-16 h-12 object-cover rounded-lg border dark:border-neutral-800 shadow-sm" />}
              <div>
                <p className="font-bold">{p.title}</p>
                <p className="text-sm text-neutral-500 line-clamp-1">{p.desc}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(p)} className="text-emerald-500 hover:text-emerald-700 font-medium px-3 py-1.5 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-lg transition">Edit</button>
              <button onClick={() => handleDelete(p._id)} className="text-red-500 hover:text-red-700 font-medium px-3 py-1.5 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

