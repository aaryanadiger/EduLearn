import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { amount, currency = "INR", receipt, notes } = await req.json();

        if (!amount || amount <= 0) {
            return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
        }

        const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
        const keySecret = process.env.RAZORPAY_KEY_SECRET;

        if (!keyId || !keySecret) {
            console.error("Missing Razorpay keys. KEY_ID:", !!keyId, "KEY_SECRET:", !!keySecret);
            return NextResponse.json({ error: "Razorpay keys not configured on server" }, { status: 500 });
        }

        const authString = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

        // Create order via Razorpay Orders API
        const response = await fetch("https://api.razorpay.com/v1/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${authString}`,
            },
            body: JSON.stringify({
                amount: Math.round(amount), // amount in paise
                currency,
                receipt: receipt ? receipt.substring(0, 40) : `rcpt_${Date.now()}`,
                notes: notes || {},
            }),
        });

        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch {
                errorData = { message: await response.text() };
            }
            console.error("Razorpay order creation failed:", response.status, errorData);
            return NextResponse.json(
                { error: errorData?.error?.description || errorData?.message || "Failed to create order", details: errorData },
                { status: response.status }
            );
        }

        const order = await response.json();
        return NextResponse.json(order);
    } catch (error: any) {
        console.error("Razorpay API route error:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}
