import {
  ArrowRight, ArrowUpRight, BookOpenCheck, Brain, CalendarDays, CheckCircle2,
  ClipboardCheck, FileText, GraduationCap, Layers3, Leaf, LibraryBig,
  ShieldCheck, Sparkles, Bookmark, Clock3, WifiOff,
} from 'lucide-react';
import { Logo, ThemeBtn } from '../components/Shell';
import './StudyAccessHub.css';

const ACCESS_CARDS = [
  { number: '01', title: 'Start Learning', description: 'Open your study dashboard and continue with the tools already available.', href: '#/dashboard', icon: GraduationCap, action: 'Open dashboard', featured: true },
  { number: '02', title: 'Explore VTU Answers', description: 'Browse exam-oriented answers, key concepts and visual explanations.', href: '#/questions', icon: BookOpenCheck, action: 'Browse answers' },
  { number: '03', title: 'Module Library', description: 'Jump straight into the available module-wise question collections.', href: '#/module/3', icon: Layers3, action: 'Explore modules', modules: [{ label: 'Module 3', href: '#/module/3' }, { label: 'Module 4', href: '#/module/4' }, { label: 'Module 5', href: '#/module/5' }] },
  { number: '04', title: 'Smart Revision', description: 'Revisit important concepts and focus on the topics that need attention.', href: '#/smart-revision', icon: Brain, action: 'Start revising' },
  { number: '05', title: 'Practice & Quiz', description: 'Strengthen recall with interactive practice and quiz experiences.', href: '#/practice', icon: ClipboardCheck, action: 'Start practice', secondary: { label: 'Open quiz centre', href: '#/quiz' } },
  { number: '06', title: 'Study Planner', description: 'Organise study tasks and build a steady preparation routine.', href: '#/planner', icon: CalendarDays, action: 'Plan a session' },
  { number: '07', title: 'CNR Notes', description: 'Explore the integrated notes hub and its five-module resource library.', href: '#/cnr-notes', icon: LibraryBig, action: 'Open notes' },
  { number: '08', title: 'Previous Question Papers', description: 'Find available solved papers and model question-paper resources.', href: '#/mqps', icon: FileText, action: 'Browse papers' },
];

const ACCESS_PILLARS = [
  { icon: ShieldCheck, title: 'Free for every student', detail: 'All published learning resources are open to explore.' },
  { icon: Bookmark, title: 'No registration required', detail: 'No account, signup or password stands between you and learning.' },
  { icon: CheckCircle2, title: 'Progress saved locally', detail: 'Bookmarks, reading progress and preferences stay in this browser.' },
  { icon: Clock3, title: 'Study anytime', detail: 'Return whenever you are ready, including with supported offline access.' },
];

