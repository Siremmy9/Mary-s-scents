const MS={
 key:{products:'ms_products',
    cart:'ms_cart',
    orders:'ms_orders',
    customers:'ms_customers',
    expenses:'ms_expenses',
    offline:'ms_offline_sales',
    wishlist:'ms_wishlist',
    activities:'ms_activities',
    settings:'ms_settings',
    auth:'ms_admin_auth'},
 wa:'2349135095176',

 money:n=>new Intl.NumberFormat('en-NG',
    {style:'currency',currency:'NGN',
    maximumFractionDigits:0}).format(Number(n)||0),
 id:()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7),
 get(k, fallback=[]){try{return JSON.parse(localStorage.getItem(k)) ?? fallback}catch{
    return fallback}},

 set(k,v){localStorage.setItem(k,JSON.stringify(v))},
 toast(msg){let t=document.querySelector('#toast');if(!t)
    return;
    t.textContent=msg;t.classList.add('show');
    clearTimeout(MS._toast);MS_toast=setTimeout(()=>t.classList.remove('show'),2400)},
 cart(){return MS.get(MS.key.cart,[])},
 saveCart(c){MS.set(MS.key.cart,c);
    document.querySelectorAll('[data-cart-count]').forEach(e=>e.textContent=c.reduce((s,i)=>s+i.qty,0));},
 addCart(id,qty=1){const products=MS.get(MS.key.products,[]),p=products.find(x=>x.id===id);
    if(!p||p.stock<=0)return MS.toast('This product is out of stock.');const c=MS.cart(),
    item=c.find(x=>x.id===id);if(item){if(item.qty+qty>p.stock)return MS.toast('Not enough stock available.');
        item.qty+=qty}else c.push({id,qty});MS.saveCart(c);MS.toast(`${p.name} added to cart.`)},
 removeCart(id){MS.saveCart(MS.cart().filter(i=>i.id!==id))},
 cartCount(){return MS.cart().reduce((s,i)=>s+i.qty,0)},
 cartDetails(){const ps=MS.get(MS.key.products,[]);return MS.cart().map(i=>{const p=ps.find(x=>x.id===i.id);
    return p?{...p,qty:i.qty,line:p.price*i.qty}:null}).filter(Boolean)},
 subtotal(){return MS.cartDetails().reduce((s,i)=>s+i.line,0)},
 log(action){const a=MS.get(MS.key.activities,[]);a.unshift({id:MS.id(),action,
    date:new Date().toISOString()});MS.set(MS.key.activities,a.slice(0,200))},
 initData(){
  if(!localStorage.getItem(MS.key.products))MS.set(MS.key.products,[
   {id:'p1',name:'Mousuf',brand:'Lattafa',category:'For Him',
    price:32000,cost:21000,stock:12,threshold:3,rating:4.8,
    image:'assets/images/mousuf.jpg',desc:'A rich and confident fragrance with a warm, elegant character.'},
   {id:'p2',name:'Yara',brand:'Lattafa',category:'For Her',
    price:28000,cost:18000,stock:18,threshold:4,rating:4.9,
    image:'assets/images/yara.jpg',desc:'A soft, creamy and feminine fragrance made for everyday confidence.'},
   {id:'p3',name:'9PM',brand:'Afnan',category:'For Him',
    price:35000,cost:23000,stock:10,threshold:3,rating:4.8,
    image:'assets/images/9pm.jpg',desc:'A bold evening scent with a smooth, memorable finish.'},
   {id:'p4',name:'Khamrah',brand:'Lattafa',category:'Unisex',
    price:42000,cost:28000,stock:8,threshold:2,rating:4.9,image:'assets/images/khamrah.jpg',desc:'Warm, sweet and luxurious — an expressive signature scent.'},
   {id:'p5',name:'NOW Collection',brand:"Mary's Scent",category:'Gift Sets',
    price:55000,cost:36000,stock:6,threshold:2,rating:4.7,
    image:'assets/images/now-collection.jpg',desc:'A bold fragrance gift set for special occasions.'},
   {id:'p6',name:'KAYALI Collection',brand:'KAYALI',category:'Gift Sets',
    price:62000,cost:42000,stock:5,threshold:2,rating:4.8,
    image:'assets/images/kayali-collection.jpg',desc:'An elegant collection curated for timeless beauty.'}
  ]);

  if(!localStorage.getItem(MS.key.orders))MS.set(MS.key.orders,[]);
  if(!localStorage.getItem(MS.key.expenses))MS.set(MS.key.expenses,[]);
  if(!localStorage.getItem(MS.key.offline))MS.set(MS.key.offline,[]);
  if(!localStorage.getItem(MS.key.wishlist))MS.set(MS.key.wishlist,[]);
  if(!localStorage.getItem(MS.key.activities))MS.set(MS.key.activities,[]);
  if(!localStorage.getItem(MS.key.settings))MS.set(MS.key.settings,{businessName:"Mary's Scent",whatsapp:MS.wa,delivery:3000});
 },
 fmtDate(d){return new Date(d).toLocaleString('en-NG',{dateStyle:'medium',timeStyle:'short'})}
};
MS.initData();
document.addEventListener('DOMContentLoaded',
    ()=>{document.querySelectorAll('[data-cart-count]').forEach(e=>e.textContent=MS.cartCount());
    document.querySelectorAll('[data-menu]').forEach(b=>b.addEventListener('click',
        ()=>document.querySelector('.nav-links')?.classList.toggle('open')));
    document.querySelector('#year')?.append(new Date().getFullYear());
    setTimeout(()=>document.querySelector('.loading')?.classList.add('hide'),500)});
