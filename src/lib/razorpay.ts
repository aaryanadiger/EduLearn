// Razorpay client-side utilities

export interface RazorpayOrderResponse {
    id: string;
    entity: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt: string;
    status: string;
}

export interface RazorpayPaymentResult {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

/**
 * Create a Razorpay order via our server-side API route.
 * @param amountInPaise - Amount in the smallest currency unit (paise for INR)
 * @param currency - Currency code (default: INR)
 * @param receipt - Optional receipt identifier
 * @param notes - Optional metadata notes
 */
export async function createRazorpayOrder(
    amountInPaise: number,
    currency = "INR",
    receipt?: string,
    notes?: Record<string, string>
): Promise<RazorpayOrderResponse> {
    const res = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            amount: amountInPaise,
            currency,
            receipt,
            notes,
        }),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create Razorpay order");
    }

    return res.json();
}

/**
 * Opens the Razorpay checkout modal.
 * Returns a promise that resolves with payment details on success, or rejects on failure/dismiss.
 */
export function openRazorpayCheckout(options: {
    orderId: string;
    amount: number; // in paise
    currency: string;
    courseName?: string;
    description?: string;
    userName?: string;
    userEmail?: string;
    userPhone?: string;
}): Promise<RazorpayPaymentResult> {
    return new Promise((resolve, reject) => {
        const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

        if (!keyId) {
            reject(new Error("Razorpay key not configured"));
            return;
        }

        const rzpOptions = {
            key: keyId,
            amount: options.amount,
            currency: options.currency,
            name: "EduLearn",
            description: options.description || "Course Enrollment",
            order_id: options.orderId,
            handler: function (response: RazorpayPaymentResult) {
                resolve(response);
            },
            prefill: {
                name: options.userName || "",
                email: options.userEmail || "",
                contact: options.userPhone || "",
            },
            theme: {
                color: "#FF5E00",
                backdrop_color: "rgba(0, 0, 0, 0.85)",
            },
            modal: {
                ondismiss: function () {
                    reject(new Error("Payment cancelled by user"));
                },
                confirm_close: true,
                animation: true,
            },
        };

        // @ts-ignore - Razorpay is loaded via Script tag
        const rzp = new window.Razorpay(rzpOptions);
        rzp.on("payment.failed", function (response: any) {
            reject(new Error(response.error?.description || "Payment failed"));
        });
        rzp.open();
    });
}
