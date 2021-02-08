/**
 * Challenge 3
 *
 * The goal of this challenge is to collect arrival and departure flight records and placing them into 4 buckets:
 *
 * - Early Arrivals
 * - Late Arrivals
 * - Early Departures
 * - Late Departures
 *
 * The flight data can be collected from the backend, which you can start up with "npm run start:api"
 *
 * You can get flight information by making a REST call to http://localhost:3000/arrivals and http://localhost:3000/departures
 * You can get flight actual landing/take-off updates over WebSockets from ws://localhost:3000/flightUpdates
 *
 * Process the payload of the FLIGHT_UPDATE messages which are send over the websocket.
 * When a PRINT message is received, a message should be printed to the console with the flights grouped into the buckets above,
 * this can be determined by the delta between the departureTime vs takeOffTime and arrivalTime vs landingTime.
 * For example; a flight with a takeOffTime that is before the departureTime is counted as an early departure.
 *
 * How many flights are there in each bucket?
 *
 * The output could look something like this:
 *
 * {
 *     lateArrivals: 11,
 *     earlyArrivals: 12,
 *     lateDepartures: 10,
 *     earlyDepartures: 15,
 * }
 * {
 *     lateArrivals: 12,
 *     earlyArrivals: 11,
 *     lateDepartures: 18,
 *     earlyDepartures: 26,
 * }
 * {
 *     lateArrivals: 10,
 *     earlyArrivals: 15,
 *     lateDepartures: 20,
 *     earlyDepartures: 25,
 * }
 *
 * (Tip: the use of RxJS might be of big help but is not obligated)
 */

import { MessageType } from './../api/ws';
import { ArrivalFlight, ArrivalFlightUpdate } from '../api/arrivals';
import { DepartureFlight, DepartureFlightUpdate } from '../api/departures';
import WebSocket from 'ws';
import fetch from 'node-fetch';

type Flight = ArrivalFlight | DepartureFlight;
type FlightUpdate = ArrivalFlightUpdate | DepartureFlightUpdate;
type WebsocketMessage =
    | {
        type: MessageType.FLIGHT_UPDATE;
        payload: FlightUpdate;
    }
    | {
        type: MessageType.PRINT;
        payload: 'ArrivalTimeMap';
    };

type Buckets = {
    arrivals: ArrivalFlight[];
    lateArrivals: ArrivalFlight[];
    earlyArrivals: ArrivalFlight[];
    departures: DepartureFlight[];
    lateDepartures: DepartureFlight[];
    earlyDepartures: DepartureFlight[];
}

const buckets: Buckets = {
    arrivals: [],
    lateArrivals: [],
    earlyArrivals: [],
    departures: [],
    lateDepartures: [],
    earlyDepartures: []
};

const getArrivals = (): Promise<ArrivalFlight[]> => fetch('http://localhost:3000/arrivals')
    .then(res => res.json())
    .then(res => res as ArrivalFlight[]);

const getDepartures = (): Promise<DepartureFlight[]> => fetch('http://localhost:3000/departures')
    .then(res => res.json())
    .then(res => res as DepartureFlight[]);

const determineIfFlightUpdateIsArrival = (flightUpdate: FlightUpdate): flightUpdate is ArrivalFlightUpdate => {

    if ((flightUpdate as ArrivalFlightUpdate).landingTime)
        return true;
    return false;

};

const clearBucket = (
    bucket: Flight[],
    findHandler: (value: Flight, index: number, obj: Flight[]) => unknown): void => {
    const startIndex = bucket.findIndex(findHandler);
    if (startIndex > -1)
        bucket.splice(startIndex, 1);
};

const updateBuckets = (flightUpdate: FlightUpdate): void => {

    if (determineIfFlightUpdateIsArrival(flightUpdate)) {

        const flightNumberFindHandler = (af: ArrivalFlight) => af.flightNumber === flightUpdate.flightNumber;

        const arrival: ArrivalFlight =
            buckets.arrivals.find(flightNumberFindHandler);

        if (arrival) {

            //update arrival
            arrival.landingTime = flightUpdate.landingTime;

            // clear current
            clearBucket(buckets.earlyArrivals, flightNumberFindHandler);
            clearBucket(buckets.lateArrivals, flightNumberFindHandler);
            // buckets.earlyArrivals.splice(buckets.earlyArrivals.findIndex(flightNumberFindHandler), 1);
            // buckets.lateArrivals.splice(buckets.lateArrivals.findIndex(flightNumberFindHandler), 1);

            // late or early?
            const at = new Date(arrival.arrivalTime);
            const lt = new Date(arrival.landingTime);

            if (lt < at)
                buckets.earlyArrivals.push(arrival);
            if (lt > at)
                buckets.lateArrivals.push(arrival);

        }

    } else {

        const departureFindHandler = (af: DepartureFlight) => af.flightNumber === flightUpdate.flightNumber;

        const departure: DepartureFlight =
            buckets.departures.find(departureFindHandler);

        if (departure) {

            // update departure
            departure.takeOffTime = flightUpdate.takeOffTime;

            // clear current
            clearBucket(buckets.earlyDepartures, departureFindHandler)
            clearBucket(buckets.lateDepartures, departureFindHandler)

            // buckets.earlyDepartures.splice(buckets.earlyDepartures.findIndex(departureFindHandler), 1);
            // buckets.lateDepartures.splice(buckets.lateDepartures.findIndex(departureFindHandler), 1);

            // late or early?
            const dt = new Date(departure.departureTime);
            const tt = new Date(departure.takeOffTime);

            if (tt < dt)
                buckets.earlyDepartures.push(departure);
            if (tt > dt)
                buckets.lateDepartures.push(departure);

        }

    }
};

const printBucketsToConsole = (): void => console.log(`{
    lateArrivals: ${buckets.lateArrivals.length}
    earlyArrivals: ${buckets.earlyArrivals.length}
    lateDepartures: ${buckets.lateDepartures.length}
    earlyDepartures: ${buckets.earlyDepartures.length}
}`);

getArrivals()
    .then((arrivals: ArrivalFlight[]) => buckets.arrivals = arrivals)
    .finally(() => getDepartures()
        .then((departures: DepartureFlight[]) => buckets.departures = departures)
        .finally(() => {

            const wsClient = new WebSocket('ws://localhost:3000/flightUpdates');
            wsClient.on('message', (raw: string) => {

                const msg: WebsocketMessage = JSON.parse(raw);

                switch (msg.type) {
                    case MessageType.PRINT:
                        printBucketsToConsole();
                        break;

                    case MessageType.FLIGHT_UPDATE:

                        updateBuckets(msg.payload);
                        break;

                    default:
                        console.log(`\n!Cannot handle message: ${msg}\n`);
                        break;
                }
            });

        }));
