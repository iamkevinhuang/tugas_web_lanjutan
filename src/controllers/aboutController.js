const fs = require('fs');
const appRoot = require('app-root-path');

const aboutController = {
    index: async (req, res) => {
        console.log(__dirname);
        fs.readFile(appRoot + "/readme.json", (err, file) => {
            if (err){
                return res.status(500).send(err);
            }
            else{
                return res.status(200).send(JSON.parse(file));
            }
        });
    },
};

module.exports = aboutController;