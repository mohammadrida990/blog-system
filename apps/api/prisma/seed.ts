import { fakerEN } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { hash } from 'argon2';

const prisma = new PrismaClient();

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

async function main() {
  const defaultPassword = await hash('123');
  const users = Array.from({ length: 10 }).map(() => ({
    name: fakerEN.person.fullName(),
    email: fakerEN.internet.email(),
    bio: fakerEN.lorem.sentence(),
    avatar: fakerEN.image.avatar(),
    password: defaultPassword,
  }));

  await prisma.user.createMany({
    data: users,
  });

  const posts = Array.from({ length: 400 }).map(() => ({
    title: fakerEN.lorem.sentence(),
    slug: generateSlug(fakerEN.lorem.sentence()),
    content: fakerEN.lorem.paragraphs(3),
    thumbnail: fakerEN.image.urlPicsumPhotos({
      width: 320,
      height: 240,
      grayscale: false,
      blur: 0,
    }),
    authorId: fakerEN.number.int({ min: 1, max: 10 }),
    published: true,
  }));

  await Promise.all(
    posts.map(
      async (post) =>
        await prisma.post.create({
          data: {
            ...post,
            comments: {
              createMany: {
                data: Array.from({ length: 20 }).map(() => ({
                  content: fakerEN.lorem.sentence(),
                  authorId: fakerEN.number.int({ min: 1, max: 10 }),
                })),
              },
            },
          },
        }),
    ),
  );

  console.log('Seeding Completed!');
}

main()
  .then(() => {
    prisma.$disconnect();
    process.exit(0);
  })
  .catch((e) => {
    prisma.$disconnect();
    console.error(e);
    process.exit(1);
  });
