$(document).ready(function() {

    $("#idFormCategory").submit(function(event) {
        event.preventDefault(); // Empêcher le formulaire de soumettre les données via POST

        // Récupérer les valeurs saisies dans le formulaire
        let categoryName = $("#idCategoryName").val();

        // Envoyer les données au backend via une requête POST
        $.ajax({
            type: "POST",
            url: "http://localhost:8081/categories",

            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify({"name": categoryName}),
            success: function(response) {
              // Traiter la réponse du backend
              alert("Votre catégorie a bien été ajoutée !");
              // Rediriger vers la page d'affichage de l'administration
            //  window.location.href = "/admin-page";
            },
            error: function(xhr, status, error) {
              // Gérer les erreurs de la requête
              alert("Erreur dans l'ajout de la catégorie : " + error);
            }
        });
    });
});
