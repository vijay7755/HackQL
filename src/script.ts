import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    const newLink = await prisma.link.create({
        data: {
            description: "Fullstack GQL tutorial",
            url: "www.howtogql.com"
        },
    })

    const allLinks = await prisma.link.findMany()
    console.log("allLinks: ", allLinks)
}

main().catch((e) => {   
    throw e;
})
.finally(async () => {
    await prisma.$disconnect();
});