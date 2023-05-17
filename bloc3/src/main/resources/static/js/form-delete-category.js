function getHTMLCategory(_category) {
    return  `<option value="`+ _category.id +`">`+ _category.name +`</option>`;
}


function loadAndGenereUIForCategories() {

    loadCategories((_result) => 
    {
        let select = document.getElementById("select-tags-advanced");
        let html = "";
        for (let i=0; _result.length>i; i++) {
            html += getHTMLCategory(_result[i]);
        }
        select.innerHTML = html;
    });
}

$(document).ready(function() {
    loadAndGenereUIForCategories();

    $("#idFormCategory").submit(function(event) {
        event.preventDefault(); // Empêcher le formulaire de soumettre les données via POST

        // Récupérer les valeurs saisies dans le formulaire
        let idCategory = $("#select-tags-advanced").val();

        deleteCategoryQuery(
            idCategory,
            () => {
                disableAllButtonForWaitReload();
                setTimeout(
                    ()=> window.location.href = "/catalog-admin",
                    2500
                 );
            }
        );
    });
});
