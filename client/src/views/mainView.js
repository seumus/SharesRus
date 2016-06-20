var banner = function(companies){ 
  var scroll = document.getElementById("scroll")
  for (company of companies){
    var span1 = document.createElement('span')
    var span2 = document.createElement('span')
    span1.innerText = " --- "
    span2.innerText = company.name + company.priceChange
    if (company.priceChange > 0){
      span2.classname = "plus"
    }
    if (company.priceChange < 0){
      span2.classname = "minus"
    }
    scroll.appendChild('span1')
    scroll.appendChild('span2')
  }
}