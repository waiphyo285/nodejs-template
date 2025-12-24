const { seedTeachers } = require('./teacher.seed')
const { seedStudents } = require('./student.seed')

const runAllSeeds = async () => {
    try {
        console.log('Starting database seeding...')

        await seedTeachers()
        await seedStudents()

        console.log('All seeds completed successfully!')
    } catch (error) {
        console.error('Error running seeds:', error)
    }
}

module.exports = { runAllSeeds, seedTeachers, seedStudents }

// Run if called directly
if (require.main === module) {
    runAllSeeds().then(() => {
        process.exit(0)
    })
}
