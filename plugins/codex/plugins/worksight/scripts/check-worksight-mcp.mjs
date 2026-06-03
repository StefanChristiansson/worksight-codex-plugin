#!/usr/bin/env node

const url = process.env.WORKSIGHT_MCP_URL || 'https://worksight-api.nemely.com/mcp';
const token = process.env.WORKSIGHT_MCP_TOKEN || '';

function discoveryUrl(path) {
  const mcpUrl = new URL(url);
  return new URL(path, mcpUrl.origin).toString();
}

async function readJsonResponse(response) {
  const bodyText = await response.text();
  try {
    return JSON.parse(bodyText);
  } catch {
    return bodyText;
  }
}

async function assertOk(response, label) {
  const body = await readJsonResponse(response);
  if (!response.ok) {
    console.error(`${label} failed: HTTP ${response.status}`);
    console.error(typeof body === 'string' ? body : JSON.stringify(body, null, 2));
    process.exit(1);
  }
  return body;
}

async function checkOAuthDiscovery() {
  const protectedResource = await assertOk(
    await fetch(discoveryUrl('/.well-known/oauth-protected-resource'), {
      headers: { Accept: 'application/json' },
    }),
    'OAuth protected-resource discovery',
  );
  const authorizationServerUrl = Array.isArray(protectedResource.authorization_servers)
    ? protectedResource.authorization_servers[0]
    : '';
  const authorizationMetadataUrl = authorizationServerUrl
    ? `${String(authorizationServerUrl).replace(/\/$/, '')}/.well-known/oauth-authorization-server`
    : discoveryUrl('/.well-known/oauth-authorization-server');
  const authorizationServer = await assertOk(
    await fetch(authorizationMetadataUrl, {
      headers: { Accept: 'application/json' },
    }),
    'OAuth authorization-server discovery',
  );

  console.log(`WorkSight MCP OAuth discovery reachable: ${url}`);
  console.log(JSON.stringify({
    protectedResource,
    authorizationServer,
  }, null, 2));
}

async function checkBearerToken() {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'mcp-client-name': 'codex-worksight-plugin-check',
    },
  });
  const body = await assertOk(response, 'Authenticated WorkSight MCP check');
  console.log(`WorkSight MCP endpoint reachable with bearer token: ${url}`);
  console.log(JSON.stringify(body, null, 2));
}

async function main() {
  if (token) {
    await checkBearerToken();
    return;
  }
  await checkOAuthDiscovery();
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
