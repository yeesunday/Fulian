fis.config.merge({
    modules : {
        spriter : 'csssprites'
    },
    roadmap : {
        path : [
            {
                reg : '*.html',
                useHash : false,
                release : '$&'
            },
            {
                reg : '*',
                useHash : true,
                release : '$&'
            }
        ]
    }
});