// 2026 인사혁신처 [별표 10], 순서: 소방정감→소방사. 빈 칸은 해당 호봉 없음.
const RANKS=['소방사','소방교','소방장','소방위','소방경','소방령','소방정','소방준감','소방감','소방정감'];
const TABLE=`4905100 4563500 4167700 3619000 3126100 2698600 2507700 2472100 2215300 2133000
5068300 4719000 4307600 3751300 3243100 2814700 2567700 2493100 2245500 2155600
5235600 4876600 4451700 3885800 3364700 2933000 2640000 2539000 2290400 2187500
5406700 5035600 4596800 4023500 3491000 3054900 2758200 2610800 2350700 2229200
5582000 5197000 4744300 4163000 3620600 3178700 2879500 2710600 2427500 2281100
5759400 5358400 4893200 4304000 3752700 3305500 3001800 2826000 2522200 2343900
5939400 5522100 5044000 4446100 3887000 3435100 3125400 2942100 2628900 2418400
6120900 5685500 5195000 4588900 4022900 3565700 3249000 3059100 2731700 2505600
6305100 5850100 5347400 4732300 4159300 3697600 3373300 3170300 2829500 2595100
6490300 6014400 5499600 4875500 4296500 3820800 3490700 3276600 2922200 2680900
6675000 6179600 5652200 5019900 4425000 3937600 3600800 3376800 3012000 2762900
6866100 6350500 5810200 5155900 4548700 4051200 3709400 3475200 3099500 2844100
7058200 6522400 5957200 5282900 4666100 4158400 3812400 3568600 3183800 2922200
7250800 6678100 6093600 5401600 4775600 4261000 3909100 3657900 3264300 2998100
7419100 6821500 6219400 5513300 4879100 4357000 4002700 3743200 3341600 3070500
7568600 6952900 6336500 5618700 4976500 4449500 4090100 3823900 3416300 3140600
7701100 7073900 6445400 5716500 5068100 4535400 4173700 3901400 3486000 3209100
7819100 7184600 6546700 5807900 5154500 4618100 4252700 3975500 3553600 3273000
7924800 7286800 6640300 5893300 5236000 4695400 4327900 4045300 3618500 3335700
8019600 7380000 6728100 5973100 5312400 4768800 4399300 4111700 3680400 3395400
8106800 7465300 6809300 6047600 5384200 4837900 4467200 4175200 3739400 3451600
8184600 7543500 6884500 6117500 5451700 4904700 4531200 4235000 3796100 3506000
8250400 7615000 6953800 6183200 5515300 4965900 4592000 4293000 3850000 3557600
0 7673600 7018800 6245100 5574900 5025200 4650300 4347900 3902200 3607200
0 7729500 7071800 6301600 5631200 5081100 4705700 4399900 3951600 3654200
0 0 7122700 6349600 5684200 5134000 4756500 4449900 3999600 3697100
0 0 7169800 6393700 5728100 5183300 4800000 4492000 4039500 3733900
0 0 0 6436100 5770400 5225600 4841900 4531300 4078000 3769300
0 0 0 0 5809200 5264800 4881500 4569300 4114300 3803400
0 0 0 0 5846900 5303200 4918600 4605800 4149600 3836800
0 0 0 0 0 5338600 4954300 4639900 4183800 3869200
0 0 0 0 0 5372500 0 0 0 0`.split('\n').map(s=>s.split(' ').map(Number).reverse());
const JOB={소방사:175000,소방교:175000,소방장:180000,소방위:185000,소방경:185000,소방령:250000,소방정:400000,소방준감:500000,소방감:650000,소방정감:750000};
// 2026년 성과상여금 지급기준액. 미래 지급분은 사용자의 봉급인상 가정을 반영한 전망치.
const PERFORMANCE_BASE={소방사:2590200,소방교:2994700,소방장:3616600,소방위:4032600,소방경:4461900,소방령:4980200,소방정:5771100,소방준감:6500600,소방감:7130400,소방정감:7748400};
const PERFORMANCE_RATE={B:105,A:125,S:152.5};
const OT_2026={소방사:11175,소방교:12584,소방장:12934,소방위:13779,소방경:15083,소방령:16960};
function overtimeRate(rank,year){const base=OT_2026[rank]??Math.floor((TABLE[9]?.[RANKS.indexOf(rank)]||0)*.55/209*1.5);return Math.round(base*payFactor(year))}
const $=id=>document.getElementById(id), money=n=>Math.round(n||0).toLocaleString('ko-KR')+'원', num=id=>Number($(id).value)||0, positive=n=>Math.max(0,Number(n)||0);
const ids=['year','month','duration','rank','step','stepMonth','service','serviceMonth','promotionYear','promotionMonth','promotionRank','promotionStep','overtime','otRate','nightHours','nightRate','holidayHours','holidayRate','risk','riskExempt','important','special','family','other','travel','duty','welfare','welfareMonth','performanceMonth','performanceGrade','performanceBase','regularBonus','holiday1','holiday2','pensionBase','healthBase','dependents','nonTax','taxFactor','deduction','raise27','raiseLater','healthRate','careRate','pensionRate'];
for(let i=1;i<=12;i++)for(const id of ['month','stepMonth','serviceMonth','promotionMonth','performanceMonth','welfareMonth'])$(id).add(new Option(i+'월',i));
for(const r of RANKS){$('rank').add(new Option(r,r));$('promotionRank').add(new Option(r,r))}
const defaults={month:'10',rank:'소방장',stepMonth:'1',serviceMonth:'1',promotionMonth:'1',promotionRank:'소방위',performanceMonth:'3',welfareMonth:'1'};
for(const [k,v] of Object.entries(defaults))$(k).value=v;
let overrides={},selected=0,results=[];
try{const saved=JSON.parse(localStorage.getItem('fire-pay-planner-v1'));if(saved){for(const id of ids)if(saved.inputs?.[id]!==undefined)$(id).value=saved.inputs[id];overrides=saved.overrides||{};if(saved.inputs&&!('riskExempt' in saved.inputs)){if(saved.inputs.risk==='0')$('risk').value='60000';if(saved.inputs.performanceMonth==='0')$('performanceMonth').value='3'}if(saved.inputs?.performance!==undefined&&!saved.inputs?.performanceGrade&&saved.inputs.performance>0){$('performanceBase').value=saved.inputs.performance;$('performanceGrade').value='A'}}}catch{}
function persist(){const inputs={};for(const id of ids)inputs[id]=$(id).value;localStorage.setItem('fire-pay-planner-v1',JSON.stringify({inputs,overrides}))}
function stepAt(index,start,month){const initial=num('step');const asc=Array.from({length:index+1},(_,i)=>{const d=new Date(start.getFullYear(),start.getMonth()+i,1);return i>0&&d.getMonth()+1===month}).filter(Boolean).length;return Math.min(32,initial+asc)}
function serviceAt(index,start){const a=num('service'),month=num('serviceMonth');const d=new Date(start.getFullYear(),start.getMonth()+index,1);return a+(d.getFullYear()-start.getFullYear())+((d.getMonth()+1>=month?1:0)-(start.getMonth()+1>=month?1:0))}
function regularRate(y){if(y<2)return .10;if(y<5)return .20;if(y<6)return .25;if(y<7)return .30;if(y<8)return .35;if(y<9)return .40;if(y<10)return .45;return .50}
function longevity(y){if(y>=25)return 130000;if(y>=20)return 110000;if(y>=15)return 80000;if(y>=10)return 60000;if(y>=7)return 50000;if(y>=5)return 40000;return 30000}
function payFactor(year){let f=year>=2027?1+num('raise27')/100:1;if(year>=2028)f*=Math.pow(1+num('raiseLater')/100,year-2027);return f}
function salary(r,s,year){let base=TABLE[s-1]?.[RANKS.indexOf(r)]||0;if(!base)return 0;return Math.round(base*payFactor(year)/100)*100}
function performanceAmount(rank,year){const grade=$('performanceGrade').value;if(!grade)return 0;const basis=num('performanceBase')||Math.round(PERFORMANCE_BASE[rank]*payFactor(year));return Math.round(basis*.85106*PERFORMANCE_RATE[grade]/100)}
// 소득세는 공식 간이세액표 직접 조회가 아니라 연환산 추정치.
function approximateIncomeTax(taxable,pension,health,care,dependents){let annual=taxable*12;let earned=annual<=5e6?annual*.7:annual<=15e6?3.5e6+(annual-5e6)*.4:annual<=45e6?7.5e6+(annual-15e6)*.15:annual<=1e8?12e6+(annual-45e6)*.05:14.75e6+(annual-1e8)*.02;earned=Math.min(earned,20e6);let basis=Math.max(0,annual-earned-1.5e6*Math.max(1,dependents)-(pension+health+care)*12);let tax=0,brackets=[[14e6,.06],[50e6,.15],[88e6,.24],[150e6,.35],[300e6,.38],[500e6,.40],[1e9,.42],[Infinity,.45]],last=0;for(const [limit,rate] of brackets){const portion=Math.min(Math.max(0,basis-last),limit-last);tax+=portion*rate;last=limit;if(basis<=limit)break}let credit=tax<=1.3e6?tax*.55:715000+(tax-1.3e6)*.3;let cap=annual<=33e6?740000:annual<=70e6?Math.max(660000,740000-(annual-33e6)*.008):660000;credit=Math.min(credit,cap);return Math.max(0,Math.floor((tax-credit-130000)/120))}
function calc(index){
  const start=new Date(num('year'),num('month')-1,1),d=new Date(start.getFullYear(),start.getMonth()+index,1),y=d.getFullYear(),m=d.getMonth()+1;
  let rank=$('rank').value,step=stepAt(index,start,num('stepMonth')),years=serviceAt(index,start);
  const promo=num('promotionYear')?new Date(num('promotionYear'),num('promotionMonth')-1,1):null;
  if(promo&&d>=promo){rank=$('promotionRank').value;const elapsed=(y-promo.getFullYear())*12+m-(promo.getMonth()+1);step=Math.min(32,num('promotionStep')+Array.from({length:elapsed+1},(_,i)=>{const x=new Date(promo.getFullYear(),promo.getMonth()+i,1);return i>0&&x.getMonth()+1===num('stepMonth')}).filter(Boolean).length)}
  const base=salary(rank,step,y),key=`${y}-${String(m).padStart(2,'0')}`,o=overrides[key]||{};
  const otRate=positive(num('otRate'))||overtimeRate(rank,y);const overtime=Math.floor(positive(o.hours??num('overtime'))*otRate/10)*10,night=positive(o.night??num('nightHours'))*positive(num('nightRate')),holidayWork=positive(o.holiday??num('holidayHours'))*positive(num('holidayRate'));
  const regular=(m===1||m===7)&&num('regularBonus')?Math.round(base*regularRate(years)):0;
  const holiday=m===num('holiday1')||m===num('holiday2')?Math.round(base*.6):0;
  const perf=m===num('performanceMonth')?performanceAmount(rank,y):0;
  const meal=160000,job=JOB[rank],long=longevity(years),risk=positive(num('risk')),riskExempt=positive(num('riskExempt')),important=positive(num('important'));
  const fixed=risk+riskExempt+important+positive(num('special'))+positive(num('family'))+positive(num('other'));
  const extra=positive(o.extra),allowances=meal+job+long+fixed+overtime+night+holidayWork+regular+holiday+perf+extra,gross=base+allowances;
  const taxable=Math.max(0,gross-meal-positive(num('nonTax')));
  const normalTaxable=Math.max(0,base+job+long+fixed+overtime+night+holidayWork-positive(num('nonTax')));
  const factor=payFactor(y)/payFactor(start.getFullYear());
  const pBase=num('pensionBase')?Math.round(num('pensionBase')*factor):normalTaxable,hBase=num('healthBase')?Math.round(num('healthBase')*factor):normalTaxable;
  const pension=Math.round(pBase*num('pensionRate')/100),health=Math.round(hBase*num('healthRate')/200),care=Math.round(health*num('careRate')/100);
  const tax=o.tax!==undefined&&o.tax!==''?positive(o.tax):Math.round(approximateIncomeTax(taxable,pension,health,care,num('dependents'))*num('taxFactor')/100);
  const localTax=Math.floor(tax*.1),otherD=positive(num('deduction'))+positive(o.deduction),deductions=pension+health+care+tax+localTax+otherD;
  const payrollNet=gross-deductions,travel=positive(o.travel??num('travel')),duty=positive(o.duty??num('duty'));
  const welfare=positive(o.welfare??(m===num('welfareMonth')?num('welfare'):0));
  const cashNet=payrollNet+travel+duty,allValue=cashNet+welfare;
  return {key,y,m,rank,step,years,base,otRate,meal,job,long,risk,riskExempt,important,fixed,overtime,night,holidayWork,regular,holiday,perf,extra,allowances,gross,taxable,pension,health,care,tax,localTax,otherD,deductions,payrollNet,travel,duty,welfare,cashNet,allValue};
}
function render(){
  persist();const duration=num('duration');results=Array.from({length:duration},(_,i)=>calc(i));
  const total=results.reduce((a,r)=>a+r.cashNet,0),all=results.reduce((a,r)=>a+r.allValue,0),gross=results.reduce((a,r)=>a+r.gross,0),first=results[0],last=results.at(-1);
  $('heroNet').textContent=money(first.cashNet);$('heroMonth').textContent=`${first.y}년 ${first.m}월 · 통장 수령 예상`;
  $('totalNet').textContent=money(total);$('averageNet').textContent=money(total/duration);$('totalAll').textContent=money(all);$('totalGross').textContent=money(gross);
  $('currentGross').textContent=money(first.gross);$('currentDeduction').textContent='−'+money(first.deductions);$('fixedBreakdown').innerHTML=`<div><span>정액급식비</span><strong>${money(first.meal)}</strong></div><div><span>직급보조비</span><strong>${money(first.job)}</strong></div><div><span>정근수당가산금</span><strong>${money(first.long)}</strong></div><div><span>시간외근무수당</span><strong>${money(first.overtime)}</strong></div>`;for(const id of ['quickOvertime','overviewOvertime'])$(id).value=$('overtime').value;for(const id of ['quickRate','overviewRate','otRatePreview'])$(id).textContent=`${first.rank} 시간당 ${money(first.otRate)} · ${num('otRate')?'직접 입력':'자동 적용'}`;$('periodLabel').textContent=`${first.y}.${String(first.m).padStart(2,'0')} — ${last.y}.${String(last.m).padStart(2,'0')} · ${duration}개월`;
  const previewRank=$('rank').value,previewYear=num('year'),basis=num('performanceBase')||Math.round(PERFORMANCE_BASE[previewRank]*payFactor(previewYear)),rate=PERFORMANCE_RATE[$('performanceGrade').value]||0;
  $('performancePreview').textContent=`지급기준액 ${money(basis)} × 85.106% = 조정기준액 ${money(basis*.85106)} × ${rate}% = ${money(basis*.85106*rate/100)} · ${num('performanceMonth')}월 전망`;
  const max=Math.max(...results.map(r=>Math.max(r.gross,r.cashNet)))*1.06;
  $('chart').innerHTML=results.map(r=>`<div class="column" title="${r.y}년 ${r.m}월 통장 수령 ${money(r.cashNet)}"><div class="gross" style="height:${Math.max(0,r.gross/max*100)}%"></div><div class="net" style="height:${Math.max(0,r.cashNet/max*100)}%"></div></div>`).join('');
  $('rows').innerHTML=results.map((r,i)=>`<tr class="${r.m===1?'yearbreak':''}" data-index="${i}"><td>${r.y}.${String(r.m).padStart(2,'0')} ${overrides[r.key]?'•':''}</td><td>${r.rank} ${r.step}호봉</td><td>${money(r.base)}</td><td>${money(r.gross)}</td><td>${money(r.deductions)}</td><td>${money(r.payrollNet)}</td><td>${money(r.travel+r.duty)}</td><td>${money(r.cashNet)}</td><td>${money(r.welfare)}</td></tr>`).join('');
  const availableYears=[...new Set(results.map(r=>r.y))],picker=$('viewYear'),prior=Number(picker.value);picker.innerHTML=availableYears.map(y=>`<option value="${y}">${y}년</option>`).join('');picker.value=availableYears.includes(prior)?prior:availableYears[0];renderCards();
  $('rows').querySelectorAll('tr').forEach(tr=>tr.onclick=()=>showDetail(Number(tr.dataset.index)));
}
function renderCards(){const year=Number($('viewYear').value);$('mobileMonths').innerHTML=results.map((r,i)=>r.y===year?`<button type="button" class="month-card" data-index="${i}"><span class="month-card-date">${r.m}월 <small>${r.rank} ${r.step}호봉</small></span><strong>${money(r.cashNet)}</strong><span class="month-card-meta">세전 ${money(r.gross)} · 공제 ${money(r.deductions)}${r.travel+r.duty?' · 별도 '+money(r.travel+r.duty):''}${r.welfare?' · 복지 '+money(r.welfare):''}</span><span class="month-card-arrow">›</span></button>`:'').join('');$('mobileMonths').querySelectorAll('button').forEach(el=>el.onclick=()=>showDetail(Number(el.dataset.index)))}
$('viewYear').onchange=renderCards;
for(const id of ['quickOvertime','overviewOvertime'])$(id).addEventListener('input',e=>{$('overtime').value=e.target.value;render()});
document.querySelectorAll('.mobile-nav button').forEach(button=>button.onclick=()=>{document.body.dataset.view=button.dataset.view;document.querySelectorAll('.mobile-nav button').forEach(b=>b.classList.toggle('active',b===button));window.scrollTo({top:0,behavior:'instant'})});
function showDetail(index){
  selected=index;const r=results[index],o=overrides[r.key]||{};$('detailTitle').textContent=`${r.y}년 ${r.m}월 예상 급여`;
  $('breakdown').innerHTML=[['봉급',r.base],['직급보조비',r.job],['정액급식비',r.meal],['정근수당 가산금',r.long],['위험근무수당 (과세)',r.risk],['위험근무수당 가산금 (과세)',r.riskExempt],['중요직무급',r.important],['기타 정기 수당',r.fixed-r.risk-r.riskExempt-r.important],['시간외근무수당',r.overtime],['야간근무수당',r.night],['휴일근무수당',r.holidayWork],['정근수당',r.regular],['명절휴가비',r.holiday],['성과상여금',r.perf],['명세서 추가 지급',r.extra],['명세서 세전 합계',r.gross],['공무원연금 기여금',-r.pension],['건강보험',-r.health],['장기요양보험',-r.care],['소득세 (예상)',-r.tax],['지방소득세 (예상)',-r.localTax],['기타 공제',-r.otherD],['명세서 실수령',r.payrollNet],['출장비 (별도)',r.travel],['당직비 (별도)',r.duty],['통장 수령 예상',r.cashNet],['복지포인트 (현금 아님)',r.welfare],['복지포인트 포함 총합',r.allValue]].filter(([k,v])=>v||k.includes('합계')||k.includes('실수령')||k.includes('수령')).map(([k,v])=>`<div class="${k.includes('통장 수령')||k.includes('총합')?'em':''}"><span>${k}</span><strong>${money(v)}</strong></div>`).join('');
  $('mHours').value=o.hours??num('overtime');$('mNight').value=o.night??num('nightHours');$('mHoliday').value=o.holiday??num('holidayHours');$('mTravel').value=r.travel;$('mDuty').value=r.duty;$('mWelfare').value=r.welfare;$('mExtra').value=o.extra??0;$('mDeduction').value=o.deduction??0;$('mTax').value=o.tax??'';$('detail').showModal();
}
for(const id of ids)$(id).addEventListener('input',render);
$('saveMonth').onclick=()=>{const r=results[selected],tax=$('mTax').value;overrides[r.key]={hours:positive(num('mHours')),night:positive(num('mNight')),holiday:positive(num('mHoliday')),travel:positive(num('mTravel')),duty:positive(num('mDuty')),welfare:positive(num('mWelfare')),extra:positive(num('mExtra')),deduction:positive(num('mDeduction'))};if(tax!=='')overrides[r.key].tax=positive(Number(tax));render();$('detail').close()};
$('reset').onclick=()=>{if(!confirm('입력값과 월별 조정 내역을 초기화할까요?'))return;localStorage.removeItem('fire-pay-planner-v1');location.reload()};
$('csv').onclick=()=>{const headers=['연월','계급','호봉','근무연수','봉급','직급보조비','정액급식비','정근수당가산금','위험근무수당과세','위험근무수당가산금과세','중요직무급','기타정기수당','시간외','야간근무','휴일근무','정근수당','명절휴가비','성과상여금','기타추가지급','명세서세전합계','연금기여금','건강보험','장기요양','소득세예상','지방소득세예상','기타공제','총공제','명세서실수령','출장비별도','당직비별도','통장수령예상','복지포인트','복지포인트포함총합'];const cols=r=>[r.key,r.rank,r.step,r.years,r.base,r.job,r.meal,r.long,r.risk,r.riskExempt,r.important,r.fixed-r.risk-r.riskExempt-r.important,r.overtime,r.night,r.holidayWork,r.regular,r.holiday,r.perf,r.extra,r.gross,r.pension,r.health,r.care,r.tax,r.localTax,r.otherD,r.deductions,r.payrollNet,r.travel,r.duty,r.cashNet,r.welfare,r.allValue];const csv='\ufeff'+[headers,...results.map(cols)].map(row=>row.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(',')).join('\r\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));a.download=`소방공무원_월급전망_${results[0].key}_${results.at(-1).key}.csv`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)};
render();
