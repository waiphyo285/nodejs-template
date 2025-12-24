module.exports = (instance, Sequelize) => {
    return instance.define('teacher', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        age: {
            type: Sequelize.INTEGER,
        },
        degree: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
        },
    }, {
        tableName: 'teachers',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    })
}
