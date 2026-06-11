import { useState } from 'react';
import type { TabId } from './types';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import LearnTab from './components/LearnTab';
import QuizTab from './components/QuizTab';
import ChatTab from './components/ChatTab';

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('learn');
  const isChatTab = activeTab === 'chat';

  return (
    <div className="flex h-[100dvh] w-full items-center justify-center bg-slate-950 sm:p-6">
      <div
        dir="rtl"
        lang="he"
        className="flex h-full w-full max-w-md flex-col overflow-hidden bg-slate-950 text-slate-100 sm:h-[850px] sm:max-h-[calc(100dvh-3rem)] sm:rounded-[2.5rem] sm:border sm:border-slate-800 sm:shadow-2xl sm:shadow-black/50"
      >
        <Header />

        <main
          className={
            isChatTab
              ? 'flex flex-1 flex-col overflow-hidden'
              : 'no-scrollbar flex-1 overflow-y-auto overscroll-contain px-4 py-4'
          }
        >
          {activeTab === 'learn' && <LearnTab onLaunchAgent={() => setActiveTab('chat')} />}
          {activeTab === 'quiz' && <QuizTab />}
          {isChatTab && <ChatTab />}
        </main>

        <BottomNav activeTab={activeTab} onChange={setActiveTab} />
      </div>
    </div>
  );
}

export default App;
