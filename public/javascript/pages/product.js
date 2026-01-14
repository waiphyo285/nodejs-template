$(document).ready(function () {
    let numOfAttribute = 0

    $('#attribute_btn').on('click', function () {
        const attribute_value = $('#attribute_input').val()

        if (!attribute_value) {
            toastrWarning({
                type: 'warning',
                title: content['modal'].warning,
                description: `Please fill out the attribute!`,
            })

            return
        }

        const attribute_clone = $('#attribute_demo').clone()
        const attribute_index =
            $('#attribute_list div').length || numOfAttribute

        attribute_clone.find('.input-sm').attr({
            name: `attribute_variant[${attribute_index}][key]`,
            value: attribute_value,
        })

        $('#attribute_input').val('')
        $('#attribute_list').append(attribute_clone.html())
    })

    $(document).on('click', '.del-attribute', function () {
        $(this).closest('.form-group.row').remove()
    })
})
