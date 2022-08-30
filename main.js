//bangla system-----------------
const input = document.getElementById('input');
const container = document.getElementById('phone-container');
const show = document.getElementById('show');
document.getElementById('btn-search').addEventListener('click', () => {
    const searchText = input.value;
    //adding loader --------------------------------
    container.classList.remove('row-cols-md-4');
    container.innerHTML = `
        <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
            </div>
        </div>`;
    //-------------------------------------------------

    //data display here --------------------
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(res => res.json())
    .then(result => {
        let results = result.data;
        container.innerHTML = '';
        //checking for empty search--------
        if(results.length === 0){
            container.innerHTML = `<h3 class="text-danger text-center">Oops! No data had found. Try again search.</h3>`;
        }

        //checking for show only first 10 and adding show all button
        if(results.length > 10){
            results = results.slice(0,10);
            console.log(results);
            results.forEach(phone => {
                const div = document.createElement('div');
                container.classList.add('row-cols-md-4');
                div.classList.add('col');
                div.innerHTML = `
                <div class="card">
                <img src="${phone.image} " class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${phone.phone_name} </h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
                </div>`;
                container.appendChild(div);
            });
            show.classList.remove('d-none');
        } else {
            results.forEach(phone => {
                const div = document.createElement('div');
                container.classList.add('row-cols-md-3');
                div.classList.add('col');
                div.innerHTML = `
                <div class="card">
                <img src="${phone.image} " class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${phone.phone_name} </h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
                </div>`;
                container.appendChild(div);
            });
        }
    })
});



show.addEventListener('click', function () {
    const searchText = input.value;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(res => res.json())
    .then(result => {
        let results = result.data;
        results = results.slice(10);
        results.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card">
                    <img src="${phone.image} " class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${phone.phone_name} </h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                </div>`;
                container.appendChild(div);
        })
    })
    this.classList.add('d-none');
})

