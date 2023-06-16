const bcrypt = require('bcrypt');
const User = require('../../../Models/User');

module.exports = {

    index(req, res) 
    {
        res.render('partials/admin/main/login', { layout: '' });
    },

    login(req, res)
    {
        const { email, password } = req.body;
        User.findOne({ where: {email} })
        .then(user => {
            if(user){
                bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // Passwords match, user is authenticated
                        req.session.user = {
                            id: user.id,
                            email: user.email,
                            name: user.name
                            // Other user properties
                        };
                        // Successful login - redirect to dashboard
                        res.redirect('/kingslanding');
                    } else{
                         // Passwords do not match, user is not authenticated
                        res.render('partials/admin/main/login', { layout: '', error: 'Invalid email or password' });
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Handle the error case appropriately
                    res.render('partials/admin/main/login', { layout: '',error: 'An error occurred' });
                });
            } else {
                // User not found in the database
                // Handle the case where login fails, such as showing an error message
                res.render('partials/admin/main/login', { layout: '',error: 'Invalid email or password' });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle the error case appropriately
            res.render('login', {layout: '', error: 'An error occurred' });
        });
    },

    //PROFILE
    async profile (req, res) {
        const userId = req.session.user.id;

        const user = await User.findByPk(userId);

        res.render('partials/admin/main/user-profile/profile', { layout: 'admin', user: user.dataValues});
    },

    async updateProfile(req, res) {
        try {
            const userId = req.session.user.id;
            const user = await User.findByPk(userId);
            console.log(req.body);
            await user.update(req.body);

            res.redirect('back');
          } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
    }
}