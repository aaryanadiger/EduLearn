import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, userName, courseName, amount, paymentId, date } = body;

        if (!email || !courseName) {
            return NextResponse.json(
                { success: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        const userEmail = process.env.EMAIL_USER;
        const appPassword = process.env.EMAIL_APP_PASSWORD;

        if (!userEmail || !appPassword) {
            console.error("Missing EMAIL_USER or EMAIL_APP_PASSWORD in environment variables.");
            return NextResponse.json(
                { success: false, error: "Email configuration is missing on the server" },
                { status: 500 }
            );
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // Use true for port 465, false for 587
            auth: {
                user: userEmail,
                pass: appPassword,
            },
        });

        // Email HTML template inspired by EduLearn's dark theme and orange accent #ff5e00
        const htmlTemplate = `
        <div style="font-family: Arial, sans-serif; background-color: #0d0d0d; color: #ffffff; padding: 40px; margin: 0; line-height: 1.6;">
            <div style="max-w-width: 600px; margin: 0 auto; background-color: #1a1a1a; border: 1px solid #333333; border-radius: 12px; overflow: hidden;">
                <div style="background-color: #ff5e00; padding: 20px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 1px;">EduLearn</h1>
                </div>
                
                <div style="padding: 30px;">
                    <h2 style="color: #ffffff; font-size: 20px; margin-top: 0;">Payment Receipt</h2>
                    <p style="color: #aaaaaa; font-size: 16px;">Hi ${userName || "Student"},</p>
                    <p style="color: #aaaaaa; font-size: 16px;">Thank you for your purchase! You are now officially enrolled in <strong>${courseName}</strong>.</p>
                    
                    <div style="background-color: #262626; border-radius: 8px; padding: 20px; margin: 25px 0;">
                        <h3 style="color: #ffffff; font-size: 16px; margin-top: 0; border-bottom: 1px solid #444; padding-bottom: 10px; margin-bottom: 15px;">Transaction Details</h3>
                        <table style="width: 100%; color: #cccccc; font-size: 14px;">
                            <tr>
                                <td style="padding: 6px 0;">Course:</td>
                                <td style="text-align: right; color: #ffffff; font-weight: bold;">${courseName}</td>
                            </tr>
                            <tr>
                                <td style="padding: 6px 0;">Amount Paid:</td>
                                <td style="text-align: right; color: #ffffff; font-weight: bold;">${amount}</td>
                            </tr>
                            <tr>
                                <td style="padding: 6px 0;">Transaction ID:</td>
                                <td style="text-align: right; font-family: monospace;">${paymentId || "N/A"}</td>
                            </tr>
                            <tr>
                                <td style="padding: 6px 0;">Date:</td>
                                <td style="text-align: right;">${date || new Date().toLocaleDateString()}</td>
                            </tr>
                        </table>
                    </div>

                    <p style="color: #aaaaaa; font-size: 14px;">You can access your course immediately by logging into your EduLearn account.</p>
                    
                    <div style="text-align: center; margin-top: 35px;">
                        <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://edulearn.com'}/courses" style="background-color: #ff5e00; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 24px; font-weight: bold; font-size: 16px; display: inline-block;">Go to My Courses</a>
                    </div>
                </div>
                
                <div style="background-color: #121212; padding: 20px; text-align: center; border-top: 1px solid #333333;">
                    <p style="color: #666666; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} EduLearn. All rights reserved.</p>
                    <p style="color: #666666; font-size: 12px; margin: 5px 0 0 0;">This is an automated receipt, please do not reply to this email.</p>
                </div>
            </div>
        </div>
        `;
    }}