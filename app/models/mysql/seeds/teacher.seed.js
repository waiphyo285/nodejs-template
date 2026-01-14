const Database = require('../connection')
const Teacher = Database.teachers

const seedTeachers = async () => {
    try {
        // Clear existing data
        await Teacher.destroy({ where: {}, truncate: true })

        // Sample teacher data
        const teachers = [
            {
                name: 'Dr. John Smith',
                age: 45,
                degree: 'PhD in Computer Science',
                status: true,
            },
            {
                name: 'Prof. Sarah Johnson',
                age: 38,
                degree: 'Masters in Mathematics',
                status: true,
            },
            {
                name: 'Mr. Michael Brown',
                age: 32,
                degree: 'Bachelor in Physics',
                status: true,
            },
            {
                name: 'Dr. Emily Davis',
                age: 41,
                degree: 'PhD in Chemistry',
                status: false,
            },
        ]

        // Insert seed data
        await Teacher.bulkCreate(teachers)
        console.log('Teacher seed data inserted successfully!')
    } catch (error) {
        console.error('Error seeding teachers:', error)
    }
}

module.exports = { seedTeachers }

// Run if called directly
if (require.main === module) {
    seedTeachers().then(() => {
        process.exit(0)
    })
}
