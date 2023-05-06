$(document).ready(function() {

    $(".form_datetime").datepicker($.datepicker.regional[ "fr" ]);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const productId = urlParams.get("id");
    const price = urlParams.get("price");
    const promoPercent = urlParams.get("promoPercent");
    const promoStartMill = urlParams.get("promoStart");
    const promoEndMill = urlParams.get("promoEnd");

    let percentElement = $("#idPercent");
    percentElement.val(promoPercent);

    let dateS = new Date();
    dateS.setTime(promoStartMill);

    let dateE = new Date();
    dateE.setTime(promoEndMill);

    let promotionStartDateElement = $("#promotionStartDate").val(getFormatedDateForDatePicker(dateS));
    let promotionEndDateElement = $("#promotionEndDate").val(getFormatedDateForDatePicker(dateE));

    percentElement.on("change",(event)=>{
        const percent = event.target.value;
        spanEnd.html(getPromoPrice(price, percent));
    });
    setTimeout(() => percentElement.trigger("change"), 0);


    $("#idBasePrice").html(price);
    let spanEnd = $("#idEndPrice");


    $("#idFormPromotion").submit(function(event) {
         event.preventDefault(); // Empêcher le formulaire de soumettre les données via POST

         let promotionStartDate = parseStringToDate(promotionStartDateElement.val());
         let promotionEndDate = parseStringToDate(promotionEndDateElement.val());
         let percent = percentElement.val();

         updatePromotionQuery(productId, promotionStartDate, promotionEndDate, percent, () => {
             window.location.href = "/catalog-admin";
         });

    });

});
