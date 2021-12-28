const worshipNames = ['주일예배', '수요HTS', '금요기도회', '툐요UCM예배', '영어예배']
const worshipContents = [
  '주일예배의 대한 설명',
  '수요예배의 대한 설명',
  '금요기도회의 대한 설명',
  '토요UCM의 대한 설명',
  '영어예배의 대한 설명'
]
const worshipTimes = [
  '1부: 10:30~12:00; 2부: 2:30~4:00',
  '8:00~10:00', '9:00~11:00',
  '3:00~5:00', '11:00~12:00']
const worshipPlaces = ['본당', '본당', '본당', '본당', '중예배실']
const worshipInfo = []
for (let i = 0; i<worshipNames.length; i++) {
  worshipInfo[i] = { 
    worshipName: worshipNames[i], 
    content: worshipContents[i],
    worshipTime: worshipTimes[i],
    worshipPlace: worshipPlaces[i]
  }
}

const ministryNames = ['하나무브먼트', '하나워십무브먼트', '라렙']
const ministryContents = [
  '',  
  '',
  ''
]
const ministryInfo = []
for (let i = 0; i<ministryNames.length; i++) {
  ministryInfo[i] = {
    ministryName: ministryNames[i],
    ministryContent: ministryContents[i]
  }
}

const nextgenNames = ['조이랜드', '조이스쿨']
const nextgenContents = ['', '']
const nextgenInfo = []
for (let i = 0; i<nextgenNames.length; i++) {
  nextgenInfo[i] = {
    nextgenName: nextgenNames[i],
    nextgenContent: nextgenContents[i]
  }
}


// import { scroll } from 'quasar'

// const { getScrollTarget, setVerticalScrollPosition } = scroll
// export const scrollToElement = (name: string) => {
//   const ele = document.getElementById(name) // You need to get your element here
//   if (!ele) return 
//   const target = getScrollTarget(ele)
//   const offset = ele.offsetTop - ele.scrollHeight
//   const duration = 1000
//   setVerticalScrollPosition(target, offset, duration)
// }

export { worshipInfo, ministryInfo, nextgenInfo }