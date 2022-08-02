//------------------------------------------------------------------------
//DAアルゴリズム本編
//------------------------------------------------------------------------
const templateA = {
    name:"M",
    member:[1,2,3],
    preference:[[4,5,7,0,6],[5,6,4,0,7],[4,7,0,6,5]]
};
const templateB = {
  name:"W",
  member:[4,5,6,7],
  preference:[[3,2,1,0],[3,1,2,0],[3,1,0,2],[1,2,0,3]]
};
  
//当アルゴリズム内では空集合は'0'しか受け付けない
function DeferredAcceptanceAlgorithm(activeGroupMemberArray,activeGroupPreferenceArray,passiveGroupMemberArray,passiveGroupPreferenceArray) {
  const activeGroupMemberCount = activeGroupMemberArray.length;
  const passiveGroupMemberCount = passiveGroupMemberArray.length;
  let passiveGroupKeepRankArray = new Array(passiveGroupMemberCount)
  let isSucceededMatchingArray = new Array(activeGroupMemberCount).fill(false);
  let tryMatchingTimesArray = new Array(activeGroupMemberCount).fill(0);
  let activeGroupMatchingPersonRankArray = new Array(activeGroupMemberCount).fill(0);

  //アプローチされる側の空集合の希望順位を探して格納
  for(i=0;i<passiveGroupMemberCount;i++){
  passiveGroupKeepRankArray[i] = passiveGroupPreferenceArray[i].indexOf(0);
  };

  //アプローチ側全員がマッチング終了するまで続ける
  do{
    //アプローチ側のメンバーそれぞれについて↓
    for(i=0;i<activeGroupMemberCount;i++){
      //まだマッチングが完了していない場合に処理する
      if(isSucceededMatchingArray[i] == false){
        const chosenPersonName = activeGroupPreferenceArray[i][tryMatchingTimesArray[i]];  //選ばれた人の名前
        //①選ばれた人の名前が空集合ならマッチング成功(終了)&ループ抜け出し
        if(chosenPersonName == 0){
        activeGroupMatchingPersonRankArray[i] = tryMatchingTimesArray[i]; //希望順位何位の人とマッチングできたか保持
        isSucceededMatchingArray[i] = true;
        break;
        };
        const chosenPersonPosition = passiveGroupMemberArray.indexOf(chosenPersonName); //選ばれた側の人がメンバー配列で何番目か
        const approarchPersonName = activeGroupMemberArray[i];  //選んだ側（アプローチした側）の人の名前
        const approarchPersonRank = passiveGroupPreferenceArray[chosenPersonPosition].indexOf(approarchPersonName); //選んだ人の選ばれた人にとっての希望順位
        //②選ばれた人にとってその人を選ぶことが現キープより良い選択ならマッチング成功&試行回数+1&ループ抜け出し
        if(approarchPersonRank < passiveGroupKeepRankArray[chosenPersonPosition]){
        //選ばれた人の元キープの名前が空集合で無かった場合、元キープのマッチングを未完了に変更
        const chosenPearsonKeepName = passiveGroupPreferenceArray[chosenPersonPosition][passiveGroupKeepRankArray[chosenPersonPosition]];
        if(chosenPearsonKeepName != 0){
            isSucceededMatchingArray[activeGroupMemberArray.indexOf(chosenPearsonKeepName)] = false;
        }
        passiveGroupKeepRankArray[chosenPersonPosition] = approarchPersonRank;  //キープ順位を更新
        activeGroupMatchingPersonRankArray[i] = tryMatchingTimesArray[i]; //希望順位何位の人とマッチングできたか保持
        isSucceededMatchingArray[i] = true;
        tryMatchingTimesArray[i] = tryMatchingTimesArray[i] + 1;
        break;
        //③マッチング失敗なら試行回数+1&ループ続行
        }else{
        tryMatchingTimesArray[i] = tryMatchingTimesArray[i] + 1;
        };
      };
    };
  }while(isSucceededMatchingArray.filter(boolean => boolean == true).length < activeGroupMemberCount);
  //マッチング結果出力
  let matchingResultString = "";
  for(i=0;i<activeGroupMemberCount;i++){
    if(activeGroupPreferenceArray[i][activeGroupMatchingPersonRankArray[i]] != 0){
      matchingResultString = matchingResultString + ("「" + activeGroupMemberArray[i] + "」は「" + activeGroupPreferenceArray[i][activeGroupMatchingPersonRankArray[i]] + "」とマッチング<br>");
    };
  };
  document.querySelector("#matching_result").innerHTML = matchingResultString;
};

