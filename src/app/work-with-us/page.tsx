import CareersHero from './components/CareersHero';
import WorkingAtIndigo from './components/WorkingAtIndigo';
import LifeAtIndigo from './components/LifeAtIndigo';
import InvestorsInPeople from './components/InvestorsInPeople';
import EmployeeBenefits from './components/EmployeeBenefits';
import UnifiedWorkforce from './components/UnifiedWorkforce';
import VisionValues from './components/VisionValues';
import CanDoAttitude from './components/CanDoAttitude';
import ArmedForcesCovenant from './components/ArmedForcesCovenant';
import CPDAccredited from './components/CPDAccredited';
import DownloadEbook from './components/DownloadEbook';

export default function WorkWithUs() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <CareersHero />
      <WorkingAtIndigo />
      <LifeAtIndigo />
      <InvestorsInPeople />
      <EmployeeBenefits />
      <UnifiedWorkforce />
      <VisionValues />
      <CanDoAttitude />
      <ArmedForcesCovenant />
    </div>
  );
}
