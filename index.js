let fruites = [
    {id:1, title:"Apples", price: 20, img: "https://limejade.com/wp-content/uploads/2020/06/000320251-600x600.jpeg"},
    {id:2, title:"Oranges", price: 10, img: "https://limejade.com/wp-content/uploads/2020/06/000320251-600x600.jpeg"},
    {id:3, title:"Mangos", price: 15, img: "https://limejade.com/wp-content/uploads/2020/06/000320251-600x600.jpeg"}
]
///// Price module
const priceModal = $.modal({
    title: 'Price for rhis',
    closable: true,
    width: '400px',
    footerButtons: [
        {text:"ok", type: "primary", handler(){console.log("primary btn cliced"); priceModal.close()}},
       
    ]
})




const toHtml = fruit =>`
    <div class = 'col'>
        <div class = 'card'>
            <img class="card-img-top" src=${fruit.img}, alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${fruit.title}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary" data-price = 'pricee' data-id = '${fruit.id}'>Watch price</a>
                <a href="#" class="btn btn-danger" data-btn = "remove">Delete</a>
            </div>
        </div>
    </div>`
         

function render(){
    const html = fruites.map(fruit => toHtml(fruit)). join('');
    document.querySelector('#frukti').innerHTML = html
}
render()



document.addEventListener('click', event => {
    let targ = event.target.dataset.price;
    let btnType = event.target.dataset.btn;
    const id = +event.target.dataset.id;
    const frukt = fruites.find(f => f.id === id );
    if (targ == 'pricee') {
        priceModal.open()
        priceModal.setContant( `<p>${frukt.title} price <strong>${frukt.price}</strong></p>`)
    } else if (btnType == 'remove'){
        $.confirm({
            title:'Warning!',
            content: `<p><strong>Are you shour to remove ?</strong></p>`
        }).then(()=> {
            fruites = fruites.filter(f => f.id !== id);
            
            render();                                 ////////////////////////эТА БЛЯДСКАЯ ЕБАНИНА НЕ УДАЛЯЕТ ЁБАНЫЙ ЭЛЕМЕНТ, КАКОГО ХУЯ!!!!!!
           
        }).catch(()=> {
            console.log('cancel')
        })    
    }
})
 
// function showPrice(arr){
    
//     let priceModal = document.createElement('div');
//     priceModal.classList.add ('priceModal');
//     priceModal.insertAdjacentHTML("afterbegin",`
//     <div class="modal-overlay" data-close = "true">
//       <div class="modal-window" >
//         <div class="modal-header">
//           <span class="modal-title">
//            Price
//           </span>
//           <span class="modal-close" data-close = "true"> &times;</span>' }
//         </div>
//         <div class="modal-body" data-content>
          
//         </div>
        
//       </div>
//     </div>
//   `)    
// }    
// let watchPrice = document.querySelector('[data-price]')
// watchPrice.addEventListener('click', showPrice())


//My
// function fruits(fruites){
//   let fruitsWrap = document.createElement('div');
//   fruitsWrap.classList.add('container');
//   fruitsWrap.classList.add('fruitsWrap');
//   fruites.forEach(friut => {
//     let fruitWrap = document.createElement('div');
//     fruitWrap.classList.add('card'); 
//     fruitWrap.insertAdjacentHTML("beforeend",`
//       <img class="card-img-top" src=${arr.img} alt="Card image cap">
//         <div class="card-body">
//         <h5 class="card-title">${arr.title}</h5>
//         <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//         <a href="#" class="btn btn-primary">Watch price</a>
//         <a href="#" class="btn btn-danger">Delete</a>
//         </div>
//     `);
//     fruitsWrap.appendChild(fruitWrap)
//   })
//   return fruitsWrap 
// }