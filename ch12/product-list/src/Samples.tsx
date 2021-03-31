import React from 'react';

class SampleApp extends React.Component {
    render() {
        let item = null;
        if (Math.random() < 0.5) {
            item = (
                <p>Random less than 0.5</p>
            )
        } else {
            item = (
                <p>Random is greater than 0.5.</p>
            )
        }

        return (
            <div>
                {item}
            </div>
        )
    }
}


export interface IAppProps { };
export interface IAppState {
    showDetails: boolean;
}

class App extends
    React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props);
        this.handleClick =
            this.handleClick.bind(this);
        this.state = {
            showDetails: false
        }
    }

    render() {
        return (
            <div>
                <p>showDetails =
                {this.state.showDetails ? "true" : "false"}
                </p>
                {/* <MyButton
                buttonName="Click here"
                handleButtonClick={this.handleClick}>
            </MyButton> */}
            </div>
        )

    }
    handleClick() {
        console.log(`App.handleClick() called`);
        this.setState({
            showDetails: !this.state.showDetails
        })
    }
}
