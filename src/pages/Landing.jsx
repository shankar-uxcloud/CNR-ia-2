import {
  ArrowRight, ArrowUpRight, BookOpen, BookOpenCheck, Brain, CalendarDays,
  CheckCircle2, ClipboardList, FileQuestion, FileText, GraduationCap,
  Layers3, LibraryBig, Menu, Moon, PanelTop, Sparkles, Target, X,
  BarChart3, Shapes, Compass, Leaf, FileStack, Orbit, Activity,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { QUESTIONS, MODULES, MODULE_ORDER, SUBJECT } from '../data/questions';
import { Logo, ThemeBtn } from '../components/Shell';
import { Greenhouse } from '../diagrams/Climate';
import { modColor } from '../components/ui';
import './Landing.css';

const FEATURES = [
  { icon: BookOpenCheck, title: 'Structured study answers', text: 'Explore clear, exam-oriented answers, key concepts and labelled diagrams.', href: '#/questions', tag: 'Learn' },
  { icon: LibraryBig, title: 'Academic Resource Vault', text: 'Find available CNR notes, syllabus files and question-paper resources in one place.', href: '#/resources', tag: 'Discover' },
  { icon: FileQuestion, title: 'Model question papers', text: 'Practise with student-created model sets, clearly distinguished from official VTU papers.', href: '#/mqps', tag: 'Practise' },
  { icon: Brain, title: 'AI Study Coach', text: 'Get guided study support while you work through difficult concepts.', href: '#/study-coach', tag: 'Understand' },
  { icon: BarChart3, title: 'Progress & revision', text: 'Review your activity and focus your next revision session where it matters.', href: '#/smart-revision', tag: 'Improve' },
  { icon: CalendarDays, title: 'Planning & exam tools', text: 'Use the planner, quizzes and exam simulator to build a steady preparation routine.', href: '#/learning-hub', tag: 'Prepare' },
  { icon: FileStack, title: 'June / July 2026 paper', text: 'Open the dedicated VTU question paper with structured ten-mark answers.', href: '#/question-papers/june-july-2026', tag: 'Question paper' },
  { icon: FileText, title: 'December / January paper', text: 'Continue exam preparation with the December / January question-paper collection.', href: '#/dec-jan-2026', tag: 'Question paper' },
  { icon: Orbit, title: 'Visual Learning Studio', text: 'Explore concepts through interactive visual workspaces and guided learning.', href: '#/visual-studio', tag: 'Explore' },
];

const JOURNEY = [
  { n: '01', title: 'Explore', text: 'Start with the subject, module or resource you need.' },
  { n: '02', title: 'Choose', text: 'Open structured answers, notes, papers or a learning tool.' },
  { n: '03', title: 'Learn', text: 'Study, practise and return to topics as you prepare.' },
];

const BENEFITS = [
  ['One academic destination', 'Study content and supporting resources are brought together in one student-friendly workspace.', Layers3],
  ['Clear module structure', 'Navigate the published learning content by module and find relevant questions faster.', Compass],
  ['Tools that support learning', 'Revision, practice, planning and progress tools help you build a more consistent routine.', Target],
  ['Designed for focused study', 'A responsive interface, reading controls and appearance options support comfortable learning.', Sparkles],
];

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
}

