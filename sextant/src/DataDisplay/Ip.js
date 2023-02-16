import React from "react";

export const IPV4 = 0;
export const IPV6 = 1;
const IPV4_api = "https://api.ipify.org?format=json";
const IPV6_api = "https://api64.ipify.org?format=json";

export default class Ip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            api: IPV4_api,
            ipv: props.ipv,
            ip: '0.0.0.0'
        };
        if(props.ipv === IPV4){this.setState({api: IPV4_api})}
        if(props.ipv === IPV6){this.setState({api: IPV6_api})}
    }

    componentDidMount() {
        fetch(this.state.api)
            .then(res => res.json())
            .then(
                (result) => {
                    let ipValue = "Not Provided"; //in the case of not having the specific type of address
                    let apiIP = result.ip;
                    if(this.state.ipv === IPV4 && apiIP.includes('.')){   //add a check for address format as the API will return whichever you have
                        ipValue = apiIP;
                    }
                    if(this.state.ipv === IPV6 && apiIP.includes(':')){    //simple checking method but it will work
                        ipValue = apiIP;
                    }
                    this.setState({
                        isLoaded: true,
                        ip: ipValue
                    });
                }, (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    render() {
        const { error, isLoaded, ip} = this.state;
        if (error) {
            return <h3>Could not connect</h3>; //hiding true error for security otherwise {error.message}
        } else if (!isLoaded) {
            return <h3>Loading...</h3>;
        } else {
            return (
                <h3>{ip}</h3>
            );
        }
    }
}

Ip.defaultProps = {
    ipv:IPV4
}