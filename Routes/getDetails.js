let sqlFunctions = require('../SqlFunctions/sqlFunctions')

class GetDetails{
    constructor(app) {
        this.getDetails(app);
    }
    getDetails(app) {
        app.get('/getDetails', async (req, res) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
            let { collegeName } = req.query;
            let details = await sqlFunctions.getDetails(collegeName);
            res.send(details)
        })
    }
}
module.exports = GetDetails;