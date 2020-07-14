const pool = require('../db/connexion');

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query(`SELECT * FROM users WHERE id = ${id}`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};

const createUser = (request, response) => {

    const { name, username, email, address_street, address_suite, address_city, address_zipcode, address_geo_lat, address_geo_lng, phone, website, company_name, company_catchphrase, company_bs } = request.body;

    pool.query(`INSERT INTO users (name, username, email, address_street, address_suite, address_city, address_zipcode, address_geo_lat, address_geo_lng, phone, website, company_name, company_catchphrase, company_bs) VALUES ('${name}', '${username}', '${email}', '${address_street}', '${address_suite}', '${address_city}', '${address_zipcode}', '${address_geo_lat}', '${address_geo_lng}', '${phone}', '${website}', '${company_name}', '${company_catchphrase}', '${company_bs}')`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.insertId}`)
    })
};

const deleteUser = (request, response) => {

    const id = parseInt(request.params.id);

    pool.query(`DELETE FROM users WHERE id = ${id}`, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const updateUser = (request, response) => {

    const id = parseInt(request.params.id);

    const { name, username, email, address_street, address_suite, address_city, address_zipcode, address_geo_lat, address_geo_lng, phone, website, company_name, company_catchphrase, company_bs } = request.body;

    pool.query(
        'UPDATE users SET name = $1, username = $2, email = $3, address_street = $4, address_suite = $5, address_city = $6, address_zipcode = $7, address_geo_lat = $8, address_geo_lng = $9, phone = $10, website = $11, company_name = $12, company_catchphrase = $13, company_bs = $14  WHERE id = $15',
        [name, username, email, address_street, address_suite, address_city, address_zipcode, address_geo_lat, address_geo_lng, phone, website, company_name, company_catchphrase, company_bs, id],
        (error) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    );
};


module.exports = {
    getUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser
};
