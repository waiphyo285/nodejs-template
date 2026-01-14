const Database = require('../connection')
const Student = Database.students

const seedStudents = async () => {
    try {
        // Clear existing data
        await Student.destroy({ where: {}, truncate: true })

        // Sample student data
        const students = [
            {
                name: 'Alice Johnson',
                age: 20,
                grade: 85,
                images: ['/uploads/students/sample-student-1.jpg'],
                status: true,
            },
            {
                name: 'Bob Smith',
                age: 19,
                grade: 92,
                images: [
                    '/uploads/students/sample-student-2.jpg',
                    '/uploads/students/sample-student-2b.jpg',
                ],
                status: true,
            },
            {
                name: 'Charlie Brown',
                age: 21,
                grade: 78,
                images: [],
                status: true,
            },
            {
                name: 'Diana Prince',
                age: 20,
                grade: 95,
                images: ['/uploads/students/sample-student-4.jpg'],
                status: true,
            },
            {
                name: 'Edward Wilson',
                age: 22,
                grade: 67,
                images: [],
                status: false,
            },
        ]

        // Insert seed data
        await Student.bulkCreate(students)
        console.log('Student seed data inserted successfully!')
    } catch (error) {
        console.error('Error seeding students:', error)
    }
}

module.exports = { seedStudents }

// Run if called directly
if (require.main === module) {
    seedStudents().then(() => {
        process.exit(0)
    })
}
