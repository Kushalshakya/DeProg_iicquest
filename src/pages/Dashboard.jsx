import { 
  Briefcase, 
  Calendar, 
  Users,
  TrendingUp,
  Clock
} from 'lucide-react';
import { userStats, upcomingMeetings } from './mockData';

function StatCard({ icon: Icon, title, value, change, changeType }) {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm mt-2 flex items-center ${
              changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendingUp className="w-4 h-4 mr-1" />
              {change}
            </p>
          )}
        </div>
        <div className="p-3 bg-primary-50 rounded-full">
          <Icon className="w-6 h-6 text-primary-600" />
        </div>
      </div>
    </div>
  );
}

function UpcomingMeetingCard({ meeting }) {
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{meeting.title}</h3>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          meeting.type === 'Video Call' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-purple-100 text-purple-800'
        }`}>
          {meeting.type}
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
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-1 text-gray-400" />
          <span className="text-sm text-gray-600">
            {meeting.participants.length} participant{meeting.participants.length > 1 ? 's' : ''}
          </span>
        </div>
        <button className="btn-primary text-sm">
          Join Meeting
        </button>
      </div>
    </div>
  );
}

function Dashboard() {
  const stats = [
    {
      icon: Briefcase,
      title: "Applied Jobs",
      value: userStats.appliedJobs,
    },
    {
      icon: Calendar,
      title: "Interviews Scheduled",
      value: userStats.interviewsScheduled,
    },
    {
      icon: Users,
      title: "Upcoming Meetings",
      value: userStats.upcomingMeetings,
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Alex!</h1>
        <p className="text-gray-600">Here's what's happening with your job search today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-8">
  {/* Upcoming Meetings */}
  <div>
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold text-gray-900">Upcoming Meetings</h2>
      <button className="text-primary-600 hover:text-primary-700 font-medium">
        View All
      </button>
    </div>

    {/* Two cards per row */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {upcomingMeetings.slice(0, 3).map((meeting) => (
        <UpcomingMeetingCard key={meeting.id} meeting={meeting} />
      ))}
    </div>
  </div>
</div>

    </div>
  );
}

export default Dashboard;