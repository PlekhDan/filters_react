import React, {PureComponent} from "react";
import moment from "moment";

class Clock extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            time: moment().format('HH:mm:ss')
        };
    }

    componentDidMount() {
        this.timerId = setInterval(() => {
            this.setState(() => ({
                time: moment().format('HH:mm:ss')
            }));
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    render() {
        return (
            <div>
                <div>{this.state.time}</div>
                <div>{this.props.package}</div>
            </div>
        )
    }
}