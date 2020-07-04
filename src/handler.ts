import { AzureFunction } from "@azure/functions";
import { BitFlyer } from 'bitflyer-api';
import * as credentials from './credentials.json';
import { ChildOrderType, OrderSide } from "bitflyer-api/dist/lib/types";

const JPY_AMOUNT = 12500;

const prettyJson = (val: any) => JSON.stringify(val, null, 2)
const roundFloat = (num: number, precision: number) => Math.round(num * 10**precision) / (10**precision)

export const cron: AzureFunction = async (context, timerObj) => {
  const bitflyer = new BitFlyer(credentials);
  
  const balance = await bitflyer.getBalance()
  const jpy = balance.find(it => it.currency_code == 'JPY')
  if(jpy && jpy.available > JPY_AMOUNT) {
    context.log(`Available JPY = ${jpy.available} / ${jpy.amount}, purchase target = ${JPY_AMOUNT}`)
  
    const board = await bitflyer.board('BTC_JPY')
    const amount = JPY_AMOUNT / board.mid_price
    const order = {
      product_code: 'BTC_JPY',
      child_order_type: ChildOrderType.Market,
      side: OrderSide.Buy,
      size: roundFloat(amount, 8)
    }
    context.log(`BTC market mid price: ${board.mid_price}`)
    context.log('Placing order', prettyJson(order))
  
    const receipt = await bitflyer.sendChildOrder(order)
  
    context.log('Oder placed, receipt:', prettyJson(receipt))
  } else {
    context.log('failed to load fiat balance or not enough funds, aborting', prettyJson(jpy))
  }
  
  context.done();
};
