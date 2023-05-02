function loadProducts(categories) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);

            let div = document.getElementById("idDivProductsAdmin");
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