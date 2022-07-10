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
  