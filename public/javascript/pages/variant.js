$(document).ready(function () {
    let numOfAttribute = 0

    $('#attribute_btn').on('click', function () {
        const attribute_key = $('#attribute_key').val()
        const attribute_val = $('#attribute_val').val()

        if (!(attribute_key && attribute_val)) {
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

        attribute_clone.find('.new-attribute:eq(0)').attr({
            name: `attribute_variant[${attribute_index}][key]`,
            value: attribute_key,
        })

        attribute_clone.find('.new-attribute:eq(1)').attr({
            name: `attribute_variant[${attribute_index}][value]`,
            value: attribute_val,
        })

        $('#attribute_key,#attribute_val').val('')
        $('#attribute_list').append(attribute_clone.html())
    })

    $(document).on('click', '.del-attribute', function () {
        $(this).closest('.form-group.row').remove()
    })
})