//------------------------------------------------------------------------
//配列エラーチェック
//------------------------------------------------------------------------
function CheckArrayAndRunAlgorithm(activeGroupMemberArray,activeGroupPreferenceArray,passiveGroupMemberArray,passiveGroupPreferenceArray){
  const activeGroupMemberCount = activeGroupMemberArray.length;
  const passiveGroupMemberCount = passiveGroupMemberArray.length;
  if(activeGroupMemberArray.includes(undefined) || passiveGroupMemberArray.includes(undefined) || activeGroupMemberArray.includes('') || passiveGroupMemberArray.includes('')){
    //メンバーが足りません
  }
  for(i=0;i<activeGroupMemberCount;i++){
    for(j=0;j<passiveGroupMemberCount+1;j++){
      //空集合が空白で表されていた場合0に書き換える
      if(activeGroupPreferenceArray[i][j] == undefined || activeGroupPreferenceArray[i][j] == ''){
        activeGroupPreferenceArray[i][j] = 0;
      //文字列'0'の場合数字の0に書き換える
      }else if(activeGroupPreferenceArray[i][j] == '0'){
        activeGroupPreferenceArray[i][j] = Number(0);
      //問題ない場合なにもしない  
      }else if(passiveGroupMemberArray.includes(activeGroupPreferenceArray[i][j])){
      //0でもなくメンバーにもない名前があった場合アルゴリズムに入らず処理を止め、アラート表示
      }else{
        document.querySelector("#display_warning").innerHTML = "※メンバー名に無い名前が選好されています!!!!";
        //そのマスに色ぬって後でまとめて失敗判定出す？
        return;
      };
    };
  };
  for(i=0;i<passiveGroupMemberCount;i++){
    for(j=0;j<activeGroupMemberCount+1;j++){
      //空集合が空白で表されていた場合0に書き換える
      if(passiveGroupPreferenceArray[i][j] == undefined || passiveGroupPreferenceArray[i][j] == ''){
        passiveGroupPreferenceArray[i][j] = 0;
        //文字列'0'の場合数字の0に書き換える
      }else if(passiveGroupPreferenceArray[i][j] == '0'){
        passiveGroupPreferenceArray[i][j] = Number(0);
      //問題ない場合なにもしない  
      }else if(activeGroupMemberArray.includes(passiveGroupPreferenceArray[i][j])){
      //0でもなくメンバーにもない名前があった場合アルゴリズムに入らず処理を止め、アラート表示
      }else{
        document.querySelector("#display_warning").innerHTML = "※メンバー名に無い名前が選好されています!!!!";
        //「メンバー名にない選好があります」
        return;
      };
    };
  };
  DeferredAcceptanceAlgorithm(activeGroupMemberArray,activeGroupPreferenceArray,passiveGroupMemberArray,passiveGroupPreferenceArray);
};

