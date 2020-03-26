const { connection } = require('../database')

module.exports = {
    async index(req, res) {
        const incidents = await connection('incidents').where('ong_id', req.headers.authorization).select('*');

        return res.json(incidents);
    } 
}