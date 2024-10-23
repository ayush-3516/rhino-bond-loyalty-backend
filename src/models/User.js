const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class User {
    static async findUnique(where) {
        return prisma.user.findUnique({ where });
    }

    static async create(data) {
        return prisma.user.create({ data });
    }

    static async update(where, data) {
        return prisma.user.update({ where, data });
    }
}

module.exports = User;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class User {
    static async findUnique(where) {
        return prisma.user.findUnique({ where });
    }

    static async create(data) {
        return prisma.user.create({ data });
    }

    static async update(where, data) {
        return prisma.user.update({ where, data });
    }
}

module.exports = User;
