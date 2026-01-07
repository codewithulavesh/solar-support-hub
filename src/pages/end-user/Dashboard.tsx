import ReportIssue from './ReportIssue';
import ServiceStatus from './ServiceStatus';
import MySolarSystem from './MySolarSystem';
import CallHelp from './CallHelp';
import Notifications from './Notifications';
import Language from './Language';
import HelpInfo from './HelpInfo';

interface EndUserDashboardProps {
  page: 'report' | 'status' | 'system' | 'call' | 'notifications' | 'language' | 'help';
}

export default function EndUserDashboard({ page }: EndUserDashboardProps) {
  switch (page) {
    case 'report':
      return <ReportIssue />;
    case 'status':
      return <ServiceStatus />;
    case 'system':
      return <MySolarSystem />;
    case 'call':
      return <CallHelp />;
    case 'notifications':
      return <Notifications />;
    case 'language':
      return <Language />;
    case 'help':
      return <HelpInfo />;
    default:
      return <ReportIssue />;
  }
}
