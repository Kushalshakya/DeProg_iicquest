import { useState, useEffect } from "react";
import { X, Plus, Trash2, Edit, Check } from "lucide-react";
import supabase from "../supabaseClient";
import { Upload } from "lucide-react";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [editingEduIdx, setEditingEduIdx] = useState(null);
  const [eduDraft, setEduDraft] = useState({
    degree: "",
    institution: "",
    year: "",
    description: "",
  });

  const [profile, setProfile] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    avatar: "",
    skills: [],
    experience: [],
    education: [],
  });

  const [editProfile, setEditProfile] = useState(profile);
  const [newSkill, setNewSkill] = useState("");
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
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      const loadedProfile = {
        name: data?.name || "",
        title: data?.title || "",
        email: data?.email || user.email || "",
        phone: data?.phone || "",
        location: data?.location || "",
        bio: data?.bio || "",
        avatar: data?.avatar || "",
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
    const {
      name,
      title,
      phone,
      location,
      bio,
      avatar,
      skills,
      experience,
      education,
    } = editProfile;

    const { error } = await supabase.from("profiles").upsert(
      [
        {
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
          updated_at: new Date(),
        },
      ],
      { onConflict: "id" }
    );

    if (!error) {
      setProfile(editProfile);
    } else {
      console.error("Error saving profile:", error);
    }
    setSaving(false);
  };

  // Upload avatar
  const handleAvatarUpload = async (file) => {
    if (!user) return;
    const { error } = await supabase.storage
      .from("avatars")
      .upload(`${user.id}/${file.name}`, file, { upsert: true });

    if (!error) {
      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(`${user.id}/${file.name}`);
      const publicUrl = urlData.publicUrl;
      setEditProfile((prev) => ({ ...prev, avatar: publicUrl }));
    }
  };

  // Skills handling
  const handleAddSkill = () => {
    if (newSkill.trim() && !editProfile.skills.includes(newSkill.trim())) {
      setEditProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
      setIsAddingSkill(false);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setEditProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  // Experience handling
  const handleAddExperience = () => {
    const newExp = {
      title: "New Title",
      company: "Company Name",
      duration: "Jan 2020 - Dec 2020",
      description: "Job description here",
    };
    setEditProfile((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }));
  };

  const handleRemoveExperience = (expToRemove) => {
    setEditProfile((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp !== expToRemove),
    }));
  };

  // Education handling
  const handleAddEducation = () => {
    const newEdu = {
      degree: "Bachelor of Something",
      institution: "University Name",
      year: "2020",
      description: "Details about your education",
    };
    setEditProfile((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }));
  };

  const handleRemoveEducation = (eduToRemove) => {
    setEditProfile((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu !== eduToRemove),
    }));
  };

  // Save edited education entry
  const handleSaveEducationEdit = () => {
    setEditProfile((prev) => ({
      ...prev,
      education: prev.education.map((edu, idx) =>
        idx === editingEduIdx ? eduDraft : edu
      ),
    }));
    setEditingEduIdx(null);
    setEduDraft({
      degree: "",
      institution: "",
      year: "",
      description: "",
    });
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="mx-auto p-4 space-y-8">
      {/* Profile Info */}
      <div className="bg-white shadow rounded-2xl p-8 md:px-20 space-y-8">
        <h1 className="text-2xl font-bold text-gray-800">Edit Profile</h1>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          {/* Avatar Section */}
          <div className="relative w-32 h-32 mx-auto md:mx-0">
            <img
              src={
                editProfile.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  editProfile.name || "User"
                )}`
              }
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
            />
            <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer shadow-md">
              <Upload className="w-4 h-4" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleAvatarUpload(e.target.files[0])}
              />
            </label>
          </div>

          {/* Form Section */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {["name", "title", "phone", "location"].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field[0].toUpperCase() + field.slice(1)}
                className="input-field px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editProfile[field]}
                onChange={(e) =>
                  setEditProfile((prev) => ({
                    ...prev,
                    [field]: e.target.value,
                  }))
                }
              />
            ))}

            <input
              type="email"
              value={editProfile.email}
              readOnly
              className="col-span-1 md:col-span-2 px-4 py-3 bg-gray-100 text-gray-600 border border-gray-300 rounded-lg cursor-not-allowed"
            />

            <textarea
              rows={4}
              placeholder="Bio"
              value={editProfile.bio}
              onChange={(e) =>
                setEditProfile((prev) => ({ ...prev, bio: e.target.value }))
              }
              className="col-span-1 md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSaveProfile}
            disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white shadow rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Skills</h2>

        {/* Skills List */}
        <div className="flex flex-wrap gap-2">
          {editProfile.skills.map((skill) => (
            <span
              key={skill}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center text-sm"
            >
              {skill}
              <X
                className="w-4 h-4 ml-2 cursor-pointer hover:text-red-500"
                onClick={() => handleRemoveSkill(skill)}
              />
            </span>
          ))}

          {/* Skill Input Field */}
          {isAddingSkill && (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Enter skill"
                className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                onClick={handleAddSkill}
                className="bg-blue-600 text-white p-1.5 rounded hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsAddingSkill(false)}
                className="p-1.5 text-gray-500 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Add Skill Button */}
        {!isAddingSkill && (
          <button
            onClick={() => setIsAddingSkill(true)}
            className="flex items-center text-sm text-white bg-blue-600 px-3 py-1.5 rounded hover:bg-blue-700 transition"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Skill
          </button>
        )}
      </div>

      {/* Education */}
      <div className="bg-white shadow rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Education</h2>

        {editProfile.education.length === 0 && (
          <p className="text-gray-500">No education added.</p>
        )}

        {editProfile.education.map((edu, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-lg p-4 flex justify-between items-start gap-4"
          >
            {editingEduIdx === idx ? (
              <div className="space-y-1 flex-1">
                <input
                  type="text"
                  className="input-field mb-1"
                  value={eduDraft.degree}
                  onChange={(e) =>
                    setEduDraft((draft) => ({ ...draft, degree: e.target.value }))
                  }
                  placeholder="Degree"
                />
                <input
                  type="text"
                  className="input-field mb-1"
                  value={eduDraft.institution}
                  onChange={(e) =>
                    setEduDraft((draft) => ({ ...draft, institution: e.target.value }))
                  }
                  placeholder="Institution"
                />
                <input
                  type="text"
                  className="input-field mb-1"
                  value={eduDraft.year}
                  onChange={(e) =>
                    setEduDraft((draft) => ({ ...draft, year: e.target.value }))
                  }
                  placeholder="Year"
                />
                <input
                  type="text"
                  className="input-field"
                  value={eduDraft.description}
                  onChange={(e) =>
                    setEduDraft((draft) => ({ ...draft, description: e.target.value }))
                  }
                  placeholder="Description"
                />
              </div>
            ) : (
              <div className="space-y-1 flex-1">
                <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-blue-600 font-medium">{edu.institution}</p>
                <p className="text-sm text-gray-500">{edu.year}</p>
                <p className="text-gray-700 text-sm">{edu.description}</p>
              </div>
            )}
            <div className="flex flex-col gap-2">
              {editingEduIdx === idx ? (
                <>
                  <button
                    onClick={handleSaveEducationEdit}
                    className="text-green-600 hover:text-green-800"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setEditingEduIdx(null);
                      setEduDraft({
                        degree: "",
                        institution: "",
                        year: "",
                        description: "",
                      });
                    }}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditingEduIdx(idx);
                      setEduDraft({ ...edu });
                    }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleRemoveEducation(edu)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}

        <button
          onClick={handleAddEducation}
          className="flex items-center text-sm bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Education
        </button>
      </div>

      {/* Experience */}
      <div className="bg-white shadow rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Experience</h2>

        {editProfile.experience.length === 0 && (
          <p className="text-gray-500">No experience added.</p>
        )}

        {editProfile.experience.map((exp, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-lg p-4 flex justify-between items-start gap-4"
          >
            <div className="space-y-1">
              <h3 className="font-semibold text-gray-900">{exp.title}</h3>
              <p className="text-blue-600 font-medium">{exp.company}</p>
              <p className="text-sm text-gray-500">{exp.duration}</p>
              <p className="text-gray-700 text-sm">{exp.description}</p>
            </div>
            <button
              onClick={() => handleRemoveExperience(exp)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}

        <button
          onClick={handleAddExperience}
          className="flex items-center text-sm bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Experience
        </button>
      </div>
    </div>
  );
}

export default Profile;
