---
layout: default
title: 22.07.31
---

# 2022-07-31 
Markdownに対応しました。  
CSSとJavascriptは前からそうでしたがHTMLも同じものを使いまわせるようになり、ウェブページを増やすたびにHTMLを書く必要が無くなったのでかなり楽になりました。  

## 静的サイトジェネレータ  
ウェブページをMarkdownで簡単に作りたいとなるといくつか方法がありますが、静的サイトジェネレータを使用する方法を用いると自由度が高く自分好みのスタイルを適用できる印象です。  
その中でも今特に流行っているのがGatsbyという静的サイトジェネレータで、とにかくレスポンスが速い。  
今回Markdownに対応するにあたってまず最初に試したのはGatsbyでしたが、今回はGatsbyでの運用は断念しました。  
理由としては一点、  

* 「スタイルを一から自作したいとなると結構難しい」  

という点です。  
Markdownだけが目的であればもっと簡単な方法があるので、今回はそちらを選択しました。  

### Jekyll(ジキル)  
今回、ウェブサイトをMarkdownで書くために導入したのはJekyllという静的サイトジェネレータです。  
このサイトはGithub Pagesを使って公開しているため、Markdownを使いたければ一番順当な方法かもしれません。  
ルートディレクトリにconfigファイルを置いて中に3行程度設定を書くだけ。本当に簡単。  
あとは今までに手書きしていたコードをほぼ使いまわせます。  

## favicon  
Markdownとは関係ありませんが、今回faviconにも対応しました。  
faviconとはブラウザでページのタブに表示されるアイコンの事です。  
ChromeやSafariなどブラウザの種類によってそれぞれで設定しなければならない上にAndroidやiOSなど端末ごとにも設定が必要なのでかなり面倒な作業になりますが、これを環境に合わせて半自動生成してくれるFavicon Generatorという神ツールを発見したのでこちらを使用しました。  
便利すぎて感動しました…  

## 参考文献  
Markdownで書かれたページをGitHub Pagesで公開する  
[http://yoshikyoto.github.io/text/git/gh_pages_md.html](http://yoshikyoto.github.io/text/git/gh_pages_md.html)  


Front Matter  
[http://jekyllrb-ja.github.io/docs/front-matter/](http://jekyllrb-ja.github.io/docs/front-matter/)  


Adding a favicon to a Jekyll-based static website  
[https://ptc-it.de/add-favicon-to-mm-jekyll-site/](https://ptc-it.de/add-favicon-to-mm-jekyll-site/)  


Favicon Generator. For real.  
[https://realfavicongenerator.net/](https://realfavicongenerator.net/)  
