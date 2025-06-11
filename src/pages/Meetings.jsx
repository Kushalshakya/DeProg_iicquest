import { useState } from 'react';
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
  CheckCircle,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { upcomingMeetings, pastMeetings } from './mockData';

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
              {meeting.date}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {meeting.time}
            </div>
            <div className="flex items-center">
              {getTypeIcon(meeting.type)}
              <span className="ml-1">{meeting.type}</span>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <Users className="w-4 h-4 mr-1" />
            <span>{meeting.participants.join(', ')}</span>
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
              onClick={() => onJoin(meeting)}
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
          <button
            onClick={() => onEdit(meeting)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(meeting.id)}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
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
    duration: '30 minutes',
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
      duration: '30 minutes',
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
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>45 minutes</option>
                <option>1 hour</option>
                <option>1.5 hours</option>
                <option>2 hours</option>
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
            <button type="submit" className="btn-primary flex-1">
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
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showNewMeetingModal, setShowNewMeetingModal] = useState(false);

  const handleJoinMeeting = (meeting) => {
    console.log('Joining meeting:', meeting);
    // This would typically redirect to the video conference page
  };

  const handleEditMeeting = (meeting) => {
    console.log('Editing meeting:', meeting);
    // This would open an edit modal
  };

  const handleDeleteMeeting = (meetingId) => {
    console.log('Deleting meeting:', meetingId);
    // This would show a confirmation dialog and delete the meeting
  };

  const handleSaveNewMeeting = (meetingData) => {
    console.log('Saving new meeting:', meetingData);
    // This would save the meeting to the backend
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meetings</h1>
          <p className="text-gray-600">Manage your interview and meeting schedule</p>
        </div>
        <button
          onClick={() => setShowNewMeetingModal(true)}
          className="btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Schedule Meeting
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">This Week</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-green-600 mt-1">2 completed</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Next Meeting</p>
              <p className="text-lg font-bold text-gray-900">Tomorrow</p>
              <p className="text-sm text-gray-600 mt-1">10:00 AM</p>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">85%</p>
              <p className="text-sm text-green-600 mt-1">+5% this month</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-full">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
          </div>
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
            Upcoming ({upcomingMeetings.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'past'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Past ({pastMeetings.length})
          </button>
        </nav>
      </div>

      {/* Meeting List */}
      <div className="space-y-6">
        {activeTab === 'upcoming' ? (
          upcomingMeetings.length > 0 ? (
            upcomingMeetings.map((meeting) => (
              <MeetingCard
                key={meeting.id}
                meeting={meeting}
                onJoin={handleJoinMeeting}
                onEdit={handleEditMeeting}
                onDelete={handleDeleteMeeting}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming meetings</h3>
              <p className="text-gray-600 mb-4">Schedule your first meeting to get started.</p>
              <button
                onClick={() => setShowNewMeetingModal(true)}
                className="btn-primary"
              >
                Schedule Meeting
              </button>
            </div>
          )
        ) : (
          pastMeetings.length > 0 ? (
            pastMeetings.map((meeting) => (
              <MeetingCard
                key={meeting.id}
                meeting={meeting}
                isPast={true}
                onEdit={handleEditMeeting}
                onDelete={handleDeleteMeeting}
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