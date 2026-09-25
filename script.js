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