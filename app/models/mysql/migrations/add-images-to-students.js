const Database = require('../connection')

const addImagesToStudents = async () => {
    try {
        const queryInterface = Database.sequelize.getQueryInterface()

        // Check if column already exists
        const tableDescription = await queryInterface.describeTable('students')

        if (!tableDescription.images) {
            // Add images column
            await queryInterface.addColumn('students', 'images', {
                type: Database.Sequelize.JSON,
                defaultValue: [],
                allowNull: true
            })
            console.log('✅ Added images column to students table')
        } else {
            console.log('✅ Images column already exists in students table')
        }

    } catch (error) {
        console.error('❌ Error adding images column:', error)
    }
}

module.exports = { addImagesToStudents }

// Run if called directly
if (require.main === module) {
    addImagesToStudents().then(() => {
        process.exit(0)
    })
}