export const userStats = {
  appliedJobs: 12,
  interviewsScheduled: 3,
  upcomingMeetings: 2,
  profileViews: 45,
  savedJobs: 8,
  messagesUnread: 5
};

export const recentJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    posted: "2 days ago",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center",
    applied: true
  },
  {
    id: 2,
    title: "UX Designer",
    company: "Design Studio",
    location: "New York, NY",
    type: "Full-time",
    salary: "$90,000 - $110,000",
    posted: "3 days ago",
    logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=64&h=64&fit=crop&crop=center",
    applied: false
  },
  {
    id: 3,
    title: "Product Manager",
    company: "StartupXYZ",
    location: "Austin, TX",
    type: "Remote",
    salary: "$100,000 - $130,000",
    posted: "1 week ago",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=64&h=64&fit=crop&crop=center",
    applied: false
  }
];

export const jobListings = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "Senior",
    category: "Technology",
    salary: "$120,000 - $150,000",
    posted: "2 days ago",
    description: "We're looking for a senior frontend developer to join our team and help build the next generation of web applications.",
    requirements: ["5+ years React experience", "TypeScript", "Node.js", "GraphQL"],
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center",
    applied: true
  },
  {
    id: 2,
    title: "UX Designer",
    company: "Design Studio",
    location: "New York, NY",
    type: "Full-time",
    experience: "Mid-level",
    category: "Design",
    salary: "$90,000 - $110,000",
    posted: "3 days ago",
    description: "Create intuitive and beautiful user experiences for our growing suite of products.",
    requirements: ["Figma", "User Research", "Prototyping", "Design Systems"],
    logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=64&h=64&fit=crop&crop=center",
    applied: false
  },
  {
    id: 3,
    title: "Product Manager",
    company: "StartupXYZ",
    location: "Austin, TX",
    type: "Remote",
    experience: "Mid-level",
    category: "Product",
    salary: "$100,000 - $130,000",
    posted: "1 week ago",
    description: "Lead product strategy and work with engineering teams to deliver exceptional user experiences.",
    requirements: ["Product Strategy", "Agile", "Data Analysis", "Leadership"],
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=64&h=64&fit=crop&crop=center",
    applied: false
  },
  {
    id: 4,
    title: "Full Stack Developer",
    company: "InnovateLab",
    location: "Seattle, WA",
    type: "Full-time",
    experience: "Mid-level",
    category: "Technology",
    salary: "$95,000 - $125,000",
    posted: "5 days ago",
    description: "Build scalable web applications using modern technologies and best practices.",
    requirements: ["React", "Node.js", "PostgreSQL", "AWS"],
    logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=64&h=64&fit=crop&crop=center",
    applied: false
  },
  {
    id: 5,
    title: "Marketing Manager",
    company: "GrowthCo",
    location: "Los Angeles, CA",
    type: "Full-time",
    experience: "Senior",
    category: "Marketing",
    salary: "$85,000 - $105,000",
    posted: "1 week ago",
    description: "Drive marketing strategy and execution to accelerate company growth.",
    requirements: ["Digital Marketing", "Analytics", "Campaign Management", "Team Leadership"],
    logo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=64&h=64&fit=crop&crop=center",
    applied: false
  },
  {
    id: 6,
    title: "Data Scientist",
    company: "DataTech Solutions",
    location: "Chicago, IL",
    type: "Remote",
    experience: "Senior",
    category: "Data Science",
    salary: "$130,000 - $160,000",
    posted: "3 days ago",
    description: "Analyze complex datasets and build machine learning models to drive business insights.",
    requirements: ["Python", "Machine Learning", "SQL", "Statistical Analysis"],
    logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=64&h=64&fit=crop&crop=center",
    applied: false
  }
];

export const upcomingMeetings = [
  {
    id: 1,
    title: "Technical Interview - TechCorp",
    date: "2024-01-15",
    time: "10:00 AM",
    duration: "1 hour",
    type: "Video Call",
    participants: ["John Smith", "Sarah Johnson"],
    status: "scheduled",
    meetingLink: "https://meet.google.com/abc-defg-hij"
  },
  {
    id: 2,
    title: "Portfolio Review - Design Studio",
    date: "2024-01-16",
    time: "2:30 PM",
    duration: "45 minutes",
    type: "Video Call",
    participants: ["Michael Brown"],
    status: "scheduled",
    meetingLink: "https://zoom.us/j/123456789"
  },
  {
    id: 3,
    title: "Final Round - StartupXYZ",
    date: "2024-01-18",
    time: "11:00 AM",
    duration: "2 hours",
    type: "In-person",
    participants: ["Lisa Chen", "David Wilson", "Emma Davis"],
    status: "scheduled",
    location: "123 Main St, Austin, TX"
  }
];

export const pastMeetings = [
  {
    id: 4,
    title: "Initial Screening - InnovateLab",
    date: "2024-01-10",
    time: "9:00 AM",
    duration: "30 minutes",
    type: "Video Call",
    participants: ["Alex Rodriguez"],
    status: "completed",
    notes: "Great conversation about technical background and experience."
  },
  {
    id: 5,
    title: "HR Interview - GrowthCo",
    date: "2024-01-08",
    time: "3:00 PM",
    duration: "45 minutes",
    type: "Phone Call",
    participants: ["Jennifer Taylor"],
    status: "completed",
    notes: "Discussed company culture and role expectations."
  }
];

export const userProfile = {
  name: "Alex Johnson",
  title: "Senior Frontend Developer",
  email: "alex.johnson@email.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face",
  bio: "Passionate frontend developer with 6+ years of experience building scalable web applications. Expertise in React, TypeScript, and modern web technologies.",
  skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS", "Docker", "Jest", "Cypress"],
  experience: [
    {
      company: "Current Company",
      title: "Senior Frontend Developer",
      duration: "2022 - Present",
      description: "Leading frontend development initiatives and mentoring junior developers."
    },
    {
      company: "Previous Company",
      title: "Frontend Developer",
      duration: "2019 - 2022",
      description: "Developed and maintained React applications for enterprise clients."
    }
  ],
  education: [
    {
      institution: "University of Technology",
      degree: "Bachelor of Science in Computer Science",
      year: "2019"
    }
  ]
};