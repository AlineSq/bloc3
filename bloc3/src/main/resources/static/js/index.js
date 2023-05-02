function getHTMLProduct(categoryName, name, description, price, picture) {

    let picInBytes = "";
    if (picture)
        picInBytes = picture;

    return `<div class="col-md-3">
                <div class="card flex-md-row mb-4 box-shadow h-100">
                    <div class="card-body d-flex flex-column align-items-start">
                        <strong class="d-inline-block mb-2 text-success">`+ categoryName +`</strong>
                        <h3 class="mb-0">
                            <a class="text-dark" href="#">`+ name +`</a>
                        </h3>
                        <p class="card-text mb-auto">`+ description +`</p>
                        <div>Prix : `+ price +`€</div>
                    </div>
                     <img src="`+ picInBytes +`" class="card-img-right flex-auto d-none d-md-block" style="width: 200px; height: 250px;" data-holder-rendered="true">
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
                    catName = cat.name;

                html += getHTMLProduct(
                    catName,
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


function getHTMLCategory(name) {
    return `<li class="nav-item text-green" style="margin: 0 10% 0;">
                <a class="nav-link" href="#">`+ name +`</span></a>
            </li>`;
}

function loadCategories(callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);

            let ul = document.getElementById("idUlCategories");
            let html = "";
            for (let i=0; data.length>i; i++) {
                html += getHTMLCategory(data[i].name);
            }
            ul.innerHTML = html;

            if (callback)
                callback(data);
        }
    };
    xhttp.open("GET", "http://localhost:8081/categories", true);
    xhttp.send();
}

document.addEventListener("DOMContentLoaded", function() {
    //Déjà on charge les catégories ensuite les produits
    loadCategories((categories) => loadProducts(categories));
});




