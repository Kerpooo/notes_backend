import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


async function main() {
    const user1 = await prisma.user.upsert({
        where: { email: 'user1@example.com' },
        update: {},
        create: {
            email: 'user1@example.com',
            password: 'password1',
        },
    });


    // Categories 
    const category1 = await prisma.category.upsert({
        where: { name: 'Work' },
        update: {},
        create: {
            name: 'Work',
            user: {
                connect: { id: user1.id },
            },
        },
    });

    const category2 = await prisma.category.upsert({
        where: { name: 'Personal' },
        update: {},
        create: {
            name: 'Personal',
            user: {
                connect: { id: user1.id },
            },
        },
    });


    const note1 = await prisma.note.upsert({
        where: { title: 'First Note' },
        update: {},
        create: {
            title: 'First Note',
            content: 'This is the content of the first note.',
            active: false,
            user: {
                connect: { id: user1.id },
            },
            categories: {
                connect: [{ id: category1.id }],
            },
        },
    });

    const note2 = await prisma.note.upsert({
        where: { title: 'Second Note' },
        update: {},
        create: {
            title: 'Second Note',
            content: 'This is the content of the second note.',
            active: true,
            user: {
                connect: { id: user1.id },
            },
            categories: {
                connect: [{ id: category2.id }],
            },
        },
    });


    console.log({ note1, note2 });

}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // close Prisma Client at the end
        await prisma.$disconnect();
    });

