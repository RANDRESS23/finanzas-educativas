import type { Authenticator as AuthenticatorModel } from "@prisma/client";
import type {
  AuthenticatorTransport,
  CredentialDeviceType,
} from "@simplewebauthn/typescript-types";

export interface Authenticator extends AuthenticatorModel {
  credentialDeviceType: CredentialDeviceType;
  transports: AuthenticatorTransport[];
}
