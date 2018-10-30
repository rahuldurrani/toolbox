import {action, observable} from '@xh/hoist/mobx';
import {HoistModel} from '@xh/hoist/core';
import faker from 'faker';
import moment from 'moment';
import {times, isNil} from 'lodash';
import {wait} from '@xh/hoist/promise';

@HoistModel
export class PortfolioDataService {

    randomOrders = [];

    models = ['Ren', 'Vader', 'Beckett', 'Hutt', 'Maul'];
    strategies = ['US Tech Long/Short', 'US Healthcare Long/Short', 'EU Long/Short', 'BRIC', 'Africa'];
    symbols = [];
    numOrders = 100;

    @observable.ref portfolioVersion = 0;
    portfolio = [];
    orders = [];
    marketData = [];

    dimensions = ['model'];

    constructor() {
        this.generateRandomOrders(this.numOrders);
        this.generatePortfolioFromOrders(this.randomOrders, this.dimensions);
    }

    async getPortfolioAsync(dimensions) {
        this.portfolio = [];
        this.dimensions = dimensions;
        this.generatePortfolioFromOrders(this.randomOrders, this.dimensions);
        return wait(500).then(() => {
            return this.portfolio;
        });
    }

    getOrders(positionId) {
        return wait(250).then(() => {
            const orders = this.orders.filter(order => order.id.startsWith(positionId));
            return orders;
        });
    }

    getLineChartSeries(symbol) {
        return wait(250).then(() => {
            const marketData = this.marketData.find(record => record.symbol === symbol);
            const prices = marketData.data.map(it => {
                const date = moment(it.valueDate).valueOf();
                return [date, it.volume];
            });
            return ([{
                name: symbol,
                type: 'area',
                data: prices
            }]);
        });
    }

    getOLHCChartSeries(symbol) {
        return wait(250).then(() => {
            const marketData = this.marketData.find(record => record.symbol === symbol);
            const prices = marketData.data.map(it => {
                const date = moment(it.valueDate).valueOf();
                return [date, it.open, it.high, it.low, it.close];
            });
            return ([
                {
                    name: symbol,
                    type: 'ohlc',
                    color: 'rgba(219, 0, 1, 0.55)',
                    upColor: 'rgba(23, 183, 0, 0.85)',
                    dataGrouping: {
                        enabled: true,
                        groupPixelWidth: 5
                    },
                    data: prices
                }
            ]);
        });
    }

    generateMarketData() {
        const startDate = moment('2017-01-01', 'YYYY-MM-DD'),
            todayDate = moment(),
            numDays = todayDate.diff(startDate, 'days'),
            ret = [];

        let prevClose = Math.random() * 1000;

        times(numDays, () => {
            const valueDate = startDate.add(1, 'd');

            const low = prevClose - (Math.random() * (prevClose / 100));
            const high = prevClose + (Math.random() * (prevClose / 100));
            const open = prevClose;
            const close = (Math.random() * (high - low)) + low;

            if (valueDate.day() !== 0 && valueDate.day() !== 6) {
                ret.push({
                    valueDate: valueDate.format('YYYYMMDD'),
                    high: Number(high.toFixed(2)),
                    low: Number(low.toFixed(2)),
                    open: Number(open.toFixed(2)),
                    close: Number(close.toFixed(2)),
                    volume: Math.round(Math.random() * 1000000)
                });
                prevClose = close;
            }
        });

        return ret;
    }

    getRandomPositionForPortfolio() {
        const modelIndex = Math.floor(Math.random() * this.models.length),
            strategyIndex = Math.floor(Math.random() * this.strategies.length);

        return {
            model: this.models[modelIndex],
            strategy: this.strategies[strategyIndex],
            symbol: this.generateRandomSymbol()
        };
    }

    // portfolio builder
    updatePortfolioWithOrder(keySet, order) {
        let level = this.portfolio;
        let id = (isNil(level) ? '0' : level.length).toString();
        keySet.forEach((key, index) => {
            let entry = level.find(level => level.name === key);
            if (isNil(entry)) {
                if (index === keySet.length - 1) {
                    entry = {
                        id: id,
                        name: key,
                        volume: 0,
                        pnl: 0
                    };
                } else {
                    entry = {
                        id: id,
                        name: key,
                        children: []
                    };
                }
                level.push(entry);
            }
            level = entry.children;
            id = entry.id + '-' + (isNil(level) ? '0' : level.length).toString();

            if (index === keySet.length - 1) {
                entry.volume += order.volume;
                entry.pnl += order.pnl;
                this.orders.push({id: (entry.id + '-' + (isNil(this.orders) ? '0' : this.orders.length).toString()), ...order});
            }
        });
    }
    generatePortfolioFromOrders(orders, dimensions) {
        orders.forEach((order) => {
            const key = [];
            dimensions.forEach((dimension) => {
                key.push(order[dimension]);
            });
            this.updatePortfolioWithOrder(key, order);
        });
    }

    // random order-data generators
    generateRandomOrders(numberOfOrders) {
        times(numberOfOrders, () => {
            const randomOrder =
                this.getRandomPositionForPortfolio(this.portfolio);

            this.randomOrders.push({
                model: randomOrder.model,
                strategy: randomOrder.strategy,
                symbol: randomOrder.symbol,
                time: moment.utc(Math.round(Math.random() * 23400000) + 34200000).format('HH:mm:ss'),
                trader: faker.name.findName(),
                dir: this.generateRandomDirection(),
                volume: this.generateRandomQuantity(),
                pnl: this.generateRandomPnl()
            });
        });
    }

    generateRandomSymbol() {
        const numberOfSymbols = 50;

        if (this.symbols.length === 0) {
            const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            times(numberOfSymbols, () => {
                let symbol = '';
                const length = Math.floor(Math.random() * 2) + 3;
                times(length, () => {
                    symbol += alpha.charAt(Math.floor(Math.random() * 27));
                });
                this.symbols.push(symbol);
                this.marketData.push({symbol: symbol, data: this.generateMarketData()});
            });
        }

        return this.symbols[Math.round(Math.random() * 49)];
    }

    generateRandomDirection() {
        return Math.floor(Math.random() * 2) === 0 ? 'SELL' : 'BUY';
    }

    generateRandomQuantity() {
        return Math.floor(Math.random() * 1000001);
    }

    generateRandomPnl() {
        return Math.floor(Math.random() * 1000001) * (Math.random() < 0.5 ? -1 : 1);
    }

    async loadOrdersAsync() {
        setInterval(() => {
            console.log('new order received');
            // const order = this.generateOrder();
            // this.updatePortfolioWithOrder(order);

            this.generatePortfolioFromOrders(this.generateRandomOrders(1), this.dimensions);
            this.incrementPortfolioVersion();
        }, 2500);
    }

    @action
    incrementPortfolioVersion() {
        this.portfolioVersion++;
    }
}