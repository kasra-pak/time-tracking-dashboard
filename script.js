const timeFrameMenu = document.querySelector('.time-frames');
const statisticBoxes = document.querySelectorAll('.statistic-box__content')

const previousStatisticPrefix = {
  'daily': 'Yesterday',
  'weekly': 'Last Week',
  'monthly': 'Last Month',
}

showUserReportData('weekly');

function showUserReportData(timeframe) {
  
  fetch("data.json")
    .then(response => response.json())
    .then(data => {

      userReportData = data
      
      for (let [index, statisticBox] of statisticBoxes.entries()) {

        const currentStatEl = statisticBox.querySelector('.current-statistic');
        const previousStatEl = statisticBox.querySelector('.previous-statistic');
        
        currentStatValue = userReportData[index].timeframes[timeframe].current
        previousStatValue = userReportData[index].timeframes[timeframe].previous
        
        currentStatEl.innerHTML = `${currentStatValue}hrs`;
        previousStatEl.innerHTML = `${previousStatisticPrefix[timeframe]} - ${previousStatValue}hrs`;
        }
    });
}

// Event-delegation;
// a better approach for handling event on repeatitive elements, instead of using addEventListener on each element
class Menu {
  constructor(elem) {
    this._elem = elem;
    elem.onclick = this.onClick.bind(this);
  }

  daily() {
    showUserReportData('daily')
  }

  weekly() {
    showUserReportData('weekly')
  }

  monthly() {
    showUserReportData('monthly')    
  }

  onClick(e) {
    let action = e.target.dataset.action;
    
    if (action) {
      for (let element of this._elem.children) {
        element.classList.remove('active')
      }

      e.target.classList.add('active')
      this[action]();
    }
  };
}

new Menu(timeFrameMenu);