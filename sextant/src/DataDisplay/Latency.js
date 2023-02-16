import React from "react";
import Graph from "./Graph";

const pylon_api = "ws://localhost:55455";
const maxLength = 20;

export default class Latency extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            lastLatency: '0',
            latencyHist: new Array(maxLength).fill(0),
            average: 0
        };
    }

    componentDidMount() {
        this.socket = new WebSocket(pylon_api);

        //when connections is successful
        this.socket.onopen = (open) =>{
            this.setState({isLoaded: true})
        };

        //when data is received from websocket
        this.socket.onmessage = (message) =>{
            let cLatency = Date.now() - message.data;

            if(cLatency < 0){
                //clocks are out of sync - ideally throw an error
                cLatency = 0;
            }

            this.setState({lastLatency:cLatency})

            let workingHistory = this.state.latencyHist.slice();    //make a copy of the latency history
            workingHistory.push(cLatency);                          //add the newest latency to the graph
            if(workingHistory.length > maxLength){
                workingHistory.shift();                             //remove the oldest point
            }
            let workingAverage = 0;
            for(let i=0;i<workingHistory.length;i++){
                workingAverage += workingHistory[i];
            }
            workingAverage = Math.round((workingAverage / workingHistory.length) * 10) / 10;

            this.setState({latencyHist:workingHistory,
                                average:workingAverage});      //update the state with the new history
        };

        //handle errors
        this.socket.onerror = (error) => {
            this.setState({error});
        };
    }

    render() {
        const { error, isLoaded, lastLatency, latencyHist, average } = this.state;
        if (error) {
            return <h3>Could not connect</h3>;      //hiding true error for security otherwise {error.message}
        } else if (!isLoaded) {
            return <h3>Loading...</h3>;
        } else {
            return (
                <div>
                <h3>last: {lastLatency} ms</h3>
                    <h3>average: {average} ms</h3>
                    <Graph dataPoints={latencyHist}/>
                </div>
            );
        }
    }
}