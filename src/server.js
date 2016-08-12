const path = require('path');
const express = require('express');

module.exports = {
    app: function() {
        const app = express();
        const indexPath = path.join(__dirname,'../public/index.html');
        const publicPath = express.static(path.join(__dirname,'../public'));

        app.use('/public',publicPath);
        app.get('/',function(_,res){res.sendFile(indexPath)});
     //   app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js'))); // redirect bootstrap JS
     //   app.use('/js', express.static(path.join(__dirname, '../node_modules/jquery/dist'))); // redirect JS jQuery
        app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css'))); // redirect CSS bootstrap
        return app
    }
};