//------------------------------------------------------------------------
//ページ読み込み時処理
//------------------------------------------------------------------------
window.onload = function(){
  CreateTable1();
  SetTemplateData();
};
//------------------------------------------------------------------------
//グループ名と人数の表(Table1)作成
//------------------------------------------------------------------------
function CreateTable1(){
  const table1HeaderColumn = ['グループ名','人数'];
  const table1 = document.querySelector("#table1");
  //ヘッダー行作成
  let table1Row = table1.insertRow(-1);
  let table1Th0 = document.createElement("th");
  table1Row.appendChild(table1Th0);
  table1Th0.innerHTML=" ";
  for(i=0; i<2; i++){
    let table1Th = document.createElement("th");
    table1Row.appendChild(table1Th);
    table1Th.innerHTML= i + 1;
  };
  //データ行作成
  for(r=0; r<2; r++){
    const table1Row = table1.insertRow(-1);
    let table1Cell1 = table1Row.insertCell(-1);
    table1Cell1.className = 'item';
    table1Cell1.innerHTML = table1HeaderColumn[r];
    for(c=1; c<=2; c++){
      let table1Cell = table1Row.insertCell(-1);
      table1Cell.className = 'value';
      table1Cell.setAttribute('contenteditable','true');
      table1Cell.setAttribute('id','T1R'+(r+1)+'C'+c);
    };
  };
};
//------------------------------------------------------------------------
//希望表(Table2,Table3)の作成
//------------------------------------------------------------------------
function CreateChoiceTable(){
  const groupAName = document.querySelector("#T1R1C1").innerHTML;
  const groupBName = document.querySelector("#T1R1C2").innerHTML;
  const groupAPop = Number(document.querySelector("#T1R2C1").innerHTML);
  const groupBPop = Number(document.querySelector("#T1R2C2").innerHTML);
  const activeGroupPop = [groupAPop, groupBPop];
  const passiveGroupPop = [groupBPop, groupAPop];
  const tableSelector = ["#table2","#table3"];
  let popNum = 1;

  document.querySelector("#approach_option1").setAttribute('value',"groupA");
  document.querySelector("#approach_option1").innerHTML = "「" + groupAName + "」側からアプローチ";
  document.querySelector("#approach_option2").setAttribute('value',"groupB");
  document.querySelector("#approach_option2").innerHTML = "「" + groupBName + "」側からアプローチ";
  document.querySelector("#group_a_choice_table").innerHTML = "グループ「" + groupAName + "」の希望表"
  document.querySelector("#group_b_choice_table").innerHTML = "グループ「" + groupBName + "」の希望表"


  for(i = 0; i<2; i++){
    const table = document.querySelector(tableSelector[i]); 
    //ヘッダー（TH）
    let row = table.insertRow(-1);
    let th0 = document.createElement("th");
    let th1 = document.createElement("th");
    row.appendChild(th0);
    th0.innerHTML=" ";
    row.appendChild(th1);
    th1.innerHTML="名前"
    for(j=0; j<passiveGroupPop[i]+1; j++){
      let th = document.createElement("th");
      row.appendChild(th);
      th.innerHTML="第" + (j + 1) + "希望";
    };
    //データ行（TR）
    for(r=1; r<=activeGroupPop[i]; r++){
      let row = table.insertRow(-1);
      let cell1 = row.insertCell(-1);
      cell1.className = 'item';
      cell1.innerHTML = r;
      for(c=1; c<=passiveGroupPop[i]+2; c++){
        let cell = row.insertCell(-1);
        cell.className = 'value';
        cell.setAttribute('contenteditable','true');
        cell.setAttribute('id','T'+(i+2)+'R'+r+'C'+c);
        if(c==1){
          cell.innerHTML = popNum;
          popNum = popNum + 1;
        };
      };
    };
  };
};
//------------------------------------------------------------------------
//希望表(Table2,Table3)の完全削除
//------------------------------------------------------------------------
function DeleteChoiceTable(){
  document.querySelector("#table2").innerHTML = "";
  document.querySelector("#table3").innerHTML = "";
};
//------------------------------------------------------------------------
//希望表(Table2,Table3)の希望部分の内容クリア
//------------------------------------------------------------------------
function ClearChoiceTable(){
  const groupAPop = Number(document.querySelector("#T1R2C1").innerHTML);
  const groupBPop = Number(document.querySelector("#T1R2C2").innerHTML);
  for(i=1;i<=groupAPop;i++){
    for(j=1;j<=groupBPop+1;j++){
      document.querySelector("#T2R" + i + "C" + (j+1)).innerHTML = "";
    };
  };
  for(i=1;i<=groupBPop;i++){
    for(j=1;j<=groupAPop+1;j++){
      document.querySelector("#T3R" + i + "C" + (j+1)).innerHTML = "";
    };
  };
};
//------------------------------------------------------------------------
//テンプレートデータをセット(Table1~Table3)
//------------------------------------------------------------------------
function SetTemplateData(){
  const template_a_name = "M";
  const template_b_name = "W";
  const template_a_pop = 3;
  const template_b_pop = 4;
  const template_a_choice = [[4,5,7,0,6],[5,6,4,0,7],[4,7,0,6,5]];
  const template_b_choice = [[3,2,1,0],[3,1,2,0],[3,1,0,2],[1,2,0,3]];
  
  document.querySelector("#T1R1C1").innerHTML = template_a_name;
  document.querySelector("#T1R1C2").innerHTML = template_b_name;
  document.querySelector("#T1R2C1").innerHTML = template_a_pop;
  document.querySelector("#T1R2C2").innerHTML = template_b_pop;
  
  CreateChoiceTable()
  
  for(i=1;i<=template_a_pop;i++){
    for(j=1;j<=template_b_pop+1;j++){
      document.querySelector("#T2R" + i + "C" + (j+1)).innerHTML = template_a_choice[i-1][j-1];
    };
  };
  for(i=1;i<=template_b_pop;i++){
    for(j=1;j<=template_a_pop+1;j++){
      document.querySelector("#T3R" + i + "C" + (j+1)).innerHTML = template_b_choice[i-1][j-1];
    };
  };
};
//------------------------------------------------------------------------
//Html上の表を配列に直してアルゴリズムへ送る
//------------------------------------------------------------------------
function MakeArrayForAlgorithm(){

  WarningReset();

  let groupPopArray = new Array(2);
  let groupMemberArray = [[],[]];
  groupPopArray[0] = Number(document.querySelector("#T1R2C1").innerHTML);
  groupPopArray[1] = Number(document.querySelector("#T1R2C2").innerHTML);
  let groupPreferenceTableArray = new Array(2);
  for(i=0;i<2;i++){
    groupPreferenceTableArray[i] = new Array(groupPopArray[i]);
    for(j=0;j<groupPopArray[i];j++){
      groupPreferenceTableArray[i][j] = new Array();
    };
  };
  for(i=0;i<2;i++){
    for(j=1;j<=groupPopArray[i];j++){
      groupMemberArray[i][j-1] = document.querySelector("#T" + (i + 2) + "R" + j + "C1").innerHTML;
    };
  };
  for(i=1;i<=groupPopArray[0];i++){
    for(j=1;j<=groupPopArray[1]+1;j++){
      groupPreferenceTableArray[0][i-1].push(document.querySelector("#T2R" + i + "C" + (j+1)).innerHTML);
    };
  };
  for(i=1;i<=groupPopArray[1];i++){
    for(j=1;j<=groupPopArray[0]+1;j++){
      groupPreferenceTableArray[1][i-1].push(document.querySelector("#T3R" + i + "C" + (j+1)).innerHTML);
    };
  };
  const selectedNumber = document.form1.which_group.selectedIndex;
  if(selectedNumber == 1){
    CheckArrayAndRunAlgorithm(groupMemberArray[0],groupPreferenceTableArray[0],groupMemberArray[1],groupPreferenceTableArray[1]);
  }else if(selectedNumber == 2){
    CheckArrayAndRunAlgorithm(groupMemberArray[1],groupPreferenceTableArray[1],groupMemberArray[0],groupPreferenceTableArray[0]);
  }else{
    document.querySelector("#display_warning").innerHTML = "※どちらからアプローチするか選んでください!!!!";
  };
};

function ClearMatcingResult(){
  document.querySelector("#matching_result").innerHTML = "";
  WarningReset();
}

//------------------------------------------------------------------------
//表作成ボタン
//------------------------------------------------------------------------
function CreateChoiceTableButton(){
  WarningReset();
  DeleteChoiceTable();
  CreateChoiceTable();
};
//------------------------------------------------------------------------
//テンプレートデータセットボタン
//------------------------------------------------------------------------
function ResetTemplateData(){
  WarningReset();
  DeleteChoiceTable();
  SetTemplateData();
};

//------------------------------------------------------------------------
//警告リセット
//------------------------------------------------------------------------
function WarningReset(){
  document.querySelector("#display_warning").innerHTML = "";
};