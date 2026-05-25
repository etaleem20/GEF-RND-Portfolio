let mediaItems=[],mediaIndex=0,mediaTimer=null;
document.addEventListener('DOMContentLoaded',()=>setTimeout(enhancePortfolio,1800));
function enhancePortfolio(){
  hideEmptyOrUnusedSections();
  addDigitalCategoryCardsFromSheet();
  buildFolderShowcasesFromSheet('developmentGrid',false,false);
  buildFolderShowcasesFromSheet('digitalGrid',true,true);
  buildTrainingUploadReady();
  buildFolderShowcasesFromSheet('competitionsGrid',false,false);
  buildEnhancedGallery();
  bindSlideshows();
  setupModal();
}
function hideEmptyOrUnusedSections(){
  const resources=document.getElementById('resources');
  if(resources)resources.style.display='none';
  document.querySelectorAll('.main-nav a[href="#resources"]').forEach(a=>a.style.display='none');
}
function addDigitalCategoryCardsFromSheet(){
  const grid=document.getElementById('digitalGrid');
  if(!grid||grid.querySelector('.digital-category-grid'))return;
  const cards=[...grid.querySelectorAll(':scope > .card')];
  if(!cards.length)return;
  const wrap=document.createElement('div');
  wrap.className='digital-category-grid';
  wrap.innerHTML=cards.slice(0,5).map((card,i)=>{
    const h=txt(card.querySelector('h3'))||'Digital Project';
    const p=txt(card.querySelector('p'))||'Digital learning and media work managed by R&D.';
    return '<div class="digital-mini-card"><span class="num">'+String(i+1).padStart(2,'0')+'</span><h3>'+esc(h)+'</h3><p>'+esc(p)+'</p></div>';
  }).join('');
  grid.prepend(wrap);
}
function buildFolderShowcasesFromSheet(gridId,alternate,rowBased){
  const grid=document.getElementById(gridId);
  if(!grid)return;
  const cards=[...grid.querySelectorAll(':scope > .card')];
  if(!cards.length)return;
  if(rowBased){
    cards.forEach((card,idx)=>{
      const link=[...card.querySelectorAll('a[href*="drive.google.com/drive/folders/"]')][0]||card.querySelector('a');
      const folderId=getFolderId(link?.href||'')||('row-'+gridId+'-'+idx);
      const title=txt(card.querySelector('h3'))||sectionLabel(gridId);
      const category=txt(card.querySelector('.meta span'))||sectionLabel(gridId);
      const desc=txt(card.querySelector('p'))||'Folder-based media managed through Google Sheet and Google Drive.';
      const img=card.querySelector('img');
      const images=img&&img.src&&!img.src.startsWith('data:')?[img.src]:[];
      card.remove();
      appendShowcase(grid,{folderId,title,category,desc,images,url:link?.href||'#'},alternate&&idx%2===1);
    });
    return;
  }
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
  groups.forEach((g,idx)=>{g.cards.forEach(card=>card.remove());appendShowcase(grid,g,alternate&&idx%2===1);});
}
function appendShowcase(grid,g,reverse){
  if(document.querySelector('.folder-showcase[data-folder-id="'+g.folderId+'"]'))return;
  const box=document.createElement('article');
  box.className='folder-showcase'+(reverse?' is-reverse':'');
  box.dataset.folderId=g.folderId;
  const imgs=g.images&&g.images.length?g.images.map((src,i)=>'<img class="showcase-thumb '+(i===0?'is-active':'')+'" src="'+escAttr(src)+'" alt="'+escAttr(g.title||'Portfolio')+'">').join(''):'<div class="showcase-empty">Media will appear here after adding active Drive image links in the Google Sheet.</div>';
  box.innerHTML='<div class="showcase-media">'+imgs+'</div><div class="showcase-copy"><span class="label">'+esc(g.category||'Portfolio')+'</span><h3>'+esc(g.title||'Portfolio')+'</h3><p>'+esc(g.desc||'Folder-based portfolio media managed through Google Sheet and Google Drive.')+'</p><div class="card-actions"><a class="btn primary" href="'+escAttr(g.url||'#')+'">View Slideshow</a></div></div>';
  grid.appendChild(box);
  rotateShowcase(box);
}
function buildTrainingUploadReady(){
  const grid=document.getElementById('trainingGrid');
  if(!grid)return;
  const cards=[...grid.querySelectorAll(':scope > .card')];
  if(cards.length){buildFolderShowcasesFromSheet('trainingGrid',true,true);return;}
  if(!grid.querySelector('.training-placeholder')){
    const box=document.createElement('div');
    box.className='training-placeholder';
    box.innerHTML='<strong>Training Portfolio is ready.</strong><br>Upload training/workshop images in Drive, paste the image links in the Training sheet, and set Status to Active. The slider will appear automatically.';
    grid.appendChild(box);
  }
}
function buildEnhancedGallery(){
  const gallery=document.getElementById('galleryGrid');
  if(!gallery||gallery.querySelector('.gallery-showcase'))return;
  const imgs=[...document.querySelectorAll('.folder-showcase .showcase-thumb')].map(img=>({src:img.src,title:img.alt||'R&D Portfolio Media'})).filter(x=>x.src);
  if(!imgs.length)return;
  gallery.classList.add('enhanced-gallery');
  gallery.innerHTML='<article class="gallery-showcase"><div class="gallery-stage">'+imgs.slice(0,18).map((x,i)=>'<img class="gallery-img '+(i===0?'is-active':'')+'" src="'+escAttr(x.src)+'" alt="'+escAttr(x.title)+'">').join('')+'</div><div class="gallery-copy"><span class="label">Media Gallery</span><h3>R&D Portfolio Visual Highlights</h3><p>Selected visuals from development work, digital learning media, training resources, and student achievement programs are presented here as a live portfolio gallery.</p><button class="btn primary" type="button" id="openGalleryShowcase">Open Gallery Slideshow</button></div></article>';
  const galleryImgs=[...gallery.querySelectorAll('.gallery-img')];
  let n=0;if(galleryImgs.length>1)setInterval(()=>{galleryImgs[n].classList.remove('is-active');n=(n+1)%galleryImgs.length;galleryImgs[n].classList.add('is-active')},3000);
  const btn=document.getElementById('openGalleryShowcase');
  if(btn)btn.onclick=()=>{mediaItems=imgs.map((x,i)=>({src:x.src,title:'R&D Portfolio Visual Highlights',caption:'Image '+(i+1)+' of '+imgs.length}));mediaIndex=0;let m=document.getElementById('mediaModal');if(m){m.classList.add('is-open');m.setAttribute('aria-hidden','false')}showMedia(0);clearInterval(mediaTimer);mediaTimer=setInterval(()=>showMedia(mediaIndex+1),4500)};
}
function sectionTitleFromGrid(gridId,fallback,count){
  if(gridId==='developmentGrid')return count===1?'Academic Development Portfolio':fallback;
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
