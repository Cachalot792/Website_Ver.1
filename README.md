# 初めてのウェブサイト作り 
HTML＋CSS＋Javascriptを手書きで書いたウェブサイト作りはある程度実現できるようになりました。  
Jekyllを使ってMarkdownにも対応しました。    
  
[ホームページリンク](https://cachalot792.github.io/)  
[記法参考](https://qiita.com/tbpgr/items/989c6badefff69377da7)  

# 既知の不具合・改善点等  
* 文頭で改行を使っても文の間に空白行を作れない。空白行を作ろうとしても詰まってしまう  
`<br/>`を直接書くことで改行可能だが、github上のmarkdownはそこらへん理解して改行してくれる  

というかそもそも論…  
↓  
* GithubのMarkdownのスタイルがシンプルでベスト。そうしたい。  
[GithubのMarkdownのCSSだけ抜き出したレポジトリ](https://github.com/sindresorhus/github-markdown-css)が公開されている  
これを導入してみたい。  
