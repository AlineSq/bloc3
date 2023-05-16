function getHTMLCategory(_category) {
    return  `<option value="`+ _category.id +`">`+ _category.name +`</option>`;
}

function loadCategories() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);

            let select = document.getElementById("select-tags-advanced");
            let html = "";
            for (let i=0; data.length>i; i++) {
                html += getHTMLCategory(data[i]);
            }
            select.innerHTML = html;
        }
    };
    xhttp.open("GET", urlBase + "categories", true);
    xhttp.send();
}

$(document).ready(function() {
    loadCategories();

    $("#idFormProduct").submit(function(event) {
        event.preventDefault(); // Empêcher le formulaire de soumettre les données via POST

        // Récupérer les valeurs saisies dans le formulaire
        let name = $("#idProductName").val();
        let category = $("#select-tags-advanced").val();
        let description = $("#idDescription").val();
        let price = $("#idPrice").val();
        let fileInput = $("#idPicture");
        let picture = fileInput[0].files[0];

        if(picture) {
            console.log("fichier à charger");

            const reader = new FileReader();
            reader.readAsDataURL(picture);
            reader.onload = (event) => {
                console.log("fichier chargé");
                afterLoadedFile(event.target.result);
            }


        }else{
            console.log("Pas de fichier à charger");
            afterLoadedFile();
        }

        let afterLoadedFile = (base64) => {
            addProductQuery(
                { "categoryId": category, "name": name, "description": description, "price": price, "picture": base64},
                () => {
                    setTimeout(
                       ()=> window.location.href = "/catalog-admin",
                       2500
                    );
                }
            );

        };
    });
});
