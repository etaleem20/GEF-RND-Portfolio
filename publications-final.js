(function(){
const PUBLICATION_COVERS=[
{id:'1F3-ji42oj_x5nZEv07UjILoDWIPnC8gZ',title:'Summer Pack Title — Class 4-5 English',category:'Summer Pack',level:'Class 4-5'},
{id:'15KGdym9_fqH5Px0q-Byh-npqKNbuganW',title:'Summer Pack Title — Class 4-5 Urdu',category:'Summer Pack',level:'Class 4-5'},
{id:'1KpPdODoGy0d1aOizHUdAHbOqplIEGj7U',title:'Summer Pack Title — Class 4-5 English',category:'Summer Pack',level:'Class 4-5'},
{id:'1MPmSV_nZD0Qdyc0uBfDS3EPO2KuI9OIw',title:'Summer Pack Title — Class 4-5 Urdu',category:'Summer Pack',level:'Class 4-5'},
{id:'1P0QXllzpYisvJxPsLl-bt2oHboUqNK8h',title:'Summer Pack Title — Class 1-3 English',category:'Summer Pack',level:'Class 1-3'},
{id:'1xl377MA0hFfgJ0JaYe-Q9L4vEDu56bSM',title:'Summer Pack Title — Class 1-3 Urdu',category:'Summer Pack',level:'Class 1-3'},
{id:'1cZx4ReexLYgSY1cjJFy6g7P6Ae7MoCK9',title:'Summer Pack Title — Class 1-3 English',category:'Summer Pack',level:'Class 1-3'},
{id:'11hGx1VFAymOpy1mYXjA1JsWntUO_G0GL',title:'Summer Pack Title — Class 1-3 Urdu',category:'Summer Pack',level:'Class 1-3'},
{id:'1RGD4bQxILHZmw-6p9GzQmLjb-LPy1SWt',title:'Summer Pack Title — Class 1-3 English',category:'Summer Pack',level:'Class 1-3'},
{id:'11gkAgvGJHx4fnCtFwX7FIO-q1EpFo7Mb',title:'Summer Pack Title — Class 1-3 Urdu',category:'Summer Pack',level:'Class 1-3'},
{id:'190eGmwj_O52D4x8ZQCU09-65yfs4N0GV',title:'Summer Pack Title — PG, KC, Prep English',category:'Summer Pack',level:'PG, KC, Prep'},
{id:'1wLqPF6r0R2AiEDZa1Eq-rCrD0TWKrLL8',title:'Summer Pack Title — PG, KC, Prep Urdu',category:'Summer Pack',level:'PG, KC, Prep'},
{id:'1VcUhBLzzG2Pvv8kCa9eLioQANZ0md-hq',title:'Summer Pack Title — PG, KC, Prep English',category:'Summer Pack',level:'PG, KC, Prep'},
{id:'1Az7X9GM8oN8MY2W7QXrqtp2O2mPw99wu',title:'Summer Pack Title — PG, KC, Prep Urdu',category:'Summer Pack',level:'PG, KC, Prep'},
{id:'11A1h2QeE39spk7F-Zw6rMWXrAqNNqrYc',title:'Summer Pack Title — PG, KC, Prep Urdu',category:'Summer Pack',level:'PG, KC, Prep'},
{id:'1CzT-s9k9ajHR12_hgnBwjmCWu7f23jI1',title:'Summer Pack Title — PG, KC, Prep English',category:'Summer Pack',level:'PG, KC, Prep'},
{id:'1jkG0GWMeaQwVCBZ9WqapTmxiMFxEHKCL',title:'Educational Title Cover',category:'Publication Cover',level:'General'}
];
const img=id=>`https://drive.google.com/thumbnail?id=${id}&sz=w1200`;
const safe=s=>String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
function openCover(index){
  if(typeof window.mediaItems==='undefined')return;
  window.mediaItems=PUBLICATION_COVERS.map((item,i)=>({src:img(item.id),title:item.title,caption:`${item.category} — ${item.level} — Cover ${i+1} of ${PUBLICATION_COVERS.length}`}));
  window.mediaIndex=index;
  const modal=document.getElementById('mediaModal');
  if(modal){modal.classList.add('is-open');modal.setAttribute('aria-hidden','false')}
  if(typeof showMedia==='function')showMedia(index);
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