import { Box } from "@material-ui/core";
import React from "react";
import { ItemView } from "./ItemView";
import { Collection } from "./Products";

export class CollectionView
    extends React.Component<Collection> {
    constructor(props: Collection) {
        super(props)
        this.handleItemClicked =
            this.handleItemClicked.bind(this);
    }

    handleItemClicked(id: number) {
        console.log(`handleItemClick : ${id}`);
        this.props.handleItemClicked(id);
    }

    render() {
        let items = this.props.items.map((item) => {
            return (
                <ItemView key={item.id} {...item}
                    onItemClicked={this.handleItemClicked} />
            )
        })
        return (

            <Box display="flex" flexWrap="wrap">
                {items}
            </Box>

        )
    }
}
