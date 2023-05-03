function getHTMLCategory(_category) {
    return  `<li class="nav-item" role="presentation"><a href="#`+ _category.id +`" class="nav-link" data-bs-toggle="tab" aria-selected="true" role="tab">`+ _category.name +`</a></li>`;
}

function getHTMLProduct(categoryId, name, description, price, picture) {

    let picInBytes = "";
    if (picture)
        picInBytes = picture;

    return `<div class="tab-pane col-md-3 show" id="`+ categoryId +`" role="tabpanel">
                <div class="card card-sm">
                    <div class="card-body">
                        <h3 class="mb-0">
                            <a class="text-dark" href="#">`+ name +`</a>
                        </h3>
                        <p class="card-text mb-auto">`+ description +`</p>
                        <div>Prix : `+ price +`€</div>
                    </div>
                     <img src="`+ picInBytes +`" class="card-img-bottom">
                    </div>
                </div>
           </div>`;
}

function loadProducts(categories) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);

            let div = document.getElementById("idDivProducts");
            let html = "";
            for (let i=0; data.length>i; i++) {
                // On récupère le nom de la catégorie
                const cat = categories.find(c => c.id == data[i].categoryId);
                let catName = "";
                if (cat)
                    catId = cat.id;

                html += getHTMLProduct(
                    catId,
                    data[i].name,
                    data[i].description,
                    data[i].price,
                    data[i].picture
                );
            }
            div.innerHTML = html;
        }
    };
    xhttp.open("GET", "http://localhost:8081/products", true);
    xhttp.send();
}

function loadCategories(callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);

            let select = document.getElementById("idUlCategories");
            let html = "";
            for (let i=0; data.length>i; i++) {
                html += getHTMLCategory(data[i]);
            }
            select.innerHTML = html;

            if (callback)
                callback(data);
        }
    };
    xhttp.open("GET", "http://localhost:8081/categories", true);
    xhttp.send();
}

$(document).ready(function() {
    //Déjà on charge les catégories ensuite les produits
    loadCategories(
        (categories) => loadProducts(categories)
    );
});