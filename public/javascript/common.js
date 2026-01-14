/* *
 * Common Scripts
 */

const v1 = apiVersion1
const v2 = apiVersion2

const headers = {
    userrole: role,
    'x-csrf-token': csrf,
    'x-access-method': _jwtMethod1,
    authorization: 'Bearer ' + token,
    'x-gmt-offset': gmtOffset,
}

$('#dialogDeleteConfirm')
    .on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget)

        var id = button.data('id')
        var version = button.data('version')

        $(this).attr('data-id', id)
        $(this)
            .find('#dialogDelete')
            .on('click', function () {
                var deleteUrl = `./api/${version}${pageEntry}/${id}`
                handleSubmit(
                    {
                        url: deleteUrl,
                        type: 'delete',
                        data: {},
                        timer: 1000,
                    },
                    function () {
                        table.ajax.reload()
                    }
                )
            })
    })
    .on('hide.bs.modal', function (event) {
        $(this).attr('data-id', '')
        $(this).find('#dialogDelete').off('click')
    })

$('.entryForm').submit(function (e) {
    e.preventDefault()

    var _this = this
    var form = $(_this)
    var isValidForm = form[0].checkValidity()

    console.log(
        '🚀 Valid form',
        isValidForm,
        form.attr('method'),
        form.attr('action'),
        form.serialize()
    )

    if (!isValidForm) return

    const data = {
        url: form.attr('action'),
        type: form.attr('method'),
        data: form.serialize(),
        timer: 1500,
    }

    form.find(':submit').attr('disabled', 'disabled')

    handleSubmit(data, function () {
        form.find(':submit').removeAttr('disabled')
    })
})

function convertGMTOffset(offsetMin) {
    const sign = offsetMin < 0 ? '+' : '-'
    let hours = Math.floor(Math.abs(offsetMin) / 60)
    let minutes = Math.abs(offsetMin) % 60

    hours = hours.toString().padStart(2, '0')
    minutes = minutes.toString().padStart(2, '0')

    return `GMT${sign}${hours}:${minutes}`
}

function commonServiceApi(args, callback) {
    $.ajax({
        url: args.url,
        type: args.type || 'GET',
        data: args.data || {},
        headers: headers,
        success: function (data) {
            data && handleAlert(data, false)
        },
        error: function (jqXHR, textStatus, errorThrown) {
            toastrWarning({
                type: 'error',
                title: content['modal'].warning,
                description: errorThrown,
            })
        },
        complete: function (data) {
            typeof callback === 'function' && callback(data.responseJSON)
        },
    })
}

function handleSubmit(args, callback) {
    var debounce
    clearTimeout(debounce)
    debounce = setTimeout(() => {
        $.ajax({
            url: args.url,
            type: args.type,
            data: args.data || {},
            headers: headers,
            success: function (data) {
                data && handleAlert(data)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                toastrWarning({
                    type: 'error',
                    title: content['modal'].warning,
                    description: errorThrown,
                })
            },
            complete: function (data) {
                typeof callback === 'function' && callback()
            },
        })
    }, args.timer)
}

function handleAlert(args, redirect = true) {
    if (args.code == '200') {
        toastrWarning({
            type: 'success',
            title: content['modal'].success,
            description: content['user-msg'].req_success,
        })
        window.setTimeout(function () {
            if (redirect) $('#postSuccessForm').submit()
        }, 1 * 1500)
    } else {
        toastrWarning({
            type: 'error',
            title: content['modal'].warning,
            description: content['user-msg'].req_failed,
        })
    }
}

function ajaxLoadPage(args) {
    const { url, start, end, limit, totalCount } = args

    $.ajax({
        url: `/api/${url}`,
        type: 'GET',
        headers: headers,
        data: {
            start,
            length: limit,
        },
        success: function (data) {
            updateCurrentPage(data.data)
        },
    })
}

function ajaxLoadOption(args, callback) {
    const config = Object.assign(
        {
            url: '#',
            type: 'GET',
            showKey: '',
            selectId: '#',
            filerObj: {},
            version: v1,
            isSelected: false,
        },
        args
    )

    var url = config.url,
        type = config.type,
        filter = config.filterObj,
        showKey = config.showKey,
        selectId = config.selectId,
        version = config.version,
        isSelected = config.isSelected

    var apiUrl = `/api/${version}` + url

    $.ajax({
        url: apiUrl,
        type: type,
        headers: headers,
        data: { filter },
        success: function (data) {
            var items =
                "<option value='' disabled selected>-- Select one --</option>"
            var selectedVal = $(selectId).data('value')

            if (data.code == '200' && $.isArray(data.data)) {
                $.each(data.data, function (i, item) {
                    selectedVal =
                        isSelected && !selectedVal && i === 0
                            ? item['_id']
                            : selectedVal
                    items += `<option value="${item['_id']}">${item[showKey]}</option>`
                })
            }

            selectedVal = $(selectId)
                .prop('disabled', false)
                .html(items)
                .val(selectedVal)
        },
        error: function (error) {
            handleAlert(error.responseJSON)
        },
        complete: function (data) {
            typeof callback === 'function' && callback(data)
        },
    })
}

