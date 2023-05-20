/**
 * Fonction permettant de donner le HTML d'une catégorie
 * @param {*} _category 
 * @returns 
 */
function getHTMLCategory(_category) {
    return  `<option value="`+ _category.id +`">`+ _category.name +`</option>`;
}

/**
 * Fonction permettant de charger les catégories et de générer le html des catégories
 * @param {*} _callback 
 */
function loadAndGenereUIForCategories(_callback) {

    loadCategories((_result) => 
    {
        let select = document.getElementById("select-tags-advanced");
        let html = "";
        for (let i=0; _result.length>i; i++) {
            html += getHTMLCategory(_result[i]);
        }
        select.innerHTML = html;

        if (_callback)
            _callback(_result);
    });
}

$(document).ready(function() {


    let nameElement = $("#idProductName");
    let categoriesElement = $("#select-tags-advanced");
    let descriptionElement = $("#idDescription");
    let priceElement = $("#idPrice");

    let originalProductId = null;

    const next  = (_categories) => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        if (urlParams.size > 0) {
            document.title = "Modification du produit";
            $("#idH2TitleInPage").html(document.title);
            originalProductId = urlParams.get("id");
            const originalCategoryId = urlParams.get("categoryId");
            const originalName = urlParams.get("name");
            const originalDescription = urlParams.get("description");
            const originalPrice = urlParams.get("price");
            
            nameElement.val(originalName);
            categoriesElement.val(originalCategoryId).change();
            descriptionElement.val(originalDescription);
            priceElement.val(originalPrice);
        }
    };

    loadAndGenereUIForCategories((cats) => next(cats));

    $("#idFormProduct").submit(function(event) {
        event.preventDefault(); // Empêcher le formulaire de soumettre les données via POST

        // Récupérer les valeurs saisies dans le formulaire
        let name = nameElement.val();
        let category = categoriesElement.val();
        let description = descriptionElement.val();
        let price = priceElement.val();
        let fileInput = $("#idPicture");
        let picture = fileInput[0].files[0];

        let afterLoadedFile = (base64) => {
            let prod = getProductObject(null, category, name, description, price, base64);

            if (originalProductId) {
                prod.id = originalProductId;

                updateProductQuery(prod, () => {
                    disableAllButtonForWaitReload();
                    setTimeout(
                        ()=> window.location.href = "/catalog-admin",
                        2500
                     );
                });
            } else {
                addProductQuery(prod, () => {
                    disableAllButtonForWaitReload();
                    setTimeout(
                        ()=> window.location.href = "/catalog-admin",
                        2500
                    );
                });
            }
        }

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
    });
});
