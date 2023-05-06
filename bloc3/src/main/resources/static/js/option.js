//documentation https://grotesquegentleadvance--samkhaled.repl.co/
const notify = function(_text, _status) {
    $.notify(
        _text,
        {
             allow_dismiss: false,
             type: _status, // 'success', 'warning'
             placement: {
                 from: "bottom",
                 align: "center"
             },
        }
    );
}

$.datepicker.regional['fr'] = {
                dateFormat: 'dd/mm/yy',
                closeText: 'Fermer',
                prevText: '&#x3c;Préc',
                nextText: 'Suiv&#x3e;',
                currentText: 'Aujourd\'hui',
                monthNames: ['Janvier','Fevrier','Mars','Avril','Mai','Juin',
                'Juillet','Aout','Septembre','Octobre','Novembre','Decembre'],
                monthNamesShort: ['Jan','Fev','Mar','Avr','Mai','Jun',
                'Jul','Aou','Sep','Oct','Nov','Dec'],
                dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
                dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
                dayNamesMin: ['Di','Lu','Ma','Me','Je','Ve','Sa'],
                weekHeader: 'Sm',
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: false,
                yearSuffix: '',
            };
$.datepicker.setDefaults($.datepicker.regional['fr']);

const urlBase = 'http://localhost:8081/';
