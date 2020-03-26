const { connection } = require('../database')

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf',
            ]);

        res.header('X-Total-Count', count['count(*)']);

        return res.json(incidents)  
    },

    async store(req, res) {
        const { title, description, value} = req.body;
        const ong_id = req.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return res.json({id});
    },

    async delete(req, res) {
        const { id } = req.params
        const ong_id = req.headers.authorization;

        const response = await connection('incidents').delete().where({
            id,
            ong_id
        });

        if(response) {
            return res.json({ success: true });
        }
        
        return res.json({success: true, message: "Not Exist Anymore"});
        }
}