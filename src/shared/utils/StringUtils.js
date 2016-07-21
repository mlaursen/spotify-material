export function fullUrl(protocol, subdomain, domain, port) {
  return `${protocol}://{subdomain ? subdomain + '.' : ''}${domain}:${port}` ;
}
