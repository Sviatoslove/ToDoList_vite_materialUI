const monthDate = {
  0: "января",
  1: "февраля",
  2: "марта",
  3: "апреля",
  4: "мая",
  5: "июня",
  6: "июля",
  7: "августа",
  8: "сентября",
  9: "октября",
  10: "ноября",
  11: "декабря",
};

function addZero(number) {
  if (number < 10) number = `0${number}`;
  return number;
}

function getDateFormat(date, separator) {
  const day = addZero(date.getDate()); // Получаем день месяца.
  //   const month = setZero(1 + date.getMonth()); // Получаем месяц.
  const month = monthDate[date.getMonth()]; // Получаем месяц.
  const year = date.getFullYear(); // Получаем год.
  // Складываем все данные в строку через сепаратор и возвращаем.

  return `${day}${separator}${month}${separator}${year}г.`;
}

const declensionWord  = (num = 0, word, end1, end2, end3) => {
  let z = num % 100 / 10
  let x = num % 10
  z >= 1.1 && z <= 1.4 ? num += ` ${word}${end1}`: //минут
  x === 1 ? num += ` ${word}${end2}`://минуту
  x === 2 || x === 3 || x === 4 ? num += ` ${word}${end3}`://минуты~
  num += ` ${word}${end1}`//минут
  return num
}

export function displayDate(ms) {
  const date = new Date(ms);
  const dateNow = new Date();

  const yearDif = dateNow.getFullYear() - date.getFullYear();
  if (yearDif === 0) {
    const dayDif = dateNow.getDate() - date.getDate();
    if (dayDif === 0) {
      const hourDif = dateNow.getHours() - date.getHours();
      if (hourDif === 0) {
        const minutesDif = dateNow.getMinutes() - date.getMinutes();
        if (minutesDif >= 0 && minutesDif < 1) return 'только что'
        return `${declensionWord(minutesDif, 'минут', '', 'у', 'ы')} назад`
      }
      return `сегодня в ${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
    }
    return `${addZero(date.getDate())} ${monthDate[date.getMonth()]}`;
  }
  return getDateFormat(date, " ");
}