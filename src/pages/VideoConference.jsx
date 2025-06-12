import { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Monitor, 
  Phone, 
  Users, 
  MessageSquare, 
  Settings,
  Calendar,
  Clock,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { upcomingMeetings } from './mockData';
import MeetingStart from './MeetingStart';

function VideoControls({ isVideoOn, isAudioOn, onToggleVideo, onToggleAudio, onEndCall }) {
  return (
    <div className="flex items-center justify-center space-x-4 p-4 bg-gray-900 rounded-lg">
      <button
        onClick={onToggleVideo}
        className={`p-3 rounded-full transition-colors duration-200 ${
          isVideoOn 
            ? 'bg-gray-700 hover:bg-gray-600 text-white' 
            : 'bg-red-600 hover:bg-red-700 text-white'
        }`}
      >
        {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
      </button>
      
      <button
        onClick={onToggleAudio}
        className={`p-3 rounded-full transition-colors duration-200 ${
          isAudioOn 
            ? 'bg-gray-700 hover:bg-gray-600 text-white' 
            : 'bg-red-600 hover:bg-red-700 text-white'
        }`}
      >
        {isAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
      </button>
      
      <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-200">
        <Monitor className="w-5 h-5" />
      </button>
      
      <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-200">
        <MessageSquare className="w-5 h-5" />
      </button>
      
      <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-200">
        <Users className="w-5 h-5" />
      </button>
      
      <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-200">
        <Settings className="w-5 h-5" />
      </button>
      
      <button
        onClick={onEndCall}
        className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors duration-200"
      >
        <Phone className="w-5 h-5 transform rotate-135" />
      </button>
    </div>
  );
}

function ParticipantVideo({ name, isCurrentUser = false, isVideoOn = true }) {
  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
      {isVideoOn ? (
        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-900">
              {name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        </div>
      ) : (
        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
          <VideoOff className="w-12 h-12 text-gray-400" />
        </div>
      )}
      
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
        <span className="text-white font-medium text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
          {name} {isCurrentUser && '(You)'}
        </span>
        <div className="flex items-center space-x-2">
          {!isVideoOn && (
            <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
              <VideoOff className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MeetingCard({ meeting, onJoin }) {
  const isToday = meeting.date === '2024-01-15';
  const isUpcoming = new Date(meeting.date) > new Date();

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{meeting.title}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {meeting.date}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {meeting.time}
            </div>
            <span className="text-gray-400">•</span>
            <span>{meeting.duration}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-1" />
            {meeting.participants.join(', ')}
          </div>
        </div>
        
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          meeting.type === 'Video Call' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-purple-100 text-purple-800'
        }`}>
          {meeting.type}
        </span>
      </div>
      
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onJoin(meeting)}
          className={`btn-primary ${!isUpcoming ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!isUpcoming}
        >
          {isToday ? 'Join Now' : 'Join Meeting'}
        </button>
      </div>
    </div>
  );
}

function VideoConference() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [jobApplications, setJobApplications] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [activeView, setActiveView] = useState('upcoming'); // 'upcoming' or 'active'
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [activeMeeting, setActiveMeeting] = useState(null);

  useEffect(() => {
    // Get logged-in user
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data?.user?.id || null);
    });
  }, []);

  useEffect(() => {
    if (!userId) return;
    // Fetch job applications where user is applicant
    supabase
      .from('job_applications')
      .select('*, job:jobs(*), meeting:meetings(*)')
      .eq('applicant_id', userId)
      .then(({ data }) => setJobApplications(data || []));
    // Fetch meetings where user is creator
    supabase
      .from('meetings')
      .select('*')
      .eq('created_by', userId)
      .then(({ data }) => setMeetings(data || []));
  }, [userId]);

  const handleJoinMeeting = (meeting) => {
    setActiveMeeting(meeting);
    setActiveView('active');
  };

  const handleEndCall = () => {
    setActiveMeeting(null);
    setActiveView('upcoming');
  };

  // Render job applications with Join Meeting
  const appliedMeetings = jobApplications
    .filter(app => app.meeting) // Only those with a meeting scheduled
    .map(app => ({
      ...app.meeting,
      jobTitle: app.job?.job_title,
      isCreator: false,
    }));

  // Render meetings created by user with Start Meeting
  const createdMeetings = meetings.map(meeting => ({
    ...meeting,
    isCreator: true,
  }));

  // Combine and sort by date
  const allMeetings = [...appliedMeetings, ...createdMeetings].sort(
    (a, b) => new Date(a.scheduled_at) - new Date(b.scheduled_at)
  );

  if (activeView === 'active' && activeMeeting) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{activeMeeting.title}</h1>
            <p className="text-gray-600">
              {activeMeeting.participants.length + 1} participant{activeMeeting.participants.length > 0 ? 's' : ''}
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>45:23</span>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ParticipantVideo name="You" isCurrentUser={true} isVideoOn={isVideoOn} />
          {activeMeeting.participants.map((participant, index) => (
            <ParticipantVideo 
              key={index} 
              name={participant} 
              isVideoOn={index === 0} 
            />
          ))}
        </div>

        {/* Controls */}
        <VideoControls
          isVideoOn={isVideoOn}
          isAudioOn={isAudioOn}
          onToggleVideo={() => setIsVideoOn(!isVideoOn)}
          onToggleAudio={() => setIsAudioOn(!isAudioOn)}
          onEndCall={handleEndCall}
        />

        {/* Meeting Info */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Meeting Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Meeting ID:</span>
              <p className="text-gray-600">123-456-789</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Duration:</span>
              <p className="text-gray-600">{activeMeeting.duration}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Recording:</span>
              <p className="text-gray-600">Not started</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2 mt-10">Video Conference</h1>
        <p className="text-gray-600">Join virtual meetings and interviews</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Video className="w-6 h-6 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Instant Meeting</h3>
          <p className="text-gray-600 mb-4">Start a meeting right now</p>
          <button
            className="btn-primary w-full"
            onClick={() => {
              // Generate a unique room ID (could use uuid or Date.now())
              const roomId = Date.now().toString();
              navigate(`/meeting/${roomId}`);
            }}
          >
            Start Meeting
          </button>
        </div>

        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Schedule Meeting</h3>
          <p className="text-gray-600 mb-4">Plan a meeting for later</p>
          <button className="btn-secondary w-full">Schedule</button>
        </div>

        
      </div>

      {/* Upcoming Meetings */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Video Meetings</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {upcomingMeetings
            .filter(meeting => meeting.type === 'Video Call')
            .map((meeting) => (
              <MeetingCard 
                key={meeting.id} 
                meeting={meeting} 
                onJoin={handleJoinMeeting}
              />
            ))}
        </div>
      </div>

      {/* Recent Meetings */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Meetings</h2>
        <div className="card">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">Initial Screening - InnovateLab</h3>
                <p className="text-sm text-gray-600">January 10, 2024 • 9:00 AM • 30 minutes</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="btn-secondary text-sm">Completed</button>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">HR Interview - GrowthCo</h3>
                <p className="text-sm text-gray-600">January 8, 2024 • 3:00 PM • 45 minutes</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="btn-secondary text-sm">Not Attended</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Your Meetings</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {allMeetings.length === 0 && (
            <div className="text-gray-500">No meetings scheduled.</div>
          )}
          {allMeetings.map(meeting => (
            <div key={meeting.id} className="card p-6 flex flex-col gap-2">
              <div className="font-semibold">{meeting.title || meeting.jobTitle}</div>
              <div className="text-sm text-gray-600">
                {meeting.scheduled_at && new Date(meeting.scheduled_at).toLocaleString()}
              </div>
              <button
                className="btn-primary"
                onClick={() => navigate(`/meeting/${meeting.id}`)}
              >
                {meeting.isCreator ? "Start Meeting" : "Join Meeting"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideoConference;