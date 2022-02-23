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