function ajaxLoadOption2(args) {
    const config = Object.assign(
        {
            url: '#',
            type: 'GET',
            showKey: '',
            filterKey: '',
            selectId: '#',
            version: v1,
            minLength: 12,
            dropdownParent: $(document.body),
        },
        args
    )

    var url = config.url,
        type = config.type,
        showKey = config.showKey,
        filterKey = config.filterKey,
        selectId = config.selectId,
        version = config.version,
        minLength = config.minLength,
        dropdownParent = config.dropdownParent

    var apiUrl = `/api/${version}` + url
    var placeholder = 'Type your mind...'

    $(selectId).select2({
        ajax: {
            url: apiUrl,
            type: type,
            dataType: 'json',
            delay: 500,
            headers: headers,
            data: function (params) {
                return {
                    filter: { [filterKey]: params.term },
                    page: { skip: params.page || 0, limit: 10 },
                }
            },
            processResults: function (data, params) {
                params.page = params.page || 1

                const mapItem = (item) => {
                    return {
                        text: item[showKey],
                        id: item._id,
                    }
                }

                const moreItem = (page, records) => {
                    return {
                        more: page * 10 < records,
                    }
                }

                return {
                    results: data.data.map(mapItem),
                    pagination: moreItem(params.page, data.recordsTotal),
                }
            },
            cache: true,
        },
        width: '100%',
        placeholder: placeholder,
        minimumInputLength: minLength,
        dropdownParent: dropdownParent,
        templateResult: function (item) {
            if (item.loading) {
                return item.text
            }

            return $(`<option value="${item._id}"> ${item.text} </option>`)
        },
        templateSelection: function (item) {
            return item.text
        },
    })
}

function ajaxUploadForm(args) {
    var imgParentDiv = args.imgParentDiv,
        _this = args._this

    // multi/part form submit
    $.ajax({
        url: $(_this).attr('action'),
        type: $(_this).attr('method'),
        headers: headers,
        cache: false,
        contentType: false,
        processData: false,
        data: new FormData(_this),
        success: function (data) {
            if (data.code == '200') {
                var setSrc = data.data.path.replace('public', '')
                var makeImage = makeDivImage(setSrc)
                $(imgParentDiv).append(makeImage)
            }
        },
        error: function (error) {
            handleAlert(error.responseJSON)
        },
    })
}

function localStoreService(args) {
    const { key, value = null, method = 'get' } = args
    let existingArray = []

    if (method === 'push' || method === 'pop') {
        existingArray = JSON.parse(localStorage.getItem(key) || '[]')
    }

    switch (method) {
        case 'get':
            return localStorage.getItem(key)

        case 'set':
            return localStorage.setItem(key, value)

        case 'remove':
            return localStorage.removeItem(key)

        case 'push':
            localStorage[key] = JSON.stringify([...existingArray, value])
            return localStorage[key]

        case 'pop':
            existingArray.pop()
            localStorage[key] = JSON.stringify(existingArray)
            return localStorage[key]

        default:
            return undefined
    }
}

function swalWarning(args) {
    const config = Object.assign(
        {
            icon: 'warning',
            title: 'Warning',
            position: 'center',
            description: 'Something went wrong. Please try again.',
        },
        args
    )

    const defaultConfig = {
        buttonsStyling: true,
        showConfirmButton: true,
        confirmButtonText: 'OK',
        customClass: 'swal-style',
    }

    Swal.fire({
        ...defaultConfig,
        icon: config.icon,
        title: config.title,
        text: config.description,
        position: config.position,
    })
}

function toastrWarning(args) {
    const config = Object.assign(
        {
            type: 'warning',
            title: 'Warning',
            position: 'toast-bottom-left',
            description: 'Something went wrong. Please try again.',
        },
        args
    )

    switch (config.type) {
        case 'success':
            toastr.success(config.description, config.title, {
                closeButton: true,
                positionClass: config.position,
            })
            break

        case 'warning':
            toastr.warning(config.description, config.title, {
                closeButton: true,
                positionClass: config.position,
            })
            break

        case 'error':
            toastr.error(config.description, config.title, {
                closeButton: true,
                positionClass: config.position,
            })
            break

        default:
            break
    }
}

function makeDivImage(setSrc) {
    return `
    <div class="col-4 col-md-2 col-lg-1 img-container">
      <input class="uploaded-files" type="hidden" name="images[]" value=${setSrc} />
      <img class="m-1 img img-thumbnail" src=${setSrc} alt="" srcset="" width="100" height="100"/>
      <button type="button" class="btn btn-sm remove-file"><i class="bi bi-trash3"/></button>
    </div>`
}
