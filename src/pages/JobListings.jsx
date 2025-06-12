import { useState } from "react";
import {
  Search,
  Filter,
  MapPin,
  Building,
  Clock,
  DollarSign,
  Bookmark,
  ExternalLink,
  Plus,
} from "lucide-react";
import { jobListings } from "./mockData";

function FilterSection({ filters, onFilterChange }) {
  const locations = [
    "All Locations",
    "San Francisco, CA",
    "New York, NY",
    "Austin, TX",
    "Seattle, WA",
    "Los Angeles, CA",
    "Chicago, IL",
    "Remote",
  ];
  const categories = [
    "All Categories",
    "Technology",
    "Design",
    "Product",
    "Marketing",
    "Data Science",
  ];
  const experienceLevels = ["All Levels", "Entry-level", "Mid-level", "Senior"];
  const jobTypes = [
    "All Types",
    "Full-time",
    "Part-time",
    "Contract",
    "Remote",
  ];

  return (
    <div className="card p-6 mb-6">
      <div className="flex items-center mb-4">
        <Filter className="w-5 h-5 mr-2 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <select
            className="input-field"
            value={filters.location}
            onChange={(e) => onFilterChange("location", e.target.value)}
          >
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            className="input-field"
            value={filters.category}
            onChange={(e) => onFilterChange("category", e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience
          </label>
          <select
            className="input-field"
            value={filters.experience}
            onChange={(e) => onFilterChange("experience", e.target.value)}
          >
            {experienceLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Type
          </label>
          <select
            className="input-field"
            value={filters.type}
            onChange={(e) => onFilterChange("type", e.target.value)}
          >
            {jobTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

function JobCard({ job }) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="card p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4">
          <img
            src={job.logo}
            alt={job.company}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {job.title}
            </h3>
            <div className="flex items-center text-gray-600 mb-2">
              <Building className="w-4 h-4 mr-1" />
              <span>{job.company}</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{job.posted}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setSaved(!saved)}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            saved
              ? "bg-primary-100 text-primary-600"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <Bookmark className={`w-5 h-5 ${saved ? "fill-current" : ""}`} />
        </button>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              job.type === "Remote"
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {job.type}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            {job.experience}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            {job.category}
          </span>
        </div>

        <div className="flex items-center text-primary-600 font-semibold">
          <DollarSign className="w-4 h-4 mr-1" />
          <span>{job.salary}</span>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">
          Requirements:
        </h4>
        <div className="flex flex-wrap gap-2">
          {job.requirements.slice(0, 4).map((req, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
            >
              {req}
            </span>
          ))}
          {job.requirements.length > 4 && (
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
              +{job.requirements.length - 4} more
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {job.applied ? (
          <button className="flex-1 bg-green-100 text-green-800 py-2 px-4 rounded-lg font-medium">
            Applied
          </button>
        ) : (
          <button className="flex-1 btn-primary">Apply Now</button>
        )}
        <button className="btn-secondary">
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function JobListings() {
  const [searchTerm, setSearchTerm] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [filters, setFilters] = useState({
    location: "All Locations",
    category: "All Categories",
    experience: "All Levels",
    type: "All Types",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      filters.location === "All Locations" || job.location === filters.location;
    const matchesCategory =
      filters.category === "All Categories" ||
      job.category === filters.category;
    const matchesExperience =
      filters.experience === "All Levels" ||
      job.experience === filters.experience;
    const matchesType =
      filters.type === "All Types" || job.type === filters.type;

    return (
      matchesSearch &&
      matchesLocation &&
      matchesCategory &&
      matchesExperience &&
      matchesType
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Listings</h1>
        <p className="text-gray-600">Discover your next career opportunity</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search jobs, companies, or keywords..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filters */}
      <FilterSection filters={filters} onFilterChange={handleFilterChange} />

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredJobs.length} job
          {filteredJobs.length !== 1 ? "s" : ""}
          {searchTerm && ` for "${searchTerm}"`}
        </p>
        <div className="wrap gap-3 flex items-center">
          <select className="input-field w-auto">
            <option>Sort by: Most Recent</option>
            <option>Sort by: Most Relevant</option>
            <option>Sort by: Salary (High to Low)</option>
            <option>Sort by: Salary (Low to High)</option>
          </select>
          {/* <button className="btn-primary px-2">
            <Plus />
          </button> */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
          >
            <Plus /> Post a Job
          </button>
        </div>
      </div>

      {/* form section */}

      <div className="p-4">
        {showForm && (
          <div className="mt-6 w-full max-w-4xl bg-emerald-50 rounded-2xl shadow-lg p-10 border-4 border-transparent transition-all duration-300">
            <h2 className="text-4xl font-bold text-teal-700 text-center mb-4">
              Post A Job Vacancy
            </h2>
            <p className="text-center text-gray-600 mb-10">
              We’re always on the lookout for high-performing and energetic
              individuals.
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Job Name"
                  className="p-3 rounded-xl bg-teal-50 border border-teal-200"
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  className="p-3 rounded-xl bg-teal-50 border border-teal-200"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Location"
                  className="p-3 rounded-xl bg-teal-50 border border-teal-200"
                />
                <input
                  type="text"
                  placeholder="Salary"
                  className="p-3 rounded-xl bg-teal-50 border border-teal-200"
                />
              </div>

              <textarea
                placeholder="Job Description"
                className="w-full p-3 rounded-xl bg-teal-50 border border-teal-200"
              />

              <select className="w-full p-3 rounded-xl bg-teal-50 border border-teal-200">
                <option value="">--- Time Schedule ---</option>
                <option value="Full time">Full time</option>
                <option value="Part time">Part time</option>
              </select>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-3 rounded-xl"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 gap-6">
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No jobs found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or filters to find more
              opportunities.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobListings;
