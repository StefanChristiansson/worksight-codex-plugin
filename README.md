# WorkSight Codex Plugin

This repository contains the WorkSight Codex plugin marketplace.

## Install In Codex

In Codex, open **Add marketplace** and use:

- **Source:** `StefanChristiansson/worksight-codex-plugin` or `https://github.com/StefanChristiansson/worksight-codex-plugin.git`
- **Git ref:** `main`
- **Sparse paths:** leave empty

If you want to use sparse paths, include both paths:

```text
.agents/plugins
plugins/codex/plugins/worksight
```

After adding the marketplace, install the **WorkSight** plugin from the marketplace list.

## MCP Endpoint

The plugin points to the production WorkSight MCP server:

```text
https://worksight-api.nemely.com/mcp
```

Users authenticate through the Codex MCP OAuth flow.
