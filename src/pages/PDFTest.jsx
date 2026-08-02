import {useState} from "react";
import {extractPDFText,extractQuestions,detectSubject} from "../utils/pdfExtractor";

export default function PDFTest(){
const [loading,setLoading]=useState(false);
const [result,setResult]=useState(null);

const testExtraction=async()=>{
setLoading(true);

const pdfUrl="/pyqs/1770125901_SSC-CGL-Tier-1-Question-Paper-Bilingual-21-September-2025-Shift-2.pdf";

const data=await extractPDFText(String(pdfUrl));

if(data.success){
const questions=extractQuestions(data.text);
const subject=detectSubject(data.text);

setResult({
pages:data.pages,
subject,
questionCount:questions.length,
questions:questions.slice(0,5)
});
}else{
setResult({error:data.error});
}

setLoading(false);
};

return(
<div className="page">
<h2>PDF AI Extraction Test</h2>

<div className="card">
<button
className="primary-btn"
onClick={testExtraction}
disabled={loading}
>
{loading?"Extracting PDF...":"Run AI Extraction"}
</button>
</div>

{result&&(
<div className="card" style={{marginTop:"20px"}}>

{result.error?(
<p>❌ {result.error}</p>
):(
<>
<h3>Extraction Result</h3>

<div className="focus-grid" style={{margin:"16px 0"}}>
<div className="streak-box">
<span>Pages</span>
<h2>{result.pages}</h2>
</div>

<div className="streak-box">
<span>Detected Subject</span>
<h2>{result.subject}</h2>
</div>

<div className="streak-box">
<span>Questions Found</span>
<h2>{result.questionCount}</h2>
</div>
</div>

<h4>Sample Extracted Questions</h4>

{result.questions.length===0?(
<p>No structured questions detected yet.</p>
):(
<div style={{display:"grid",gap:"12px"}}>
{result.questions.map((q,index)=>(
<div
key={index}
style={{
padding:"12px",
border:"1px solid rgba(148,163,184,0.2)",
borderRadius:"12px",
background:"rgba(15,23,42,0.04)"
}}
>
<strong>Q{index+1}.</strong> {q}
</div>
))}
</div>
)}
</>
)}

</div>
)}
</div>
);
}