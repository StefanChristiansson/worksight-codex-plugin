# WorkSight Codex Plugin

This repository contains the WorkSight Codex plugin marketplace.

## Install In Codex

In Codex, open **Add marketplace** and use:

- **Source:** the GitHub repository URL, for example `https://github.com/<org>/worksight-codex-plugin.git`
- **Git ref:** `main`
- **Sparse paths:** `plugins/codex`

After adding the marketplace, install the **WorkSight** plugin from the marketplace list.

## MCP Endpoint

The plugin points to the production WorkSight MCP server:

```text
https://worksight-api.nemely.com/mcp
```

Users authenticate through the Codex MCP OAuth flow. No WorkSight tokens, client secrets, or user credentials are stored in this repository.
