import { authOptions } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import { redirect } from "next/navigation";

// export const runtime = "edge";

export const POST = async (req: Request): Promise<void | Response> => {
  try {
    const data = await req.formData();
    const file = data.get("file") as File;

    const session = await getServerSession(authOptions);

    if (!session) {
      redirect("/");
    }

    if (!file) {
      return NextResponse.json({
        status: 400,
        body: {
          error: "No file uploaded",
        },
      });
    }

    const fileBlob = new Blob([file]);
    const bytes = await fileBlob.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate timestamp
    const timestamp = new Date()
      .toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
        hour12: false,
      })
      .replace(/, /g, "_")
      .replace(/:/g, "")
      .replace(/\./g, ":")
      .replace(/\//g, "-");

    // Create directory (if not exists)
    const userDirectory = `./public/images/${session?.user?.email}`;
    try {
      await mkdir(userDirectory, { recursive: true });
    } catch (error) {
      console.error("Error creating directory:", error);
    }

    // Append timestamp and file name
    const path = `${userDirectory}/${timestamp}_${file.name}`;

    await writeFile(path, buffer);

    return NextResponse.json({
      status: 200,
      body: { message: "File uploaded" },
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      status: 500,
      body: { error: "Internal server error" },
    });
  }
};

export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const newUserDirectory = `./public/images/${session?.user?.email}`;
  const userDirectory = `./public/images/${session?.user?.email}`;

  try {
    await fs.mkdir(newUserDirectory, { recursive: true });
    const files = await fs.readdir(userDirectory);
    return NextResponse.json({
      status: 200,
      body: files,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      status: 500,
      body: { error: "Internal server error" },
    });
  }
};
