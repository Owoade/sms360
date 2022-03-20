export function formatCurrency(amount){
    const stringAmount=amount + ""
    let formattedAmount=""
    // Thousand
    if(stringAmount.length == 4){
        stringAmount.split("").forEach((each,i)=>{
             if(i==0){
                formattedAmount +=`${each},`
             }else{
                formattedAmount +=`${each}`;
             }
        })
    }else if(stringAmount.length == 5){
      stringAmount.split("").forEach((each,i)=>{
          if(i==1){
             formattedAmount +=`${each},`
          }
          else{
             formattedAmount +=`${each}`;
          }
     })
  }
    else if(stringAmount.length == 6){
        stringAmount.split("").forEach((each,i)=>{
            if(i==2){
               formattedAmount +=`${each},`
            }
            else{
               formattedAmount +=`${each}`;
            }
       })
    }else if(stringAmount.length == 7){
        stringAmount.split("").forEach((each,i)=>{
            if(i==0){
                formattedAmount +=`${each},`
             }
            else if(i==3){
               formattedAmount +=`${each},`
            }
            else{
               formattedAmount +=`${each}`;
            }
       })
    }else if(stringAmount.length == 8){
      stringAmount.split("").forEach((each,i)=>{
          if(i==1){
              formattedAmount +=`${each},`
           }
          else if(i==4){
             formattedAmount +=`${each},`
          }
          else{
             formattedAmount +=`${each}`;
          }
     })
  }
    else if(stringAmount.length == 9){
      stringAmount.split("").forEach((each,i)=>{
          if(i==2){
              formattedAmount +=`${each},`
           }
          else if(i==5){
             formattedAmount +=`${each},`
          }
          else{
             formattedAmount +=`${each}`;
          }
     })
  }
    else if(stringAmount.length == 10 ){
        stringAmount.split("").forEach((each,i)=>{
            if(i==0){
                formattedAmount +=`${each},`
             }
            else if(i==3){
               formattedAmount +=`${each},`
            }else if(i==6){
                formattedAmount +=`${each},`
            }
            else{
               formattedAmount +=`${each}`;
            }
       })
    }else{
       formattedAmount=amount
    }
    return formattedAmount
   
}
export function getCurrencySymbol(currency){
   let symbol =""
   switch(currency){
      case "NGN":
          symbol=" ₦"
      break    
      case "EUR":
       symbol="€"
       break
      case "USD":
         symbol="$"
      break
      case "GBP" :
         symbol="£"
      break      
   }
   return symbol
}
export function  pushNotification(user_info,notification){
   const date = new Date()
    const timeStamp = {
       hour:date.getHours(),
       minute:date.getMinutes(),
       milliseconds: Date.now()
    }
    if(user_info.stock_logs.length  == 0){
       return [{month:date.getMonth(),year:date.getFullYear(),activities:[{...notification,timeStamp}]}]
   }else{
      if(date.getMonth() == user_info.stock_logs[user_info.stock_logs.length - 1 ].month){
         user_info.stock_logs[user_info.stock_logs.length - 1 ].activities.push({...notification,timeStamp})
         return user_info.stock_logs
      }else{
         return [...user_info.stock_logs,{month:date.getMonth(),year:date.getFullYear(),activities:[{...notification,timeStamp}]}]
      }
   }
}
export function getMonthFromIndex(index){
   let month = ""
   switch(index){
      case 0: month="January";break;
      case 1: month="February";break;
      case 2: month="March";break;
      case 3: month="April";break;
      case 4: month="May";break;
      case 5: month="June";break;
      case 6: month="July";break;
      case 7: month="August";break;
      case 8: month="September";break;
      case 9: month="October";break;
      case 10: month="November";break;
      case 11: month="December";break;
   }
   return month
}
export function formatDate(year,month,date,timeStamp){
   const myDate = new Date();
   console.log(year,month,date,month,timeStamp,[ myDate.getFullYear(),myDate.getMonth(),myDate.getDate()])
   let formattedDate ="juice"
   // Today
   if(myDate.getDate() == date && myDate.getMonth()== month && myDate.getFullYear() == year){
      if(myDate.getMinutes() - timeStamp.minute  < 2 && myDate.getHours() == timeStamp.hour   ){
         // alert(1)
         formattedDate = "just now"
      }else if(myDate.getMinutes() - timeStamp.minute  < 60 && myDate.getHours() == timeStamp.hour){
         // alert(2)
         formattedDate = `${myDate.getMinutes() - timeStamp.minute}m ago`
      }else if(timeStamp.hour < myDate.getHours()){
         // alert(3)
         formattedDate = `${myDate.getHours() - timeStamp.hour}h ago`
      }else{
         formattedDate = `${myDate.getHours() - timeStamp.hour}h ago`
      }
   }else if(date < myDate.getDate() && month == myDate.getMonth()){
      alert(4)
      formattedDate = `${myDate.getDate() - date}d ago`
   }else{
      alert(5)
      formattedDate = `${date}-${month++}-${year}`
   }
   console.log(formattedDate)
   return formattedDate 
   
}
export  function sumArray(arr) {
   let sum = 0
   if (arr.length == 0) {
       return 0
   } else {
       arr.forEach(each => sum += each)
   }
   return sum
}
