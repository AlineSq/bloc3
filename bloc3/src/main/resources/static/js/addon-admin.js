const addonHtml = function (_product) {
    //On doit passer les dates en milliseconde pour que l'url soit valide

    return `<div class="card-actions btn-actions">
         <a href='#' onclick='goToPromo(` + _product.id + `,` + _product.price + `,` + _product.promoPercent + `,` + _product.promoStart.getTime() + `,` + _product.promoEnd.getTime() + `)' class='btn-action'>
            <img src='/pictures/promo.png' class='icon' width='24' height='24' viewBox='0 0 24 24' stroke-width='2'></img>
         </a>
         <a href="#" onclick="updateProduct(` + _product.id + `,` + _product.categoryId + `,'` + encodeURIComponent(_product.name).replace(/'/g, '%27') + `','` + encodeURIComponent(_product.description).replace(/'/g, '%27') + `',` + _product.price + `,` + _product.promoPercent + `,` + _product.promoStart.getTime() + `,` + _product.promoEnd.getTime() +  `)" class="btn-action">
            <img src='/pictures/edit.png' class='icon' width='24' height='24' viewBox='0 0 24 24' stroke-width='2'></img>
         </a> 
         <a href="#" onclick="deleteProduct(` + _product.id + `)" class="btn-action">
             <img src='/pictures/trash.png' class='icon' width='24' height='24' viewBox='0 0 24 24' stroke-width='2'></img>
          </a>
       </div>`;
}


const updateProduct = function (_idProduct, _categoryId, _name, _description, _price, _promoPercent, _promoStart, _promoEnd) {
    let queryString = `?id=` + _idProduct +
                        `&categoryId=` + _categoryId +
                        `&name=` + _name +
                        `&description=` + _description +
                        `&price=` + _price +
                        `&promoPercent=` + _promoPercent +
                        `&promoStart=` + _promoStart +
                        `&promoEnd=` + _promoEnd;

    window.location.href="./form-update-product" + queryString;
}


const goToPromo = function(_idProduct, _price, _promoPercent, _promoStart, _promoEnd) {

    let queryString = `?id=` + _idProduct +
                         `&price=` + _price +
                         `&promoPercent=` + _promoPercent +
                         `&promoStart=` + _promoStart+
                         `&promoEnd=` + _promoEnd;

    window.location.href="./form-add-promo" + queryString;
}

const deleteProduct = function(_idProduct) {

    $('#idDialogDeleteProduct').on('click', '#idButtonValidModalDelete', function(_event, _e1, _3e) {
        deleteProductQuery(_idProduct, (result) => {
            loadData();
        });
    });

    $('#idDialogDeleteProduct').modal('show');
}
