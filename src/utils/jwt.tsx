export const base64UrlDecode = (str: string) => {
  try {
    return decodeURIComponent(
      atob(str.replace(/_/g, "/").replace(/-/g, "+"))
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  } catch (e) {
    console.warn("base64 decode faild");
    return;
  }
};

interface JWTDecodedPayload {
  [key: string]: any;
}

export const decodeJWT = (token: string | any) => {
  try {
    if (!token) {
      throw new Error();
    } else {
      const payload = token.split(".")[1];
      const decode = base64UrlDecode(payload);
      if (decode) {
        const isExpired = isTokenExpired(JSON.parse(decode));
        if (isExpired) throw new Error();
        return {
          isExpired,
          ...JSON.parse(decode),
        };
      } else {
        throw new Error();
      }
    }
  } catch (e) {
    console.warn("jwt decode failed");
    return;
  }
};

const isTokenExpired = (decoded: JWTDecodedPayload): boolean => {
  if (!decoded.exp) {
    console.warn("token does not have an  exp");
    return true;
  }
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
};
