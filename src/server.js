const path = require('path');
const express = require('express');

module.exports = {
    app: () => {
        const app = express();
        const indexPath = path.join(__dirname,'../public/index.html');
        const publicPath = express.static(path.join(__dirname,'../public'));

        app.use('/public',publicPath);
        app.get('/',function(_,res){res.sendFile(indexPath)});
        app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css'))); // redirect CSS bootstrap
        return app
    }
};