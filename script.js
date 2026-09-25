const b=document.getElementById('menuBtn'),m=document.getElementById('mobileMenu');
if(b&&m)b.onclick=()=>m.classList.toggle('open');
document.querySelectorAll('.mobile-menu a').forEach(a=>a.onclick=()=>m&&m.classList.remove('open'));

const f=document.getElementById('leadForm');
if(f)f.onsubmit=e=>{
  e.preventDefault();
  const n=document.getElementById('name').value;
  const p=document.getElementById('phone').value;
  const i=document.getElementById('interest').value||'General enquiry';
  window.open('https://wa.me/918778790980?text='+encodeURIComponent('Hi Unique Fitness, I am '+n+'. My phone number is '+p+'. I am interested in: '+i),'_blank');
};

const reviewForm=document.getElementById('reviewForm');
const reviewList=document.getElementById('userReviewList');
const reviewKey='uniqueFitnessUserReviews';

function getReviews(){
  try{return JSON.parse(localStorage.getItem(reviewKey)||'[]')}catch(e){return[]}
}
function saveReviews(items){
  localStorage.setItem(reviewKey,JSON.stringify(items));
}
function renderReviews(){
  if(!reviewList)return;
  const reviews=getReviews();
  if(!reviews.length){
    reviewList.innerHTML='<div class="empty-reviews">No member-submitted reviews yet. Be the first to share your experience.</div>';
    return;
  }
  reviewList.innerHTML=reviews.slice().reverse().map(r=>{
    const stars='★'.repeat(Number(r.rating))+'☆'.repeat(5-Number(r.rating));
    const safeName=String(r.name).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
    const safeText=String(r.text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
    return '<article class="user-review"><div class="user-review-top"><span class="user-review-name">'+safeName+'</span><span class="user-review-date">'+new Date(r.date).toLocaleDateString('en-IN')+'</span></div><div class="stars">'+stars+'</div><p class="user-review-text">'+safeText+'</p></article>';
  }).join('');
}
if(reviewForm){
  reviewForm.onsubmit=e=>{
    e.preventDefault();
    const name=document.getElementById('reviewName').value.trim();
    const rating=document.querySelector('input[name="rating"]:checked')?.value;
    const reviewText=document.getElementById('reviewText').value.trim();
    if(!name||!rating||!reviewText)return;
    const reviews=getReviews();
    reviews.push({name,rating,text:reviewText,date:new Date().toISOString()});
    saveReviews(reviews);
    reviewForm.reset();
    renderReviews();
  };
  renderReviews();
}

const items=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.12});
  items.forEach(item=>observer.observe(item));
}else items.forEach(item=>item.classList.add('show'));
const galleryInput=document.getElementById('galleryInput');
const customGallery=document.getElementById('customGallery');
const galleryKey='uniqueFitnessCustomGallery';

function getGalleryImages(){
  try{return JSON.parse(localStorage.getItem(galleryKey)||'[]')}catch(e){return[]}
}
function saveGalleryImages(items){
  try{localStorage.setItem(galleryKey,JSON.stringify(items));return true}catch(e){alert('Storage is full. Please remove an old gallery image and try again.');return false}
}
function renderCustomGallery(){
  if(!customGallery)return;
  const items=getGalleryImages();
  customGallery.innerHTML=items.map((src,i)=>'<figure><img src="'+src+'" alt="Added gym photo"><button type="button" data-gallery-index="'+i+'" aria-label="Remove image">×</button></figure>').join('');
}
if(galleryInput){
  galleryInput.onchange=async()=>{
    const files=[...galleryInput.files].filter(file=>file.type.startsWith('image/'));
    const current=getGalleryImages();
    for(const file of files){
      const src=await new Promise(resolve=>{
        const img=new Image(),reader=new FileReader();
        reader.onload=()=>{img.onload=()=>{
          const max=1400,scale=Math.min(1,max/img.width),canvas=document.createElement('canvas');
          canvas.width=Math.round(img.width*scale);canvas.height=Math.round(img.height*scale);
          canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);
          resolve(canvas.toDataURL('image/jpeg',.82));
        };img.src=reader.result};reader.readAsDataURL(file);
      });
      current.push(src);
    }
    if(saveGalleryImages(current))renderCustomGallery();
    galleryInput.value='';
  };
}
if(customGallery){
  customGallery.onclick=e=>{
    const btn=e.target.closest('[data-gallery-index]');
    if(!btn)return;
    const items=getGalleryImages();
    items.splice(Number(btn.dataset.galleryIndex),1);
    saveGalleryImages(items);
    renderCustomGallery();
  };
  renderCustomGallery();
}
