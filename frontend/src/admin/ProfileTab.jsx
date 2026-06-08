import { useState, useEffect } from 'react';
import { User, Upload, Loader2, Plus, Trash2, Edit2, Shield, Lock, Send, Check, FileText } from 'lucide-react';

export default function ProfileTab() {
  // State for profile settings
  const [profile, setProfile] = useState({
    name: '',
    title: '',
    bio: '',
    tagline: '',
    avatarUrl: '',
    contactEmail: '',
    githubUrl: '',
    linkedinUrl: '',
    typewriterTitles: []
  });

  // Security 2FA and password states
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ otp: '', newPassword: '', confirmPassword: '' });

  // Loading and feedback states
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [uploadError, setUploadError] = useState('');

  // Resume upload states
  const [resumeUploading, setResumeUploading] = useState(false);
  const [resumeError, setResumeError] = useState('');

  // Typewriter edit states
  const [newTypewriter, setNewTypewriter] = useState('');
  const [editingTitleIndex, setEditingTitleIndex] = useState(null);
  const [editingTitleValue, setEditingTitleValue] = useState('');

  // Security message states
  const [securityMessage, setSecurityMessage] = useState('');
  const [securityError, setSecurityError] = useState('');
  const [securityLoading, setSecurityLoading] = useState(false);

  useEffect(() => {
    // Fetch profile data
    fetch('http://localhost:5000/api/profile')
      .then(res => res.json())
      .then(data => data && setProfile({
        name: data.name || '',
        title: data.title || '',
        bio: data.bio || '',
        tagline: data.tagline || '',
        avatarUrl: data.avatarUrl || '',
        contactEmail: data.contactEmail || '',
        githubUrl: data.githubUrl || '',
        linkedinUrl: data.linkedinUrl || '',
        resumeUrl: data.resumeUrl || '',
        resumePublicId: data.resumePublicId || '',
        resumeResourceType: data.resumeResourceType || '',
        typewriterTitles: data.typewriterTitles || ['Frontend Developer.', 'UI/UX Enthusiast.', 'Creative Coder.']
      }));

    // Fetch 2FA status
    fetch('http://localhost:5000/api/auth/2fa', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.twoFactorEnabled === 'boolean') {
          setTwoFactorEnabled(data.twoFactorEnabled);
        }
      })
      .catch(err => console.error('Error fetching 2FA status:', err));
  }, []);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size exceeds the 5MB limit.');
      return;
    }

    setUploading(true);
    setUploadError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:5000/api/upload', {
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
      setProfile(prev => ({ ...prev, avatarUrl: data.url }));
    } catch (err) {
      console.error(err);
      setUploadError(err.message || 'Error uploading file.');
    } finally {
      setUploading(false);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setResumeError('File size exceeds the 5MB limit.');
      return;
    }

    setResumeUploading(true);
    setResumeError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:5000/api/profile/resume', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: formData
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to upload resume');
      }

      const data = await res.json();
      setProfile(prev => ({ 
        ...prev, 
        resumeUrl: data.resumeUrl, 
        resumePublicId: data.resumePublicId, 
        resumeResourceType: data.resumeResourceType 
      }));
    } catch (err) {
      console.error(err);
      setResumeError(err.message || 'Error uploading file.');
    } finally {
      setResumeUploading(false);
    }
  };

  const handleResumeDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your resume?')) return;

    setResumeUploading(true);
    setResumeError('');

    try {
      const res = await fetch('http://localhost:5000/api/profile/resume', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to delete resume');
      }

      const data = await res.json();
      setProfile(prev => ({ 
        ...prev, 
        resumeUrl: '', 
        resumePublicId: '', 
        resumeResourceType: '' 
      }));
    } catch (err) {
      console.error(err);
      setResumeError(err.message || 'Error deleting file.');
    } finally {
      setResumeUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(profile)
      });
      if (!res.ok) throw new Error('Failed to update');
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.message);
    }
    setLoading(false);
  };

  // ----------------------------------------------------
  // Typewriter title helper functions
  // ----------------------------------------------------
  const handleAddTypewriter = () => {
    if (!newTypewriter.trim()) return;
    setProfile(prev => ({
      ...prev,
      typewriterTitles: [...prev.typewriterTitles, newTypewriter.trim()]
    }));
    setNewTypewriter('');
  };

  const handleDeleteTypewriter = (indexToDelete) => {
    setProfile(prev => ({
      ...prev,
      typewriterTitles: prev.typewriterTitles.filter((_, i) => i !== indexToDelete)
    }));
  };

  const handleStartEditTypewriter = (index) => {
    setEditingTitleIndex(index);
    setEditingTitleValue(profile.typewriterTitles[index]);
  };

  const handleSaveEditTypewriter = () => {
    if (!editingTitleValue.trim()) return;
    setProfile(prev => {
      const updated = [...prev.typewriterTitles];
      updated[editingTitleIndex] = editingTitleValue.trim();
      return { ...prev, typewriterTitles: updated };
    });
    setEditingTitleIndex(null);
  };

  // ----------------------------------------------------
  // Security 2FA and password helper functions
  // ----------------------------------------------------
  const handleToggle2FA = async (e) => {
    const val = e.target.checked;
    setSecurityLoading(true);
    setSecurityError('');
    setSecurityMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/2fa', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ enabled: val })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update 2FA status');

      setTwoFactorEnabled(data.twoFactorEnabled);
      setSecurityMessage(data.message);
      setTimeout(() => setSecurityMessage(''), 3000);
    } catch (err) {
      setSecurityError(err.message);
    } finally {
      setSecurityLoading(false);
    }
  };

  const handleRequestPasswordOtp = async () => {
    setSecurityLoading(true);
    setSecurityError('');
    setSecurityMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/request-password-otp', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send OTP code');

      setSecurityMessage(data.message);
    } catch (err) {
      setSecurityError(err.message);
    } finally {
      setSecurityLoading(false);
    }
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    setSecurityLoading(true);
    setSecurityError('');
    setSecurityMessage('');

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setSecurityError('New password and confirm password do not match.');
      setSecurityLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(passwordForm)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Password update failed.');

      setSecurityMessage(data.message);
      setPasswordForm({ otp: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setSecurityMessage(''), 4000);
    } catch (err) {
      setSecurityError(err.message);
    } finally {
      setSecurityLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

      {/* ────────────────── LEFT COLUMN: PROFILE MANAGEMENT ────────────────── */}
      <div className="lg:col-span-7 bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col gap-6">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b pb-3 dark:border-neutral-800 text-neutral-800 dark:text-neutral-100">
          👤 Profile Settings
        </h2>
        {message && <div className="mb-6 p-4 bg-emerald-50 text-emerald-600 rounded-xl font-medium border dark:border-emerald-950/30 text-sm">{message}</div>}

        <form onSubmit={handleSave} className="flex flex-col gap-6 w-full">
          {/* Avatar Upload Container */}
          <div className="flex flex-col sm:flex-row items-center gap-6 bg-neutral-50 dark:bg-neutral-950/50 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800">
            <div className="relative w-24 h-24 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center overflow-hidden border-2 border-emerald-500/20">
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User size={40} className="text-neutral-400" />
              )}
              {uploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                </div>
              )}
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h4 className="text-sm font-bold mb-1 text-neutral-800 dark:text-neutral-100">Profile Portrait</h4>
              <p className="text-xs text-neutral-500 mb-3 leading-relaxed">Upload your photo. PNG, JPG or WebP up to 5MB. Will be hosted on Cloudinary.</p>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <label className="px-4 py-2.5 bg-emerald-500 text-white text-sm font-semibold rounded-xl hover:bg-emerald-600 transition cursor-pointer flex items-center justify-center gap-2 shadow-sm shrink-0">
                  <Upload size={14} /> {uploading ? 'Uploading...' : 'Choose Photo'}
                  <input type="file" accept="image/*" onChange={handleAvatarUpload} disabled={uploading} className="hidden" />
                </label>
                {profile.avatarUrl && (
                  <button
                    type="button"
                    onClick={() => setProfile(prev => ({ ...prev, avatarUrl: '' }))}
                    className="px-4 py-2.5 bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-sm font-semibold rounded-xl hover:bg-red-500 hover:text-white transition shrink-0"
                  >
                    Remove Photo
                  </button>
                )}
              </div>
              {uploadError && <p className="text-xs text-red-500 mt-2 font-medium">{uploadError}</p>}
            </div>
          </div>

          {/* Resume Upload Container */}
          <div className="flex flex-col sm:flex-row items-center gap-6 bg-neutral-50 dark:bg-neutral-950/50 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800">
            <div className="relative w-24 h-24 rounded-2xl bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center overflow-hidden border border-neutral-200 dark:border-neutral-800 shrink-0">
              {profile.resumeUrl ? (
                <div className="flex flex-col items-center justify-center p-2 text-center text-emerald-500 dark:text-emerald-400">
                  <Check size={32} className="animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Uploaded</span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-2 text-center text-neutral-400">
                  <FileText size={32} />
                  <span className="text-[10px] font-bold uppercase tracking-widest mt-1">No Resume</span>
                </div>
              )}
              {resumeUploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                </div>
              )}
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h4 className="text-sm font-bold mb-1 text-neutral-800 dark:text-neutral-100">Resume / CV Document</h4>
              <p className="text-xs text-neutral-500 mb-3 leading-relaxed">Upload your resume PDF or Doc. Max 5MB limit. Hosted securely on Cloudinary.</p>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <label className="px-4 py-2.5 bg-emerald-500 text-white text-sm font-semibold rounded-xl hover:bg-emerald-600 transition cursor-pointer flex items-center justify-center gap-2 shadow-sm shrink-0 w-full sm:w-auto">
                  <Upload size={14} /> {resumeUploading ? 'Uploading...' : 'Choose File'}
                  <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} disabled={resumeUploading} className="hidden" />
                </label>
                {profile.resumeUrl && (
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <a
                      href={profile.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-sm font-semibold rounded-xl hover:bg-neutral-300 dark:hover:bg-neutral-700 transition shrink-0 text-center flex-1 sm:flex-none"
                    >
                      View Resume
                    </a>
                    <button
                      type="button"
                      onClick={handleResumeDelete}
                      disabled={resumeUploading}
                      className="px-4 py-2.5 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-sm font-semibold rounded-xl hover:bg-red-500 hover:text-white transition shrink-0 flex-1 sm:flex-none"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
              {resumeError && <p className="text-xs text-red-500 mt-2 font-medium">{resumeError}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-neutral-600 dark:text-neutral-400">Full Name</label>
            <input
              value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent focus:border-emerald-500 focus:outline-none text-sm transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-neutral-600 dark:text-neutral-400">Job Title</label>
            <input
              value={profile.title} onChange={e => setProfile({ ...profile, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent focus:border-emerald-500 focus:outline-none text-sm transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-neutral-600 dark:text-neutral-400">Short Tagline</label>
            <input
              value={profile.tagline} onChange={e => setProfile({ ...profile, tagline: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent focus:border-emerald-500 focus:outline-none text-sm transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-neutral-600 dark:text-neutral-400">Full Bio</label>
            <textarea
              value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value })}
              rows="5"
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent focus:border-emerald-500 focus:outline-none text-sm transition"
            />
          </div>

          {/* Contact & Social Settings Section */}
          <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 bg-neutral-50/50 dark:bg-neutral-950/50 flex flex-col gap-4">
            <h4 className="font-bold text-base text-neutral-800 dark:text-neutral-200 border-b pb-2 dark:border-neutral-800">Contact & Social Links</h4>
            <div>
              <label className="block text-sm font-semibold mb-2 text-neutral-600 dark:text-neutral-400">Receiving Contact Email (Gmail)</label>
              <input
                type="email"
                value={profile.contactEmail} onChange={e => setProfile({ ...profile, contactEmail: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent focus:border-emerald-500 focus:outline-none text-sm transition"
                placeholder="yourname@gmail.com"
                required
              />
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">This is the email where all your portfolio contact form submissions will be forwarded.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-neutral-600 dark:text-neutral-400">GitHub Profile URL</label>
                <input
                  value={profile.githubUrl} onChange={e => setProfile({ ...profile, githubUrl: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent focus:border-emerald-500 focus:outline-none text-sm transition"
                  placeholder="https://github.com/username"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-neutral-600 dark:text-neutral-400">LinkedIn Profile URL</label>
                <input
                  value={profile.linkedinUrl} onChange={e => setProfile({ ...profile, linkedinUrl: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent focus:border-emerald-500 focus:outline-none text-sm transition"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>
          </div>

          <button disabled={loading || uploading} className="w-full px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition disabled:opacity-50 shadow-lg shadow-emerald-500/10 cursor-pointer">
            Save Profile & Contacts
          </button>
        </form>
      </div>

      {/* ────────────────── RIGHT COLUMN: TYPEWRITER & SECURITY ────────────────── */}
      <div className="lg:col-span-5 flex flex-col gap-8">

        {/* Card 1: TYPEWRITER TITLES */}
        <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col gap-6">
          <h2 className="text-xl font-bold flex items-center gap-2 border-b pb-3 dark:border-neutral-800 text-neutral-800 dark:text-neutral-100">
            ⌨️ Typewriter Phrases
          </h2>
          <p className="text-xs text-neutral-500 leading-relaxed">Manage the headlines displayed on your portfolio landing page hero typing animation.</p>

          <div className="flex flex-col gap-2">
            <label className="block text-sm font-semibold mb-1 text-neutral-600 dark:text-neutral-400">Active Titles ({profile.typewriterTitles.length})</label>
            {profile.typewriterTitles.map((title, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-neutral-50 dark:bg-neutral-950/50 border border-neutral-200 dark:border-neutral-800 rounded-xl transition">
                {editingTitleIndex === idx ? (
                  <div className="flex-1 flex gap-2">
                    <input
                      value={editingTitleValue}
                      onChange={e => setEditingTitleValue(e.target.value)}
                      className="flex-1 px-3 py-1.5 border rounded-lg bg-transparent dark:border-neutral-700 focus:border-emerald-500 focus:outline-none text-sm transition"
                    />
                    <button
                      type="button"
                      onClick={handleSaveEditTypewriter}
                      className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                    >
                      <Check size={12} /> Save
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="text-sm font-semibold dark:text-neutral-100">{title}</span>
                    <div className="flex gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleStartEditTypewriter(idx)}
                        className="p-1.5 text-neutral-500 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg transition"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteTypewriter(idx)}
                        className="p-1.5 text-neutral-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Add New Title Input */}
          <div className="flex gap-2">
            <input
              placeholder="e.g. Next.js Developer."
              value={newTypewriter}
              onChange={e => setNewTypewriter(e.target.value)}
              className="flex-1 px-4 py-3 border rounded-xl bg-transparent border-neutral-300 dark:border-neutral-700 focus:border-emerald-500 focus:outline-none text-sm transition"
            />
            <button
              type="button"
              onClick={handleAddTypewriter}
              className="px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-xl flex items-center gap-1 transition cursor-pointer shrink-0"
            >
              <Plus size={16} /> Add
            </button>
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="w-full px-5 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition disabled:opacity-50 shadow-md shadow-emerald-500/10 cursor-pointer"
          >
            Save Typewriter Phrases
          </button>
        </div>

        {/* Card 2: SECURITY & 2FA */}
        <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col gap-6">
          <h2 className="text-xl font-bold flex items-center gap-2 border-b pb-3 dark:border-neutral-800 text-neutral-800 dark:text-neutral-100">
            🛡️ Security & 2FA
          </h2>
          {securityMessage && <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl font-medium border dark:border-emerald-950/30 w-full text-sm">{securityMessage}</div>}
          {securityError && <div className="p-4 bg-red-50 text-red-600 rounded-xl font-medium border dark:border-red-950/30 w-full text-sm">⚠️ {securityError}</div>}

          {/* 2FA Toggle Card */}
          <div className="flex flex-col gap-4 p-5 bg-neutral-50 dark:bg-neutral-950/50 rounded-2xl border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between gap-4">
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 shrink-0">
                  <Shield size={20} />
                </div>
                <h4 className="font-bold text-sm text-neutral-800 dark:text-neutral-200">Two-Factor Authentication</h4>
              </div>

              <label className="relative inline-flex items-center cursor-pointer select-none shrink-0">
                <input
                  type="checkbox"
                  checked={twoFactorEnabled}
                  onChange={handleToggle2FA}
                  disabled={securityLoading}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none dark:bg-neutral-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed border-t pt-3 dark:border-neutral-800">
              Sends secure OTP to <strong className="text-neutral-700 dark:text-neutral-300">developer.sandychaudhary@gmail.com</strong> on login.
            </p>
          </div>

          {/* Change Password Card */}
          <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 bg-neutral-50/20 dark:bg-neutral-950/10 flex flex-col gap-5">
            <div className="flex gap-3 items-center border-b pb-3 dark:border-neutral-800">
              <Lock size={18} className="text-neutral-500" />
              <h4 className="font-bold text-sm text-neutral-800 dark:text-neutral-200">Change Password</h4>
            </div>

            <p className="text-xs text-neutral-500 leading-relaxed">
              First click **Request OTP** to receive your change password code at <strong className="text-neutral-700 dark:text-neutral-300">developer.sandychaudhary@gmail.com</strong>.
            </p>

            <button
              type="button"
              onClick={handleRequestPasswordOtp}
              disabled={securityLoading}
              className="w-full px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-1.5 transition disabled:opacity-50 cursor-pointer shadow-sm shadow-emerald-500/10"
            >
              <Send size={14} /> {securityLoading ? 'Sending...' : 'Request Password OTP'}
            </button>

            <form onSubmit={handleChangePasswordSubmit} className="flex flex-col gap-4 mt-2">
              <div className="flex flex-col">
                <label className="block text-sm font-semibold mb-2 text-neutral-600 dark:text-neutral-400">6-Digit OTP Code</label>
                <input
                  type="text"
                  value={passwordForm.otp}
                  onChange={e => setPasswordForm({ ...passwordForm, otp: e.target.value })}
                  className="w-full px-4 py-3 border rounded-xl bg-transparent dark:border-neutral-700 focus:border-emerald-500 focus:outline-none text-center text-sm font-semibold transition"
                  placeholder="123456"
                  maxLength={6}
                  required
                  disabled={securityLoading}
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-sm font-semibold mb-2 text-neutral-600 dark:text-neutral-400">New Password</label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="w-full px-4 py-3 border rounded-xl bg-transparent dark:border-neutral-700 focus:border-emerald-500 focus:outline-none text-sm transition"
                  placeholder="••••••••"
                  required
                  disabled={securityLoading}
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-sm font-semibold mb-2 text-neutral-600 dark:text-neutral-400">Confirm Password</label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 border rounded-xl bg-transparent dark:border-neutral-700 focus:border-emerald-500 focus:outline-none text-sm transition"
                  placeholder="••••••••"
                  required
                  disabled={securityLoading}
                />
              </div>

              <button
                type="submit"
                disabled={securityLoading || !passwordForm.otp}
                className="w-full px-5 py-3.5 mt-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-1.5 transition disabled:opacity-50 cursor-pointer shadow-md shadow-emerald-500/10"
              >
                {securityLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Updating...
                  </>
                ) : (
                  'Verify & Update Password'
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
