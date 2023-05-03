function getHTMLCategory(_category) {
    return  `<li class="nav-item" role="presentation"><a href="#`+ _category.id +`" class="nav-link" data-bs-toggle="tab" aria-selected="true" role="tab">`+ _category.name +`</a></li>`;
}

function getHTMLProduct(_categoryId, _product) {

    let picInBytes = "";
    if (_product.picture)
        picInBytes = _product.picture;

    let specificButtons = "";
    if (addonHtml)
        specificButtons = addonHtml(_product.id);

    return `<div class="tab-pane col-md-3 show" id="`+ _categoryId +`" role="tabpanel">
                <div class="card card-sm">
                    <div class="card-header">
                           <h3 class="card-title">`+ _product.name +`</h3>
                           `+ specificButtons +`

                   </div>
                    <div class="card-body">
                        <p class="card-text mb-auto">`+ _product.description +`</p>
                        <div>Prix : `+ _product.price +`€</div>
                    </div>
                     <img src="`+ picInBytes +`" class="card-img-bottom">
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
                    data[i]
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