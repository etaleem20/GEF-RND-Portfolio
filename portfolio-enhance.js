let mediaItems=[],mediaIndex=0,mediaTimer=null;
document.addEventListener('DOMContentLoaded',()=>setTimeout(enhancePortfolio,1700));
function enhancePortfolio(){
  addDigitalCategoryCardsFromSheet();
  buildFolderShowcasesFromSheet('developmentGrid',false);
  buildFolderShowcasesFromSheet('digitalGrid',true);
  buildFolderShowcasesFromSheet('trainingGrid',false);
  buildFolderShowcasesFromSheet('competitionsGrid',false);
  bindSlideshows();
  setupModal();
}
function addDigitalCategoryCardsFromSheet(){
  const grid=document.getElementById('digitalGrid');
  if(!grid||grid.querySelector('.digital-category-grid'))return;
  const cards=[...grid.querySelectorAll(':scope > .card')];
  if(!cards.length)return;
  const wrap=document.createElement('div');
  wrap.className='digital-category-grid';
  wrap.innerHTML=cards.slice(0,4).map((card,i)=>{
    const h=txt(card.querySelector('h3'))||'Digital Project';
    const p=txt(card.querySelector('p'))||'Digital learning and media work managed by R&D.';
    return '<div class="digital-mini-card"><span class="num">'+String(i+1).padStart(2,'0')+'</span><h3>'+esc(h)+'</h3><p>'+esc(p)+'</p></div>';
  }).join('');
  grid.prepend(wrap);
}
function buildFolderShowcasesFromSheet(gridId,alternate){
  const grid=document.getElementById(gridId);
  if(!grid)return;
  const cards=[...grid.querySelectorAll(':scope > .card')];
  if(!cards.length)return;
  const groups=new Map();
  cards.forEach(card=>{
    const folderLink=[...card.querySelectorAll('a[href*="drive.google.com/drive/folders/"]')][0];
    if(!folderLink)return;
    const folderId=getFolderId(folderLink.href);
    if(!folderId)return;
    if(!groups.has(folderId))groups.set(folderId,{folderId,cards:[],images:[],title:'',category:'',desc:'',url:folderLink.href});
    const g=groups.get(folderId);
    g.cards.push(card);
    const title=txt(card.querySelector('h3'));
    const category=txt(card.querySelector('.meta span'));
    const desc=txt(card.querySelector('p'));
    const img=card.querySelector('img');
    if(title&&!g.title)g.title=sectionTitleFromGrid(gridId,title,groups.size);
    if(category&&!g.category)g.category=category;
    if(desc&&!g.desc)g.desc=desc;
    if(img&&img.src&&!img.src.startsWith('data:')&&!g.images.includes(img.src))g.images.push(img.src);
  });
  if(!groups.size)return;
  groups.forEach((g,idx)=>{
    if(document.querySelector('.folder-showcase[data-folder-id="'+g.folderId+'"]'))return;
    g.cards.forEach(card=>card.remove());
    const box=document.createElement('article');
    box.className='folder-showcase'+(alternate&&idx%2===1?' is-reverse':'');
    box.dataset.folderId=g.folderId;
    const imgs=g.images.length?g.images.map((src,i)=>'<img class="showcase-thumb '+(i===0?'is-active':'')+'" src="'+escAttr(src)+'" alt="'+escAttr(g.title||'Portfolio')+'">').join(''):'<div class="showcase-empty">Media will appear here after adding active Drive image links in the Google Sheet.</div>';
    box.innerHTML='<div class="showcase-media">'+imgs+'</div><div class="showcase-copy"><span class="label">'+esc(g.category||sectionLabel(gridId))+'</span><h3>'+esc(g.title||sectionLabel(gridId))+'</h3><p>'+esc(g.desc||'Folder-based portfolio media managed through Google Sheet and Google Drive. Add more active rows in the Sheet to expand this showcase.')+'</p><div class="card-actions"><a class="btn primary" href="'+escAttr(g.url)+'">View Slideshow</a></div></div>';
    grid.appendChild(box);
    rotateShowcase(box);
  });
}
function sectionTitleFromGrid(gridId,fallback,count){
  if(gridId==='developmentGrid')return count===1?'Academic Development Portfolio':fallback;
  if(gridId==='digitalGrid')return fallback;
  if(gridId==='trainingGrid')return count===1?'Training Portfolio':fallback;
  if(gridId==='competitionsGrid')return count===1?'Student Competitions Portfolio':fallback;
  return fallback;
}
function sectionLabel(gridId){return({developmentGrid:'Academic Development',digitalGrid:'Digital Media',trainingGrid:'Training & Capacity Building',competitionsGrid:'Student Achievement'}[gridId]||'Portfolio')}
function rotateShowcase(box){const imgs=[...box.querySelectorAll('.showcase-thumb')];let n=0;if(imgs.length>1)setInterval(()=>{imgs[n].classList.remove('is-active');n=(n+1)%imgs.length;imgs[n].classList.add('is-active')},3500)}
function bindSlideshows(){document.querySelectorAll('a[href*="drive.google.com/drive/folders/"]').forEach(a=>{let id=getFolderId(a.href);if(!id||a.dataset.ready)return;a.dataset.ready='1';a.removeAttribute('target');a.textContent='View Slideshow';a.onclick=e=>{e.preventDefault();openFolderSlideshowFromPage(id)}})}
function setupModal(){let c=document.getElementById('mediaClose');if(c){c.innerHTML='&times;';c.onclick=closeMedia}let p=document.getElementById('mediaPrev');if(p)p.onclick=()=>showMedia(mediaIndex-1);let n=document.getElementById('mediaNext');if(n)n.onclick=()=>showMedia(mediaIndex+1);let m=document.getElementById('mediaModal');if(m)m.onclick=e=>{if(e.target===m)closeMedia()};document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMedia()})}
function openFolderSlideshowFromPage(folderId){
  const box=document.querySelector('.folder-showcase[data-folder-id="'+folderId+'"]');
  let imgs=[];
  if(box)imgs=[...box.querySelectorAll('.showcase-thumb')].map(x=>x.src);
  if(!imgs.length){
    const cards=[...document.querySelectorAll('a[href*="'+folderId+'"]').map?.(()=>[])||[]];
  }
  if(!imgs.length)return;
  const title=txt(box?.querySelector('h3'))||'Portfolio Slideshow';
  const desc=txt(box?.querySelector('p'))||'';
  mediaItems=imgs.map((src,i)=>({src,title,caption:desc+' — Image '+(i+1)+' of '+imgs.length}));
  mediaIndex=0;
  let m=document.getElementById('mediaModal');
  if(m){m.classList.add('is-open');m.setAttribute('aria-hidden','false')}
  showMedia(0);clearInterval(mediaTimer);mediaTimer=setInterval(()=>showMedia(mediaIndex+1),4500);
}
function showMedia(i){if(!mediaItems.length)return;mediaIndex=(i+mediaItems.length)%mediaItems.length;let item=mediaItems[mediaIndex];let img=document.getElementById('mediaSlideImage');if(img)img.src=item.src;let t=document.getElementById('mediaSlideTitle');if(t)t.textContent=item.title;let cap=document.getElementById('mediaSlideCaption');if(cap)cap.textContent=item.caption;let count=document.getElementById('mediaCounter');if(count)count.textContent=(mediaIndex+1)+' / '+mediaItems.length}
function closeMedia(){let m=document.getElementById('mediaModal');if(m){m.classList.remove('is-open');m.setAttribute('aria-hidden','true')}clearInterval(mediaTimer)}
function getFolderId(url){let m=String(url||'').match(/folders\/([^/?#]+)/);return m?m[1]:''}
function txt(el){return String(el?.textContent||'').trim()}
function esc(s){return String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function escAttr(s){return esc(s).replace(/`/g,'&#096;')}
