# yumemi_front_cordingcheck_2410051646

株式会社ゆめみ2024本選考_フロントエンドエンジニアコーディング試験_2406030025

- 試験内容
  - <https://yumemi.notion.site/0e9ef27b55704d7882aab55cc86c999d>
- リンターやフォーマッター
  - ESLintとPrettier、`resas_population_graph\package.json`を参照
- 主要技術
  - Vue.js 3、TypeScript、Chart.js
- デプロイ先
  - <https://unspeakablesnow.github.io/yumemi_front_cordingcheck_2410051646/>

注意：当サイトで要求されるRISAS APIのキーは2024.10.31を以て発行を停止されます。

## 参考にするサイト

- [【Vue3】script setup構文の使用方法とメリット【propsとemitsも解説】](https://tekrog.com/vue3-script-setup)
- [Vue3 + TS + Chart.js](https://zenn.dev/tatausuru/articles/ddd9857621542b)
- [RESAS-API - 都道府県一覧](https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html)
- [RESAS-API - 人口構成](https://opendata.resas-portal.go.jp/docs/api/v1/population/composition/perYear.html)
- [RESAS-API - API詳細説明](https://opendata.resas-portal.go.jp/docs/api/v1/detail/index.html)

## powershell

### パッケージインストール

```powershell
cd .\resas_population_graph\
npm install
```

### デベロッパーモード

```powershell
npm run serve
```

### ビルド

```powershell
npm run build
```

### リント適応

```powershell
npm run lint
```

## 試験用追記内容

- テストケース
  - `npm run build`のエラーのないビルド
  - デプロイ先の正常な動作
- 課題の取り組み開始から完了までに要した合計時間
  - 三十時間弱
- これまでの総合的なプログラミング歴
  - C++から始まり七年
- これまでのWEBフロントエンドプログラミング歴
  - LAMPから始まり四年
- 着手にあたり参考にしたページや書籍、リポジトリがあれば
  - 上記参照
