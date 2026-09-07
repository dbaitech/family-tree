import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("API /tree called");

    const result = await pool.query("SELECT * FROM balkan_nodes");

    return NextResponse.json(result.rows);
  } catch (err) {
    console.error("DB ERROR:", err);

    try {
      // Lazy-load the JSON bundle only on DB failure
      const demoModule = await import("../../../data/family.json");
      const demoData = demoModule.default;

      return NextResponse.json(demoData, {
        headers: { "X-Data-Source": "demo-fallback" },
      });
    } catch (importErr) {
      console.error("Failed to load demo data:", importErr);

      return NextResponse.json(
        { error: "Database query failed" },
        { status: 500 }
      );
    }
  }
}