/**
 * Fonction générique permettant simplifier la création d'une requête
 * @param {*} _urlEnd 
 * @param {*} _type 
 * @param {*} _contentType 
 * @param {*} _data 
 * @param {*} _successCallBack 
 * @param {*} _errorCallBack 
 */
const myQuery = function(_urlEnd, _type, _contentType, _data, _successCallBack, _errorCallBack) {
    let optionQuery = {
        url: urlBase + _urlEnd,
        type: _type,
        success: function(result) {
            if (_successCallBack)
                _successCallBack(result);
        },
        error: function(xhr) {
            if (xhr?.responseJSON?.status == 401)
                window.location.href = "/login-mercado";

            if (_errorCallBack)
                _errorCallBack(xhr?.responseJSON);
        },
    };

    const token = localStorage.getItem('token');

    if (token) {
        optionQuery.headers = {
            'Authorization': 'Bearer ' + token
        };
    }

    if (_contentType)
        optionQuery.contentType = _contentType;

    if (_data)
        optionQuery.data = JSON.stringify(_data);

    $.ajax(optionQuery);
}


/**
 * Fonction permettant de se déconnecter
 */
const logout = function() {
    myQuery("users/logout", "POST", null, null, () => {
        window.location.href = "/login-mercado";
      });
  }


/**
 * Fonction permettant de déclencer un requête de suppression
 * @param {*} _urlEnd 
 * @param {*} _successCallBack 
 */ 
const deleteQuery = function(_urlEnd, _successCallBack) {
    myQuery(
        _urlEnd,
        'DELETE',
        null,
        null,
        _successCallBack,
        (_error) => {
            console.log(_error);
            notify("Une erreur s'est produite lors de la suppression : "+ _error?.message , 'warning');
        }
    );
}

/**
 * Fonction permettant de supprimer une catégorie
 * @param {*} _id 
 * @param {*} _successCallBack 
 */
const deleteCategoryQuery = function(_id, _successCallBack) {
    deleteQuery(
        'categories/' + _id,
         (_result) => {
             if (_successCallBack)
                 _successCallBack(_result);
             notify("Votre catégorie a bien été supprimée !", 'success');
         }
    );
}

/**
 * Fonction permettant de supprimer un produit
 * @param {*} _id 
 * @param {*} _successCallBack 
 */
const deleteProductQuery = function(_id, _successCallBack) {
    deleteQuery(
        'products/' + _id,
         (_result) => {
            debugger;
             if (_successCallBack)
                  _successCallBack(_result);
             notify("Votre produit a bien été supprimé !", 'success');
         }
    );
}

/**
 * Fonction permettant de déclencher une requête d'ajout
 * @param {*} _urlEnd 
 * @param {*} _data 
 * @param {*} _successCallBack 
 */
const addQuery = function(_urlEnd, _data, _successCallBack) {
    myQuery(
        _urlEnd,
        'POST',
        'application/json;charset=UTF-8',
        _data,
        _successCallBack,
        (_error) => {
            console.log(_error);
            notify("Une erreur s'est produite lors de la suppression : "+ _error?.message , 'warning');
        }
    );
}

/**
 * Fonction permettant d'ajouter un produit
 * @param {!} _data 
 * @param {*} _successCallBack 
 */
const addProductQuery = function(_data, _successCallBack) {
    addQuery(
        'products',
        _data,
        (_result) => {

            notify("Votre produit a bien été ajouté !", 'success');

            if (_successCallBack)
                _successCallBack(_result);

        }
    );
}

/**
 * Fonction permettant d'ajouter un produit
 * @param {*} _data 
 * @param {*} _successCallBack 
 */
const addCategoryQuery = function(_data, _successCallBack) {
     addQuery(
         'categories',
         _data,
         (_result) => {
             if (_successCallBack)
                _successCallBack(_result);
             notify("Votre catégorie a bien été ajoutée !", 'success');
         }
     );
}

/**
 * Fonction permettant de se loguer
 * @param {*} _login 
 * @param {*} _password 
 * @param {*} _successCallBack 
 */
const loginQuery = function(_login, _password, _successCallBack) {
    myQuery(
        'users/login',
        'POST',
        'application/json;charset=UTF-8',
        {login : _login, password : _password},
        (_result) => {
            localStorage.setItem('token', _result);
            if (_successCallBack)
                _successCallBack(_result);
        },
        (_error) => {
            console.log(_error);
            notify(_error.message);
        }
    );
}



/**
 * Fonction permettant de se loguer
 * @param {*} _login 
 * @param {*} _password 
 * @param {*} _successCallBack 
 */