export default function StudyAccessHub() {
  return (
    <div className="study-access-hub">
      <header className="study-hub-header">
        <div className="study-hub-header-inner">
          <Logo />
          <div className="study-hub-header-actions">
            <span className="study-hub-open-label"><span /> OPEN LEARNING</span>
            <ThemeBtn />
            <a className="study-hub-header-link" href="#/dashboard">Enter workspace <ArrowUpRight size={15} /></a>
          </div>
        </div>
      </header>
      <main className="study-hub-main">
        <section className="study-hub-hero" aria-labelledby="study-hub-title">
          <div className="study-hub-hero-glow study-hub-hero-glow-one" aria-hidden="true" />
          <div className="study-hub-hero-glow study-hub-hero-glow-two" aria-hidden="true" />
          <div className="study-hub-hero-copy">
            <div className="study-hub-eyebrow"><span /> A FREE, OPEN-ACCESS VTU LEARNING SPACE</div>
            <h1 id="study-hub-title">Your Learning Journey <em>Starts Here</em></h1>
            <p className="study-hub-subtitle">No accounts. No barriers. Just learning.</p>
            <p className="study-hub-intro">Everything you need to prepare with confidence — study answers, module resources, revision tools and practice experiences, ready when you are.</p>
            <div className="study-hub-hero-actions">
              <a className="study-hub-primary-action" href="#/dashboard">Start learning <ArrowRight size={17} /></a>
              <a className="study-hub-secondary-action" href="#/questions">Explore VTU answers <ArrowUpRight size={16} /></a>
            </div>
            <div className="study-hub-assurance"><CheckCircle2 size={15} /> Free access for everyone <span /> No sign-up needed</div>
          </div>
          <div className="study-hub-visual" aria-label="CNR learning resources are ready to explore">
            <div className="study-hub-orbit study-hub-orbit-a" />
            <div className="study-hub-orbit study-hub-orbit-b" />
            <div className="study-hub-planet"><Leaf size={58} strokeWidth={1.2} /><span className="study-hub-planet-ring" /></div>
            <div className="study-hub-float study-hub-float-top"><span><BookOpenCheck size={17} /></span><div><b>Study answers</b><small>Clear & structured</small></div><CheckCircle2 size={16} /></div>
            <div className="study-hub-float study-hub-float-bottom"><span><Sparkles size={17} /></span><div><b>Ready when you are</b><small>Open learning workspace</small></div></div>
            <div className="study-hub-visual-caption"><span>BCV755B</span><span>CONSERVATION OF NATURAL RESOURCES</span></div>
          </div>
        </section>
        <section className="study-hub-access" aria-labelledby="study-hub-access-title">
          <div className="study-hub-section-heading">
            <div><span className="study-hub-section-kicker">YOUR NEXT STEP</span><h2 id="study-hub-access-title">Choose where to begin</h2></div>
            <p>Every card opens an existing part of CNR-IA-2. No duplicate pages, no extra setup.</p>
          </div>
          <div className="study-hub-card-grid">
            {ACCESS_CARDS.map(({ number, title, description, href, icon: Icon, action, featured, modules, secondary }) => (
              <article className={'study-hub-card' + (featured ? ' is-featured' : '')} key={number}>
                <div className="study-hub-card-top"><span className="study-hub-card-icon"><Icon size={20} /></span><span className="study-hub-card-number">{number}</span></div>
                <h3>{title}</h3><p>{description}</p>
                {modules && <div className="study-hub-module-links" aria-label="Available modules">{modules.map((module) => <a href={module.href} key={module.label}>{module.label}</a>)}</div>}
                <div className="study-hub-card-actions"><a href={href}>{action} <ArrowUpRight size={15} /></a>{secondary && <a className="study-hub-card-secondary" href={secondary.href}>{secondary.label}</a>}</div>
              </article>
            ))}
          </div>
        </section>
        <section className="study-hub-open-access" aria-labelledby="study-hub-open-title">
          <div className="study-hub-open-heading">
            <span className="study-hub-section-kicker">LEARNING WITHOUT BARRIERS</span>
            <h2 id="study-hub-open-title">A study space that stays open.</h2>
            <p>Spend your time understanding concepts and preparing for exams — not creating another account.</p>
          </div>
          <div className="study-hub-pillar-grid">
            {ACCESS_PILLARS.map(({ icon: Icon, title, detail }) => <article className="study-hub-pillar" key={title}>
              <span><Icon size={19} /></span><div><h3>{title}</h3><p>{detail}</p></div>
            </article>)}
          </div>
          <div className="study-hub-local-note"><WifiOff size={17} /><span><b>Your study data stays yours.</b> Local bookmarks, progress and reading preferences are preserved on this device; supported resources can remain available offline after they have been cached.</span></div>
        </section>
        <footer className="study-hub-footer">
          <div className="study-hub-footer-brand"><Logo /><span className="study-hub-footer-tag">LEARN · CONSERVE · GROW</span></div>
          <p>Knowledge belongs to everyone. Learn freely, grow together, and make every study session count.</p>
          <span className="study-hub-footer-note">Independent student learning resource · Not an official VTU website</span>
        </footer>
      </main>
    </div>
  );
}
