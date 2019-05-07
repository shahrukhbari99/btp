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
import Grid from '@material-ui/core/Grid';

const styles = {
  card: {
    minWidth: 300,
    minHeight: 150,
    height: 200,
    width: 150,
    margin: 50,
    padding: 25
  },

  button: {
    marginLeft: 20,
    marginTop: 25,
    marginRight: 20,
    width: 200
  },
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

      getIsRegistered = async () => {
        const { contract, objectid1 } = this.state;
        let output1 = "";
        contract.methods
        .objectIsRegistered(objectid1)
        .call()
        .then( res1 => {
          this.setState({
            open1: false,
            output1: res1
          })
        }
        )
      };
      
      getDeposit = async () => {
        const { contract, objectid2 } = this.state;
        let output2 = "";
        contract.methods
        .getObjectDeposit(objectid2)
        .call()
        .then( res2 => {
          this.setState({
            open2: false,
            output2: res2
          })
        }
        )
      };

      getPrice = async () => {
        const { contract, objectid3 } = this.state;
        let output3 = "";
        contract.methods
        .getObjectPricePerDay(objectid3)
        .call()
        .then( res3 => {
          this.setState({
            open3: false,
            output3: res3
          })
        }
        )
      };

      getDescription = async () => {
        const { contract, objectid4 } = this.state;
        let output4 = "";
        contract.methods
        .getObjectDescription(objectid4)
        .call()
        .then( res4 => {
          this.setState({
            open4: false,
            output4: res4
          })
        }
        )
      };
      

      rentObjectMethod = async () => {
        const { accounts, object_id, amount, contract } = this.state;
    
        if (object_id === "" ) {
        } else {
          contract.methods
            .rentObject(object_id)
            .send({ from: accounts[0],value: amount})
            .then(
              this.setState({
                open5: false,
                object_id: 0,
              })
            );
        }
      };

      getUnregister = async () => {
        const { accounts, objectid6, contract } = this.state;
        contract.methods
        .unregisterObject(objectid6)
        .send({ from: accounts [0] })
        .then(
          this.setState({
          open6: false,  
        })
        );
    };

      getReclaim = async () => {
        const { accounts, objectid7, contract } = this.state;
        contract.methods
        .reclaimObject(objectid7)
        .send({ from: accounts [0] })
        .then(
          this.setState({
          open7: false,  
        })
        );
    };

    getIsRented = async () => {
      const { contract, objectid8 } = this.state;
      let output8 = "";
      contract.methods
      .objectIsRented(objectid8)
      .call()
      .then( res8 => {
        this.setState({
          open8: false,
          output8: res8
        })
      }
      )
    };

    getClientTime = async () => {
      const { contract, objectid9 } = this.state;
      let output9 = "";
      contract.methods
      .getObjectClientTime(objectid9)
      .call()
      .then( res9 => {
        this.setState({
          open9: false,
          output9: res9
        })
      }
      )
    };

    getReturnDeposit = async () => {
      const { contract, objectid10 } = this.state;
      let output10 = "";
      contract.methods
      .getReturnDeposit(objectid10)
      .call()
      .then( res10 => {
        this.setState({
          open10: false,
          output10: res10
        })
      }
      )
    };

    openForm = () => {
        this.setState({ open: true });
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    openForm1 = () => {
      this.setState({ open1: true });
    };

    handleChange1 = name => event => {
      this.setState({ [name]: event.target.value });
    };

    handleClose1 = () => {
      this.setState({ open1: false });
    };

    openForm2 = () => {
      this.setState({ open2: true });
    };

    handleClose2 = () => {
      this.setState({ open2: false });
    };

    openForm3 = () => {
      this.setState({ open3: true });
    };

    handleClose3 = () => {
    this.setState({ open3: false });
    };

    openForm4 = () => {
      this.setState({ open4: true });
    };

    handleClose4 = () => {
    this.setState({ open4: false });
    };

    openForm5 = () => {
      this.setState({ open5: true });
    };

    handleClose5 = () => {
    this.setState({ open5: false });
    };

    openForm6 = () => {
      this.setState({ open6: true });
    };

    handleClose6 = () => {
    this.setState({ open6: false });
    };

    handleChange6 = name => event => {
      this.setState({ [name]: event.target.value });
    };

    openForm7 = () => {
      this.setState({ open7: true });
    };

    handleClose7 = () => {
    this.setState({ open7: false });
    };

    openForm8 = () => {
      this.setState({ open8: true });
    };

    handleClose8 = () => {
    this.setState({ open8: false });
    };

    openForm9 = () => {
      this.setState({ open9: true });
    };

    handleClose9 = () => {
    this.setState({ open9: false });
    };

    openForm10 = () => {
      this.setState({ open10: true });
    };

    handleClose10 = () => {
    this.setState({ open10: false });
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
              <Grid container spacing={24}>
              <Grid item xs={4}>

                <Card className={classes.card}>
                  <CardContent>
                    {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Register the Object
                    </Typography> */}
                    <Typography variant="h5" component="h2">
                    Register
                    </Typography>
                    <br></br>
                    <Typography className={classes.pos} color="textSecondary">
                    Click below button to register the object
                    </Typography>
                  </CardContent>
                  <Button className={classes.button} onClick={this.openForm}>
                    REGISTER
                  </Button>
                </Card>
                </Grid>
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
                rows="2"
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

                <Grid item xs={4}>
                <Card className={classes.card}>
                <CardContent>
                <Typography variant="h5" component="h2">
                Check object register status
                </Typography>
                </CardContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="objectid1"
                  label="Object ID"
                  type="text"
                  value={this.state.objectid1}
                  onChange={this.handleChange1("objectid1")}
                  fullWidth
                  />
                  <Button className={classes.button} onClick={this.openForm1}>
                    CHECK
                  </Button>
                  </Card>
                  </Grid>
                  <Dialog open={this.state.open1}
                    onClose={this.handleClose1}
                    aria-labelledby="form-dialog-title">

                  <TextField
                  autoFocus
                  margin="dense"
                  id="status"
                  label="STATUS"
                  type="text"
                  value={this.state.output1}
                  fullWidth
                  />

                  <Button onClick={this.getIsRegistered} color="primary">
                  Submit
                  </Button>

                  </Dialog>

                  <Grid item xs={4}>
                  <Card className={classes.card}>
                  <CardContent>
                  {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Know object deposit
                  </Typography> */}
                  <Typography variant="h5" component="h2">
                  Deposit
                  </Typography>
                  <br></br>
                  <Typography className={classes.pos} color="textSecondary">
                  Click below button to know object deposit
                  </Typography>
                  </CardContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="objectid2"
                    label="Object ID"
                    type="number"
                    value={this.state.objectid2}
                    onChange={this.handleChange1("objectid2")}
                    fullWidth
                  />
                  <Button className={classes.button} onClick={this.openForm2}>
                    DEPOSIT
                  </Button>
                  </Card>
                  </Grid>
                  <Dialog open={this.state.open2}
                    onClose={this.handleClose2}
                    aria-labelledby="form-dialog-title">

                  <TextField
                  autoFocus
                  margin="dense"
                  id="deposit"
                  label="DEPOSIT"
                  type="number"
                  value={this.state.output2}
                  fullWidth
                  />

                  <Button onClick={this.getDeposit} color="primary">
                  Submit
                  </Button>

                  </Dialog>

                  <Grid item xs={4}>
                <Card className={classes.card}>
                  <CardContent>
                    {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Know object deposit
                    </Typography> */}
                    <Typography variant="h5" component="h2">
                    Check Object Price Per Day
                    </Typography>
                    {/* <Typography className={classes.pos} color="textSecondary">
                    Click below button to know object price per day
                    </Typography> */}
                  </CardContent>
                  <TextField
                  autoFocus
                  margin="dense"
                  id="objectid3"
                  label="Object ID"
                  type="number"
                  value={this.state.objectid3}
                  onChange={this.handleChange1("objectid3")}
                  fullWidth
                  />
                  <Button className={classes.button} onClick={this.openForm3}>
                    PRICE PER DAY
                  </Button>
                  </Card>
                  </Grid>
                  <Dialog open={this.state.open3}
                    onClose={this.handleClose3}
                    aria-labelledby="form-dialog-title">

                  <TextField
                  autoFocus
                  margin="dense"
                  id="ppd"
                  label="PRICE PER DAY"
                  type="number"
                  value={this.state.output3}
                  fullWidth
                  />

                  <Button onClick={this.getPrice} color="primary">
                  Submit
                  </Button>

                  </Dialog>

                  <Grid item xs={4}>
                <Card className={classes.card}>
                  <CardContent>
                    {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Know object deposit
                    </Typography> */}
                    <Typography variant="h5" component="h2">
                    See Object Description
                    </Typography>
                    {/* <Typography className={classes.pos} color="textSecondary">
                    Click below button to know object description
                    </Typography> */}
                  </CardContent>
                  <TextField
                  autoFocus
                  margin="dense"
                  id="objectid4"
                  label="Object ID"
                  type="number"
                  value={this.state.objectid4}
                  onChange={this.handleChange1("objectid4")}
                  fullWidth
                  />
                  <Button className={classes.button} onClick={this.openForm4}>
                    DESCRIPTION
                  </Button>
                  </Card>
                  </Grid>
                  <Dialog open={this.state.open4}
                    onClose={this.handleClose4}
                    aria-labelledby="form-dialog-title">

                  <TextField
                  autoFocus
                  margin="dense"
                  id="des"
                  label="DESCRIPTION"
                  type="text"
                  value={this.state.output4}
                  fullWidth
                  />

                  <Button onClick={this.getDescription} color="primary">
                  Submit
                  </Button>

                  </Dialog>

                <Grid item xs={4}>
                <Card className={classes.card}>
                  <CardContent>
                    {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Rent the Object
                    </Typography> */}
                    <Typography variant="h5" component="h2">
                    Rent
                    </Typography>
                    <br></br>
                    <Typography className={classes.pos} color="textSecondary">
                    Click below button to rent the object
                    </Typography>
                  </CardContent>
                  <Button className={classes.button} onClick={this.openForm5}>
                    RENT
                  </Button>
                </Card>
                </Grid>
                <Dialog open={this.state.open5}
                    onClose={this.handleClose5}
                    aria-labelledby="form-dialog-title">

                <TextField
                autoFocus
                margin="dense"
                id="object_id"
                label="Object ID"
                type="number"
                value={this.state.object_id}
                onChange={this.handleChange("object_id")}
                fullWidth
                />

                <TextField
                  autoFocus
                  margin="dense"
                  id="amount"
                  label="Transaction amount"
                  type="number"
                  value={this.state.amount}
                  onChange={this.handleChange("amount")}
                  fullWidth
                />

                <Button onClick={this.handleClose5} color="primary">
                Cancel
                </Button>

                <Button onClick={this.rentObjectMethod} color="primary">
                Submit
                </Button>

                </Dialog>

                  <Grid item xs={4}>
                  <Card className={classes.card}>
                  <CardContent>
                  {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Rent the Object
                  </Typography> */}
                  <Typography variant="h5" component="h2">
                  Unregister
                  </Typography>
                  <br></br>
                  <Typography className={classes.pos} color="textSecondary">
                  Click below button to unregister the object
                  </Typography>
                  </CardContent>
                  <Button className={classes.button} onClick={this.openForm6}>
                    UNREGISTER
                  </Button>
                </Card>
                </Grid>
                <Dialog open={this.state.open6}
                    onClose={this.handleClose6}
                    aria-labelledby="form-dialog-title">

                <TextField
                autoFocus
                margin="dense"
                id="objectid6"
                label="Object ID"
                type="number"
                value={this.state.objectid6}
                onChange={this.handleChange6("objectid6")}
                fullWidth
                />

                <Button onClick={this.handleClose6} color="primary">
                Cancel
                </Button>

                <Button onClick={this.getUnregister} color="primary">
                Submit
                </Button>

                </Dialog>

                  <Grid item xs={4}>
                  <Card className={classes.card}>
                  <CardContent>
                  {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Rent the Object
                  </Typography> */}
                  <Typography variant="h5" component="h2">
                  Return Object
                  </Typography>
                  <br></br>
                  <Typography className={classes.pos} color="textSecondary">
                  Click below button to return the object
                  </Typography>
                  </CardContent>
                  <Button className={classes.button} onClick={this.openForm7}>
                    RETURN
                  </Button>
                </Card>
                </Grid>
                <Dialog open={this.state.open7}
                    onClose={this.handleClose7}
                    aria-labelledby="form-dialog-title">

                <TextField
                autoFocus
                margin="dense"
                id="objectid7"
                label="Object ID"
                type="number"
                value={this.state.objectid7}
                onChange={this.handleChange6("objectid7")}
                fullWidth
                />

                <Button onClick={this.handleClose7} color="primary">
                Cancel
                </Button>

                <Button onClick={this.getReclaim} color="primary">
                Submit
                </Button>

                </Dialog>

                  <Grid item xs={4}>
                  <Card className={classes.card}>
                  <CardContent>
                  <Typography variant="h5" component="h2">
                  Check object rent status
                  </Typography>
                  </CardContent>
                  <TextField
                  autoFocus
                  margin="dense"
                  id="objectid8"
                  label="Object ID"
                  type="text"
                  value={this.state.objectid8}
                  onChange={this.handleChange1("objectid8")}
                  fullWidth
                  />
                  <Button className={classes.button} onClick={this.openForm8}>
                    CHECK
                  </Button>
                  </Card>
                  </Grid>
                  <Dialog open={this.state.open8}
                    onClose={this.handleClose8}
                    aria-labelledby="form-dialog-title">

                  <TextField
                  autoFocus
                  margin="dense"
                  id="status8"
                  label="STATUS"
                  type="text"
                  value={this.state.output8}
                  fullWidth
                  />

                  <Button onClick={this.getIsRented} color="primary">
                  Submit
                  </Button>

                  </Dialog>

                  <Grid item xs={4}>
                  <Card className={classes.card}>
                  <CardContent>
                  {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Know object deposit
                  </Typography> */}
                  <Typography variant="h5" component="h2">
                  Check Object Client Time
                  </Typography>
                  {/* <Typography className={classes.pos} color="textSecondary">
                  Click below button to know object price per day
                  </Typography> */}
                  </CardContent>
                  <TextField
                  autoFocus
                  margin="dense"
                  id="objectid9"
                  label="Object ID"
                  type="number"
                  value={this.state.objectid9}
                  onChange={this.handleChange1("objectid9")}
                  fullWidth
                  />
                  <Button className={classes.button} onClick={this.openForm9}>
                    CLIENT TIME
                  </Button>
                  </Card>
                  </Grid>
                  <Dialog open={this.state.open9}
                    onClose={this.handleClose9}
                    aria-labelledby="form-dialog-title">

                  <TextField
                  autoFocus
                  margin="dense"
                  id="time"
                  label="CLIENT TIME"
                  type="number"
                  value={this.state.output9}
                  fullWidth
                  />

                  <Button onClick={this.getClientTime} color="primary">
                  Submit
                  </Button>

                  </Dialog>

                  <Grid item xs={4}>
                  <Card className={classes.card}>
                  <CardContent>
                  {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Know object deposit
                  </Typography> */}
                  <Typography variant="h5" component="h2">
                  Check Object Return Deposit
                  </Typography>
                  {/* <Typography className={classes.pos} color="textSecondary">
                  Click below button to know object price per day
                  </Typography> */}
                  </CardContent>
                  <TextField
                  autoFocus
                  margin="dense"
                  id="objectid10"
                  label="Object ID"
                  type="number"
                  value={this.state.objectid10}
                  onChange={this.handleChange1("objectid10")}
                  fullWidth
                  />
                  <Button className={classes.button} onClick={this.openForm10}>
                  GET RETURN DEPOSIT
                  </Button>
                  </Card>
                  </Grid>
                  <Dialog open={this.state.open10}
                    onClose={this.handleClose10}
                    aria-labelledby="form-dialog-title">

                  <TextField
                  autoFocus
                  margin="dense"
                  id="dep"
                  label="RETURN DEPOSIT"
                  type="number"
                  value={this.state.output10}
                  fullWidth
                  />

                  <Button onClick={this.getReturnDeposit} color="primary">
                  Submit
                  </Button>

                  </Dialog>
                  
                  </Grid>
            </div>
        )
    }
}

Main.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Main)