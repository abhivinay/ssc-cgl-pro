"""Import the immutable controller package; never infer answers or verification flags."""
import json,zipfile,hashlib,sys,pathlib
z=zipfile.ZipFile(sys.argv[1]); root=pathlib.Path(__file__).resolve().parents[1]; out=root/'public/pyq-master'; out.mkdir(exist_ok=True)
master='SSC_CGL_2019_2025_MASTER_POST_FINAL_EVIDENCE_HOLD_59_LOCKED.json'
assert hashlib.sha256(z.read(master)).hexdigest()=='8dcfc07d789d8eeb96666918f118e2b8d40dd7487c546597a223560b01dc27ea'
m=json.loads(z.read(master)); e=json.loads(z.read('SSC_CGL_2019_2025_HOLD_EXCLUDED_POST_FINAL_EVIDENCE_HOLD_59.json'))
qs=m['questions']; allowed={q['id'] for q in e['questions']}; names=set(z.namelist())
assert len(qs)==len({q['id'] for q in qs})==20600 and len(allowed)==20352
rows=[]
for q in qs:
 assert len(q['englishOptions'])==4 and q['correctOption'] in 'ABCD'
 assert q['englishOptions']['ABCD'.index(q['correctOption'])]==q['correctAnswer']
 refs=q.get('productionAssetRefs',[]); refs=refs if isinstance(refs,list) else []
 images=[r for r in refs if isinstance(r,str) and r.startswith('assets/production/') and r in names]
 optionImages=q.get('optionAssetRefs',{})
 optionImages=optionImages if isinstance(optionImages,dict) else {}
 optionImages={k:v for k,v in optionImages.items() if isinstance(v,str) and v in images}
 missing=any(r not in names for r in refs) or (q.get('optionMode')=='image' and len(optionImages)!=4) or (q.get('requiresVisualReview',False) and not images)
 rows.append(dict(id=q['id'],question=q['englishQuestion'],options=q['englishOptions'],answer=q['correctOption'],subject=q['subject'],topic=q.get('topic',''),source=q['source'],hold=q['id'] not in allowed,verified=q.get('verified',False),images=images,optionImages=optionImages,visualUnavailable=missing))
for n in names:
 if n.startswith('assets/production/') and '..' not in pathlib.PurePosixPath(n).parts:
  p=out/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(z.read(n))
(out/'questions.json').write_text(json.dumps(rows,separators=(',',':')),encoding='utf-8')
# Preserve exact master and audit bytes outside the runtime question payload.
audit=root/'data/pyq-authoritative';audit.mkdir(parents=True,exist_ok=True)
for n in [master,'FINAL_20600_POST_FINAL_EVIDENCE_HOLD_59_QA.json','FINAL_HOLD_REGISTRY_248_POST_FINAL_EVIDENCE_HOLD_59.json']:(audit/n).write_bytes(z.read(n))
print(json.dumps({'total':len(rows),'nonHold':len(allowed),'hold':248,'visualUnavailable':sum(r['visualUnavailable'] and not r['hold'] for r in rows)}))
