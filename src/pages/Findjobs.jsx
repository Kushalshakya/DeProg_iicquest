import React from "react";
import { jobListings } from "./mockData";
import JobCard from "./JobListings"; // Import JobCard component from JobListings
function Findjobs() {
  // Filter jobs to only include "Senior Frontend Developer" and above
  const filteredJobs = jobListings.filter((job) => job.title.includes("Senior Frontend Developer"));

  return (
    <div className="space-y-6">
      {/* Job Cards */}
      <div className="grid grid-cols-1 gap-6">
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-600">Try adjusting your criteria.</p>
        </div>
      )}
    </div>
  );
}

export default Findjobs;