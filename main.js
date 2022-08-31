// //bangla system-----------------
// const input = document.getElementById('input');
// const container = document.getElementById('phone-container');
// const show = document.getElementById('show');
// document.getElementById('btn-search').addEventListener('click', () => {
//     const searchText = input.value;
//     //adding loader --------------------------------
//     container.classList.remove('row-cols-md-4');
//     container.innerHTML = `
//         <div class="d-flex justify-content-center">
//             <div class="spinner-border" role="status">
//             </div>
//         </div>`;
//     //-------------------------------------------------

//     //data display here --------------------
//     fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
//     .then(res => res.json())
//     .then(result => {
//         let results = result.data;
//         container.innerHTML = '';
//         //checking for empty search--------
//         if(results.length === 0){
//             container.innerHTML = `<h3 class="text-danger text-center">Oops! No data had found. Try again search.</h3>`;
//         }

//         //checking for show only first 10 and adding show all button
//         if(results.length > 10){
//             results = results.slice(0,10);
//             console.log(results);
//             results.forEach(phone => {
//                 const div = document.createElement('div');
//                 container.classList.add('row-cols-md-4');
//                 div.classList.add('col');
//                 div.innerHTML = `
//                 <div class="card">
//                 <img src="${phone.image} " class="card-img-top" alt="...">
//                 <div class="card-body">
//                 <h5 class="card-title">${phone.phone_name} </h5>
//                 <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//                 </div>
//                 </div>`;
//                 container.appendChild(div);
//             });
//             show.classList.remove('d-none');
//         } else {
//             results.forEach(phone => {
//                 const div = document.createElement('div');
//                 container.classList.add('row-cols-md-3');
//                 div.classList.add('col');
//                 div.innerHTML = `
//                 <div class="card">
//                 <img src="${phone.image} " class="card-img-top" alt="...">
//                 <div class="card-body">
//                 <h5 class="card-title">${phone.phone_name} </h5>
//                 <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//                 </div>
//                 </div>`;
//                 container.appendChild(div);
//             });
//         }
//     })
// });



// show.addEventListener('click', function () {
//     const searchText = input.value;
//     fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
//     .then(res => res.json())
//     .then(result => {
//         let results = result.data;
//         results = results.slice(10);
//         results.forEach(phone => {
//             const div = document.createElement('div');
//             div.classList.add('col');
//             div.innerHTML = `
//                 <div class="card">
//                     <img src="${phone.image} " class="card-img-top" alt="...">
//                     <div class="card-body">
//                         <h5 class="card-title">${phone.phone_name} </h5>
//                         <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//                     </div>
//                 </div>`;
//                 container.appendChild(div);
//         })
//     })
//     this.classList.add('d-none');
// })



const input = document.getElementById('input');
const container = document.getElementById('phone-container');
const show = document.getElementById('show');
const showModal = document.getElementById('showModal');
// search handler with btn key;
    document.getElementById('btn-search').addEventListener('click', function () {
        loader();
        fetcher();
    })


// search wtih enter button press
input.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        loader();
        fetcher();
    }
})




//----------------
const displayData = (results, isLimited) => {
    container.classList.add('row-cols-md-4')
    container.innerHTML = '';

    if(isLimited && results.length>12){
        results = results.slice(0,12);
        commonDisplay(results);
        show.classList.remove('d-none');
    } else {
        commonDisplay(results);
    }

};


//loader----------------
const loader = () => {
    container.classList.remove('row-cols-md-4');
    container.innerHTML = `
    <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
        </div>
    </div>`;
};

//common displaydata func ------------

const commonDisplay = (results) =>{
    if(results.length === 0) {
        container.classList.remove('row-cols-md-4');
        container.innerHTML = `<h3 class="text-danger text-center">Oops! No data had found. Try again search.</h3>`;
    }
    results.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
        <div class="card">
            <img src="${phone.image} " class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name} </h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button type="button" onclick="loadDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
            </div>
        </div>`;
        container.appendChild(div);
    });
}

//show-all button handleer

show.addEventListener('click', function(){
    fetcher(true);
    this.classList.add('d-none');
})


//common fetcher -----
const fetcher = (show) => {
    const searchText = input.value;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(res => res.json())
    .then(result => {
        const results = result.data;
        if(show){
            displayData(results);
        } else {
            displayData(results,true);
        }
    })
};


//load detail on detail button click
const loadDetails = async id => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const result = await res.json();
    displayPhoneDetail(result.data);
};

//display phonedeatail function------
const displayPhoneDetail = phone => {
    console.log(phone);
    const title = document.getElementById('modalTitle');
    const img = document.getElementById('img');
    title.innerText = `${phone.name}`;
    img.setAttribute('src', `${phone.image}`)
};