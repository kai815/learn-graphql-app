## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn dev

# production
$ yarn build

# graphql codegen
$ yarn generate
```

## 必要な設定
### 設定ファイル
.envを作成して、必要な情報を書いてください。

1. VITE_CLIENT_ID→GitHubのOAuth AppのClientIDです。
2. VITE_GITHUB_TOKEN→GitHubのpersonal access tokenです。