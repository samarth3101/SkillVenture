import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | null, // Change undefined to null for consistency
}

export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Row {
    // Calculate prices and ratio
    const priceABC = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price) / 2;
    const priceDEF = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price) / 2;
    const ratio = priceABC / priceDEF;

    // Define bounds
    const upperBound = 1 + 0.05;
    const lowerBound = 1 - 0.05;

    // Determine if trigger alert should be set
    const triggerAlert = (ratio > upperBound || ratio < lowerBound) ? ratio : null;

    // Return row data
    return {
      price_abc: priceABC,
      price_def: priceDEF,
      ratio,
      timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp 
        ? serverRespond[0].timestamp 
        : serverRespond[1].timestamp,
      upper_bound: upperBound,
      lower_bound: lowerBound,
      trigger_alert: triggerAlert,
    };
  }
}