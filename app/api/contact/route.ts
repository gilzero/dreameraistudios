import { NextResponse } from 'next/server';
import { db } from '@lib/db';
import { insertContactMessageSchema, contactMessages } from '@shared/schema';
import { ZodError } from 'zod';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = insertContactMessageSchema.parse(body);
    const [saved] = await db.insert(contactMessages).values(validated).returning();
    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, errors: error.format() },
        { status: 400 }
      );
    }
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
