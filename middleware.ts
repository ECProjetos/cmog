import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { createClient } from '@/utils/supabase/server'

export async function middleware(request: NextRequest) {
    const { response, user } = (await updateSession(request)) as unknown as {
        response: NextResponse
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        user: any
    }

    if (
        !user &&
        !request.nextUrl.pathname.startsWith('/login') &&
        !request.nextUrl.pathname.startsWith('/register') &&
        !request.nextUrl.pathname.startsWith('/api/webhooks')
    ) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (user && !request.nextUrl.pathname.startsWith('/subscribe')) {
        const supabase = await createClient()
        const { data: subscription, error } = await supabase
            .from('users')
            .select('stripe_subscription_status')
            .eq('id', user.id)
            .single()

        if (error || !subscription || (subscription.stripe_subscription_status !== 'active' && subscription.stripe_subscription_status !== 'trialing')) {
            return NextResponse.redirect(new URL('/subscribe', request.url))
        }
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}