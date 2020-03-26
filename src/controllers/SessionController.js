const { connection } = require('../database')

module.exports = {
    async store(req, res) {
        const { id } = req.body;

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();

        if(!ong) {
            return res.status(400).json({ message: 'No ONG found' })
        }

        return res.json(ong);
    }
}