const checkQuery = function(_successCallBack) {
    myQuery(
        'users/check',
        'POST',
        'application/json;charset=UTF-8',
        (_result) => {
            if (_successCallBack)
                _successCallBack(_result);
        },
        (_error) => {
            console.log(_error);
            notify(_error.message);
        }
    );
}


/**
 * Fonction permettant de déclencher une méthode de mise à jour
 * @param {*} _urlEnd 
 * @param {*} _data 
 * @param {*} _successCallBack 
 */
const updateQuery = function(_urlEnd, _data, _successCallBack) {
    myQuery(
        _urlEnd,
        'PUT',
        'application/json;charset=UTF-8',
        _data,
        _successCallBack,
        (_error) => {
            console.log(_error);
            notify("Une erreur s'est produite lors de la mise à jour : "+ _error?.message , 'warning');
        }
    );
}

/**
 * Fonction permettant de mettre à jour un produit
 * @param {*} _data 
 * @param {*} _successCallBack 
 */
const updateProductQuery = function(_data, _successCallBack) {
    updateQuery(
        'products/'+ _data.id,
        _data,
        (result) => {
            notify("Votre produit a été mis à jour !", 'success');

            if (_successCallBack)
                _successCallBack(result);
        }
    );
 }

 /**
  * Fonction permettant de modifier une promotion
  */
const changePromotionQuery = function(_productId, _promotionStartDate, _promotionEndDate, _percent, _successCallBack) {

    let s = getFormatedDateForBack(_promotionStartDate);
    let e = getFormatedDateForBack(_promotionEndDate);

    myQuery(
        'products/updatePromotion',
        'POST',
        'application/json;charset=UTF-8',
        { "id": _productId, "promoStart": s, "promoEnd": e, "promoPercent":_percent},
        _successCallBack,
        (_error) => {
            console.log(_error);
            notify("Une erreur s'est produite lors de la mise à jour de la promotion : "+ _error?.message , 'warning');
        }
    );
}

/**
 * Fonction permettant de charger les catégories
 * @param {*} callback 
 */
function loadCategories(callback) {

    myQuery("categories", "GET", null, null, (result) => {
        if (callback)
            callback(result);
    });
}


/**
 * Fonction permettant de convertir une date pour le datepicker de JQuery
 * @param {*} _date 
 * @returns 
 */
const getFormatedDateForDatePicker = function(_date){
    let month = ('0' + (_date.getMonth() + 1)).slice(-2);
    let day = ('0' + _date.getDate()).slice(-2);
    let hours = ('0' + _date.getHours()).slice(-2);
    return day + '/' + month + '/' + _date.getFullYear();
}

/**
 * Fonction permettant de convertir une date valide pour le back (date ISO)
 * @param {*} _date 
 * @returns 
 */
const getFormatedDateForBack = function(_date) {
    let month = ('0' + (_date.getMonth() + 1)).slice(-2);
    let day = ('0' + _date.getDate()).slice(-2);
    let hours = ('0' + _date.getHours()).slice(-2);
    let minutes = ('0' + _date.getMinutes()).slice(-2);
    let seconds = ('0' + _date.getSeconds()).slice(-2);
    return _date.getFullYear() + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':' + seconds;
}

/**
 * Fonction permettant de convertir un string en date
 */
const parseStringToDate = function(_value){
    //var timestamp = Date.parse(_value);
    //return new Date(_value);
    let dateParts = _value.split("/");
    return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
}

/**
 * Fonction permettant de calculer le prix après réduction
 */
const getPromoPrice = function(_price, _percent) {
    return (_price - (_price * (_percent/100) )).toFixed(2);
}

/**
 * Fonction permettant de générer un objet de type produit
 * @param {*} _idProduct 
 * @param {*} _categoryId 
 * @param {*} _name 
 * @param {*} _description 
 * @param {*} _price 
 * @param {*} _base64 
 * @param {*} _promoPercent 
 * @param {*} _promoStart 
 * @param {*} _promoEnd 
 * @returns 
 */
const getProductObject = function(_idProduct, _categoryId, _name, _description, _price, _base64, _promoPercent, _promoStart, _promoEnd){
    let product =  {};

    if (_idProduct)
        product.id = _idProduct;
    if (_categoryId)
        product.categoryId = _categoryId;
    if (_name)
        product.name = _name;
    if (_description)
        product.description = _description;
    if (_price)
        product.price = _price;
    if (_base64)
        product.picture = _base64;
    if (_promoStart)
        product.promoStart = _promoStart;
    if (_promoEnd)
        product.promoEnd = _promoEnd;
    if (_promoPercent)
        product.promoPercent = _promoPercent;

    return product;
}

/**
 * Fonction permettant de désactiver tous les boutons actifs de l'UI
 */
const disableAllButtonForWaitReload = function() {
    $('.btn').addClass("disabled");
}