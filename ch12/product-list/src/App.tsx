import React from 'react';
import './App.css';
import { CollectionView } from './CollectionView';
import { DetailView } from './DetailView';
import { MyButton } from './MyButton';
import { Collection, IProduct } from './Products';
import { Event } from '@material-ui/icons';
import * as _ from 'underscore';

export interface IAppProps { };
export interface IAppState {
    showDetails: boolean;
    product: IProduct | null;
}

const collectionInstance = new Collection();

class App extends
    React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props);
        this.showDetailView =
            this.showDetailView.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            showDetails: false,
            product: null
        }
    }

    render() {
        return (
            <div>
                <CollectionView
                    {...collectionInstance}
                    handleItemClicked={this.showDetailView} >
                </CollectionView>
                <DetailView open={this.state.showDetails}
                    product={this.state.product}
                    handleClose={this.handleClose}></DetailView>
                {/* <MyButton buttonName="buttonName" handleButtonClick={this.handleClose}></MyButton> */}
            </div>
        )
    }
    showDetailView(id: number) {
        console.log(`App.handleClick() called`);
        let foundItem = _.find(
            collectionInstance.items,
            (item: IProduct) => {
                return item.id === id
            });

        if (foundItem) {
            this.setState({
                showDetails: true,
                product: foundItem
            });
        }
    }
    handleClose() {
        console.log(`App : handleClose()`);
        this.setState({
            showDetails: false,
            product: null
        })
    }
    processMessage(event: string) {
        console.log(`RCT : App.processMessage : ${event}`);
    }
}
export default App;

