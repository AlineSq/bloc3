$(document).ready(function() {

    $("#idFormCategory").submit(function(event) {
        event.preventDefault(); // Empêcher le formulaire de soumettre les données via POST

        // Récupérer les valeurs saisies dans le formulaire
        let categoryName = $("#idCategoryName").val();

        addCategoryQuery({"name": categoryName}, () => {
            window.location.href = "/catalog-admin";
        });
    });
});
