const FOLDER_MEDIA={
 '1BhBZrLhUP7njMcno0tf4LsR8k0P4Xh8S':['1ie05txKtu6CwSvYFbHbRZrIqpxXMYILQ','1KRsrC-dghPy67XBR7oEqvbMOIdbHmkH1','148GDlPZWui_07ZqKUAyhUSNAsXsRxT6J','14qXYbZGLDnsW1sejnIBF9ozMC3InDlD-','1JiiMReveXuVngB-Stlfm8mKOUPIP4GwO'],
 '1TeUykB1ens1St7hJy0cOF4LROpbO9ogY':['1nyN1QqMANqrzjrOQxiM3rFHLyu-UWg22','1XNhuEKVCkg2cxVpjec1cQbBBHRMQyBNp','1QyoVTPPE7SA5Kj-RYpzlYU-TJRCY8jGF','1qn-r3Kd7kUpZHcXIvKJ434Gbgk7D0HzP'],
 '1tc4hTALKAl0AXTFrPY8k_XSbSwDmOIUx':['1ddtUB2yPRXiw7fw5PqmoyzWgbZ0Z6Dpq','1vErLfzustHfkNrOykLIMXBQr4vRubm_i','1Z9Dj9aCN0Xgwg57GI1ijJWZ0mFmh2vtG','10jZHs91dpN6xJoy1XhlWQrR3h-3OjQA1','18QNCTxTLo3n6l1o0bRxf61FzxfsKjmaX','1G4g38QcsYeOgcVoe_YqXNRpxXBHr6BWS'],
 '1jLq0b3orkXAH06bSejHUExTwIBCc0Rph':[]
};
const FOLDER_LABELS={
 '1BhBZrLhUP7njMcno0tf4LsR8k0P4Xh8S':{name:'Development Images',cat:'Development Portfolio',desc:'A visual collection of academic planning, development work, calendars, study circles, manuals, and school-support resources prepared by R&D.'},
 '1TeUykB1ens1St7hJy0cOF4LROpbO9ogY':{name:'Digital Projects Images',cat:'Digital Portfolio',desc:'A curated visual record of digital learning projects, online education material, creative campaigns, and digital media work.'},
 '1tc4hTALKAl0AXTFrPY8k_XSbSwDmOIUx':{name:'Competitions Images',cat:'Competition Portfolio',desc:'A visual gallery of student competitions, result announcements, award highlights, and creative achievement records.'},
 '1jLq0b3orkXAH06bSejHUExTwIBCc0Rph':{name:'Training Images',cat:'Training Portfolio',desc:'A dedicated gallery for teacher training, workshops, professional development sessions, and capacity-building visuals.'}
};
let mediaItems=[],mediaIndex=0,mediaTimer=null;
document.addEventListener('DOMContentLoaded',()=>setTimeout(enhancePortfolio,1500));
function enhancePortfolio(){normalizeExistingCardsByFolder();addFolderCards();bindSlideshows();let c=document.getElementById('mediaClose');if(c){c.innerHTML='&times;';c.setAttribute('aria-label','Close slideshow');c.onclick=closeMedia}let p=document.getElementById('mediaPrev');if(p)p.onclick=()=>showMedia(mediaIndex-1);let n=document.getElementById('mediaNext');if(n)n.onclick=()=>showMedia(mediaIndex+1);let modal=document.getElementById('mediaModal');if(modal)modal.addEventListener('click',e=>{if(e.target===modal)closeMedia()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMedia()})}
function normalizeExistingCardsByFolder(){document.querySelectorAll('a[href*="drive.google.com/drive/folders/"]').forEach(a=>{let id=getFolderId(a.href);let info=FOLDER_LABELS[id];if(!info)return;let card=a.closest('.card');if(!card)return;let h=card.querySelector('h3');if(h)h.textContent=info.name;let meta=card.querySelector('.meta span');if(meta)meta.textContent=info.cat;let p=card.querySelector('p');if(p)p.textContent=info.desc})}
function addFolderCards(){
 ensureCards('developmentGrid',[folderCard('1BhBZrLhUP7njMcno0tf4LsR8k0P4Xh8S',0),folderCard('1BhBZrLhUP7njMcno0tf4LsR8k0P4Xh8S',1)]);
 ensureCards('digitalGrid',[folderCard('1TeUykB1ens1St7hJy0cOF4LROpbO9ogY',0),folderCard('1TeUykB1ens1St7hJy0cOF4LROpbO9ogY',1)]);
 removeGeneratedTrainingCards();
 ensureCards('competitionsGrid',[folderCard('1tc4hTALKAl0AXTFrPY8k_XSbSwDmOIUx',0),folderCard('1tc4hTALKAl0AXTFrPY8k_XSbSwDmOIUx',1)]);
}
function folderCard(folderId,imgIndex){let info=FOLDER_LABELS[folderId];let ids=FOLDER_MEDIA[folderId]||[];let fileId=ids[imgIndex%ids.length]||ids[0]||'';let img=fileId?'https://drive.google.com/thumbnail?id='+fileId+'&sz=w1200':'assets/logo-placeholder.svg';return '<article class="card generated-card"><img class="card-image" src="'+img+'" alt="'+esc(info.name)+'" loading="lazy"><h3>'+esc(info.name)+'</h3><div class="meta"><span>'+esc(info.cat)+'</span></div><p>'+esc(info.desc)+'</p><div class="card-actions"><a class="btn secondary" href="https://drive.google.com/drive/folders/'+folderId+'">View Slideshow</a></div></article>'}
function removeGeneratedTrainingCards(){let grid=document.getElementById('trainingGrid');if(!grid)return;[...grid.querySelectorAll('.generated-card')].forEach(card=>card.remove())}
function ensureCards(gridId,cards){let grid=document.getElementById(gridId);if(!grid)return;let real=[...grid.children].filter(x=>!x.classList.contains('empty-state')).length;let i=0;while(real<4&&i<cards.length){grid.insertAdjacentHTML('beforeend',cards[i]);real++;i++}}
function bindSlideshows(){document.querySelectorAll('a[href*="drive.google.com/drive/folders/"]').forEach(a=>{const id=getFolderId(a.href);if(!id||a.dataset.ready)return;a.dataset.ready='1';a.removeAttribute('target');a.textContent='View Slideshow';a.addEventListener('click',e=>{e.preventDefault();openFolderSlideshow(id)})})}
function getFolderId(url){const m=String(url||'').match(/folders\/([^/?#]+)/);return m?m[1]:''}
function openFolderSlideshow(folderId){let ids=FOLDER_MEDIA[folderId]||[];let info=FOLDER_LABELS[folderId]||{name:'Portfolio Slideshow',desc:''};if(!ids.length)return;mediaItems=ids.map((id,i)=>({src:'https://drive.google.com/thumbnail?id='+id+'&sz=w1600',title:info.name,caption:info.desc+' — Image '+(i+1)+' of '+ids.length}));mediaIndex=0;let modal=document.getElementById('mediaModal');if(modal){modal.classList.add('is-open');modal.setAttribute('aria-hidden','false')}showMedia(0);clearInterval(mediaTimer);mediaTimer=setInterval(()=>showMedia(mediaIndex+1),4500)}
function showMedia(i){if(!mediaItems.length)return;mediaIndex=(i+mediaItems.length)%mediaItems.length;let item=mediaItems[mediaIndex];let img=document.getElementById('mediaSlideImage');if(img)img.src=item.src;let t=document.getElementById('mediaSlideTitle');if(t)t.textContent=item.title;let cap=document.getElementById('mediaSlideCaption');if(cap)cap.textContent=item.caption;let count=document.getElementById('mediaCounter');if(count)count.textContent=(mediaIndex+1)+' / '+mediaItems.length}
function closeMedia(){let modal=document.getElementById('mediaModal');if(modal){modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true')}clearInterval(mediaTimer)}
function esc(s){return String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
