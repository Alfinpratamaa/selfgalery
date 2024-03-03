import prisma from "@/lib/db";
import { hash } from "bcrypt";

async function main() {
  const password = await hash("admin123", 12);
  const user = await prisma.user.upsert({
    where: { email: "muhamadalfinpratama@admin.com" },
    update: { isEmailVerified: true },
    create: {
      email: "admin@admin.com",
      name: "Muhamad Alfin Pratama",
      password,
    },
  });
  console.log({ user });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
