import 'server-only';

const { IBMID_CLIENT_ID, IBMID_CLIENT_SECRET, IBMID_AUTH_URL } = process.env;

interface GetTokenOpts {
  code: string;
  grant_id: string;
  redirect_uri: string;
}

interface SuccessTokenRes {
  access_token: string;
  refresh_token: string;
  grant_id: string;
  token_type: string;
  expires_in: number;
  ok: true;
}

interface ErrorTokenRes {
  err: any;
  ok: false;
}

/**
 * Exchange authorization code for access token
 *
 * @param {GetTokenOpts} opts
 */
export default function getToken(
  opts: GetTokenOpts
): Promise<SuccessTokenRes | ErrorTokenRes> {
  const { code, grant_id, redirect_uri } = opts;

  return fetch(`${IBMID_AUTH_URL}/oidc/endpoint/default/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code!,
      client_id: IBMID_CLIENT_ID as string,
      client_secret: IBMID_CLIENT_SECRET as string,
      grant_id,
      redirect_uri
    })
  })
    .then(async (r) => {
      const j = await r.json();

      return {
        ok: r.status === 200,
        ...j
      };
    })
    .catch((e) => ({ ok: false, err: e }));
}
