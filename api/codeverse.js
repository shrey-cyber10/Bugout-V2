const LANGUAGES={c:50,cpp:54,java:62,javascript:63,python:71};
const TESTS={
  'sum-two-numbers':[['7 8','15'],['-12 7','-5'],['0 0','0'],['1000000000 -1','999999999']],
  'even-or-odd':[['17','ODD'],['-8','EVEN'],['0','EVEN'],['999999999','ODD']],
  'reverse-string':[['bugout','tuogub'],['a','a'],['12345','54321'],['race car','rac ecar']],
  'palindrome-check':[['level','YES'],['bugout','NO'],['a','YES'],['abccba','YES']],
  'max-in-array':[['5\n4 9 -2 7 1','9'],['4\n-9 -3 -20 -4','-3'],['1\n42','42'],['6\n1 1 1 1 1 2','2']],
  'fibonacci-n':[['10','55'],['0','0'],['1','1'],['20','6765']],
  'valid-parentheses':[['({[]})','YES'],['([)]','NO'],['','YES'],['(((())))','YES']],
  'two-sum-indices':[['5\n2 7 11 15 3\n10','1 4'],['4\n3 2 4 9\n6','1 2'],['3\n-1 -2 -3\n-5','1 2']],
  'binary-search':[['6\n1 4 7 9 12 20\n9','3'],['5\n2 4 6 8 10\n3','-1'],['1\n99\n99','0']],
  'longest-unique-substring':[['abcabcbb','3'],['bbbbb','1'],['pwwkew','3'],['abcdef','6']],
  'minimum-coins':[['3 11\n1 2 5','3'],['2 3\n2 4','-1'],['1 0\n7','0'],['3 6\n1 3 4','2']],
  'grid-paths':[['3 4','10'],['1 1','1'],['2 2','2'],['4 4','20']]
};
const norm=v=>String(v??'').trim().replace(/\r\n/g,'\n').replace(/[ \t]+$/gm,'');
async function execute(language,source_code,stdin,signal){
  const response=await fetch('https://ce.judge0.com/submissions?base64_encoded=false&wait=true',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({language_id:LANGUAGES[language],source_code,stdin:String(stdin??''),cpu_time_limit:5,memory_limit:128000}),signal});
  if(!response.ok)throw new Error(`Sandbox returned ${response.status}`);
  return response.json();
}
export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),18000);
  try{
    const{language,source_code,stdin='',problem_slug='',mode='run'}=req.body||{};
    if(!LANGUAGES[language])return res.status(400).json({error:'Unsupported language'});
    if(typeof source_code!=='string'||!source_code.trim())return res.status(400).json({error:'Source code is required'});
    if(source_code.length>50000)return res.status(413).json({error:'Source code is too large'});
    if(String(stdin).length>20000)return res.status(413).json({error:'Input is too large'});
    if(mode!=='submit'||!TESTS[problem_slug]){
      const d=await execute(language,source_code,stdin,controller.signal);clearTimeout(timer);res.setHeader('Cache-Control','no-store');return res.status(200).json({stdout:d.stdout||'',stderr:d.stderr||'',compile_output:d.compile_output||'',status:d.status?.description||'Finished',status_id:d.status?.id||0,time:d.time||null,memory:d.memory||null,passed_tests:d.status?.id===3?1:0,total_tests:1});
    }
    const cases=TESTS[problem_slug];
    const results=await Promise.all(cases.map(([input,expected])=>execute(language,source_code,input,controller.signal).then(d=>({input,expected,data:d}))));
    let passed=0,firstFailure=null,totalTime=0,maxMemory=0,compile='',stderr='';
    for(const r of results){const d=r.data;totalTime+=Number(d.time||0);maxMemory=Math.max(maxMemory,Number(d.memory||0));compile=compile||d.compile_output||'';stderr=stderr||d.stderr||'';const ok=d.status?.id===3&&!d.compile_output&&!d.stderr&&norm(d.stdout)===norm(r.expected);if(ok)passed++;else if(!firstFailure)firstFailure={input:r.input,expected:r.expected,actual:d.stdout||'',status:d.status?.description||'Wrong Answer',stderr:d.stderr||'',compile_output:d.compile_output||''}}
    const accepted=passed===cases.length;clearTimeout(timer);res.setHeader('Cache-Control','no-store');return res.status(200).json({stdout:accepted?'All hidden tests passed.':firstFailure?.actual||'',stderr,compile_output:compile,status:accepted?'Accepted':firstFailure?.status||'Wrong Answer',status_id:accepted?3:(firstFailure?.data?.status?.id||0),time:(totalTime/results.length).toFixed(3),memory:maxMemory,passed_tests:passed,total_tests:cases.length,first_failure:firstFailure});
  }catch(error){clearTimeout(timer);const message=error?.name==='AbortError'?'Code execution timed out':'Code execution service is temporarily unavailable';return res.status(502).json({error:message});
  }
}