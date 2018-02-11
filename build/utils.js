

exports.pageEntry = function () {
    return [
        {name:"client",path:"src/client/app.js",outputfilename:'client'},
        {name:"admin",path:"src/admin/app.js",outputfilename:'admin'}
    ];
};