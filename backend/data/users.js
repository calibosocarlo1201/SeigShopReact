import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Seig User',
        email: 'seig@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
    {
        name: 'Rein User',
        email: 'rein@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
];

export default users