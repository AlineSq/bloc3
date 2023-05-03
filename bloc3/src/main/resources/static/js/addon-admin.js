const addonHtml = function (_idProduct) {

    return `<div class="card-actions btn-actions">
         <a href="#" onclick="deleteProduct(` + _idProduct + `)" class="btn-action">
           <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4"></path><path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"></path></svg>
         </a>
       </div>`;
}

const deleteProduct = function(_idProduct) {
    $.ajax({
            url: 'http://localhost:8081/products/' + _idProduct,
            type: 'DELETE',
            success: function(result) {
                alert('La catégorie a été supprimée avec succès.');
                      // Rediriger vers la page d'affichage de l'administration
                      window.location.href = "/catalog-admin";
            },
            error: function(xhr, status, error) {
                alert("Une erreur s'est produite lors de la suppression de la catégorie : " + error);
            }
        });

}