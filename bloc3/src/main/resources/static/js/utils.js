
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

const logout = function() {
    myQuery("users/logout", "POST", null, null, () => {
        window.location.href = "/login-mercado";
      });
  }

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

const deleteProductQuery = function(_id, _successCallBack) {
    deleteQuery(
        'products/' + _id,
         (_result) => {
             if (_successCallBack)
                  _successCallBack(_result);
             notify("Votre produit a bien été supprimé !", 'success');
         }
    );
}

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

function loadCategories(callback) {

    myQuery("categories", "GET", null, null, (result) => {
        if (callback)
            callback(result);
    });
}



const getFormatedDateForDatePicker = function(_date){
    let month = ('0' + (_date.getMonth() + 1)).slice(-2);
    let day = ('0' + _date.getDate()).slice(-2);
    let hours = ('0' + _date.getHours()).slice(-2);
    return day + '/' + month + '/' + _date.getFullYear();
}


const getFormatedDateForBack = function(_date) {
    let month = ('0' + (_date.getMonth() + 1)).slice(-2);
    let day = ('0' + _date.getDate()).slice(-2);
    let hours = ('0' + _date.getHours()).slice(-2);
    let minutes = ('0' + _date.getMinutes()).slice(-2);
    let seconds = ('0' + _date.getSeconds()).slice(-2);
    return _date.getFullYear() + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':' + seconds;
}

const parseStringToDate = function(_value){
    //var timestamp = Date.parse(_value);
    //return new Date(_value);
    let dateParts = _value.split("/");
    return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
}

const getPromoPrice = function(_price, _percent) {
    return (_price - (_price * (_percent/100) )).toFixed(2);
}

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

const disableAllButtonForWaitReload = function() {
    $('.btn').addClass("disabled");
}