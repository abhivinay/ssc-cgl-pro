import{BrowserRouter,Routes,Route,Navigate}from"react-router-dom";
import{StudyProvider}from"./context/StudyContext";
import{TestProvider}from"./context/TestContext";
import{XPToastProvider}from"./context/XPToastContext";
import Sidebar from"./components/layout/Sidebar";
import Dashboard from"./pages/Dashboard";
import Syllabus from"./pages/Syllabus";
import TopicLearning from"./pages/TopicLearning";
import Test from"./pages/Test";
import TestResult from"./pages/TestResult";
import MockTests from"./pages/MockTests";
import Notes from"./pages/Notes";
import FocusTimer from"./pages/FocusTimer";
import Mistakes from"./pages/Mistakes";
import Revision from"./pages/Revision";
import PyqReview from"./pages/PyqReview";
import Timer from"./pages/timer/Timer";
import PageBackground from"./components/ui/PageBackground";
import Missions from"./pages/Missions";
import Analytics from"./pages/Analytics";
import Planner from"./pages/Planner";
import Achievements from"./pages/Achievements";
import AchievementManager from "./components/achievements/AchievementManager";
import BrainTrainer from"./pages/BrainTrainer";
import Developer from"./pages/Developer";
import Progress from"./pages/Progress";
import TopicStage from"./pages/TopicStage";

function App(){
return(
<StudyProvider>
<TestProvider>
<XPToastProvider>
<AchievementManager/>
<BrowserRouter>
<div className="flex h-screen overflow-hidden bg-zinc-950 text-white">
<PageBackground/>
<Sidebar/>
<div className="flex-1 overflow-auto p-4 md:p-8">
<Routes>
<Route path="/" element={<Navigate to="/dashboard" replace/>}/>
<Route path="/dashboard" element={<Dashboard/>}/>
<Route path="/syllabus" element={<Syllabus/>}/>
<Route path="/brain-trainer" element={<BrainTrainer/>}/>
<Route path="/progress" element={<Progress/>}/>
<Route path="/topic/:topicId/:stageId" element={<TopicStage/>}/>
<Route path="/topic/:topicId/:stage" element={<TopicLearning/>}/>
<Route path="/test/:testId" element={<Test/>}/>
<Route path="/test/:testId/result" element={<TestResult/>}/>
<Route path="/mock-tests" element={<MockTests/>}/>
<Route path="/missions" element={<Missions/>}/>
<Route path="/analytics" element={<Analytics/>}/>
<Route path="/planner" element={<Planner/>}/>
<Route path="/developer" element={<Developer/>}/>
<Route path="/notes" element={<Notes/>}/>
<Route path="/focus-timer" element={<FocusTimer/>}/>
<Route path="/mistakes" element={<Mistakes/>}/>
<Route path="/revision" element={<Revision/>}/>
<Route path="/timer" element={<Timer/>}/>
<Route path="/pyq-review" element={<PyqReview/>}/>
<Route path="*" element={<Navigate to="/dashboard" replace/>}/>
<Route path="/achievements" element={<Achievements/>}/>
</Routes>
</div>
</div>
</BrowserRouter>
</XPToastProvider>
</TestProvider>
</StudyProvider>
);
}

export default App;