import * as jose from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { searchParamsToObject } from '#/lib/helpers';
import { getToken } from '#/lib/ibmid';

const { JWT_SECRET } = process.env;
const SECRET_ARR = new TextEncoder().encode(JWT_SECRET as string);

export async function GET(r: Request) {
  const { pathname, origin, searchParams } = new URL(r.url);
  const { code, grant_id, orig_url } = searchParamsToObject(searchParams);

  try {
    if (!code || !grant_id)
      throw new Error('No code or grant in callback response');

    const redirect_uri = new URL(pathname, origin);
    if (orig_url) redirect_uri.searchParams.set('orig_url', orig_url);

    const tokenResponse = await getToken({
      code,
      grant_id,
      redirect_uri: redirect_uri.toString()
    });
    const { ok } = tokenResponse;

    console.log('token', tokenResponse);

    if (!ok) throw new Error('Unable to exchance code for access token');

    const { access_token, refresh_token, expires_in } = tokenResponse;

    const jwtToken = await new jose.SignJWT({ access_token, refresh_token })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt()
      .sign(SECRET_ARR);

    cookies().set({
      name: 'token',
      value: jwtToken,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: Date.now() + expires_in * 1000
    });
  } catch (e) {
    return redirect('/login');
  }

  const goingTo = decodeURIComponent(orig_url ? orig_url : '/');
  console.log('Going to', goingTo);
  return redirect(goingTo);
}
