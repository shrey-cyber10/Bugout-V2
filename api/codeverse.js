const LANGUAGES={c:50,cpp:54,java:62,javascript:63,python:71};
export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
  try{
    const{language,source_code,stdin=''}=req.body||{};
    if(!LANGUAGES[language])return res.status(400).json({error:'Unsupported language'});
    if(typeof source_code!=='string'||!source_code.trim())return res.status(400).json({error:'Source code is required'});
    if(source_code.length>50000)return res.status(413).json({error:'Source code is too large'});
    if(String(stdin).length>20000)return res.status(413).json({error:'Input is too large'});
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),12000);
    const response=await fetch('https://ce.judge0.com/submissions?base64_encoded=false&wait=true',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({language_id:LANGUAGES[language],source_code,stdin:String(stdin),cpu_time_limit:5,memory_limit:128000}),signal:controller.signal});
    clearTimeout(timer);
    if(!response.ok)throw new Error(`Sandbox returned ${response.status}`);
    const data=await response.json();
    res.setHeader('Cache-Control','no-store');
    return res.status(200).json({stdout:data.stdout||'',stderr:data.stderr||'',compile_output:data.compile_output||'',status:data.status?.description||'Finished',status_id:data.status?.id||0,time:data.time||null,memory:data.memory||null});
  }catch(error){
    const message=error?.name==='AbortError'?'Code execution timed out':'Code execution service is temporarily unavailable';
    return res.status(502).json({error:message});
  }
}
