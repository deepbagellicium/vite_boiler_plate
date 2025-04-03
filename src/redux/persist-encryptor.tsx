import { createTransform } from "redux-persist";
import { decrypt, encrypt } from "utils";

const encryptor = createTransform(
  (inboundState) => encrypt(inboundState),
  (outboundState) => decrypt(outboundState)
);

export default encryptor;
