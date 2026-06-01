(function(){
const PUBLICATION_COVERS=[
{id:'1F3-ji42oj_x5nZEv07UjILoDWIPnC8gZ',title:'Summer Pack',category:'Summer Pack',level:'Class Five'},
{id:'15KGdym9_fqH5Px0q-Byh-npqKNbuganW',title:'سمر پیک',category:'سمر پیک',level:'کلاس پنجم'},
{id:'1KpPdODoGy0d1aOizHUdAHbOqplIEGj7U',title:'Summer Pack',category:'Summer Pack',level:'Class Four'},
{id:'1MPmSV_nZD0Qdyc0uBfDS3EPO2KuI9OIw',title:'سمر پیک',category:'سمر پیک',level:'کلاس چہارم'},
{id:'1P0QXllzpYisvJxPsLl-bt2oHboUqNK8h',title:'Summer Pack',category:'Summer Pack',level:'Class Three'},
{id:'1xl377MA0hFfgJ0JaYe-Q9L4vEDu56bSM',title:'سمر پیک',category:'سمر پیک',level:'کلاس سوم'},
{id:'1cZx4ReexLYgSY1cjJFy6g7P6Ae7MoCK9',title:'Summer Pack',category:'Summer Pack',level:'Class Two'},
{id:'11hGx1VFAymOpy1mYXjA1JsWntUO_G0GL',title:'سمر پیک',category:'سمر پیک',level:'کلاس دوم'},
{id:'1RGD4bQxILHZmw-6p9GzQmLjb-LPy1SWt',title:'Summer Pack',category:'Summer Pack',level:'Class One'},
{id:'11gkAgvGJHx4fnCtFwX7FIO-q1EpFo7Mb',title:'سمر پیک',category:'سمر پیک',level:'کلاس اول'},
{id:'190eGmwj_O52D4x8ZQCU09-65yfs4N0GV',title:'Summer Pack',category:'Summer Pack',level:'Prep'},
{id:'1wLqPF6r0R2AiEDZa1Eq-rCrD0TWKrLL8',title:'سمر پیک',category:'سمر پیک',level:'پریپ'},
{id:'1VcUhBLzzG2Pvv8kCa9eLioQANZ0md-hq',title:'Summer Pack',category:'Summer Pack',level:'KC'},
{id:'1Az7X9GM8oN8MY2W7QXrqtp2O2mPw99wu',title:'سمر پیک',category:'سمر پیک',level:'کے سی'},
{id:'11A1h2QeE39spk7F-Zw6rMWXrAqNNqrYc',title:'سمر پیک',category:'سمر پیک',level:'پی جی'},
{id:'1CzT-s9k9ajHR12_hgnBwjmCWu7f23jI1',title:'Summer Pack',category:'Summer Pack',level:'PG'},
{id:'1jkG0GWMeaQwVCBZ9WqapTmxiMFxEHKCL',title:'Educational Title',category:'Publication Cover',level:'General'}
];
const img=id=>`https://drive.google.com/thumbnail?id=${id}&sz=w1200`;
const safe=s=>String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
let pubIndex=0;
let pubTimer=null;
function pubItems(){return PUBLICATION_COVERS.map((item,i)=>({src:img(item.id),title:item.title,caption:`${item.level} — Cover ${i+1} of ${PUBLICATION_COVERS.length}`}));}
function showPubMedia(i){
  const items=pubItems();
  if(!items.length)return;
  pubIndex=(i+items.length)%items.length;
  const item=items[pubIndex];
  const imageEl=document.getElementById('mediaSlideImage');
  const titleEl=document.getElementById('mediaSlideTitle');
  const captionEl=document.getElementById('mediaSlideCaption');
  const counterEl=document.getElementById('mediaCounter');
  if(imageEl)imageEl.src=item.src;
  if(titleEl)titleEl.textContent=item.title;
  if(captionEl)captionEl.textContent=item.caption;
  if(counterEl)counterEl.textContent=(pubIndex+1)+' / '+items.length;
}
function closePubMedia(){
  const modal=document.getElementById('mediaModal');
  if(modal){modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true')}
  clearInterval(pubTimer);
}
function openCover(index){
  pubIndex=index;
  const modal=document.getElementById('mediaModal');
  if(modal){modal.classList.add('is-open');modal.setAttribute('aria-hidden','false')}
  showPubMedia(index);
  clearInterval(pubTimer);
  pubTimer=setInterval(()=>showPubMedia(pubIndex+1),4500);
  const close=document.getElementById('mediaClose');
  const prev=document.getElementById('mediaPrev');
  const next=document.getElementById('mediaNext');
  if(close){close.innerHTML='&times;';close.onclick=closePubMedia}
  if(prev)prev.onclick=()=>showPubMedia(pubIndex-1);
  if(next)next.onclick=()=>showPubMedia(pubIndex+1);
  if(modal)modal.onclick=e=>{if(e.target===modal)closePubMedia()};
}
function fillSelect(select,values,label){
  if(!select)return;
  select.innerHTML=`<option value="">${safe(label)}</option>`+values.map(v=>`<option value="${safe(v)}">${safe(v)}</option>`).join('');
}
function render(){
  const grid=document.getElementById('publicationsGrid');
  if(!grid)return;
  const q=(document.getElementById('publicationSearch')?.value||'').toLowerCase().trim();
  const cat=(document.getElementById('publicationCategoryFilter')?.value||'').toLowerCase().trim();
  const av=(document.getElementById('publicationAvailabilityFilter')?.value||'').toLowerCase().trim();
  const rows=PUBLICATION_COVERS.filter(item=>{
    const text=[item.title,item.category,item.level,'Available'].join(' ').toLowerCase();
    return (!q||text.includes(q))&&(!cat||item.category.toLowerCase()===cat)&&(!av||av==='available');
  });
  grid.innerHTML=rows.length?rows.map(item=>{
    const originalIndex=PUBLICATION_COVERS.indexOf(item);
    return `<article class="card publication-card"><img class="card-image publication-cover" src="${img(item.id)}" alt="${safe(item.title)}" loading="lazy" referrerpolicy="no-referrer"><div class="publication-card-body"><h3>${safe(item.title)}</h3><div class="meta"><span>${safe(item.category)}</span><span>${safe(item.level)}</span></div><p>Selected cover/title visual from R&D publication and learning-resource portfolio.</p><div class="price-row"><span><strong>Status:</strong> Available</span><span class="availability is-available">Available</span></div><div class="card-actions publication-actions"><button class="btn secondary" type="button" data-cover-index="${originalIndex}">View Cover</button></div></div></article>`;
  }).join(''):'<div class="empty-state">No publication matches the selected search/filter.</div>';
  grid.querySelectorAll('[data-cover-index]').forEach(btn=>btn.addEventListener('click',()=>openCover(Number(btn.dataset.coverIndex))));
}
function init(){
  const grid=document.getElementById('publicationsGrid');
  if(!grid)return;
  const categoryFilter=document.getElementById('publicationCategoryFilter');
  const availabilityFilter=document.getElementById('publicationAvailabilityFilter');
  fillSelect(categoryFilter,[...new Set(PUBLICATION_COVERS.map(x=>x.category))].sort(),'All Categories');
  fillSelect(availabilityFilter,['Available'],'All Availability');
  ['publicationSearch','publicationCategoryFilter','publicationAvailabilityFilter'].forEach(id=>{
    const el=document.getElementById(id);
    if(el){el.addEventListener('input',render);el.addEventListener('change',render)}
  });
  render();
}
window.addEventListener('load',()=>setTimeout(init,3600));
})();