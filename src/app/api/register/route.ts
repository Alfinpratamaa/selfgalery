import { createUserSchema } from "@/models/user-schema";
import { hash } from "bcryptjs";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import nodemailer from "nodemailer";
import { randomBytes } from "crypto";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  try {
    const requestBody = await req.json();
    const { name, email, password } = createUserSchema.parse(requestBody);

    const hashedPassword = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    });

    const verify = await prisma.verifyAccount.create({
      data: {
        token: randomBytes(32).toString("hex"),
        userId: user.id,
      },
    });

    await transporter.sendMail({
      from: '"Self Galery" <selfgalery@info.com>', // sender address
      to: user.email || "", // list of receivers
      subject: "Please Activate Your account", // Subject line
      text: `Hello ${
        user.name || ""
      } please activate your account clicking button bellow `, // plain text body
      html: `
      <p>Hello ${user.name || ""},</p>
      <p>Please activate your account by clicking the button below:</p>
      <a href="${
        process.env.DOMAIN_URL || "http://localhost:3000"
      }/api/verify/${
        verify.token
      }" style="text-decoration: none; display: inline-block; padding: 10px 20px; background-color: blue; color: white; border-radius: 5px; font-weight: bold; cursor: pointer;">
      Verify Account
    </a>`,
    });

    return NextResponse.json(
      {
        user: {
          email: user.email,
          name: user.name,
          msg: "Please check your email to verify your account",
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    //error handling for validation
    if (error instanceof ZodError) {
      console.log(error.message);
      return NextResponse.json(
        {
          status: "error",
          message: "validation failed",
          errors: error.message,
        },
        { status: 400 }
      );
    }

    //error handling for unique constraint
    if (error.code === "P2002") {
      return NextResponse.json(
        {
          status: "fail",
          message: "user with that email already exists",
        },
        { status: 409 }
      );
    }

    //returning error for internal server
    return NextResponse.json(
      {
        status: "error",
        message: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST || "",
  port: process.env.EMAIL_SERVER_PORT || "",
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL_SERVER_USER || "",
    pass: process.env.EMAIL_SERVER_PASSWORD || "",
  },
} as nodemailer.TransportOptions);
