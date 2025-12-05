'use server';


import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // Dummy login verification
    if (username === "admin" && password === "123456") {
      return NextResponse.json({
        message: "Login successful",
        accessToken: "sample_token_123",
        refreshToken: "sample_refresh_456",
      });
    }

    return NextResponse.json(
      { message: "Invalid username or password" },
      { status: 401 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
