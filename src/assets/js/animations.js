setTimeout(() => {

  const animItems = document.querySelectorAll(".anim");
  const td = document.querySelectorAll(".td")
  const left = document.getElementById('left')

  firstArray = [
    ['Тикер', 'Посл. Цена', 'Объём', 'Минимум', 'Максимум', 'Время', ''],
    ['CCBN', '380,01', '-', '379,50', '389,99', '13.04.2022 13:59:04', '<img src="assets/images/Vector.svg">'],
    ['HSBK', '116,19', '-', '115,75', '117,54', '13.04.2022 14:30:43', ''],

    ['KCEL', '1 510,01', '-', '1 510,01', '1 544,00', '13.04.2022 14:30:43', '<img src="assets/images/Vector.svg">'],
    ['KEGC', '1 691,00', '-', '1 689,00', '1 707,00', '13.04.2022 14:13:09', '<img src="assets/images/Vector.svg">'],
    ['KZAP', '15 001,00', '-', '14 950,00', '15 082,00', '13.04.2022 14:30:55', '<img src="assets/images/Vector.svg">'],

    ['KZTK', '30 998,98', '-', '30 699,90', '31 150,00', '13.04.2022 13:40:46', '<img src="assets/images/Vector.svg">'],
    ['KZTO', '941,00', '-', '937,01', '959,00', '13.04.2022 14:34:38', '<img src="assets/images/Vector.svg">'],
    ['ASBN', '4,96', '-', '4,60', '5,00', '13.04.2022 13:42:41', '<img src="assets/images/Vector.svg">'],

    ['KSPI', '31 739,00', '-', '31 385,00', '31 739,25', '13.04.2022 13:43:46', '<img src="assets/images/Vector.svg">'],

    ['AKZM', '8 479,46', '-', '8 479,46', '8 479,46', '13.04.2022 14:28:38', '<img src="assets/images/Vector.svg">'],
    ['RAHT', '18 000,00', '-', '17 990,00', '18 000,00', '13.04.2022 14:34:33', '<img src="assets/images/Vector.svg">'],
    ['NL_YNDX', '16 599,00', '-', '15 801,00', '16 600,00', '13.04.2022 13:35:28', '<img src="assets/images/Vector.svg">'],
  ]

  secondArray = [
    ['13.04.2022 18:34', 'Курманбаев Т.Н. избран членом Совета директоров АО "КазТрансОйл"', '<img src="assets/images/bookmark.svg">'],
    ['13.04.2022 18:34', 'Министерство финансов Казахстана разместило на KASE 13 апреля 20,5 млн МЕУКАМ-180 второго выпуска (KZKD00000139,', '<img src="assets/images/bookmark.svg">'],
    ['13.04.2022 18:34', 'Министерство финансов Казахстана разместило на KASE 13 апреля 15,2 млн МЕУКАМ-72 выпуска 13 (KZKD00001145,', '<img src="assets/images/bookmark.svg">'],
    ['13.04.2022 18:34', 'Министерство финансов Казахстана разместило на KASE 13 апреля 22,6 млн МЕОКАМ-36 выпуска 91 (KZK200000695', '<img src="assets/images/bookmark.svg">'],
    ['13.04.2022 18:34', '13 апреля значение Индекса KASE снизилось на 0,69% до 3 151,14', '<img src="assets/images/bookmark.svg">'],
    ['13.04.2022 18:34', 'АО "Kaspi Bank" сообщило о подтверждении агентством Moody Investors Service рейтинговых оценок банка, прогноз', '<img src="assets/images/bookmark.svg">']
  ]

  tabs = [
    ['<div class="tab">\n' +
    '          Все новости\n' +
    '        </div>\n' +
    '        <div class="tab">\n' +
    '          Новости рынков\n' +
    '        </div>\n' +
    '        <div class="tab">\n' +
    '          Новости компаний\n' +
    '        </div>\n' +
    '        <div class="tab">\n' +
    '          Новости Биржи\n' +
    '        </div>\n' +
    '        <div class="empty">\n' +
    '        </div>\n' +
    '        <div class="tab tab-favorite">\n' +
    '          <img src="assets/images/bookmark-filled.svg" alt="">\n' +
    '          Избранное\n' +
    '        </div>'
    ],
    [
    '        <div class="tab">\n' +
    '          Акции, паи, ETF\n' +
    '        </div>\n' +
    '        <div class="tab">\n' +
    '          Облигации\n' +
    '        </div>\n' +
    '        <div class="tab">\n' +
    '          ГЦБ\n' +
    '        </div>\n' +
    '        <div class="tab">\n' +
    '          Операции репо\n' +
    '        </div>\n' +
    '        <div class="tab">\n' +
    '          Иностранные валюты\n' +
    '        </div>\n' +
    '        <div class="tab">\n' +
    '          Деривативы\n' +
    '        </div>\n' + '']
  ]

  console.log(animItems)
  if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
      for (let i = 0; i < animItems.length; i++) {
        const animItem = animItems[i];
        const animItemHeight = animItem.offsetHeight;
        const animItemOffset = offset(animItem).top;
        const animStart = 3;
        const animStart2 = 1.4;
        const animStart3 = 1.1;
        const animStart4 = 1.05;

        // let animItemPoint = window.innerHeight - animItemHeight / animStart;
        // let animItemPoint2 = window.innerHeight - animItemHeight / animStart2;
        // let animItemPoint3 = window.innerHeight - animItemHeight / animStart3;
        // let animItemPoint4 = window.innerHeight - animItemHeight / animStart4;

        let animItemPoint = -100;
        let animItemPoint2 = -200;
        let animItemPoint3 = -500;
        let animItemPoint4 = -800;

        // console.log(animItemPoint2);
        // console.log(animItemPoint3);
        // console.log(animItemPoint4);

        if (animItemHeight > window.innerHeight) {
          animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }

        if ((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)) {
          left.classList.add('first');

          // let h = 0;
          // let k = 0;
          // document.querySelectorAll('.td').forEach(function(el) {
          //   if (k === 7) {
          //     k = 0;
          //     h++;
          //   }
          //   el.innerHTML = firstArray[h][k];
          //   k++;
          // document.getElementById('btn-field').style.opacity = 1;
          // document.getElementById('btn-field').style.display = 'block';
          document.getElementById('tr-header').classList.add('tr-header')
          document.getElementById('first-table').classList.add('table-zebra')
          // });
          console.log(td[0].textContent)

          td[0].textContent =  firstArray[0][0];
          td[1].textContent =  firstArray[0][1];
          td[2].textContent =  firstArray[0][2];
          td[3].textContent =  firstArray[0][3];
          td[4].textContent =  firstArray[0][4];
          td[5].textContent =  firstArray[0][5];
          td[6].textContent =  firstArray[0][6];

          td[7].textContent =  firstArray[1][0];
          td[8].textContent =  firstArray[1][1];
          td[9].textContent =  firstArray[1][2];
          td[10].textContent =  firstArray[1][3];
          td[11].textContent =  firstArray[1][4];
          td[12].textContent =  firstArray[1][5];
          td[13].innerHTML =  firstArray[1][6];

          td[14].textContent =  firstArray[2][0];
          td[15].textContent =  firstArray[2][1];
          td[16].textContent =  firstArray[2][2];
          td[17].textContent =  firstArray[2][3];
          td[18].textContent =  firstArray[2][4];
          td[19].textContent =  firstArray[2][5];
          td[20].innerHTML =  firstArray[2][6];

          td[21].textContent =  firstArray[3][0];
          td[22].textContent =  firstArray[3][1];
          td[23].textContent =  firstArray[3][2];
          td[24].textContent =  firstArray[3][3];
          td[25].textContent =  firstArray[3][4];
          td[26].textContent =  firstArray[3][5];
          td[27].innerHTML =  firstArray[3][6];

          td[28].textContent =  firstArray[4][0];
          td[29].textContent =  firstArray[4][1];
          td[30].textContent =  firstArray[4][2];
          td[31].textContent =  firstArray[4][3];
          td[32].textContent =  firstArray[4][4];
          td[33].textContent =  firstArray[4][5];
          td[34].innerHTML =  firstArray[4][6];

          td[35].textContent =  firstArray[5][0];
          td[36].textContent =  firstArray[5][1];
          td[37].textContent =  firstArray[5][2];
          td[38].textContent =  firstArray[5][3];
          td[39].textContent =  firstArray[5][4];
          td[40].textContent =  firstArray[5][5];
          td[41].innerHTML =  firstArray[5][6];

          td[42].textContent =  firstArray[6][0];
          td[43].textContent =  firstArray[6][1];
          td[44].textContent =  firstArray[6][2];
          td[45].textContent =  firstArray[6][3];
          td[46].textContent =  firstArray[6][4];
          td[47].textContent =  firstArray[6][5];
          td[48].innerHTML =  firstArray[6][6];

          td[49].textContent =  firstArray[7][0];
          td[50].textContent =  firstArray[7][1];
          td[51].textContent =  firstArray[7][2];
          td[52].textContent =  firstArray[7][3];
          td[53].textContent =  firstArray[7][4];
          td[54].textContent =  firstArray[7][5];
          td[55].innerHTML =  firstArray[7][6];

          td[56].textContent =  firstArray[8][0];
          td[57].textContent =  firstArray[8][1];
          td[58].textContent =  firstArray[8][2];
          td[59].textContent =  firstArray[8][3];
          td[60].textContent =  firstArray[8][4];
          td[61].textContent =  firstArray[8][5];
          td[62].innerHTML =  firstArray[8][6];

          td[63].textContent =  firstArray[9][0];
          td[64].textContent =  firstArray[9][1];
          td[65].textContent =  firstArray[9][2];
          td[66].textContent =  firstArray[9][3];
          td[67].textContent =  firstArray[9][4];
          td[68].textContent =  firstArray[9][5];
          td[69].innerHTML =  firstArray[9][6];

          td[70].textContent =  firstArray[10][0];
          td[71].textContent =  firstArray[10][1];
          td[72].textContent =  firstArray[10][2];
          td[73].textContent =  firstArray[10][3];
          td[74].textContent =  firstArray[10][4];
          td[75].textContent =  firstArray[10][5];
          td[76].innerHTML =  firstArray[10][6];

          td[77].textContent =  firstArray[11][0];
          td[78].textContent =  firstArray[11][1];
          td[79].textContent =  firstArray[11][2];
          td[80].textContent =  firstArray[11][3];
          td[81].textContent =  firstArray[11][4];
          td[82].textContent =  firstArray[11][5];
          td[83].innerHTML =  firstArray[11][6];

          td[84].textContent =  firstArray[12][0];
          td[85].textContent =  firstArray[12][1];
          td[86].textContent =  firstArray[12][2];
          td[87].textContent =  firstArray[12][3];
          td[88].textContent =  firstArray[12][4];
          td[89].textContent =  firstArray[12][5];
          td[90].innerHTML =  firstArray[12][6];
        } else {
          left.classList.remove('first');
        }

        if ((scrollY > animItemOffset - animItemPoint2) && scrollY < (animItemOffset + animItemHeight)) {
          left.classList.add('second');

          let h = 0;
          let k = 0;

          // for (let j = 0; j < td.length; j++) {
          //   if (j === 3) {
          //     j += 5;
          //   }
          //   if (k === 3) {
          //     k = 0;
          //     h++;
          //   }
          //   // td[j].innerHTML = secondArray[h][k];
          //   console.log(td[j]);
          //   // console.log(secondArray[h][k])
          //   k++;
          // }
          // document.getElementById('btn-field').style.opacity = 0;
          // document.getElementById('btn-field').style.display = 'none';
          document.getElementById('tabs').innerHTML = tabs[0];
          document.getElementById('tr-header').classList.remove('tr-header')
          document.getElementById('first-table').classList.remove('table-zebra')
          td[0].textContent =  secondArray[0][0];
          td[1].textContent =  secondArray[0][1];
          td[2].innerHTML =  secondArray[0][2];

          td[7].textContent =  secondArray[1][0];
          td[8].textContent =  secondArray[1][1];
          td[9].innerHTML =  secondArray[1][2];

          td[14].textContent =  secondArray[2][0];
          td[15].textContent =  secondArray[2][1];
          td[16].innerHTML =  secondArray[2][2];

          td[21].textContent =  secondArray[3][0];
          td[22].textContent =  secondArray[3][1];
          td[23].innerHTML =  secondArray[3][2];

          td[28].textContent =  secondArray[4][0];
          td[29].textContent =  secondArray[4][1];
          td[30].innerHTML =  secondArray[4][2];

          td[35].textContent =  secondArray[5][0];
          td[36].textContent =  secondArray[5][1];
          td[37].innerHTML =  secondArray[5][2];
        } else {
          left.classList.remove('second');
        }

        if ((scrollY > animItemOffset - animItemPoint3) && scrollY < (animItemOffset + animItemHeight)) {
          left.classList.add('third');
          document.getElementById('tabs').innerHTML = tabs[1];
        } else {
          left.classList.remove('third');
        }

        if ((scrollY > animItemOffset - animItemPoint4) && scrollY < (animItemOffset + animItemHeight)) {
          left.classList.add('fourth');
        } else {
          left.classList.remove('fourth');
        }
      }
    }

    function offset(el) {
      const rect = el.getBoundingClientRect(),
        scrollLeft = window.scrollX || document.documentElement.scrollLeft,
        scrollTop = window.scrollY || document.documentElement.scrollTop;
      return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }

    // animOnScroll()

  }
}, 1000)

