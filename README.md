Githubに置いたHugoをオンプレにデプロイしてくれるやつ
===================================================

## なにこれ
タイトルの通り。

GithubのWebhookを受信してPersonal access tokenでpull、いい感じにデプロイまでやってくれる

## 使い方

1. 設定ファイルを用意する
`cp config/production.json{_inc,}`
1. GithubのWebhookとPersonal access tokenを用意する
設定ファイルにGithubのユーザー名とトークンやらなにやら貼り付ける
1. ドキュメントルートからこのリポジトリの`public`にリンクを張る
`ln -s $DocumentRoot $ThisRepositoryClone/public`
1. うまい具合にポートマッピングする
`docker-compose.yml`とかリバースプロキシ設定とか弄る
1. `docker-compose up -d`で立ち上げる
1. 適当にリポジトリにpushする
1. deployされる
