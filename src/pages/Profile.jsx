import { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit, 
  Save, 
  X, 
  Plus, 
  Trash2,
  Briefcase,
  GraduationCap,
  Award,
  Download,
  Upload
} from 'lucide-react';
import { userProfile } from './mockData';

function EditableField({ label, value, onSave, type = 'text', multiline = false }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      {isEditing ? (
        <div className="flex items-center space-x-2">
          {multiline ? (
            <textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="input-field flex-1"
              rows="3"
            />
          ) : (
            <input
              type={type}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="input-field flex-1"
            />
          )}
          <button
            onClick={handleSave}
            className="p-2 text-green-600 hover:text-green-700 transition-colors duration-200"
          >
            <Save className="w-4 h-4" />
          </button>
          <button
            onClick={handleCancel}
            className="p-2 text-gray-600 hover:text-gray-700 transition-colors duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <span className="text-gray-900">{value}</span>
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function SkillTag({ skill, onRemove, editable = false }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
      {skill}
      {editable && (
        <button
          onClick={() => onRemove(skill)}
          className="ml-2 text-primary-600 hover:text-primary-800 transition-colors duration-200"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
}

function ExperienceCard({ experience, onEdit, onDelete, editable = false }) {
  return (
    <div className="card p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{experience.title}</h3>
          <p className="text-primary-600 font-medium">{experience.company}</p>
          <p className="text-sm text-gray-600 mb-2">{experience.duration}</p>
          <p className="text-gray-700">{experience.description}</p>
        </div>
        {editable && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEdit(experience)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(experience)}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Profile() {
  const [profile, setProfile] = useState(userProfile);
  const [newSkill, setNewSkill] = useState('');
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  const handleProfileUpdate = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
      setIsAddingSkill(false);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">Manage your professional profile and personal information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <div className="card p-6 text-center">
            <div className="relative inline-block mb-4">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <button className="absolute bottom-0 right-0 p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors duration-200">
                <Upload className="w-4 h-4" />
              </button>
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-1">{profile.name}</h2>
            <p className="text-gray-600 mb-4">{profile.title}</p>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-center">
                <Mail className="w-4 h-4 mr-2" />
                {profile.email}
              </div>
              <div className="flex items-center justify-center">
                <Phone className="w-4 h-4 mr-2" />
                {profile.phone}
              </div>
              <div className="flex items-center justify-center">
                <MapPin className="w-4 h-4 mr-2" />
                {profile.location}
              </div>
            </div>
            
            <div className="flex space-x-2 mt-6">
              <button className="btn-primary flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </button>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EditableField
                label="Full Name"
                value={profile.name}
                onSave={(value) => handleProfileUpdate('name', value)}
              />
              <EditableField
                label="Job Title"
                value={profile.title}
                onSave={(value) => handleProfileUpdate('title', value)}
              />
              <EditableField
                label="Email"
                value={profile.email}
                type="email"
                onSave={(value) => handleProfileUpdate('email', value)}
              />
              <EditableField
                label="Phone"
                value={profile.phone}
                type="tel"
                onSave={(value) => handleProfileUpdate('phone', value)}
              />
            </div>
            
            <EditableField
              label="Location"
              value={profile.location}
              onSave={(value) => handleProfileUpdate('location', value)}
            />
            
            <EditableField
              label="Bio"
              value={profile.bio}
              multiline={true}
              onSave={(value) => handleProfileUpdate('bio', value)}
            />
          </div>

          {/* Skills */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
              <button
                onClick={() => setIsAddingSkill(true)}
                className="btn-secondary"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Skill
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.skills.map((skill, index) => (
                <SkillTag
                  key={index}
                  skill={skill}
                  editable={true}
                  onRemove={handleRemoveSkill}
                />
              ))}
            </div>
            
            {isAddingSkill && (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Enter skill name"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="input-field flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                />
                <button
                  onClick={handleAddSkill}
                  className="btn-primary"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setIsAddingSkill(false);
                    setNewSkill('');
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Experience */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Experience</h3>
              <button className="btn-secondary">
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </button>
            </div>
            
            <div className="space-y-4">
              {profile.experience.map((exp, index) => (
                <ExperienceCard
                  key={index}
                  experience={exp}
                  editable={true}
                  onEdit={(exp) => console.log('Edit experience:', exp)}
                  onDelete={(exp) => console.log('Delete experience:', exp)}
                />
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Education</h3>
              <button className="btn-secondary">
                <Plus className="w-4 h-4 mr-2" />
                Add Education
              </button>
            </div>
            
            <div className="space-y-4">
              {profile.education.map((edu, index) => (
                <div key={index} className="card p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <GraduationCap className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                        <p className="text-primary-600 font-medium">{edu.institution}</p>
                        <p className="text-sm text-gray-600">{edu.year}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;