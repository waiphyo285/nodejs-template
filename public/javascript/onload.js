/* *
 * Onload Scripts
 */

;(function () {
    'use strict'
    window.addEventListener(
        'load',
        function () {
            var forms = document.getElementsByClassName('form-validate')
            var validation = Array.prototype.filter.call(
                forms,
                function (form) {
                    form.addEventListener(
                        'submit',
                        function (event) {
                            if (form.checkValidity() === false) {
                                event.preventDefault()
                                event.stopPropagation()
                                form.classList.add('was-validated')
                            }
                        },
                        false
                    )
                }
            )
        },
        false
    )
})()

$(function () {
    $('[data-tooltip="tooltip"]').tooltip()

    $('[data-toggle="popover"]').popover()

    $('.all-select2-picker').select2({
        width: '100%',
    })

    $('.no-search-select2-picker').select2({
        width: '100px',
        minimumResultsForSearch: -1,
    })

    $('.dataTables_length').find('select').select2({
        width: '60px',
        // theme: 'classic',
        minimumResultsForSearch: -1,
    })

    $('.list-group-item').on('click', function () {
        var eleIcon = this.getElementsByTagName('span')[2]

        if (eleIcon)
            eleIcon?.classList.contains('bi-chevron-down')
                ? eleIcon.classList.replace('bi-chevron-down', 'bi-chevron-up')
                : eleIcon.classList.replace('bi-chevron-up', 'bi-chevron-down')
    })
})
