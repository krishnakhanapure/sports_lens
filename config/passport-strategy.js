const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;
const User = require('./passport-user');

passport.use(new SamlStrategy({
  path: '/tt/saml/consume',
  protocol: 'http://',
  entryPoint: "https://fast.timeinc.com/idp/SSO.saml2",
  issuer: 'transition-tracker-dev', // TODO : Raise a saml req
  cert: "MIICUTCCAbqgAwIBAgIGAUeD8YtgMA0GCSqGSIb3DQEBBQUAMGwxCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJOWTERMA8GA1UEBxMITmV3IFlvcmsxFDASBgNVBAoTC3RpbWVpbmMuY29tMQwwCgYDVQQLEwN0cGUxGTAXBgNVBAMTEGZhc3QudGltZWluYy5jb20wHhcNMTQwNzI5MjEwNTUwWhcNMjQwNzI2MjEwNTUwWjBsMQswCQYDVQQGEwJVUzELMAkGA1UECBMCTlkxETAPBgNVBAcTCE5ldyBZb3JrMRQwEgYDVQQKEwt0aW1laW5jLmNvbTEMMAoGA1UECxMDdHBlMRkwFwYDVQQDExBmYXN0LnRpbWVpbmMuY29tMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCPCCCfiZe4glD/83eaPdIk1UZSLJZJwhvzVbgRCFvbwglYpx30t/7exoh+IkZCCRMhQaXhN5OzwJaQEZHiSv8fgfo0zTDUjNZCNtoeBEPzDW3x2u9bzV53X2CQT+o5x4eBNFQx5lEGZWJxHeSUQ2TVuu9vNVe9lGjqWUQhUUiHhQIDAQABMA0GCSqGSIb3DQEBBQUAA4GBADdvz3PHUnbbLgVYixbmEkCh2xp4ZaveMxobdTArUJK0T38ZD0fS59YbBBkg8FaFrUVOUHTEuuWN7BmRs6hf+IP4vqMCcfzDSxwY3fe46t1mpJxoTvVc0+Gz/2GcjNndODLfeUbuqdeofuuZzqZbFHAqSpz/PdVA6Z+1ZDkoOFLu",
  identifierFormat: "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified",
}, User.upsert));

passport.serializeUser(User.serialize)
passport.deserializeUser(User.deserialize)

module.exports = {
  passport
}
