import { useEffect, useState } from "react";
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
  Briefcase,
} from "lucide-react";
import supabase from "../supabaseClient";

// FilterSection now gets its options from jobs data
function FilterSection({ jobs, filters, onFilterChange }) {
  // Get unique values from jobs for filters
  const locations = ["All Locations", ...Array.from(new Set(jobs.map(j => j.location).filter(Boolean)))];
  const categories = ["All Categories", ...Array.from(new Set(jobs.map(j => j.category).filter(Boolean)))];
  const experienceLevels = ["All Levels", ...Array.from(new Set(jobs.map(j => j.experience).filter(Boolean)))];
  const jobTypes = ["All Types", ...Array.from(new Set(jobs.map(j => j.type).filter(Boolean)))];

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

  const handleApply = async () => {
    const user = await supabase.auth.getUser();
    if (!user.data?.user?.id) {
      alert("You must be logged in to apply.");
      return;
    }
    const { error } = await supabase.from("job_applications").insert([
      {
        job_id: job.id,
        applicant_id: user.data.user.id,
      },
    ]);
    if (error) alert("Error applying: " + error.message);
    else alert("Applied successfully!");
  };

  return (
    <div className="card p-14 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4">
          {job.logo && (
            <img
              src={job.logo}
              alt={job.company}
              className="w-16 h-16 rounded-lg object-cover"
            />
          )}
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
                <span>
                  {job.created_at
                    ? new Date(job.created_at).toLocaleDateString()
                    : ""}
                </span>
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
          {job.type && (
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                job.type === "Remote"
                  ? "bg-green-100 text-green-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {job.type}
            </span>
          )}
          {job.experience && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              {job.experience}
            </span>
          )}
          {job.category && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
              {job.category}
            </span>
          )}
        </div>
        {job.salary && (
          <div className="flex items-center text-primary-600 font-semibold">
            <span>NPR {job.salary}</span>
          </div>
        )}
      </div>
      {job.requirements && job.requirements.length > 0 && (
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
      )}
      <div className="flex items-center space-x-3 ">
        <button className="flex-1 bg-emerald-400 hover:bg-slate-400 p-3 rounded-lg" onClick={handleApply}>
          Apply Now
        </button>
      </div>
    </div>
  );
}

function Findjobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    location: "All Locations",
    category: "All Categories",
    experience: "All Levels",
    type: "All Types",
  });
  const [form, setForm] = useState({
    job_title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    type: "",
    category: "",
    requirements: "",
    education: "",
    remote: false,
    timeleft: "",
  });

  // Fetch jobs from Supabase
  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error) setJobs(data || []);
      setLoading(false);
    }
    fetchJobs();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle job post submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.job_title || !form.company || !form.location || !form.type) {
      alert("Please fill in all required fields.");
      return;
    }
    const { error } = await supabase.from("jobs").insert([
      {
        job_title: form.job_title,
        company: form.company,
        location: form.location,
        salary: form.salary,
        description: form.description,
        type: form.type,
        category: form.category,
        requirements: form.requirements
          ? form.requirements.split(",").map((r) => r.trim())
          : [],
        education: form.education,
        remote: form.remote,
        timeleft: form.timeleft || null,
      },
    ]);
    if (error) {
      alert("Error posting job: " + error.message);
      return;
    }
    // Refresh job list
    const { data: newJobs } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false });
    setJobs(newJobs || []);
    setShowForm(false);
    setForm({
      job_title: "",
      company: "",
      location: "",
      salary: "",
      description: "",
      type: "",
      category: "",
      requirements: "",
      education: "",
      remote: false,
      timeleft: "",
    });
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description?.toLowerCase().includes(searchTerm.toLowerCase());

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
    <div className="space-y-6 px-16">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2 mt-10">
          Job Listings
        </h1>
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
      <FilterSection jobs={jobs} filters={filters} onFilterChange={handleFilterChange} />

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredJobs.length} job
          {filteredJobs.length !== 1 ? "s" : ""}
          {searchTerm && ` for "${searchTerm}"`}
        </p>
        <div className="wrap gap-3 flex items-center">
          <select className="input-field w-auto" disabled>
            <option>Sort by: Most Recent</option>
          </select>
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
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="job_title"
                  placeholder="Job Title"
                  className="p-3 rounded-xl bg-teal-50 border border-teal-200"
                  value={form.job_title}
                  onChange={handleFormChange}
                  required
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  className="p-3 rounded-xl bg-teal-50 border border-teal-200"
                  value={form.company}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  className="p-3 rounded-xl bg-teal-50 border border-teal-200"
                  value={form.location}
                  onChange={handleFormChange}
                  required
                />
                <input
                  type="text"
                  name="salary"
                  placeholder="Salary"
                  className="p-3 rounded-xl bg-teal-50 border border-teal-200"
                  value={form.salary}
                  onChange={handleFormChange}
                />
              </div>
              <textarea
                name="description"
                placeholder="Job Description"
                className="w-full p-3 rounded-xl bg-teal-50 border border-teal-200"
                value={form.description}
                onChange={handleFormChange}
                required
              />
              <input
                type="text"
                name="requirements"
                placeholder="Requirements (comma separated)"
                className="w-full p-3 rounded-xl bg-teal-50 border border-teal-200"
                value={form.requirements}
                onChange={handleFormChange}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <select
                  name="type"
                  className="p-3 rounded-xl bg-teal-50 border border-teal-200"
                  value={form.type}
                  onChange={handleFormChange}
                  required
                >
                  <option value="">--- Time Schedule ---</option>
                  <option value="Full-time">Full time</option>
                  <option value="Part-time">Part time</option>
                  <option value="Contract">Contract</option>
                  <option value="Remote">Remote</option>
                </select>
                <select
                  name="category"
                  className="p-3 rounded-xl bg-teal-50 border border-teal-200"
                  value={form.category}
                  onChange={handleFormChange}
                >
                  <option value="">--- Category ---</option>
                  <option value="Technology">Technology</option>
                  <option value="Design">Design</option>
                  <option value="Product">Product</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Data Science">Data Science</option>
                </select>
              </div>
              <select
                name="education"
                className="p-3 rounded-xl bg-teal-50 border border-teal-200"
                value={form.education}
                onChange={handleFormChange}
              >
                <option value="">--- Education Level ---</option>
                <option value="high_school">High School</option>
                <option value="bachelor">Bachelor</option>
                <option value="master">Master</option>
                <option value="phd">PhD</option>
              </select>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="remote"
                  checked={form.remote}
                  onChange={handleFormChange}
                />
                Remote
              </label>
              <input
                type="text"
                name="timeleft"
                placeholder="Time Left (e.g. 10 days)"
                className="p-3 rounded-xl bg-teal-50 border border-teal-200"
                value={form.timeleft}
                onChange={handleFormChange}
              />
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

export default Findjobs;
