import 'server-only';

const { IBMID_CLIENT_ID, IBMID_CLIENT_SECRET, IBMID_AUTH_URL } = process.env;

interface VerifyTokenOpts {
  access_token: string;
}

interface SuccessVerifyRes {
  ok: true;
  active: boolean;
}

interface ErrorVerifyRes {
  err: any;
  ok: false;
  active: false;
}

/**
 * Verify validity of access token
 *
 * @param {GetTokenOpts} opts
 */
export default function verifyToken(
  opts: VerifyTokenOpts
): Promise<SuccessVerifyRes | ErrorVerifyRes> {
  const { access_token } = opts;

  return fetch(`${IBMID_AUTH_URL}/oidc/endpoint/default/introspect`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      token: access_token,
      client_id: IBMID_CLIENT_ID as string,
      client_secret: IBMID_CLIENT_SECRET as string
    })
  })
    .then(async (r) => {
      const j = await r.json();

      return {
        ok: r.status === 200,
        active: false,
        ...j
      };
    })
    .catch((e) => ({ ok: false, err: e }));
}
