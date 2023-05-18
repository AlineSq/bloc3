$(document).ready(function() {

    let passwordInput = $("#idPassword");

    $("#idFormLogin").submit(function(event) {
        event.preventDefault(); // Empêcher le formulaire de soumettre les données via POST

        // Récupérer les valeurs saisies dans le formulaire
        let email = $("#idEmail").val();
        let password = passwordInput.val();

        loginQuery(
            email,
            password,
            () => { window.location.href = "/catalog-admin"; }
        );
    });

    $("#idButtonChangePasswordVisility").on("click", (event) => {
        event.preventDefault();

        if (passwordInput.attr("type") == "password")
            passwordInput.attr("type","text");
        else
            passwordInput.attr("type","password");
    });
});
