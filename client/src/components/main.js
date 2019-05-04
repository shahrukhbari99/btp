import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import RentableObjects from '../contracts/RentableObjects.json'
import getWeb3 from "../utils/getWeb3";
import { isNull } from 'util';

const styles = {
    card: {
        width: 200,
        height: 200
    },

    button: {
        width: 100,

    }
};



class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            textname: ""
        }
    }

    componentDidMount = async () => {
        try {
          // Get network provider and web3 instance.
          const web3 = await getWeb3();
    
          // Use web3 to get the user's accounts.
          const accounts = await web3.eth.getAccounts();
    
          // Get the contract instance.
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = RentableObjects.networks[networkId];
          const instance = new web3.eth.Contract(
            RentableObjects.abi,
            deployedNetwork && deployedNetwork.address
          );
         
    
          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          this.setState({ web3, accounts, contract: instance });
          //this.registerObject();
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`
          );
          console.error(error);
        }
      };

      registerObjectMethod = async () => {
        const { accounts, objectid, objectdeposit, objectprice, objectdes, contract } = this.state;
    
        if (objectid === "" ) {
        } else {
          contract.methods
            .registerObject(objectid, objectdeposit, objectprice, objectdes)
            .send({ from: accounts[0] })
            .then(
              this.setState({
                open: false,
                objectid: 0,
                objectdeposit: 0,
                objectprice: 0,
                objectdes : null
              })
            );
        }
      };
    

    openForm = () => {
        this.setState({ open: true });
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
      };

    handleClose = () => {
        this.setState({ open: false });
    }

    render() {
        const { classes } = this.props;

        return (
            <div>

                <Card className={classes.card}>
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Register the Object
                    </Typography>
                    <Typography variant="h5" component="h2">
                    Register
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                    Click below button to register the object
                    </Typography>
                  </CardContent>
                  <Button className={classes.button} onClick={this.openForm}>
                    submit
                  </Button>
                </Card>

                <Dialog open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title">

                <TextField
                autoFocus
                margin="dense"
                id="objectID"
                label="Object ID"
                type="number"
                value={this.state.objectid}
                onChange={this.handleChange("objectid")}
                fullWidth
                />

                <TextField
                autoFocus
                margin="dense"
                id="deposit"
                label="Object Deposit"
                type="number"
                value={this.state.objectdeposit}
                onChange={this.handleChange("objectdeposit")}
                fullWidth
                />

                <TextField
                autoFocus
                margin="dense"
                id="priceperday"
                label="Object Price per day"
                type="number"
                value={this.state.objectprice}
                onChange={this.handleChange("objectprice")}
                fullWidth
                />

                <TextField
                autoFocus
                margin="dense"
                id="description"
                label="Object Description"
                type="text"
                value={this.state.objectdes}
                onChange={this.handleChange("objectdes")}
                fullWidth
                /> 

                <Button onClick={this.handleClose} color="primary">
                Cancel
                </Button>

                <Button onClick={this.registerObjectMethod} color="primary">
                Submit
                </Button>

                </Dialog>

                <Card className={classes.card}>
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Register the Object
                    </Typography>
                    <Typography variant="h5" component="h2">
                    Register
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                    Click below button to register the object
                    </Typography>
                  </CardContent>
                  <Button className={classes.button} onClick={this.openForm}>
                    submit
                  </Button>
                </Card>

            </div>
        )
    }
}

Main.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Main)