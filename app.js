
    const URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/ovdp?json';

    let data = await fetch(URL);
        data = await data.json();


    let startDate =  '2021-10-10';
    let endDate   =  '2022-01-01';  

    let debtSum   = data
                    .filter(item => item.attraction > 0)
                    .map(item => ({ //Трансформируем оригинальный объект в объект на 3 нужных поля { sum, val, date } и одновременно преобразуем дату в ISO-формат.
                        sum: item.attraction,
                        val: item.valcode,
                        date: item.repaydate.split('.').reverse().join('-')
                    }))
                    .filter(item => item.date >= startDate && item.date <= endDate)
                    .reduce( 
                        (acc, item) => {
                            if(item.val == 'USD') return acc + item.sum * 27;
                            if(item.val == 'EUR') return acc + item.sum * 31;
                            return acc + item.sum;
                        }, 0);


    console.log(`${(debtSum / 10 ** 9).toFixed(3)} млрд. грн.`)