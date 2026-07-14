// components/dashboard/Dashboard.tsx
import React from 'react';
import { dummyLicense } from '../../data/dummyData';
import CurrentLicense from './CurrentLicense';
import ResourceFamilyInfo from './ResourceFamilyInfo';


const Dashboard: React.FC = () => {
 



  // Resource Family Information
  const resourceFamilyInfo = {
    name: 'Ramsy',
    structureType: 'Married Couple',
    address: '123 Main Street, CA',
    county: 'Alameda County'
  };

  

  return (
    <div className="space-y-6">
    

      {/* Approval Notifications */}
      {/* <div className="space-y-3">
        {latestApproved && (
          <ApprovalNotification
            applicationId={latestApproved.id}
            status="Approved"
            approvedBy={latestApproved.approvedBy}
            onViewApplication={() => navigate(`/application/${latestApproved.id}`)}
          />
        )}
        {latestRejected && (
          <ApprovalNotification
            applicationId={latestRejected.id}
            status="Rejected"
            message="Insufficient documentation provided"
            onViewApplication={() => navigate(`/application/${latestRejected.id}`)}
          />
        )}
      </div> */}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - License Info */}
        <div className="space-y-6">
          <CurrentLicense license={dummyLicense} />
        </div>

        {/* Right Column - Resource Family Information */}
        <div className="space-y-6">
          <ResourceFamilyInfo info={resourceFamilyInfo} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;