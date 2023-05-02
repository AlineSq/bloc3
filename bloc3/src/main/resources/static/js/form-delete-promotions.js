function getHTMLPromotion(_promotion) {
    return  `<option value="`+ _promotion.id +`">`+ _promotion.name +`</option>`;
}

function loadPromotions() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);

            let select = document.getElementById("select-tags-advanced");
            let html = "";
            for (let i=0; data.length>i; i++) {
                html += getHTMLPromotion(data[i]);
            }
            select.innerHTML = html;
        }
    };
    xhttp.open("GET", "http://localhost:8081/promotions", true);
    xhttp.send();
}

$(document).ready(function() {
    loadCategories();

    $("#idFormCategory").submit(function(event) {
        event.preventDefault(); // Empêcher le formulaire de soumettre les données via POST

        // Récupérer les valeurs saisies dans le formulaire
        let idCategory = $("#select-tags-advanced").val();

        $.ajax({
            url: 'http://localhost:8081/categories/' + idCategory,
            type: 'DELETE',
            success: function(result) {
                alert('La catégorie a été supprimée avec succès.');
                      // Rediriger vers la page d'affichage de l'administration
                      window.location.href = "/admin-page";
            },
            error: function(xhr, status, error) {
                alert("Une erreur s'est produite lors de la suppression de la catégorie : " + error);
            }
        });
    });
});
