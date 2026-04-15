/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { DashboardLayout } from './components/DashboardLayout';
import { AIGenerator } from './pages/AIGenerator';
import { VelocityDashboard } from './pages/VelocityDashboard';
import { Feed } from './pages/Feed';
import { AnalyticsDashboard } from './pages/AnalyticsDashboard';
import { SettingsDashboard } from './pages/SettingsDashboard';

export default function App() {
  const [activeTab, setActiveTab] = useState('trends');

  const renderContent = () => {
    switch (activeTab) {
      case 'ai':
        return (
          <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
            <AIGenerator />
          </DashboardLayout>
        );
      case 'trends':
        return (
          <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
            <VelocityDashboard onNavigate={setActiveTab} />
          </DashboardLayout>
        );
      case 'feed':
        return (
          <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
            <Feed onNavigate={setActiveTab} />
          </DashboardLayout>
        );
      case 'analytics':
        return (
          <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
            <AnalyticsDashboard />
          </DashboardLayout>
        );
      case 'settings':
        return (
          <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
            <SettingsDashboard />
          </DashboardLayout>
        );
      default:
        return (
          <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
            <AIGenerator />
          </DashboardLayout>
        );
    }
  };

  return (
    <>
      {renderContent()}
    </>
  );
}
