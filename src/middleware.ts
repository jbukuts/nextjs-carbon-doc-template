import * as jose from 'jose';
import { NextResponse, type NextRequest } from 'next/server';
// import verifyToken from './lib/ibmid/verifyToken';

const { JWT_SECRET } = process.env;
const SECRET_ARR = new TextEncoder().encode(JWT_SECRET as string);

export async function middleware(request: NextRequest) {
  const origURL = request.url;
  const loginURL = new URL('/login', request.url);
  const token = request.cookies.get('token')?.value;

  if (!token) {
    loginURL.searchParams.set('orig_url', encodeURIComponent(origURL));
    return NextResponse.redirect(loginURL);
  }

  try {
    await jose.jwtVerify<Record<string, string>>(token, SECRET_ARR);
  } catch {
    return NextResponse.redirect(loginURL);
  }

  // verify if token is still active
  // const { active } = await verifyToken({
  //   access_token: decodedToken.access_token
  // });
  // if (active) return NextResponse.next();
  //
  // return NextResponse.redirect(new URL(`/login`, request.url));

  return NextResponse.next();
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico|login|callback).*)'
    }
  ]
};
