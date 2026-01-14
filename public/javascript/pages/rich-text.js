$(function () {
    $('.content').richText({
        // text formatting
        bold: true,
        italic: true,
        underline: true,

        // text alignment
        leftAlign: true,
        centerAlign: true,
        rightAlign: true,
        justify: true,

        // lists
        ol: true,
        ul: true,

        // title
        heading: true,

        // fonts
        fonts: true,
        fontList: [
            'Arial',
            'Arial Black',
            'Comic Sans MS',
            'Courier New',
            'Geneva',
            'Georgia',
            'Helvetica',
            'Impact',
            'Lucida Console',
            'Tahoma',
            'Times New Roman',
            'Verdana',
        ],
        fontColor: true,
        fontSize: true,

        // uploads
        imageUpload: true,
        fileUpload: true,

        // link
        urls: true,

        // tables
        table: true,

        // code
        removeStyles: true,
        code: true,

        // colors
        colors: [],

        // dropdowns
        fileHTML: '',
        imageHTML: '',

        // privacy
        youtubeCookies: false,

        // preview
        preview: false,

        // placeholder
        placeholder: '',

        // dev settings
        id: '',
        class: '',
        height: 0,
        maxlength: 0,
        heightPercentage: 0,
        useParagraph: false,
        useTabForNext: false,
        useSingleQuotes: false,

        // callback function after init
        callback: undefined,
    })
})
