---
layout: default
title: DAアルゴリズム (Deferred Acceptance Algorithm)
---

# DAアルゴリズムとは  
DAアルゴリズムとは、デヴィッド・ゲールとロイド・シャプレーによって考案されたマッチングアルゴリズム。DAは「Deferred Acceptance」の略で、「受け入れ保留」と訳される。  
このページで紹介しているDAアルゴリズムの一対一マッチングでは、結婚市場を想定した例がよく用いられる。  

# DAアルゴリズム（一対一マッチング）  
希望表内での空集合は、空集合より右側の（選好順位の低い）人を選ぶよりは「１人でいるほうがまし」という意味です。  
空集合には半角数字の「0」を使用してください。又は、なにも書かないままにしてください。  

<input type="button" value="テンプレートデータセット" onclick="ResetTemplateData();"/>  

## 両グループ名と人数  

<table id="table1"></table>
<p></p>
<input type="button" value="希望表作成" onclick="CreateChoiceTableButton();"/>
<input type="button" value="希望クリア" onclick="ClearChoiceTable();"/><br>
<form name="form1">
    <select name="which_group">
        <option value="">どちらからアプローチ</option>
        <option id="approach_option1"></option>
        <option id="approach_option2"></option>
    </select>
    <div class="select__arrow"></div>
</form>
<input type="button" value="マッチングスタート" onclick="MakeArrayForAlgorithm();"/>
<p id="display_warning"></p><br>  

## マッチング結果  

<p id="matching_result"></p>
<input type="button" value="マッチングクリア" onclick=" ClearMatcingResult();"/>
<p id="matching_result"></p>
<h2 id="group_a_choice_table"></h2>
<table id="table2"></table>
<h2 id="group_b_choice_table"></h2>
<table id="table3"></table>  

# 参考文献・リンク  
坂井豊貴（2010）.『マーケットデザイン入門　─オークションとマッチングの経済学─』.ミネルヴァ書房  
  

自作したDAアルゴリズム部分だけ抜き出してGithubにて公開しました  
[https://github.com/Cachalot792/DAalgorithm](https://github.com/Cachalot792/DAalgorithm)  

<script  src="/scripts/daalgorithm.js"></script>