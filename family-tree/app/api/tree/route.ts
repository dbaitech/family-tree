import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("API /tree called");

    const result = await pool.query("SELECT * FROM balkan_nodes");

    return NextResponse.json(result.rows);
  } catch (err) {
    console.error("DB ERROR:", err);

    return NextResponse.json(
      { error: "Database query failed" },
      { status: 500 },
    );
  }
}
