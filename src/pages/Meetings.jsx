import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Video, 
  Phone, 
  Plus, 
  Edit, 
  Trash2,
  ExternalLink
} from 'lucide-react';

function MeetingCard({ meeting, isPast = false, onEdit, onDelete, onJoin }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Video Call':
        return <Video className="w-4 h-4" />;
      case 'Phone Call':
        return <Phone className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  // Format date and time from scheduled_at
  const dateObj = meeting.scheduled_at ? new Date(meeting.scheduled_at) : null;
  const date = dateObj ? dateObj.toLocaleDateString() : '';
  const time = dateObj ? dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

  return (
    <div className="card p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{meeting.title}</h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(meeting.status)}`}>
              {meeting.status}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {date}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {time}
            </div>
            <div className="flex items-center">
              {getTypeIcon(meeting.type)}
              <span className="ml-1">{meeting.type}</span>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <Users className="w-4 h-4 mr-1" />
            <span>{Array.isArray(meeting.participants) ? meeting.participants.join(', ') : meeting.participants}</span>
          </div>
          {meeting.location && (
            <div className="flex items-center text-sm text-gray-600 mb-3">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{meeting.location}</span>
            </div>
          )}
          {meeting.notes && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Notes:</strong> {meeting.notes}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {!isPast && meeting.status === 'scheduled' && (
            <button
              onClick={() => onJoin && onJoin(meeting)}
              className="btn-primary"
            >
              {meeting.type === 'Video Call' ? 'Join Video Call' : 'Join Meeting'}
            </button>
          )}
          {meeting.meetingLink && (
            <button className="btn-secondary">
              <ExternalLink className="w-4 h-4 mr-2" />
              Meeting Link
            </button>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {onEdit && (
            <button
              onClick={() => onEdit(meeting)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <Edit className="w-4 h-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(meeting.id)}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function NewMeetingModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    duration: '30',
    type: 'Video Call',
    participants: '',
    location: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
    setFormData({
      title: '',
      date: '',
      time: '',
      duration: '30',
      type: 'Video Call',
      participants: '',
      location: '',
      description: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Schedule New Meeting</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Title</label>
            <input
              type="text"
              className="input-field"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                className="input-field"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
              <input
                type="time"
                className="input-field"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <select
                className="input-field"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 hour</option>
                <option value="90">1.5 hours</option>
                <option value="120">2 hours</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                className="input-field"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option>Video Call</option>
                <option>Phone Call</option>
                <option>In-person</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Participants (comma-separated)</label>
            <input
              type="text"
              className="input-field"
              placeholder="john@example.com, jane@example.com"
              value={formData.participants}
              onChange={(e) => setFormData({...formData, participants: e.target.value})}
            />
          </div>
          {formData.type === 'In-person' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                className="input-field"
                placeholder="123 Main St, City, State"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              className="input-field"
              rows="3"
              placeholder="Meeting agenda or additional details..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <button type="submit" className="bg-emerald-400 hover:bg-slate-400 p-2 rounded-lg flex-1">
              Schedule Meeting
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Meetings() {
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);
  const [pastMeetings, setPastMeetings] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showNewMeetingModal, setShowNewMeetingModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data?.user?.id || null);
    });
  }, []);

  useEffect(() => {
    async function fetchMeetings() {
      setLoading(true);
      const { data, error } = await supabase
        .from("meetings")
        .select("*")
        .order("scheduled_at", { ascending: true });
      if (!error && data) {
        const now = new Date();
        setUpcomingMeetings(data.filter(m => new Date(m.scheduled_at) >= now));
        setPastMeetings(data.filter(m => new Date(m.scheduled_at) < now));
      }
      setLoading(false);
    }
    fetchMeetings();
  }, []);

  // Only show meetings where the user is the host
  const myUpcomingMeetings = userId
    ? upcomingMeetings.filter(m => m.host_id === userId)
    : [];
  const myPastMeetings = userId
    ? pastMeetings.filter(m => m.host_id === userId)
    : [];

  async function handleSaveNewMeeting(formData) {
    if (!userId) {
      alert("You must be logged in to schedule a meeting.");
      return;
    }
    const scheduled_at = new Date(`${formData.date}T${formData.time}`).toISOString();
    const { error } = await supabase.from("meetings").insert([
      {
        topic: formData.title, // use topic instead of title
        scheduled_at,
        duration_minutes: parseInt(formData.duration),
        host_id: userId,
        // job_id: ... (if you want to link to a job, add this)
        // created_at will be set automatically
      },
    ]);
    if (error) {
      alert("Error scheduling meeting: " + error.message);
      return;
    }
    // Refresh meetings list
    const { data } = await supabase
      .from("meetings")
      .select("*")
      .order("scheduled_at", { ascending: true });
    if (data) {
      const now = new Date();
      setUpcomingMeetings(data.filter((m) => new Date(m.scheduled_at) >= now));
      setPastMeetings(data.filter((m) => new Date(m.scheduled_at) < now));
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 mt-10">Meetings</h1>
          <p className="text-gray-600">Manage your interview and meeting schedule</p>
        </div>
      </div>
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'upcoming'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Upcoming ({myUpcomingMeetings.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'past'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Past ({myPastMeetings.length})
          </button>
        </nav>
      </div>
      {/* Meeting List */}
      <div className="space-y-6">
        {activeTab === 'upcoming' ? (
          myUpcomingMeetings.length > 0 ? (
            myUpcomingMeetings.map((meeting) => (
              <MeetingCard
                key={meeting.id}
                meeting={meeting}
                onJoin={() => navigate(`/meeting/${meeting.id}`)}
                onEdit={null}
                onDelete={null}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming meetings</h3>
              <p className="text-gray-600 mb-4">Schedule your first meeting to get started.</p>
              <button
                onClick={() => setShowNewMeetingModal(true)}
                className="bg-emerald-400 hover:bg-slate-400 p-2 rounded-lg "
              >
                Schedule Meeting
              </button>
            </div>
          )
        ) : (
          myPastMeetings.length > 0 ? (
            myPastMeetings.map((meeting) => (
              <MeetingCard
                key={meeting.id}
                meeting={meeting}
                isPast={true}
                onEdit={null}
                onDelete={null}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No past meetings</h3>
              <p className="text-gray-600">Your completed meetings will appear here.</p>
            </div>
          )
        )}
      </div>
      {/* New Meeting Modal */}
      <NewMeetingModal
        isOpen={showNewMeetingModal}
        onClose={() => setShowNewMeetingModal(false)}
        onSave={handleSaveNewMeeting}
      />
    </div>
  );
}

export default Meetings;