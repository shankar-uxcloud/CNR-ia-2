import { Suspense, lazy } from 'react';
import { useRoute } from './lib/router';
import { StudyProvider } from './lib/study';
import Shell, { Toasts } from './components/Shell';
import { Skeleton, Empty } from './components/ui';
import { FileQuestion } from 'lucide-react';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Library from './pages/Library';

const Answer = lazy(() => import('./pages/Answer'));
const Revision = lazy(() => import('./pages/Revision'));

function Router({ path }) {
  if (path === '/dashboard') return <Dashboard />;
  if (path === '/questions') return <Library />;
  if (path === '/bookmarks') return <Library bookmarksOnly />;
  if (path === '/revision') return <Revision />;
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
export default function App() { return <StudyProvider><Inner /></StudyProvider>; }
