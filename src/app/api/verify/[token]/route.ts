import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
export const GET = async (
  req: Request,
  { params }: { params: { token: string } }
) => {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   return NextResponse.redirect(`${process.env.DOMAIN_URL}/`);
  // }

  const { token } = params;

  const user = await prisma.user.findFirst({
    where: {
      verifiyAccount: {
        some: {
          AND: [
            {
              activatedAt: null,
            },
            {
              createdAt: {
                gt: new Date(Date.now() - 24 * 60 * 60 * 1000),
              },
            },
            {
              token,
            },
          ],
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        status: "error",
        message: "Invalid or expired token",
      },
      { status: 404 }
    );
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      isEmailVerified: true,
    },
  });

  await prisma.verifyAccount.update({
    where: {
      token,
    },
    data: {
      activatedAt: new Date(),
    },
  });

  return NextResponse.redirect(`${process.env.DOMAIN_URL}/activated`);
};
