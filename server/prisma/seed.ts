import { Customer, Order, OrderItem, Pole, PoleHistory, PoleRate, Prisma, PrismaClient } from '@prisma/client'
import * as seedData from '../src/seedData/qcva.json'
const prisma = new PrismaClient()




function nullishNumberToNullishPrismaDecimal(num: number | null): Prisma.Decimal | null {
    return num ? new Prisma.Decimal(num) : null;
}

function nullishNumberToPrismaDecimal(num: number | null): Prisma.Decimal {
    return num ? new Prisma.Decimal(num) : new Prisma.Decimal(0);
}


async function main() {
    await seedPoleRates(seedData.poleRates);
    await seedPoles(seedData.poles);
    await seedPoleHistory(seedData.poleHistory);
    await seedCustomer(seedData.customers);
    await seedOrder(seedData.orders);
    await seedOrderItem(seedData.orderItems);

}


main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

async function seedPoleRates(poleRates: typeof seedData.poleRates) {

    const seedPoleRates: PoleRate[] = poleRates.map(poleRate => ({
        ...poleRate,
        newRate: nullishNumberToNullishPrismaDecimal(poleRate.newRate),
        clubNewRate: nullishNumberToNullishPrismaDecimal(poleRate.clubNewRate),
        usedRate: nullishNumberToNullishPrismaDecimal(poleRate.usedRate),
        clubUsedRate: nullishNumberToNullishPrismaDecimal(poleRate.clubUsedRate),
        rentSeason: nullishNumberToNullishPrismaDecimal(poleRate.rentSeason),
        rentMonth: nullishNumberToNullishPrismaDecimal(poleRate.rentMonth),
        rentMeet: nullishNumberToNullishPrismaDecimal(poleRate.rentMeet),
    }));

    console.log(`Seeding poleRates (${seedPoleRates.length} entries)...`)

    await Promise.all(
        seedPoleRates.map(async (poleRate: PoleRate) => {
            await prisma.poleRate.create({
                data: poleRate,
            });
        })
    );
}

async function seedPoles(poles: typeof seedData.poles) {


    const seedPoles: Pole[] = poles.map(pole => ({
        ...pole,
        flex: nullishNumberToPrismaDecimal(pole.flex),
        cost: nullishNumberToPrismaDecimal(pole.cost),
        soldAt: nullishNumberToNullishPrismaDecimal(pole.soldAt),
        revenue: nullishNumberToNullishPrismaDecimal(pole.revenue),
        dop: new Date(pole.dop),
    }))

    console.log(`Seeding poles (${seedPoles.length} entries)...`)
    await Promise.all(
        seedPoles.map(async (pole: Pole) => {
            await prisma.pole.create({
                data: pole
            })
        })
    )
}

async function seedPoleHistory(poleHistory: typeof seedData.poleHistory) {
    const seedPoleHistory: PoleHistory[] = poleHistory.map(poleHist => ({
        ...poleHist,
        date: new Date(poleHist.date)
    }))


    console.log(`Seeding poleHistorys (${seedPoleHistory.length} entries)...`)
    await Promise.all(
        seedPoleHistory.map(async (poleHist: PoleHistory) => {
            await prisma.poleHistory.create({
                data: poleHist
            })
        })
    )
}

async function seedCustomer(customers: typeof seedData.customers) {
    console.log(`Seeding customers (${customers.length} entries)...`)
    await Promise.all(
        customers.map(async (customer: Customer) => {
            await prisma.customer.create({
                data: customer
            })
        })
    )
}

async function seedOrder(orders: typeof seedData.orders) {
    const seedOrders: Order[] = orders.map(order => ({
        ...order,
        orderDate: new Date(order.orderDate),
        orderTotal: nullishNumberToPrismaDecimal(order.orderTotal)
    }))

    console.log(`Seeding orders (${seedOrders.length} entries)...`)
    await Promise.all(
        seedOrders.map(async (order: Order) => {
            await prisma.order.create({
                data: order
            })
        })
    )
}

async function seedOrderItem(orderItems: typeof seedData.orderItems) {
    const seedOrderItems: OrderItem[] = orderItems.map(orderItem => ({
        ...orderItem,
        price: nullishNumberToPrismaDecimal(orderItem.price)
    }))

    console.log(`Seeding orderItems (${seedOrderItems.length} entries)...`)
    await Promise.all(
        seedOrderItems.map(async (orderItem: OrderItem) => {
            await prisma.orderItem.create({
                data: orderItem
            })
        })
    )

}