
$(document).ready(function() {
    $("#idFormProduct").submit(function(event) {
        event.preventDefault(); // Empêcher le formulaire de soumettre les données via POST

        // Récupérer les valeurs saisies dans le formulaire
        let name = $("#idProductName").val();
        let category = $("#idCategory").val();
        let description = $("#idDescription").val();
        let price = $("#idPrice").val();
        let fileInput = $("#idPicture");
        let picture = fileInput[0].files[0];

        if(picture) {
            console.log("fichier à charger");

            const reader = new FileReader();
            reader.readAsText(picture);
            reader.onload = (event) => {
                console.log("fichier chargé");
                afterLoadedFile(btoa(unescape(encodeURIComponent(event.target.result))));
            }


        }else{
            console.log("Pas de fichier à charger");
            afterLoadedFile();
        }

        let afterLoadedFile = (bytes) => {
            // Envoyer les données au backend via une requête POST
            $.ajax({
                type: "POST",
                url: "http://localhost:8081/products",

                contentType: "application/json;charset=UTF-8",
                data: JSON.stringify({ "name": name, "description": description, "price": price, "picture": bytes}),
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
