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

    $("#idFormCategory").submit(function(event) {
        event.preventDefault(); // Empêcher le formulaire de soumettre les données via POST

        // Récupérer les valeurs saisies dans le formulaire
        let idCategory = $("#select-tags-advanced").val();

        deleteCategoryQuery(
            idCategory,
            () => {
                window.location.href = "/catalog-admin";
            }
        );
    });
});
