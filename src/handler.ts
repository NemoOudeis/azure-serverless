import { AzureFunction } from "@azure/functions";
import { BitFlyer } from 'bitflyer-api';
import * as credentials from './credentials.json';

const JPY_AMOUNT = 10000;

export const cron: AzureFunction = async (context, timerObj) => {
  const bitflyer = new BitFlyer(credentials);
  
  const balance = await bitflyer.getBalance()
  const jpy = balance.find(it => it.currency_code == 'JPY')
  context.log(`Available JPY = ${jpy}, purchase target = ${JPY_AMOUNT}`)
  
  const board = await bitflyer.board('BTC_JPY');
  const amount = JPY_AMOUNT / board.mid_price
  context.log(`Time: ${new Date().toISOString()}`);
  context.log(`Should buy ${amount} BTC at price ${board.mid_price}`)
  context.log(`=> should come out at ${amount * board.mid_price} (without fees)`)

  context.done();
};
