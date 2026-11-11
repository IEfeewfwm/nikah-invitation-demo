(() => {
  'use strict';
  const c = window.INVITATION_CONFIG;
  if (!c) return;
  const $ = (s) => document.querySelector(s);
  const all = (s) => [...document.querySelectorAll(s)];
  const set = (s, value) => all(s).forEach(el => { el.textContent = value; });
  const date = new Date(c.date);
  const validDate = Number.isFinite(date.getTime());
  let zone = c.timeZone;
  try { new Intl.DateTimeFormat('ru-RU', { timeZone: zone }).format(); } catch { zone = 'UTC'; }
  const format = options => new Intl.DateTimeFormat('ru-RU', { timeZone: zone, ...options }).format(date);
  const names = `${c.names.first} и ${c.names.second}`;
  const fullDate = validDate ? format({day:'numeric', month:'long', year:'numeric'}).replace(/\s*г\.$/, '') : 'Дата уточняется';
  set('[data-first]',c.names.first); set('[data-second]',c.names.second);
  set('#hero-message',c.heroMessage); set('.full-date',fullDate);
  if(validDate) {
    set('.header-date',format({day:'2-digit',month:'2-digit',year:'numeric'}));
    set('.date-day',format({day:'numeric'}));
    const parts = new Intl.DateTimeFormat('ru-RU',{timeZone:zone,day:'numeric',month:'long',year:'numeric'}).formatToParts(date);
    set('.date-month-year',`${parts.find(p=>p.type==='month').value} ${parts.find(p=>p.type==='year').value}`);
    const weekday=format({weekday:'long'});set('.date-weekday',weekday[0].toUpperCase()+weekday.slice(1));
  } else { set('.header-date','Дата уточняется');set('.date-day','—');set('.date-month-year','Дата уточняется');set('.date-weekday',''); }
  set('.date-seal>span',`${c.names.first[0] || ''} & ${c.names.second[0] || ''}`);
  set('.location-monogram',`${c.names.first[0] || ''} & ${c.names.second[0] || ''}`);
  set('.venue-name',`«${c.venue}»`);set('.city-name',c.city);set('.city-label',c.city+(c.demo?' · Демо-площадка':''));set('#venue-address',c.address);
  set('#arrival-label',`${c.arrivalTime} — сбор гостей`);
  set('#ceremony-label',`${validDate?format({hour:'2-digit',minute:'2-digit'}):'Время уточняется'} — церемония · ${c.timeZoneLabel}`);
  $('#invitation-text').replaceChildren(...c.invitation.map(text=>{const p=document.createElement('p');p.textContent=text;return p;}));
  $('#schedule-list').replaceChildren(...c.schedule.map(item=>{
    const li=document.createElement('li');li.className='reveal';
    const time=document.createElement('time');time.textContent=item.time;
    const block=document.createElement('div');const h=document.createElement('h3');h.textContent=item.title;
    const p=document.createElement('p');p.textContent=item.description;block.append(h,p);li.append(time,block);return li;
  }));
  const paletteMap={background:'--bg',primary:'--primary',gold:'--gold',text:'--ink',surface:'--surface'};
  for(const [key,prop] of Object.entries(paletteMap))if(/^#[\da-f]{6}$/i.test(c.palette[key]))document.documentElement.style.setProperty(prop,c.palette[key]);
  $('#hero-photo').src=c.images.hero;$('#detail-photo').src=c.images.detail;
  if(!c.demo)all('[data-demo]').forEach(el=>el.hidden=true);
  $('#portfolio').hidden=!c.portfolio.show;
  set('.base-price',new Intl.NumberFormat('ru-RU').format(c.portfolio.basePrice)+' ₽');
  $('#rsvp').hidden=!c.rsvp.show;
  if(c.locationReady && c.city.trim() && c.address.trim()){
    $('#map-link').href='https://yandex.ru/maps/?text='+encodeURIComponent(c.city+', '+c.address);
    $('#map-link').hidden=false;$('#map-placeholder').hidden=true;
  }
  const title=`${names} — приглашение на никах · ${fullDate}`;
  const description=`${names}. Приглашение на никах ${fullDate}.`+(c.demo?' Вымышленное событие — демонстрация для портфолио.':'');
  document.title=title;$('meta[name="description"]').content=description;
  $('meta[property="og:title"]').content=title;$('meta[property="og:description"]').content=description;
  $('meta[name="theme-color"]').content=c.palette.primary;
  if(/^https?:\/\//.test(c.siteUrl))$('meta[property="og:image"]').content=new URL(c.images.hero,c.siteUrl.replace(/\/?$/,'/')).href;
  let lastState='';
  function tick(){
    const remaining=validDate?Math.max(0,Math.floor((date.getTime()-Date.now())/1000)):0;
    const values={days:Math.floor(remaining/86400),hours:Math.floor(remaining/3600)%24,minutes:Math.floor(remaining/60)%60,seconds:remaining%60};
    for(const [key,value] of Object.entries(values))$('#'+key).textContent=String(value).padStart(2,'0');
    const state=!validDate?'Дата встречи скоро появится.':remaining===0?'Наш особенный день настал!':'Считаем мгновения до самого тёплого дня.';
    if(state!==lastState){$('#countdown-status').textContent=state;lastState=state;}
    $('#countdown').setAttribute('aria-label',`До церемонии: ${values.days} дней, ${values.hours} часов, ${values.minutes} минут`);
  }
  tick();const timer=setInterval(tick,1000);addEventListener('pagehide',()=>clearInterval(timer),{once:true});
  addEventListener('pageshow',event=>{if(event.persisted)location.reload();});
  const form=$('#rsvp-form'), name=$('#guest-name'), count=$('#guest-count');
  const maxGuests=Number.isInteger(c.rsvp.maxGuests)&&c.rsvp.maxGuests>0?Math.min(c.rsvp.maxGuests,100):6;
  count.replaceChildren(...Array.from({length:maxGuests},(_,i)=>{const opt=document.createElement('option');opt.value=String(i+1);const n=i+1;const word=n%10===1&&n%100!==11?'гость':n%10>=2&&n%10<=4&&(n%100<12||n%100>14)?'гостя':'гостей';opt.textContent=`${n} ${word}`;return opt;}));
  function clearResult(){$('#form-result').hidden=true;}
  form.addEventListener('input',e=>{clearResult();if(e.target===name){name.removeAttribute('aria-invalid');$('#name-error').textContent='';}});
  form.addEventListener('change',()=>{
    const no=form.elements.attendance.value==='no';$('#guest-count-field').hidden=no;count.disabled=no;
    if(form.elements.attendance.value){$('#attendance-error').textContent='';all('[name="attendance"]').forEach(el=>el.removeAttribute('aria-invalid'));}
    count.removeAttribute('aria-invalid');$('#count-error').textContent='';clearResult();
  });
  form.addEventListener('submit',e=>{
    e.preventDefault();clearResult();let firstInvalid=null;
    const guestName=name.value.trim(), attendance=form.elements.attendance.value;
    const nameValid=guestName.length>=2&&guestName.length<=100&&/\p{L}/u.test(guestName);
    $('#name-error').textContent=nameValid?'':'Введите имя: от 2 до 100 символов, хотя бы одна буква.';
    name.setAttribute('aria-invalid',String(!nameValid));if(!nameValid)firstInvalid=name;
    const attendanceValid=['yes','no'].includes(attendance);
    $('#attendance-error').textContent=attendanceValid?'':'Выберите, сможете ли вы прийти.';
    all('[name="attendance"]').forEach(el=>el.setAttribute('aria-invalid',String(!attendanceValid)));
    if(!attendanceValid&&!firstInvalid)firstInvalid=$('[name="attendance"]');
    const n=Number(count.value), countValid=attendance==='no'||Number.isInteger(n)&&n>=1&&n<=maxGuests;
    $('#count-error').textContent=countValid?'':`Выберите количество гостей от 1 до ${maxGuests}.`;
    count.setAttribute('aria-invalid',String(!countValid));if(!countValid&&!firstInvalid)firstInvalid=count;
    if(firstInvalid){firstInvalid.focus();return;}
    const result=$('#form-result');result.textContent=`${guestName}, ответ заполнен верно. Это демонстрация: отправка отключена, ваши данные не сохранены.`;result.hidden=false;result.focus({preventScroll:true});
  });
  form.querySelector('button[type="submit"]').disabled=false;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  if('IntersectionObserver' in window&&!reduced.matches){
    const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('is-waiting');entry.target.classList.add('is-visible');observer.unobserve(entry.target);}});},{threshold:.08});
    all('.reveal').forEach(el=>{if(el.getBoundingClientRect().top>innerHeight){el.classList.add('is-waiting');observer.observe(el);}});
    reduced.addEventListener('change',()=>{if(reduced.matches){all('.is-waiting').forEach(el=>el.classList.remove('is-waiting'));observer.disconnect();}});
    // Fragment navigation and browser search must never land on invisible content.
    addEventListener('hashchange',()=>{const target=document.getElementById(location.hash.slice(1));if(target)target.querySelectorAll('.is-waiting').forEach(el=>el.classList.remove('is-waiting'));});
  }
})();
