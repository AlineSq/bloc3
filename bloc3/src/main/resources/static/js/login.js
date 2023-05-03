$(document).ready(function() {

    $("#idFormLogin").submit(function(event) {
        event.preventDefault(); // Empêcher le formulaire de soumettre les données via POST

        // Récupérer les valeurs saisies dans le formulaire
        let email = $("#idEmail").val();
        let password = $("#idPassword").val();

        loginQuery(
            email,
            password,
            () => { window.location.href = "/catalog-admin"; }
        );
    });
});
