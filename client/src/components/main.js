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
import Rental from './contracts/RentableObjects.json'

const styles = {
    card: {
        width: 400,
        height: 400
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
          const deployedNetwork = Rental.networks[networkId];
          const instance = new web3.eth.Contract(
            Rental.abi,
            deployedNetwork && deployedNetwork.address
          );
    
          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          this.setState({ web3, accounts, contract: instance });
          this.getCourseMethod();
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`
          );
          console.error(error);
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

    submit = ()   => {

        const {textname} = this.state;
        con


    }

    render() {
        const { classes } = this.props;

        return (
            <div>

                <Card className={classes.card}>
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
              id="name"
              label="Email Address"
              type="email"
              value={this.state.textname}
              onChange={this.handleChange("textname")}
              fullWidth
            />
{console.log(this.state.textname)}
<TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />

<Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>

            <Button onClick={this.submit} color="primary">
              Submit
            </Button>

                </Dialog>


            </div>
        )
    }
}

Main.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Main)