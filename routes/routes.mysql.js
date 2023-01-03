
const loginRoute = require('./router.login');
const employeeRoute = require('./router.emplyees');
const admin = require('./router.admin');
const project = require('./router.projects');



module.exports = function (app) {
    app.use( loginRoute);
    app.use(employeeRoute);
    app.use(admin);
    app.use(project); 
}
