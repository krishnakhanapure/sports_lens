function upsert(data, cb) {
  const user = {};
  var methodName = arguments.callee.name;
  var email;
  if (data.issuer) {
    user.authnProvider = 'saml';
    user.authnId = data.SAMaccountName || data.samaccountname;
    email = data.Mail || data.mail;
    user.email = email.toLowerCase();
    user.displayName = data.Displayname || data.displayname || data.Mail || data.mail;
  }
  else {
    //LOG - ERROR
  }

  if (!user.email) {
    return cb('email not found in authn response');
  } else {
    return cb(null, user);
  }
}

function serialize(user, cb) {
  cb(null, user)
}

function deserialize(email, cb) {
  return cb(null, email)
}

module.exports = {
  serialize,
  deserialize,
  upsert,
}
