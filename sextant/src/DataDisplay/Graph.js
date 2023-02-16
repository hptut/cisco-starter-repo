
export default function Graph({dataPoints}){    //simple svg graph to display data in a card
    let graphel = [];
    for(let i=0;i<dataPoints.length;i++){
        graphel.push(<circle cx={i*10} cy={45 - Math.min(dataPoints[i],41)} r="2" stroke="green"/>);
        //may change colors with statistics to show spikes green-yellow-red
    }
    return (
        <svg height="50" width="200">
            <line x1="0" y1="50" x2="200" y2="50" stroke="white"/>
            {graphel}
        </svg>
    );
}