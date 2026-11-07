import { useRef, useState } from 'react';
import { DatabaseBackup, Download, Upload, ShieldCheck, AlertTriangle, FileJson } from 'lucide-react';
import { useStudy } from '../lib/study';

export default function DataBackup() {
  const { exportBackup, importBackup } = useStudy();
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState('');
  const [message, setMessage] = useState('');

  const downloadBackup = () => {
    const blob = new Blob([exportBackup()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vtu-examprep-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setMessage('Backup downloaded. Keep a copy somewhere safe.');
  };

  const chooseFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setMessage('');
    if (file.size > 5 * 1024 * 1024) {
      setMessage('File is too large. Choose a backup smaller than 5 MB.');
      event.target.value = '';
      return;
    }
    if (!window.confirm('Restoring replaces the study progress currently saved in this browser. Export your current progress first if you want to keep it. Continue?')) {
      event.target.value = '';
      return;
    }
    const restored = importBackup(await file.text());
    setMessage(restored ? 'Your study progress has been restored.' : 'Restore failed. Your existing progress was not replaced.');
    event.target.value = '';
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-8 sm:py-10">
      <p className="eyebrow">Your data · private browser storage</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Backup & Restore</h1>
      <p className="mt-2 max-w-2xl text-mute">Keep a portable copy of your VTU ExamPrep progress. Your backup stays on your device unless you choose to move or share the file.</p>

      <section className="card mt-6 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand"><Download size={21}/></span>
          <div><h2 className="font-semibold">Export your progress</h2><p className="mt-1 text-sm text-mute">Download bookmarks, completed answers, quizzes, exam attempts, planner tasks and settings.</p></div>
        </div>
        <button type="button" onClick={downloadBackup} className="btn-primary mt-5"><Download size={16}/> Download backup</button>
      </section>

      <section className="card mt-4 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand"><Upload size={21}/></span>
          <div><h2 className="font-semibold">Restore a backup</h2><p className="mt-1 text-sm text-mute">Choose a previously exported VTU ExamPrep JSON file.</p></div>
        </div>
        <input ref={inputRef} type="file" accept=".json,application/json" onChange={chooseFile} className="sr-only" aria-label="Choose a VTU ExamPrep backup file"/>
        <button type="button" onClick={() => inputRef.current?.click()} className="btn mt-5"><Upload size={16}/> Choose backup file</button>
        {fileName && <p className="mt-2 text-xs text-mute">Selected: {fileName}</p>}
      </section>

      <div className="mt-4 flex items-start gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4 text-sm">
        <ShieldCheck size={19} className="mt-0.5 shrink-0 text-emerald-600"/>
        <p className="text-mute">Backups are generated locally in your browser. No account, cloud upload or external service is involved.</p>
      </div>
      <div className="mt-3 flex items-start gap-3 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 text-sm">
        <AlertTriangle size={19} className="mt-0.5 shrink-0 text-amber-600"/>
        <p className="text-mute">Restoring replaces the current saved progress on this browser. Export a fresh backup first if you need to preserve it.</p>
      </div>
      {message && <p role="status" className="mt-4 rounded-xl bg-sunk p-3 text-sm">{message}</p>}
      <p className="mt-5 flex items-center gap-2 text-xs text-mute"><FileJson size={14}/> Backup format: JSON · Maximum import size: 5 MB</p>
    </div>
  );
}
