/**
 * Bootstrap Container
 * Registers all services and dependencies
 */
const Container = require('./Container')

// -----------------------------------------------------------------------------
// Repositories
// -----------------------------------------------------------------------------
const UserRepository = require('@infrastructure/repositories/user.repository')
const TeacherRepository = require('@infrastructure/repositories/teacher.repository')
const StudentRepository = require('@infrastructure/repositories/student.repository')
const UserRoleRepository = require('@infrastructure/repositories/user-role.repository')

// -----------------------------------------------------------------------------
// Domain Services
// Each service encapsulates business logic for its corresponding aggregate
// -----------------------------------------------------------------------------
const UserService = require('@domain/services/user.service')
const TeacherService = require('@domain/services/teacher.service')
const StudentService = require('@domain/services/student.service')
const UserRoleService = require('@domain/services/user-role.service')

// -----------------------------------------------------------------------------
// Use Cases - User
// -----------------------------------------------------------------------------
const FindUsersUseCase = require('@application/usecases/user/find-users.usecase')
const GetUserByIdUseCase = require('@application/usecases/user/get-user-by-id.usecase')
const CreateUserUseCase = require('@application/usecases/user/create-user.usecase')
const UpdateUserUseCase = require('@application/usecases/user/update-user.usecase')
const DeleteUserUseCase = require('@application/usecases/user/delete-user.usecase')

// -----------------------------------------------------------------------------
// Use Cases - Teacher
// -----------------------------------------------------------------------------
const FindTeachersUseCase = require('@application/usecases/teacher/find-teachers.usecase')
const GetTeacherByIdUseCase = require('@application/usecases/teacher/get-teacher-by-id.usecase')
const CreateTeacherUseCase = require('@application/usecases/teacher/create-teacher.usecase')
const UpdateTeacherUseCase = require('@application/usecases/teacher/update-teacher.usecase')
const DeleteTeacherUseCase = require('@application/usecases/teacher/delete-teacher.usecase')

// -----------------------------------------------------------------------------
// Use Cases - Student
// -----------------------------------------------------------------------------
const FindStudentsUseCase = require('@application/usecases/student/find-students.usecase')
const GetStudentByIdUseCase = require('@application/usecases/student/get-student-by-id.usecase')
const CreateStudentUseCase = require('@application/usecases/student/create-student.usecase')
const UpdateStudentUseCase = require('@application/usecases/student/update-student.usecase')
const DeleteStudentUseCase = require('@application/usecases/student/delete-student.usecase')

// -----------------------------------------------------------------------------
// Use Cases - User Role
// -----------------------------------------------------------------------------
const FindRolesUseCase = require('@application/usecases/user-role/find-roles.usecase')
const GetRoleByIdUseCase = require('@application/usecases/user-role/get-role-by-id.usecase')
const CreateRoleUseCase = require('@application/usecases/user-role/create-role.usecase')
const UpdateRoleUseCase = require('@application/usecases/user-role/update-role.usecase')
const DeleteRoleUseCase = require('@application/usecases/user-role/delete-role.usecase')

const container = new Container()

// -----------------------------------------------------------------------------
// Register Repositories
// -----------------------------------------------------------------------------
container.register('userRepository', () => new UserRepository())
container.register('teacherRepository', () => new TeacherRepository())
container.register('studentRepository', () => new StudentRepository())
container.register('userRoleRepository', () => new UserRoleRepository())

// -----------------------------------------------------------------------------
// Register Domain Services
// -----------------------------------------------------------------------------
container.register(
    'userService',
    () => new UserService(container.get('userRepository'))
)
container.register(
    'teacherService',
    () => new TeacherService(container.get('teacherRepository'))
)
container.register(
    'studentService',
    () => new StudentService(container.get('studentRepository'))
)
container.register(
    'userRoleService',
    () => new UserRoleService(container.get('userRoleRepository'))
)

// -----------------------------------------------------------------------------
// Register User Use Cases
// -----------------------------------------------------------------------------
container.register(
    'findUsersUseCase',
    () => new FindUsersUseCase(container.get('userService'))
)
container.register(
    'getUserByIdUseCase',
    () => new GetUserByIdUseCase(container.get('userService'))
)
container.register(
    'createUserUseCase',
    () => new CreateUserUseCase(container.get('userService'))
)
container.register(
    'updateUserUseCase',
    () => new UpdateUserUseCase(container.get('userService'))
)
container.register(
    'deleteUserUseCase',
    () => new DeleteUserUseCase(container.get('userService'))
)

// -----------------------------------------------------------------------------
// Register Teacher Use Cases
// -----------------------------------------------------------------------------
container.register(
    'findTeachersUseCase',
    () => new FindTeachersUseCase(container.get('teacherService'))
)
container.register(
    'getTeacherByIdUseCase',
    () => new GetTeacherByIdUseCase(container.get('teacherService'))
)
container.register(
    'createTeacherUseCase',
    () => new CreateTeacherUseCase(container.get('teacherService'))
)
container.register(
    'updateTeacherUseCase',
    () => new UpdateTeacherUseCase(container.get('teacherService'))
)
container.register(
    'deleteTeacherUseCase',
    () => new DeleteTeacherUseCase(container.get('teacherService'))
)

// -----------------------------------------------------------------------------
// Register Student Use Cases
// -----------------------------------------------------------------------------
container.register(
    'findStudentsUseCase',
    () => new FindStudentsUseCase(container.get('studentService'))
)
container.register(
    'getStudentByIdUseCase',
    () => new GetStudentByIdUseCase(container.get('studentService'))
)
container.register(
    'createStudentUseCase',
    () => new CreateStudentUseCase(container.get('studentService'))
)
container.register(
    'updateStudentUseCase',
    () => new UpdateStudentUseCase(container.get('studentService'))
)
container.register(
    'deleteStudentUseCase',
    () => new DeleteStudentUseCase(container.get('studentService'))
)

// -----------------------------------------------------------------------------
// Register User Role Use Cases
// -----------------------------------------------------------------------------
container.register(
    'findRolesUseCase',
    () => new FindRolesUseCase(container.get('userRoleService'))
)
container.register(
    'getRoleByIdUseCase',
    () => new GetRoleByIdUseCase(container.get('userRoleService'))
)
container.register(
    'createRoleUseCase',
    () => new CreateRoleUseCase(container.get('userRoleService'))
)
container.register(
    'updateRoleUseCase',
    () => new UpdateRoleUseCase(container.get('userRoleService'))
)
container.register(
    'deleteRoleUseCase',
    () => new DeleteRoleUseCase(container.get('userRoleService'))
)

module.exports = container
