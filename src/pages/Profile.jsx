import { useState, useEffect } from 'react';
import {
  X, Plus, Trash2, Upload
} from 'lucide-react';
import supabase from '../supabaseClient';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState({
    name: '', title: '', email: '', phone: '',
    location: '', bio: '', avatar: '',
    skills: [], experience: [], education: []
  });

  const [editProfile, setEditProfile] = useState(profile);
  const [newSkill, setNewSkill] = useState('');
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  // Get authenticated user
  useEffect(() => {
    async function getUser() {
      const { data, error } = await supabase.auth.getUser();
      if (!error && data?.user) {
        setUser(data.user);
      }
      setLoading(false);
    }
    getUser();
  }, []);

  // Load profile from Supabase
  useEffect(() => {
    if (!user) return;
    async function loadProfile() {
      setLoading(true);
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      const loadedProfile = {
        name: data?.name || '',
        title: data?.title || '',
        email: data?.email || user.email || '',
        phone: data?.phone || '',
        location: data?.location || '',
        bio: data?.bio || '',
        avatar: data?.avatar || '',
        skills: data?.skills || [],
        experience: data?.experience || [],
        education: data?.education || [],
      };
      setProfile(loadedProfile);
      setEditProfile(loadedProfile);
      setLoading(false);
    }
    loadProfile();
  }, [user]);

  // Save or update profile
  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    const { name, title, phone, location, bio, avatar, skills, experience, education } = editProfile;

    const { error } = await supabase
      .from('profiles')
      .upsert([{
        id: user.id,
        name,
        title,
        email: user.email,
        phone,
        location,
        bio,
        avatar,
        skills,
        experience,
        education,
        updated_at: new Date()
      }], { onConflict: 'id' });

    if (!error) {
      setProfile(editProfile);
    } else {
      console.error('Error saving profile:', error);
    }
    setSaving(false);
  };

  // Upload avatar
  const handleAvatarUpload = async (file) => {
    if (!user) return;
    const { error } = await supabase.storage
      .from('avatars')
      .upload(`${user.id}/${file.name}`, file, { upsert: true });

    if (!error) {
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(`${user.id}/${file.name}`);
      const publicUrl = urlData.publicUrl;
      setEditProfile(prev => ({ ...prev, avatar: publicUrl }));
    }
  };

  // Skills handling
  const handleAddSkill = () => {
    if (newSkill.trim() && !editProfile.skills.includes(newSkill.trim())) {
      setEditProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
      setIsAddingSkill(false);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setEditProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  // Experience handling
  const handleAddExperience = () => {
    const newExp = {
      title: 'New Title',
      company: 'Company Name',
      duration: 'Jan 2020 - Dec 2020',
      description: 'Job description here'
    };
    setEditProfile(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const handleRemoveExperience = (expToRemove) => {
    setEditProfile(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp !== expToRemove)
    }));
  };

  // Education handling
  const handleAddEducation = () => {
    const newEdu = {
      degree: 'Bachelor of Something',
      institution: 'University Name',
      year: '2020',
      description: 'Details about your education'
    };
    setEditProfile(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const handleRemoveEducation = (eduToRemove) => {
    setEditProfile(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu !== eduToRemove)
    }));
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {/* Profile Info */}
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-xl font-bold mb-4">Profile Info</h1>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative">
            <img
              src={editProfile.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(editProfile.name || 'User')}`}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover"
            />
            <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer">
              <Upload className="w-4 h-4" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => handleAvatarUpload(e.target.files[0])}
              />
            </label>
          </div>
          <div className="flex-1 grid gap-4 w-full">
            {['name', 'title', 'phone', 'location'].map(field => (
              <input
                key={field}
                type="text"
                placeholder={field}
                className="input-field"
                value={editProfile[field]}
                onChange={e => setEditProfile(prev => ({ ...prev, [field]: e.target.value }))}
              />
            ))}
            <input
              type="email"
              value={editProfile.email}
              readOnly
              className="input-field bg-gray-100"
            />
            <textarea
              rows={3}
              placeholder="Bio"
              value={editProfile.bio}
              onChange={e => setEditProfile(prev => ({ ...prev, bio: e.target.value }))}
              className="input-field"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSaveProfile}
            disabled={saving}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {editProfile.skills.map(skill => (
            <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
              {skill}
              <X className="w-4 h-4 ml-2 cursor-pointer" onClick={() => handleRemoveSkill(skill)} />
            </span>
          ))}
          {isAddingSkill && (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                className="input-field"
              />
              <button onClick={handleAddSkill} className="text-white bg-blue-600 p-1 rounded">
                <Plus className="w-4 h-4" />
              </button>
              <button onClick={() => setIsAddingSkill(false)} className="text-gray-400 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        {!isAddingSkill && (
          <button
            onClick={() => setIsAddingSkill(true)}
            className="mt-2 text-sm bg-blue-600 text-white px-3 py-1 rounded"
          >
            <Plus className="w-4 h-4 inline mr-1" /> Add Skill
          </button>
        )}
      </div>

      {/* Experience */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-2">Experience</h2>
        {editProfile.experience.length === 0 && <p className="text-gray-500">No experience added.</p>}
        {editProfile.experience.map((exp, idx) => (
          <div key={idx} className="border p-3 rounded flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold">{exp.title}</h3>
              <p className="text-blue-600">{exp.company}</p>
              <p className="text-sm">{exp.duration}</p>
              <p>{exp.description}</p>
            </div>
            <button onClick={() => handleRemoveExperience(exp)} className="text-red-500">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button onClick={handleAddExperience} className="mt-2 text-sm bg-blue-600 text-white px-3 py-1 rounded">
          <Plus className="w-4 h-4 inline mr-1" /> Add Experience
        </button>
      </div>

      {/* Education */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-2">Education</h2>
        {editProfile.education.length === 0 && <p className="text-gray-500">No education added.</p>}
        {editProfile.education.map((edu, idx) => (
          <div key={idx} className="border p-3 rounded flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold">{edu.degree}</h3>
              <p className="text-blue-600">{edu.institution}</p>
              <p className="text-sm">{edu.year}</p>
              <p>{edu.description}</p>
            </div>
            <button onClick={() => handleRemoveEducation(edu)} className="text-red-500">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button onClick={handleAddEducation} className="mt-2 text-sm bg-blue-600 text-white px-3 py-1 rounded">
          <Plus className="w-4 h-4 inline mr-1" /> Add Education
        </button>
      </div>
    </div>
  );
}

export default Profile;
