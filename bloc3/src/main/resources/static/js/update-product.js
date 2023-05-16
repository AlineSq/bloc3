function getHTMLCategory(_category) {
    return  `<li class="nav-item" role="presentation"><a href="#`+ _category.id +`" class="nav-link" data-bs-toggle="tab" aria-selected="true" role="tab">`+ _category.name +`</a></li>`;
}

function getHTMLProduct(_categoryId, _product) {

    let picInBytes = "";
    if (_product.picture)
        picInBytes = _product.picture;

    let specificButtons = "";
    if (addonHtml)
        specificButtons = addonHtml(_product);

    let dateNow = new Date();
    let htmlPrice = `Prix : `+ _product.price + `€`;

    if (_product.promoPercent && _product.promoStart <= dateNow &&  dateNow <= _product.promoEnd) {
        htmlPrice = `Prix : <strike>`+ _product.price + `€</strike> <span class='promo-price'>`+ getPromoPrice(_product.price, _product.promoPercent) + `€</span>`;
    }


    return `<div class="card card-sm col-sm-4 col-lg-3 h-50 d-inline-block">
                <div class="card-header">
                       <h3 class="card-title">`+ _product.name +`</h3>
                       `+ specificButtons +`

               </div>
                <div class="card-body">
                    <p class="card-text mb-auto">`+ _product.description +`</p>
                    <div>`+ htmlPrice + `</div>
                    <img src="`+ picInBytes +`" class="card-img-bottom">
                </div>

            </div>`;
}

function loadProducts(categories) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);

            let div = document.getElementById("idDivProducts");
            let html = "";
            let elementActive = false;

            for (let iCat = 0; categories.length > iCat; iCat++){
                let actualCat = categories[iCat];
                html += '<div class="tab-pane row row-deck row-cards" id="'+ actualCat.id +'" role="tabpanel">';
                if (!elementActive)
                    elementActive = true;

                let products = data.filter(p => p.categoryId == actualCat.id);

                for (let i = 0; products.length > i; i++) {

                    // les dates viennent en string, on les reformates
                    products[i].promoStart = new Date(products[i].promoStart);
                    products[i].promoEnd = new Date(products[i].promoEnd);

                    html += getHTMLProduct(
                        actualCat.id,
                        products[i]
                    );
                }

                html += "</div>";
            }
            div.innerHTML = html;

            setTimeout( () => {
                $('#idUlCategories').children().first().children()[0].click()
            }, 0);
        }
    };
    xhttp.open("GET", urlBase+ "products", true);
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
    xhttp.open("GET", urlBase + "categories", true);
    xhttp.send();
}

$(document).ready(function() {
    //Déjà on charge les catégories ensuite les produits
    loadCategories(
        (categories) => loadProducts(categories)
    );
});