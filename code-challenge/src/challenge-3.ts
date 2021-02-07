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

import { MessageType, websocketify } from './../api/ws';
import { ArrivalFlight, ArrivalFlightUpdate } from '../api/arrivals';
import { DepartureFlight, DepartureFlightUpdate } from '../api/departures';
// import 'rxjs';

// import { Observable } from 'rxjs';
import WebSocket from 'ws';

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

const wsClient = new WebSocket('ws://localhost:3000/flightUpdates');
wsClient.on('message', (raw:string) => { 
     const msg:WebsocketMessage = JSON.parse(raw);
    switch (msg.type) {
        case 'PRINT':
            console.log(`TODO: payload ${msg.ArrivalTimeMap}`);
            break;
    
        default:
            console.log(msg.type);
            break;
    }
 });

//     ws
// const wsClient = new WebSocket('ws://localhost:3000/flightUpdates');
// wsClient.onmessage = msg => console.log(msg);