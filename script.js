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
}else{
  items.forEach(item=>item.classList.add('show'));
}