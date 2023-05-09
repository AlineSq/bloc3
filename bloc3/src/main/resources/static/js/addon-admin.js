const addonHtml = function (_product) {
    //On doit passer les dates en milliseconde pour que l'url soit valide

    let descript = _product.description.replace("'","&#39;");
    let nameReplace = _product.name.replace("'","&#39;");
    let urlUpdate =`goToUpdateProduct(` + _product.id + `,` + _product.categoryId + `,"` + descript + `","` + nameReplace + `",` + _product.price + `,` + _product.promoPercent + `,` + _product.promoStart.getTime() + `,` + _product.promoEnd.getTime() + `)`;

    return `<div class="card-actions btn-actions">
          <a href="#" onclick='`+urlUpdate+`' class="btn-action">
             <i class="ti ti-edit"></i>
          </a>
          <a href='#' onclick='goToPromo(` + _product.id + `,` + _product.price + `,` + _product.promoPercent + `,` + _product.promoStart.getTime() + `,` + _product.promoEnd.getTime() + `)' class='btn-action'>
            <img src='/pictures/promo.png' class='icon' width='24' height='24' viewBox='0 0 24 24' stroke-width='2'></img>
          </a>
          <a href="#" onclick="deleteProduct(` + _product.id + `)" class="btn-action">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 7l16 0"></path><path d="M10 11l0 6"></path><path d="M14 11l0 6"></path><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12"></path><path d="M9 7v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"></path></svg>
          </a>
       </div>`;
}

const goToUpdateProduct =function(_idProduct, _categoryId, _description, _name, _price, _promoPercent, _promoStart, _promoEnd) {
    debugger;
    let queryString = `?id=` + _idProduct +
                         `&categoryId=` + _categoryId +
                         `&description=` + _description +
                         `&name=` + _name +
                         `&price=` + _price +
                         `&promoPercent=` + _promoPercent +
                         `&promoStart=` + _promoStart+
                         `&promoEnd=` + _promoEnd;

    window.location.href="./form-update-product" + queryString;
}

const goToPromo =function(_idProduct, _price, _promoPercent, _promoStart, _promoEnd) {

    let queryString = `?id=` + _idProduct +
                         `&price=` + _price +
                         `&promoPercent=` + _promoPercent +
                         `&promoStart=` + _promoStart+
                         `&promoEnd=` + _promoEnd;

    window.location.href="./form-add-promo" + queryString;
}

const deleteProduct = function(_idProduct) {
    $.ajax({
            url: 'http://localhost:8081/products/' + _idProduct,
            type: 'DELETE',
            success: function(result) {
                alert('Le produit a été supprimé avec succès.');
                      // Rediriger vers la page d'affichage de l'administration
                      window.location.href = "/catalog-admin";
            },
            error: function(xhr, status, error) {
                alert("Une erreur s'est produite lors de la suppression du produit : " + error);
            }
        });

}