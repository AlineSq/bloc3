$(document).ready(function() {

    $(".form_datetime").datepicker(
    {
        isRTL: false,
        format: 'dd.mm.yyyy hh:ii',
        autoclose:true,
        language: 'fr'
     });

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productId = urlParams.get("id");
    const price = urlParams.get("price");

    let percentElement = $("#idPercent");

    $("#idBasePrice").html(price);
    let spanEnd = $("#idEndPrice");

    percentElement.on("change",(event)=>{
        const percent = event.target.value;
        spanEnd.html(price - (price * (percent/100) ) );
    });


     $("#idFormPromotion").submit(function(event) {
            event.preventDefault(); // Empêcher le formulaire de soumettre les données via POST

            let promotionStartDate = $("#promotionStartDate").val();
            let promotionEndDate = $("#promotionEndDate").val();
            let percent = percentElement.val();

            updatePromotionQuery(productId, promotionStartDate, promotionEndDate, percent, () => {
                window.location.href = "/catalog-admin";
            });

     });

});