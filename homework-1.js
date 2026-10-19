const readline = require('node:readline/promises')

function ticketPrice(category){
    switch(category) {
    case 1: return 300
    case 2: return 500
    case 3: return 900
    default: return 0
    }
} 

function maxTickets(budget, price){
    let count = 0
    while (budget >= price){
        budget = budget - price
        count = count + 1
    }
    return count
}

function printTicketResult(category, budget){
    const price = ticketPrice(category)
    if (price === 0) {
        console.log(`неизвестная категория`)
        return
    }
    const count = maxTickets(budget, price)
    console.log(`Категория ${category}, билет ${price} руб., бюджет ${budget} руб.: можно купить ${count} шт.`)

}

function deliveryPrice(distance, total) {
    let price = 0
    if (total >= 3000) {
        price = 0
    } else if (distance<=3) {
        price = 0
    } else if (distance>=4 && distance<=10) { 
        price = 200
    } else {
        price = 200 + (distance-10)*25
    }
    return price
}
function printDelivery(distance, total) {
    const price = deliveryPrice(distance, total)
    console.log(`Расстояние ${distance} км, заказ ${total} руб.: доставка ${price} руб.`)
}

function printSteps(height){
    let steps = 0;
    for (let i = 1; i<=height; i++){
        if (i===4){
            continue
        }
        console.log(`Ступень ${i}`)
        steps++
        if ( i===10 ) {
            console.log(`Дальше лестница не построена`)
            break
        }
    }
    console.log(`Всего построено: ${steps}`)
}



async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

  console.log(`Выберите задачу:`)
  console.log('1 – билетная касса, 2 – доставка заказа, 3- лестница')
  const choice = Number(await rl.question('Ваш выбор: '))

  let category = 0
  let budget = 0
  if (choice === 1) {
    category = Number(await rl.question('Категория билета: '))
    budget = Number(await rl.question('Бюджет: '))
    printTicketResult(category, budget)
    rl.close()
  }

  let distance = 0
  let total = 0
  if (choice === 2) {
    distance = Number(await rl.question('Расстояние: '))
    total = Number(await rl.question('Сумма заказа: '))
    printDelivery(distance, total)
    rl.close()
  }

  let height = 0
  if (choice == 3) {
    height = Number(await rl.question(`Высота лестницы: `))
    printSteps(height)
    rl.close()
  }

}

main()