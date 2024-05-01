'use server';

import { redirect } from 'next/navigation';
import { searchParamsToObject } from '#/lib/helpers';
import baseMetadata from '#/shared-metadata';

const { metadataBase } = baseMetadata;
const { IBMID_CLIENT_ID, IBMID_AUTH_URL } = process.env;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const { orig_url } = searchParamsToObject(url.searchParams);

  const redirectURI = new URL(`/api/auth/callback`, metadataBase!);
  if (orig_url) redirectURI.searchParams.set('orig_url', orig_url);

  const params = {
    client_id: IBMID_CLIENT_ID as string,
    response_type: 'code',
    redirect_uri: redirectURI.toString()
  };

  const authURL = new URL(
    `/oidc/endpoint/default/authorize`,
    IBMID_AUTH_URL as string
  );

  Object.entries(params).forEach((item) => {
    const [key, val] = item;
    authURL.searchParams.set(key, val);
  });

  console.log(authURL.toString());
  return redirect(authURL.toString());
}
