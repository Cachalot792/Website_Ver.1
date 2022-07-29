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
    document.querySelector("#display_warning").innerHTML = "";
  }
  
  //------------------------------------------------------------------------
  //表作成ボタン
  //------------------------------------------------------------------------
  function CreateChoiceTableButton(){
    DeleteChoiceTable();
    CreateChoiceTable();
  };
  //------------------------------------------------------------------------
  //テンプレートデータセットボタン
  //------------------------------------------------------------------------
  function ResetTemplateData(){
    DeleteChoiceTable();
    SetTemplateData();
  };