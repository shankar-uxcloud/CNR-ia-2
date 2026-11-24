import { Suspense, lazy } from 'react';
import { useRoute } from './lib/router';
import { StudyProvider } from './lib/study';
import Shell, { Toasts } from './components/Shell';
import { Skeleton, Empty } from './components/ui';
import { FileQuestion } from 'lucide-react';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Library from './pages/Library';
import PWAStatus from './components/PWAStatus';
import ConnectivityToast from './components/ConnectivityToast';
import StartupExperience from './components/StartupExperience';

const Answer = lazy(() => import('./pages/Answer'));
const Revision = lazy(() => import('./pages/Revision'));
const Practice = lazy(() => import('./pages/Practice'));
const Quiz = lazy(() => import('./pages/Quiz'));
const Planner = lazy(() => import('./pages/Planner'));
const ExamSimulator = lazy(() => import('./pages/ExamSimulator'));
const Analytics = lazy(() => import('./pages/Analytics'));
const VisualStudio = lazy(() => import('./pages/VisualStudio'));
const EnvironmentalScienceLab = lazy(() => import('./components/EnvironmentalScienceLab'));
const SmartRevision = lazy(() => import('./pages/SmartRevision'));
const AdditionalNotes = lazy(() => import('./pages/AdditionalNotes'));
const StudyCoach = lazy(() => import('./pages/StudyCoach'));
const DataBackup = lazy(() => import('./pages/DataBackup'));
const EcoWebArchitect = lazy(() => import('./pages/EcoWebArchitect'));
const LearningHub = lazy(() => import('./pages/LearningHub'));
const NexusWelcome = lazy(() => import('./pages/NexusWelcome'));
const ResourceVault = lazy(() => import('./pages/ResourceVault'));
const CNRNotes = lazy(() => import('./pages/CNRNotes'));
const ModelPapers = lazy(() => import('./pages/ModelPapers'));
const ModelQuestionPaper21CV654 = lazy(() => import('./pages/ModelQuestionPaper21CV654'));
const DecJan2026 = lazy(() => import('./pages/DecJan2026'));
const JuneJuly2026 = lazy(() => import('./pages/JuneJuly2026'));

function Router({ path }) {
  if (path === '/welcome') return <NexusWelcome revisit />;
  if (path === '/learning-hub') return <LearningHub />;
  if (path === '/cnr-notes') return <CNRNotes />;
  const cnrNotesModule = path.match(/^\/cnr-notes\/module\/([1-5])$/);
  if (cnrNotesModule) return <ResourceVault initialModule={Number(cnrNotesModule[1])} />;
  if (path === '/resources' || path === '/materials' || path.startsWith('/materials/')) return <ResourceVault />;
  if (path === '/mqps') return <ModelPapers />;
  if (path === '/model-paper-21cv654') return <ModelQuestionPaper21CV654 />;
  if (path === '/dec-jan-2026') return <DecJan2026 />;
  if (path === '/question-papers/june-july-2026') return <JuneJuly2026 />;
  if (path === '/dashboard') return <Dashboard />;
  if (path === '/questions') return <Library />;
  if (path === '/bookmarks') return <Library bookmarksOnly />;
  if (path === '/revision') return <Revision />;
  if (path === '/practice') return <Practice />;
  if (path === '/quiz') return <Quiz />;
  if (path === '/exam') return <ExamSimulator />;
  if (path === '/analytics') return <Analytics />;
  if (path === '/visual-studio') return <VisualStudio />;
  if (path === '/environment-lab') return <EnvironmentalScienceLab />;
  if (path === '/smart-revision') return <SmartRevision />;
  if (path === '/additional-notes') return <AdditionalNotes />;
  if (path === '/study-coach') return <StudyCoach />;
  if (path === '/data-backup') return <DataBackup />;
  if (path === '/ecoweb') return <EcoWebArchitect />;
  if (path === '/planner') return <Planner />;
  const m = path.match(/^\/module\/([345])$/);
  if (m) return <Library module={Number(m[1])} />;
  const q = path.match(/^\/q\/([a-z0-9]+)$/);
  if (q) return <Answer key={q[1]} id={q[1]} />;
  return <div className="mx-auto max-w-xl px-4 py-16"><Empty icon={FileQuestion} title="Page not found" text="That page does not exist." action={<a href="#/dashboard" className="btn-primary">Go to dashboard</a>} /></div>;
}
function Inner() {
  const path = useRoute();
  if (path === '/') return <><Landing /><Toasts /></>;
  return <Shell path={path}><Suspense fallback={<Skeleton />}><Router path={path} /></Suspense></Shell>;
}
export default function App() {
  return <StartupExperience><StudyProvider><><Inner /><PWAStatus /><ConnectivityToast /></></StudyProvider></StartupExperience>;
}
