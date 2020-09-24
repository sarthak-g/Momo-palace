const Menu = require('../../models/menu');

function homeController() {
    return {
        async index(req, res) {  // This line is equivalent to index: function() {}
            const momos = await Menu.find()
            return res.render('home', {momos: momos})
        }
    }
}

module.exports = homeController;