import { NextResponse } from 'next/server';

const N8N_WEBHOOK_URL = "https://n8n.studiolee.nl/webhook/Client-sign-up";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Forward the request to n8n
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const responseText = await response.text();

        if (!response.ok) {
            console.error(`n8n webhook failed with status: ${response.status}, body: ${responseText}`);
            return NextResponse.json(
                { error: 'Failed to submit to n8n', details: responseText },
                { status: response.status }
            );
        }

        return NextResponse.json({ success: true, data: responseText });

    } catch (error) {
        console.error('Error proxying to n8n:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
