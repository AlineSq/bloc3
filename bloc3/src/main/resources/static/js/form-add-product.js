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
    xhttp.open("GET", "http://localhost:8081/categories", true);
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
            // Envoyer les données au backend via une requête POST
            $.ajax({
                type: "POST",
                url: "http://localhost:8081/products",

                contentType: "application/json;charset=UTF-8",
                data: JSON.stringify({ "categoryId": category, "name": name, "description": description, "price": price, "picture": base64}),
                success: function(response) {
                  // Traiter la réponse du backend
                  alert("Votre produit a bien été ajouté !");
                  // Rediriger vers la page d'affichage de l'administration
                //  window.location.href = "/admin-page";
                },
                error: function(xhr, status, error) {
                  // Gérer les erreurs de la requête
                  alert("Erreur dans l'ajout du produit : " + error);
                }
            });
        };
    });
});
