import { AppBar, Button, Dialog, Grid, IconButton, Paper, Slide, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import { Close } from "@material-ui/icons";
import React from "react";
import { IProduct } from "./Products";
import "./DetailView.css";
import { microEventBus } from "./App";

export interface IDetailsProps {
    open: boolean;
    product: IProduct | null;
    handleClose(): void;
    username: string;
}

export interface IDetailsState {
    noSwitches: number;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="left" ref={ref} {...props} />;
});

export class DetailView extends React.Component<IDetailsProps, IDetailsState> {

    constructor(props: IDetailsProps) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            noSwitches: 70
        }
    }

    render() {
        return (
            <div className="full-screen-details-dialogue">
                <Dialog
                    fullScreen
                    open={this.props.open}
                    TransitionComponent={Transition}>
                    <AppBar>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={this.handleClose}
                                aria-label="close">
                                <Close></Close>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <div className="details-paper-padding-top">
                        <Paper className="details-paper-body">
                            <Grid container spacing={5}>
                                <Grid item>
                                    <img className="large-image" src={this.props.product?.image} />
                                </Grid>
                                <Grid item xs container direction="column" justify="flex-start" align-items="stretch" >
                                    <Grid item >
                                        <h1>{this.props.product?.name}</h1>
                                    </Grid>
                                    <Grid item >
                                        <h2>{this.props.product?.type}</h2>
                                    </Grid>
                                    <Grid item >
                                        <p>{this.props.product?.longDescription}</p>
                                    </Grid>
                                    <Grid item >
                                        <TableContainer component={Paper}>
                                            <Table aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Specifiations</TableCell>
                                                        <TableCell align="right">&nbsp;</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow >
                                                        <TableCell >Actuation Force</TableCell>
                                                        <TableCell >{this.props.product?.specs?.actuationForce} g</TableCell>
                                                    </TableRow>
                                                    <TableRow >
                                                        <TableCell >Actuation Point</TableCell>
                                                        <TableCell >{this.props.product?.specs?.actuationPoint} mm</TableCell>
                                                    </TableRow>
                                                    <TableRow >
                                                        <TableCell >Bottom Out</TableCell>
                                                        <TableCell >{this.props.product?.specs?.bottomOut} g</TableCell>
                                                    </TableRow>
                                                    <TableRow >
                                                        <TableCell >Bottom Out Travel</TableCell>
                                                        <TableCell >{this.props.product?.specs?.bottomOutTravel} mm</TableCell>
                                                    </TableRow>
                                                    <TableRow >
                                                        <TableCell >Price</TableCell>
                                                        <TableCell >$ {this.props.product?.specs?.price}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                    <Grid item >
                                        &nbsp;
                                    </Grid>
                                    <Grid item >
                                        <h3>Order Now :</h3>
                                    </Grid>
                                    <form noValidate autoComplete="off" onSubmit={this.onSubmit}>

                                        <Grid item >
                                            <TextField type="number" name="noSwitches" id="standard-basic" label="No of switches" onChange={this.onChange} value={this.state.noSwitches} />
                                        </Grid>
                                        <Grid item >
                                            &nbsp;
                                        </Grid>

                                        <Grid item >
                                            <Button type="submit" variant="contained" color="primary">
                                                Add to Cart
                                        </Button>

                                        </Grid>
                                    </form>

                                </Grid>

                            </Grid>
                        </Paper>
                    </div>
                </Dialog>
            </div>
        )
    }
    handleClose() {
        console.log(`Details: handleClose()`)
        this.props.handleClose();
    }

    onChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ noSwitches: parseInt(event.target.value) });
        console.log(`onChange : ${event.target.name} : ${event.target.value}`);
    }

    onSubmit(e: React.FormEvent) {
        console.log(`submit ; ${this.state.noSwitches}`);
        e.preventDefault();

        if (this.props.product) {
            microEventBus.broadcast('add-user-cart-item', {
                username: this.props.username,
                productId: this.props.product?.id,
                amount: this.state.noSwitches
            });
        }
    }
}

