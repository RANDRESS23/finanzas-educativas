import type { Authenticator } from "@prisma/client";
import type { PublicKeyCredentialDescriptor } from "@simplewebauthn/typescript-types";
/**
 * Function that checks whether the user has a credential ID
 * that matches the one included in the attestation response.
 * @param userAuthenticators The user’s credentials.
 * @param autheticatorCredentialIdB64URL The ID of the credential
 * in the assertion response.
 * @returns true if the credential ID match with one included
 * in the attestation response userAuthenticators.
 */
export const getAuthenticatorByCredentialId = (
  userAuthenticators: Authenticator[],
  autheticatorCredentialIdB64URL: string,
) => {
  return userAuthenticators.find(
    authenticator =>
      Buffer.from(authenticator.credentialID).toString("base64url") ===
      autheticatorCredentialIdB64URL,
  );
};
/**
 * Function that iterates over the userAuthenticators and
 * returns the PublicKeyCredentialDescriptor.
 * @param userAuthenticators The user’s credentials.
 * @returns The PublicKeyCredentialDescriptor.
 */
export const getPublicKeyCredentialDescriptor = (
  userAuthenticators: Authenticator[],
) => {
  return userAuthenticators.map(authenticator => ({
    id: new Uint8Array(authenticator.credentialID),
    type: "public-key",
    transports: authenticator.transports ?? [],
  })) as PublicKeyCredentialDescriptor[];
};
