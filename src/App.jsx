import { Suspense, lazy, useEffect } from 'react';
import { go, useRoute } from './lib/router';
import { StudyProvider } from './lib/study';
import Shell, { Toasts } from './components/Shell';
import { Skeleton, Empty } from './components/ui';
import { FileQuestion } from 'lucide-react';
import StudyAccessHub from './pages/StudyAccessHub';
import Dashboard from './pages/Dashboard';
import Library from './pages/Library';
import PWAStatus from './components/PWAStatus';
import ConnectivityToast from './components/ConnectivityToast';
import StartupExperience from './components/StartupExperience';

const Answer = lazy(() => import('./pages/Answer'));
const Revision = lazy(() => import('./pages/Revision'));
const Practice = lazy(() => import('./pages/Practice'));
const FiveMarkAnswers = lazy(() => import('./pages/FiveMarkAnswers'));
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
const VisualStructuralAnswers = lazy(() => import('./pages/VisualStructuralAnswers'));
const JuneJuly2026 = lazy(() => import('./pages/JuneJuly2026'));

function Router({ path }) {
  if (path === '/welcome') return <NexusWelcome revisit />;
  if (path === '/learning-hub') return <LearningHub />;
  if (path === '/cnr-notes/all') return <ResourceVault initialCategory="notes" />;
  if (path === '/cnr-notes') return <CNRNotes />;
  const cnrNotesModule = path.match(/^\/cnr-notes\/module\/([1-5])$/);
  if (cnrNotesModule) return <ResourceVault initialModule={Number(cnrNotesModule[1])} initialCategory="notes" />;
  if (path === '/resources' || path === '/materials' || path.startsWith('/materials/')) return <ResourceVault />;
  if (path === '/mqps') return <ModelPapers />;
  if (path === '/model-paper-21cv654') return <ModelQuestionPaper21CV654 />;
  if (path === '/visual-structural-answers') return <VisualStructuralAnswers />;
  if (path === '/dec-jan-2026') return <DecJan2026 />;
  if (path === '/question-papers/june-july-2026') return <JuneJuly2026 />;
  if (path === '/dashboard') return <Dashboard />;
  if (path === '/questions' || path === '/answers') return <Library />;
  if (path === '/bookmarks') return <Library bookmarksOnly />;
  if (path === '/revision') return <Revision />;
  if (path === '/practice') return <Practice />;
  if (path === '/five-mark-answers') return <FiveMarkAnswers />;
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
  const legacyAccessRoute = ['/auth', '/signup', '/reset-password', '/auth/callback'].includes(path);
  useEffect(() => {
    if (legacyAccessRoute) go('/');
  }, [legacyAccessRoute]);
  if (path === '/' || legacyAccessRoute) return <><StudyAccessHub /><Toasts /></>;
  return <Shell path={path}><Suspense fallback={<Skeleton />}><Router path={path} /></Suspense></Shell>;
}
export default function App() {
  return <StartupExperience><StudyProvider><><Inner /><PWAStatus /><ConnectivityToast /></></StudyProvider></StartupExperience>;
}
