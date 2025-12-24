const Database = require('./connection')
const { addImagesToStudents } = require('./migrations/add-images-to-students')

const setupDatabase = async () => {
    try {
        console.log('🚀 Starting database setup...')

        // Force sync all models (this will create tables if they don't exist)
        await Database.sequelize.sync({ force: false, alter: true })
        console.log('✅ Database models synced')

        // Run migrations
        await addImagesToStudents()

        console.log('🎉 Database setup completed successfully!')

    } catch (error) {
        console.error('❌ Database setup failed:', error)
        throw error
    }
}

module.exports = { setupDatabase }

// Run if called directly
if (require.main === module) {
    setupDatabase().then(() => {
        console.log('Database setup finished')
        process.exit(0)
    }).catch((error) => {
        console.error('Database setup failed:', error)
        process.exit(1)
    })
}