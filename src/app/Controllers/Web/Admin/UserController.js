const { models: { User } } = require('../../../Models');

module.exports = {

    index(req, res) 
    {
        res.render('partials/admin/main/login', { layout: '' });
    },
    
    // create: async (req, res) => {
    //     if (req.body.email && req.body.password) {
    //         const { email, password } = req.body;

    //         await User.create({
    //             email,
    //             password
    //         });
    //         res.render('partials/admin/main/home', {layout: 'admin.hbs'});
    //     }
    // }
}