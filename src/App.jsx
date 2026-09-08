import{BrowserRouter,Routes,Route,Navigate}from"react-router-dom";
import{StudyProvider}from"./context/StudyContext";
import{TestProvider}from"./context/TestContext";
import{XPToastProvider}from"./context/XPToastContext";
import {Suspense,lazy} from "react";
import AppShell from "./components/layout/AppShell";
import AppErrorBoundary from "./components/layout/AppErrorBoundary";
import PersistenceManager from "./components/layout/PersistenceManager";
import Settings from "./pages/Settings";
const Dashboard=lazy(()=>import("./pages/Dashboard"));
const Syllabus=lazy(()=>import("./pages/Syllabus"));
const Test=lazy(()=>import("./pages/Test"));
const TestResult=lazy(()=>import("./pages/TestResult"));
const MockTests=lazy(()=>import("./pages/MockTests"));
const Notes=lazy(()=>import("./pages/Notes"));
const FocusTimer=lazy(()=>import("./pages/FocusTimer"));
const Mistakes=lazy(()=>import("./pages/Mistakes"));
const Revision=lazy(()=>import("./pages/Revision"));
const PyqReview=lazy(()=>import("./pages/PyqReview"));
const Timer=lazy(()=>import("./pages/timer/Timer"));
const Missions=lazy(()=>import("./pages/Missions"));
const Analytics=lazy(()=>import("./pages/Analytics"));
const Planner=lazy(()=>import("./pages/Planner"));
const Achievements=lazy(()=>import("./pages/Achievements"));
import AchievementManager from"./components/achievements/AchievementManager";
const BrainTrainer=lazy(()=>import("./pages/BrainTrainer"));
const Developer=lazy(()=>import("./pages/Developer"));
const Progress=lazy(()=>import("./pages/Progress"));
const TopicStage=lazy(()=>import("./pages/TopicStage"));
const ReviewCenter=lazy(()=>import("./pages/ReviewCenter"));
const GeminiExtractor=lazy(()=>import("./pages/GeminiExtractor"));

function App(){
return(
<AppErrorBoundary><PersistenceManager/><StudyProvider>
<TestProvider>
<XPToastProvider>
<AchievementManager/>
<BrowserRouter>
<AppShell><Suspense fallback={<p role="status" className="p-8">Loading your workspace…</p>}>
<Routes>
<Route path="/" element={<Navigate to="/dashboard" replace/>}/>
<Route path="/dashboard" element={<Dashboard/>}/>
<Route path="/syllabus" element={<Syllabus/>}/>
<Route path="/brain-trainer" element={<BrainTrainer/>}/>
<Route path="/progress" element={<Progress/>}/>
<Route path="/topic/:topicId/:stageId" element={<TopicStage/>}/>
<Route path="/settings" element={<Settings/>}/>
<Route path="/test/:testId" element={<Test/>}/>
<Route path="/test/:testId/result" element={<TestResult/>}/>
<Route path="/mock-tests" element={<MockTests/>}/>
<Route path="/missions" element={<Missions/>}/>
<Route path="/analytics" element={<Analytics/>}/>
<Route path="/planner" element={<Planner/>}/>
<Route path="/developer" element={import.meta.env.DEV?<Developer/>:<Navigate to="/settings" replace/>}/>
<Route path="/notes" element={<Notes/>}/>
<Route path="/focus-timer" element={<FocusTimer/>}/>
<Route path="/mistakes" element={<Mistakes/>}/>
<Route path="/revision" element={<Revision/>}/>
<Route path="/timer" element={<Timer/>}/>
<Route path="/pyq-review" element={<PyqReview/>}/>
<Route path="/content-studio/extractor" element={<GeminiExtractor/>}/>
<Route path="/content-studio/review" element={<ReviewCenter/>}/>
<Route path="/achievements" element={<Achievements/>}/>
<Route path="*" element={<Navigate to="/dashboard" replace/>}/>
</Routes></Suspense></AppShell>
</BrowserRouter>
</XPToastProvider>
</TestProvider>
</StudyProvider></AppErrorBoundary>
);
}

export default App;
