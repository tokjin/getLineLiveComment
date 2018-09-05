# LINE LIVE to コメントジェネレーター

### これは何か
LINE LIVEのコメントをコメントジェネレーターから取得できるように、comment.xmlに書き込む為のものです。

### 使い方
* linelive.jsとxmlWriter.phpを、ローカル環境に配置し、SSL(https)でアクセス可能な状態にする。
* 下記スクリプトをブックマークレットとして、放送ページで実行する。

```javascript:bookmarklet
javascript:(function()%7Bvar time = new Date().getTime();var s = document.createElement("script");s.src = "//192.168.11.3/drive/tokshare/htdocs/CommentGenerator/js/linelive.js?v=" + time;s.charset="UTF-8";document.body.appendChild(s);%7D)();
```

### 仕様
* ブラウザの放送ページはアクティブ状態にしておかないといけない（他のウィンドウの裏にあっても大丈夫だが、同一ウィンドウの他のタブを開いているとダメ）
* とにかく取得できればいいと思って作ったので使い勝手は悪いです。

### 問い合わせ
[Twitter](https://twitter.com/jintokai)までお願いします。
