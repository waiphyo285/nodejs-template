module.exports = (instance, Sequelize) => {
    return instance.define('teacher', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
        },
        age: {
            type: Sequelize.INTEGER,
        },
        degree: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.BOOLEAN,
        },
    })
}
