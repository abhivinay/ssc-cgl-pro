import {useStudy} from "../../context/StudyContext";

function Topbar(){
const {theme,toggleTheme}=useStudy();

return(
<header className="topbar">
<div>
<h1>Welcome Back, Abhi</h1>
<p>Your preparation command center is ready.</p>
</div>

<div className="topbar-right">
<button className="theme-btn" onClick={toggleTheme}>
{theme==="dark"?"☀ Light":"🌙 Dark"}
</button>
<div className="profile">A</div>
</div>
</header>
);
}

export default Topbar;