const FOLDER_MEDIA={
 '1BhBZrLhUP7njMcno0tf4LsR8k0P4Xh8S':['1ie05txKtu6CwSvYFbHbRZrIqpxXMYILQ','1KRsrC-dghPy67XBR7oEqvbMOIdbHmkH1','148GDlPZWui_07ZqKUAyhUSNAsXsRxT6J','14qXYbZGLDnsW1sejnIBF9ozMC3InDlD-','1JiiMReveXuVngB-Stlfm8mKOUPIP4GwO'],
 '1TeUykB1ens1St7hJy0cOF4LROpbO9ogY':['1nyN1QqMANqrzjrOQxiM3rFHLyu-UWg22','1XNhuEKVCkg2cxVpjec1cQbBBHRMQyBNp','1QyoVTPPE7SA5Kj-RYpzlYU-TJRCY8jGF','1qn-r3Kd7kUpZHcXIvKJ434Gbgk7D0HzP'],
 '1tc4hTALKAl0AXTFrPY8k_XSbSwDmOIUx':['1ddtUB2yPRXiw7fw5PqmoyzWgbZ0Z6Dpq','1vErLfzustHfkNrOykLIMXBQr4vRubm_i','1Z9Dj9aCN0Xgwg57GI1ijJWZ0mFmh2vtG','10jZHs91dpN6xJoy1XhlWQrR3h-3OjQA1','18QNCTxTLo3n6l1o0bRxf61FzxfsKjmaX','1G4g38QcsYeOgcVoe_YqXNRpxXBHr6BWS']
};
let mediaItems=[],mediaIndex=0,mediaTimer=null;
document.addEventListener('DOMContentLoaded',()=>setTimeout(enhancePortfolio,1500));
function enhancePortfolio(){renameExistingCards();addMissingCards();bindSlideshows();let c=document.getElementById('mediaClose');if(c)c.onclick=closeMedia;let p=document.getElementById('mediaPrev');if(p)p.onclick=()=>showMedia(mediaIndex-1);let n=document.getElementById('mediaNext');if(n)n.onclick=()=>showMedia(mediaIndex+1);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMedia()})}
function renameExistingCards(){
 renameCard('digitalGrid','GEF Educational YouTube Channel','Bano Qabil Project','Digital Learning Initiative','A digital skills and learning initiative presented through selected visual assets and campaign material.');
 renameCard('digitalGrid','Digital Literacy','Digital Literacy Resources','Digital Awareness','Visual learning resources focused on safe, useful, and responsible digital skills.');
 renameCard('competitionsGrid','Poetry Writing Competition','Poetry Writing Competition','Creative Writing','A creative competition to promote poetry, expression, language skills, and appreciation of literary talent.');
 renameCard('competitionsGrid','Speech Competition','Speech Competition','Public Speaking','A competition to build confidence, communication skills, and positive expression among students.');
}
function renameCard(gridId,oldTitle,newTitle,newCat,newDesc){let grid=document.getElementById(gridId);if(!grid)return;[...grid.querySelectorAll('.card')].forEach(card=>{let h=card.querySelector('h3');if(!h||h.textContent.trim()!==oldTitle)return;h.textContent=newTitle;let meta=card.querySelector('.meta span');if(meta)meta.textContent=newCat;let p=card.querySelector('p');if(p)p.textContent=newDesc})}
function addMissingCards(){
 ensureCards('developmentGrid',[
  cardHTML('Teacher Diary','Academic Planning','Teacher diary title and planning material prepared for school academic management.','148GDlPZWui_07ZqKUAyhUSNAsXsRxT6J','1BhBZrLhUP7njMcno0tf4LsR8k0P4Xh8S'),
  cardHTML('School Support System','School Support','School support resources and structured academic planning material for Ghazali schools.','14qXYbZGLDnsW1sejnIBF9ozMC3InDlD-','1BhBZrLhUP7njMcno0tf4LsR8k0P4Xh8S')
 ]);
 ensureCards('digitalGrid',[
  cardHTML('Bano Qabil Project','Digital Learning','Digital learning and skills-development visuals organized for portfolio presentation.','1XNhuEKVCkg2cxVpjec1cQbBBHRMQyBNp','1TeUykB1ens1St7hJy0cOF4LROpbO9ogY'),
  cardHTML('Design & Digital Skills','Creative Learning','Graphic design and digital skills visuals developed for learner awareness and practice.','1QyoVTPPE7SA5Kj-RYpzlYU-TJRCY8jGF','1TeUykB1ens1St7hJy0cOF4LROpbO9ogY')
 ]);
 removeGeneratedTrainingCards();
 ensureCards('competitionsGrid',[
  cardHTML('Ghazali Hoon Result','Student Achievement','Result and recognition visuals from the Ghazali Hoon creative competition.','1ddtUB2yPRXiw7fw5PqmoyzWgbZ0Z6Dpq','1tc4hTALKAl0AXTFrPY8k_XSbSwDmOIUx'),
  cardHTML('Adhan Competition','Islamic Activities','Competition visuals and result highlights from student Adhan programs.','1vErLfzustHfkNrOykLIMXBQr4vRubm_i','1tc4hTALKAl0AXTFrPY8k_XSbSwDmOIUx')
 ])
}
function removeGeneratedTrainingCards(){let grid=document.getElementById('trainingGrid');if(!grid)return;[...grid.querySelectorAll('.card')].forEach(card=>{let h=card.querySelector('h3')?.textContent.trim();if(['Teacher Development','Workshop Resources','Classroom Practice','Learning Sessions'].includes(h))card.remove()})}
function ensureCards(gridId,cards){let grid=document.getElementById(gridId);if(!grid)return;let real=[...grid.children].filter(x=>!x.classList.contains('empty-state')).length;let i=0;while(real<4&&i<cards.length){grid.insertAdjacentHTML('beforeend',cards[i]);real++;i++}}
function cardHTML(title,cat,desc,fileId,folderId){return '<article class="card generated-card"><img class="card-image" src="https://drive.google.com/thumbnail?id='+fileId+'&sz=w1200" alt="'+esc(title)+'" loading="lazy"><h3>'+esc(title)+'</h3><div class="meta"><span>'+esc(cat)+'</span></div><p>'+esc(desc)+'</p><div class="card-actions"><a class="btn secondary" href="https://drive.google.com/drive/folders/'+folderId+'">View Slideshow</a></div></article>'}
function bindSlideshows(){document.querySelectorAll('a[href*="drive.google.com/drive/folders/"]').forEach(a=>{const m=a.href.match(/folders\/([^/?#]+)/);const id=m?m[1]:'';if(!id||a.dataset.ready)return;a.dataset.ready='1';a.removeAttribute('target');a.textContent='View Slideshow';a.addEventListener('click',e=>{e.preventDefault();openFolderSlideshow(id,closestTitle(a))})})}
function closestTitle(el){let card=el.closest('.card');return card&&card.querySelector('h3')?card.querySelector('h3').textContent.trim():'Portfolio Slideshow'}
function openFolderSlideshow(folderId,title){let ids=FOLDER_MEDIA[folderId]||[];if(!ids.length)return;mediaItems=ids.map((id,i)=>({src:'https://drive.google.com/thumbnail?id='+id+'&sz=w1600',title:title,caption:'Image '+(i+1)+' of '+ids.length}));mediaIndex=0;let modal=document.getElementById('mediaModal');if(modal){modal.classList.add('is-open');modal.setAttribute('aria-hidden','false')}showMedia(0);clearInterval(mediaTimer);mediaTimer=setInterval(()=>showMedia(mediaIndex+1),4500)}
function showMedia(i){if(!mediaItems.length)return;mediaIndex=(i+mediaItems.length)%mediaItems.length;let item=mediaItems[mediaIndex];let img=document.getElementById('mediaSlideImage');if(img)img.src=item.src;let t=document.getElementById('mediaSlideTitle');if(t)t.textContent=item.title;let cap=document.getElementById('mediaSlideCaption');if(cap)cap.textContent=item.caption;let count=document.getElementById('mediaCounter');if(count)count.textContent=(mediaIndex+1)+' / '+mediaItems.length}
function closeMedia(){let modal=document.getElementById('mediaModal');if(modal){modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true')}clearInterval(mediaTimer)}
function esc(s){return String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