function ResourcePreview() {
  return (
    <div className="cnr-preview" aria-label="Illustration of the CNR academic resource platform">
      <div className="cnr-preview-glow" />
      <div className="cnr-preview-window">
        <div className="cnr-window-top"><div className="cnr-window-dots"><i /><i /><i /></div><span>cnr / learning workspace</span><span className="cnr-live"><i /> READY TO EXPLORE</span></div>
        <div className="cnr-window-body">
          <aside className="cnr-mini-sidebar"><div className="cnr-mini-brand"><span>C</span><b>CNR</b></div><div className="cnr-mini-active"><PanelTop size={14}/> Overview</div><div><BookOpen size={14}/> Modules</div><div><LibraryBig size={14}/> Resources</div><div><FileQuestion size={14}/> Papers</div><div><Brain size={14}/> Study tools</div><div className="cnr-mini-sidebar-foot"><span /> Your learning space</div></aside>
          <div className="cnr-mini-content">
            <div className="cnr-mini-greeting"><div><small>YOUR ACADEMIC SPACE</small><h3>Make every study session count.</h3><p>Explore your CNR learning resources.</p></div><span className="cnr-mini-avatar"><GraduationCap size={19}/></span></div>
            <div className="cnr-mini-stats"><div><span>SUBJECT</span><b>BCV755B</b><small>Conservation of Natural Resources</small></div><div><span>LEARNING PATH</span><b>Modules 03–05</b><small>Structured study content</small></div></div>
            <div className="cnr-mini-label">EXPLORE YOUR RESOURCES <ArrowUpRight size={13}/></div>
            <div className="cnr-mini-cards"><div><span className="cnr-mini-icon violet"><BookOpen size={17}/></span><b>Study answers</b><small>Concepts & diagrams</small></div><div><span className="cnr-mini-icon blue"><FileText size={17}/></span><b>Resource vault</b><small>Notes & papers</small></div><div><span className="cnr-mini-icon amber"><ClipboardList size={17}/></span><b>Practice</b><small>Test your learning</small></div></div>
            <div className="cnr-mini-module"><div><b>Continue by module</b><small>Choose a learning area</small></div><div className="cnr-module-pills"><span>MODULE 03</span><span>MODULE 04</span><span>MODULE 05</span></div></div>
          </div>
        </div>
      </div>
      <div className="cnr-float-card cnr-float-top"><span className="cnr-float-icon"><FileText size={17}/></span><div><b>Study materials</b><small>Organised resources</small></div><CheckCircle2 size={16}/></div>
      <div className="cnr-float-card cnr-float-bottom"><span className="cnr-float-icon cyan"><Sparkles size={17}/></span><div><b>Learn with clarity</b><small>One step at a time</small></div></div>
      <div className="cnr-orbit cnr-orbit-one" /><div className="cnr-orbit cnr-orbit-two" />
    </div>
  );
}

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event) => event.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <div className="cnr-intro">
      <header className={`cnr-nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="cnr-nav-inner">
          <a href="#/" className="cnr-brand" aria-label="CNR home"><span className="cnr-brand-mark">C</span><span><b>CNR</b><small>ACADEMIC RESOURCE HUB</small></span></a>
          <nav className={`cnr-nav-links ${menuOpen ? 'is-open' : ''}`} aria-label="Introduction navigation">
            <button onClick={() => { scrollToSection('home'); setMenuOpen(false); }}>Home</button>
            <button onClick={() => { scrollToSection('about'); setMenuOpen(false); }}>About</button>
            <button onClick={() => { scrollToSection('explore'); setMenuOpen(false); }}>Explore</button>
            <button onClick={() => { scrollToSection('journey'); setMenuOpen(false); }}>How it works</button>
            <a className="cnr-mobile-cta" href="#/resources" onClick={() => setMenuOpen(false)}>Explore platform <ArrowUpRight size={16}/></a>
          </nav>
          <div className="cnr-nav-actions"><ThemeBtn /><a href="#/resources" className="cnr-nav-cta">Explore platform <ArrowUpRight size={15}/></a><button className="cnr-menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X/> : <Menu/>}</button></div>
        </div>
      </header>

      <main>
        <section id="home" className="cnr-hero">
          <div className="cnr-hero-grid" aria-hidden="true" />
          <div className="cnr-hero-orb cnr-hero-orb-a" aria-hidden="true" /><div className="cnr-hero-orb cnr-hero-orb-b" aria-hidden="true" />
          <div className="cnr-hero-inner">
            <div className="cnr-hero-copy">
              <div className="cnr-kicker"><span className="cnr-kicker-dot" /> YOUR CNR LEARNING SPACE <span className="cnr-kicker-line" /></div>
              <h1>Everything you need to <em>learn, prepare</em> & excel.</h1>
              <p className="cnr-hero-lede">A dedicated academic destination for CNR study answers, notes, question papers and learning tools — thoughtfully brought together in one place.</p>
              <div className="cnr-hero-actions"><a className="cnr-button-primary" href="#/resources">Explore resources <ArrowRight size={18}/></a><button className="cnr-button-secondary" onClick={() => scrollToSection('about')}><span className="cnr-play">↓</span> Discover CNR</button></div>
              <div className="cnr-hero-note"><span><CheckCircle2 size={15}/> Student-focused learning</span><span><CheckCircle2 size={15}/> Organised resources</span></div>
            </div>
            <ResourcePreview />
          </div>
          <div className="cnr-hero-bottom"><span>BUILT AROUND YOUR LEARNING JOURNEY</span><div /><span>{SUBJECT.code} · {SUBJECT.name}</span></div>
        </section>

        <section className="cnr-quick-access" aria-label="Quick access to key learning areas">
          <div className="cnr-quick-access-inner">
            <div className="cnr-quick-intro"><span className="cnr-quick-pulse"/><span><b>Pick up where you want to learn</b><small>Direct access to the core CNR workspace</small></span></div>
            <a href="#/learning-hub"><BookOpen size={17}/> Learning Hub <ArrowUpRight size={14}/></a>
            <a href="#/resources"><LibraryBig size={17}/> Resource Vault <ArrowUpRight size={14}/></a>
            <a href="#/question-papers/june-july-2026"><FileQuestion size={17}/> June / July Paper <ArrowUpRight size={14}/></a>
            <a href="#/dashboard"><PanelTop size={17}/> Dashboard <ArrowUpRight size={14}/></a>
          </div>
        </section>

        <section id="about" className="cnr-section cnr-about">
          <div className="cnr-section-head"><span className="cnr-eyebrow">01 / THE IDEA</span><span className="cnr-section-index">A CLEARER WAY TO PREPARE</span></div>
          <div className="cnr-about-grid">
            <h2>Your academic world,<br/><em>organized.</em></h2>
            <div className="cnr-about-copy"><p>CNR is designed to bring essential academic resources and learning experiences together in one accessible platform.</p><p>Instead of navigating scattered files and separate tools, students can explore structured subject content, find available materials and practise in a single, student-friendly space.</p><a href="#/learning-hub" className="cnr-text-link">Discover the learning hub <ArrowUpRight size={17}/></a></div>
          </div>
          <div className="cnr-about-band"><div><span className="cnr-band-icon"><BookOpen size={19}/></span><b>Learn with structure</b><small>Module-wise content and study answers</small></div><div><span className="cnr-band-icon"><LibraryBig size={19}/></span><b>Find what you need</b><small>Academic resources in one destination</small></div><div><span className="cnr-band-icon"><Target size={19}/></span><b>Prepare with purpose</b><small>Tools for practice and revision</small></div></div>
        </section>

        <section id="explore" className="cnr-section cnr-explore">
          <div className="cnr-section-head"><span className="cnr-eyebrow">02 / WHAT YOU CAN DO</span><span className="cnr-section-index">THE PLATFORM</span></div>
          <div className="cnr-title-row"><div><h2>One platform.<br/><em>Many ways to learn.</em></h2></div><p>Explore the resources and tools already available across your CNR learning workspace.</p></div>
          <div className="cnr-feature-grid">{FEATURES.map(({ icon: Icon, title, text, href, tag }, i) => <a className="cnr-feature-card" href={href} key={title}><div className="cnr-feature-top"><span className="cnr-feature-icon"><Icon size={21}/></span><span className="cnr-feature-number">0{i + 1}</span></div><span className="cnr-feature-tag">{tag}</span><h3>{title}</h3><p>{text}</p><span className="cnr-feature-link">Explore <ArrowUpRight size={16}/></span></a>)}</div>
        </section>

        <section className="cnr-modules">
          <div className="cnr-modules-inner"><div className="cnr-modules-copy"><span className="cnr-eyebrow">A STRUCTURED START</span><h2>Find your focus.<br/><em>One module at a time.</em></h2><p>Jump directly into the published CNR question bank and explore the current module-wise learning content.</p><a className="cnr-button-primary" href="#/questions">Browse study questions <ArrowRight size={17}/></a></div>
            <div className="cnr-module-list">{MODULE_ORDER.slice().sort((a,b)=>a-b).map(m => { const qs = QUESTIONS.filter(q=>q.module===m); return <a href={`#/module/${m}`} className="cnr-module-row" key={m}><span className="cnr-module-index" style={{color:modColor(m)}}>0{m}</span><span className="cnr-module-main"><b>{MODULES[m].name}</b><small>{MODULES[m].long}</small></span><span className="cnr-module-count">{qs.length} questions</span><ArrowUpRight size={18}/></a>; })}</div>
          </div>
        </section>

        <section id="journey" className="cnr-section cnr-journey">
          <div className="cnr-section-head"><span className="cnr-eyebrow">03 / YOUR FLOW</span><span className="cnr-section-index">SIMPLE BY DESIGN</span></div>
          <div className="cnr-title-row"><h2>From finding a resource<br/><em>to feeling prepared.</em></h2><p>A straightforward path that keeps the focus on learning.</p></div>
          <div className="cnr-journey-grid">{JOURNEY.map((step,i)=><article className="cnr-journey-card" key={step.n}><span className="cnr-journey-n">{step.n}</span><div className="cnr-journey-symbol">{i===0?<Compass size={23}/>:i===1?<Layers3 size={23}/>:<GraduationCap size={23}/>}</div><h3>{step.title}</h3><p>{step.text}</p>{i!==2&&<span className="cnr-journey-connector">→</span>}</article>)}</div>
        </section>

        <section className="cnr-benefits">
          <div className="cnr-benefits-inner"><div className="cnr-benefits-heading"><span className="cnr-eyebrow">04 / WHY CNR</span><h2>Less searching.<br/><em>More meaningful study.</em></h2><p>A considered learning environment that helps keep your academic preparation clear and accessible.</p></div><div className="cnr-benefit-list">{BENEFITS.map(([title,text,Icon],i)=><article key={title}><span className="cnr-benefit-icon"><Icon size={19}/></span><div><h3>{title}</h3><p>{text}</p></div><span className="cnr-benefit-no">0{i+1}</span></article>)}</div></div>
        </section>

        <section className="cnr-section cnr-preview-section">
          <div className="cnr-section-head"><span className="cnr-eyebrow">05 / INSIDE THE EXPERIENCE</span><span className="cnr-section-index">BUILT FOR STUDENTS</span></div>
          <div className="cnr-preview-content"><div><h2>Everything has<br/><em>a place.</em></h2><p>Move from a question to a module, from study material to practice — with dedicated spaces for the different parts of your preparation.</p><a href="#/dashboard" className="cnr-text-link">Enter your learning workspace <ArrowUpRight size={17}/></a></div><div className="cnr-preview-showcase"><div className="cnr-showcase-card showcase-one"><span><BookOpenCheck size={18}/></span><div><b>Study answers</b><small>Structured content & diagrams</small></div><ArrowUpRight size={16}/></div><div className="cnr-showcase-card showcase-two"><span><FileText size={18}/></span><div><b>Academic Resource Vault</b><small>Available notes & papers</small></div><ArrowUpRight size={16}/></div><div className="cnr-showcase-card showcase-three"><span><Brain size={18}/></span><div><b>Learning tools</b><small>Practice, revision & planning</small></div><ArrowUpRight size={16}/></div><div className="cnr-showcase-orbit"><Leaf size={48}/></div></div></div>
          <div className="cnr-answer-preview"><div className="cnr-answer-top"><span><span/> LIVE CONTENT PREVIEW</span><small>{SUBJECT.code} / MODULE 05</small></div><div className="cnr-answer-body"><div><span className="cnr-answer-chip">STUDY ANSWER · 10 MARKS</span><h3>Understand the greenhouse effect</h3><p>Explore concepts with structured explanations and a visual learning aid.</p><div className="cnr-answer-lines"><i/><i/><i/><i/></div></div><div className="cnr-answer-diagram"><Greenhouse/></div></div></div>
        </section>

        <section className="cnr-final-cta"><div className="cnr-cta-glow"/><span className="cnr-eyebrow">YOUR NEXT CHAPTER STARTS HERE</span><h2>Your next step towards<br/><em>better preparation.</em></h2><p>Explore your CNR resources, discover the learning tools and make your preparation more accessible.</p><a href="#/resources" className="cnr-button-primary">Explore the platform <ArrowRight size={18}/></a><span className="cnr-cta-foot">CNR · A STUDENT-FOCUSED ACADEMIC RESOURCE HUB</span></section>
      </main>
      <footer className="cnr-footer"><a href="#/" className="cnr-brand"><span className="cnr-brand-mark">C</span><span><b>CNR</b><small>ACADEMIC RESOURCE HUB</small></span></a><p>Built to make CNR learning more organized and accessible.</p><span>Independent student learning resource · Not an official VTU website</span></footer>
    </div>
  );
}
