const products = [
  {id:1,name:"Core Heavy Hoodie",cat:"Hoodies",tag:"NEW"},
  {id:2,name:"Kult Graphic Hoodie",cat:"Hoodies",tag:"NEW"},
  {id:3,name:"Essential Crew Sweat",cat:"Sweatshirts",tag:"NEW"},
  {id:4,name:"Studio Graphic Sweat",cat:"Sweatshirts",tag:"NEW"},
  {id:5,name:"Transit Puffer Jacket",cat:"Jackets",tag:"NEW"},
  {id:6,name:"Utility Winter Jacket",cat:"Jackets",tag:"NEW"},
  {id:7,name:"Heavy Knit Sweater",cat:"Sweaters",tag:"NEW"},
  {id:8,name:"KULT 001 Limited",cat:"Limited Edition",tag:"LIMITED"}
];

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function card(p){
  return `<article class="product-card" data-name="${p.name.toLowerCase()}" data-cat="${p.cat}" tabindex="0">
    <div class="product-visual">${p.tag === "LIMITED" ? '<span class="badge">LIMITED EDITION</span>' : '<span class="badge">COMING SOON</span>'}</div>
    <div class="product-info"><div><h3>${p.name}</h3><p>${p.cat}</p></div><p class="coming">PRICE SOON</p></div>
  </article>`;
}

function render(list, target){
  $(target).innerHTML = list.map(card).join("");
}

render(products.slice(0,4), "#productGrid");
render(products, "#collectionGrid");

$$(".filter").forEach(btn => btn.addEventListener("click", ()=>{
  $$(".filter").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  const f=btn.dataset.filter;
  render(f==="All"?products:products.filter(p=>p.cat===f), "#collectionGrid");
  observe();
}));

$$("[data-category]").forEach(btn=>btn.addEventListener("click",()=>{
  const f=btn.dataset.category;
  $$(".filter").forEach(b=>b.classList.toggle("active", b.dataset.filter===f));
  render(products.filter(p=>p.cat===f), "#collectionGrid");
  $("#collection").scrollIntoView({behavior:"smooth"});
  observe();
}));

$$("[data-show-all]").forEach(b=>b.addEventListener("click",()=>$("#collection").scrollIntoView({behavior:"smooth"})));

function openDrawer(id){
  closeAll();
  $(id).classList.add("open");
  $(id).setAttribute("aria-hidden","false");
  $("#overlay").classList.add("open");
}

function closeAll(){
  $$(".drawer").forEach(d=>{
    d.classList.remove("open");
    d.setAttribute("aria-hidden","true")
  });
  $("#overlay").classList.remove("open");
  $("#mobileMenu").classList.remove("open");
}

$$("[data-open-cart]").forEach(b=>b.addEventListener("click",e=>{
  e.preventDefault();
  openDrawer("#cartDrawer")
}));

$$("[data-open-account]").forEach(b=>b.addEventListener("click",e=>{
  e.preventDefault();
  openDrawer("#accountDrawer")
}));

$$("[data-open-search]").forEach(b=>b.addEventListener("click",()=>openDrawer("#searchDrawer")));

$$("[data-close-drawer]").forEach(b=>b.addEventListener("click",closeAll));

$("#overlay").addEventListener("click",closeAll);

$("[data-open-menu]").addEventListener("click",()=>$("#mobileMenu").classList.add("open"));

$("[data-close-menu]").addEventListener("click",()=>$("#mobileMenu").classList.remove("open"));

$$(".mobile-menu a").forEach(a=>a.addEventListener("click",()=>$("#mobileMenu").classList.remove("open")));

$("#searchInput").addEventListener("input",e=>{
  const q=e.target.value.trim().toLowerCase();
  const found=q?products.filter(p=>`${p.name} ${p.cat}`.toLowerCase().includes(q)):[];
  $("#searchResults").innerHTML=found.length
    ? found.map(p=>`<div class="search-result"><span>${p.name}</span><small>${p.cat} · COMING SOON</small></div>`).join("")
    : q ? `<p style="color:#666;font-size:12px">No matching KULTWEAR pieces yet.</p>` : "";
});

$("#notifyForm").addEventListener("submit",e=>{
  e.preventDefault();
  const email=$("#notifyEmail").value.trim();
  if(!email)return;
  $("#formMessage").textContent="You're on the list. We'll notify you when the drop is ready.";
  $("#notifyEmail").value="";
});

$("#loginPlaceholder").addEventListener("click",()=>showToast("Authentication will be connected before launch."));

function showToast(msg){
  const t=$("#toast");
  t.textContent=msg;
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),2600)
}

window.addEventListener("scroll",()=>$(".site-header").classList.toggle("scrolled",scrollY>20));

function observe(){
  const els=$$(".reveal:not(.visible)");
  const io=new IntersectionObserver(
    entries=>entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add("visible");
        io.unobserve(e.target)
      }
    }),
    {threshold:.12}
  );
  els.forEach(e=>io.observe(e));
}

observe();
