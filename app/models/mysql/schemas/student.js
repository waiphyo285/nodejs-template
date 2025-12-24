module.exports = (instance, Sequelize) => {
    return instance.define('student', {
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
        grade: {
            type: Sequelize.INTEGER,
        },
        images: {
            type: Sequelize.JSON,
            defaultValue: [],
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
        },
    }, {
        tableName: 'students',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    })
}