import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class Notification {
    static async findUnique(where) {
        return prisma.notification.findUnique({ where });
    }

    static async create(data) {
        return prisma.notification.create({ data });
    }

    static async update(where, data) {
        return prisma.notification.update({ where, data });
    }
}
