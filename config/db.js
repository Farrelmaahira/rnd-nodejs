const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('library', 'root', '',  {
    host : 'localhost',
    dialect : 'mysql',
    define : {
        timestamps : true
    },
});

sequelize.authenticate().then(()=>{
    // sequelize.sync({
    //     force : true
    // });
    console.log('Connected');
}).catch((error)=>{
    console.log('Connection failed', error);
});
module.exports = sequelize;