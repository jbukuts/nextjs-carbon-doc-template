import 'server-only';

const { IBMID_AUTH_URL } = process.env;

interface UserInfoOpts {
  access_token: string;
}

interface SuccessUserInfoRes {
  ok: true;
  address: {
    country: string;
  };
  name: string;
  userType: string;
  family_name: string;
  email: string;
}

interface ErrorUserInfoRes {
  ok: false;
  err: any;
}

export default function userInfo(
  opts: UserInfoOpts
): Promise<SuccessUserInfoRes | ErrorUserInfoRes> {
  const { access_token } = opts;

  return fetch(`${IBMID_AUTH_URL}/oidc/endpoint/default/userinfo`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
    .then(async (r) => {
      const j = await r.json();

      return {
        ok: true,
        ...j
      };
    })
    .catch((err) => ({ ok: false, err }));
}
