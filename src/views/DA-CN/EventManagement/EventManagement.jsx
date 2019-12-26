import React, { Component } from 'react'
import ReactTable from "react-table";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

// import { dataTable } from "variables/general.jsx";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import Table from "components/Table/Table.jsx";
import axios from "axios";
import DialogAddEvent from '../components/DialogAddEvent';
import DialogConFirmDelete from '../components/DialogConFirmDelete';
import DialogUpdateEvent from '../components/DialogUpdateEvent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles } from '@material-ui/core/styles';

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};
const getEvents = `{getEvents{
  id
  eventName
  organizationName
  place
  startTime
  endTime
}}`
class EventManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          openAdd : false,
          openDelete : false,
          openUpdate : false,
          id:""
        };
      }
    componentWillMount() {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("access_token")}`;
      console.log(localStorage.getItem("access_token"));
    }
    componentDidMount(){   
      axios.get(`http://localhost:3001/graphql?query=${getEvents}`)
      .then(result => {
        console.log(result);
        let events = result.data.data.getEvents;
        let parsingdata = events.map((event,key)=>{
          let startTimeParsed = new Date(event.startTime).toLocaleString('vi-VN');
          let endTimeParsed = new Date(event.endTime).toLocaleString('vi-VN'); 
          return [
            event.id,
            event.eventName,
            event.organizationName,
            event.place,
            startTimeParsed,
            endTimeParsed,
            (
              // we've added some custom button actions
              <div className="actions-right">
                {/* use this button to add a edit kind of action */}
                <Button
                  justIcon
                  round
                  simple
                  onClick={() => {
                    this.setState({id:event.id});
                    this.openDialogUpdate();
                  }}
                  color="warning"
                  className="edit"
                >
                  <Dvr />
                </Button>{" "}
                {/* use this button to remove the data row */}
                <Button
                  justIcon
                  round
                  simple
                  onClick={() => {
                    this.setState({id:event.id})
                    this.openDialogDelete();
                    // var data = this.state.data;
                    // data.find((o, i) => {
                    //   if (o.id === key) {
                    //     // here you should add some custom code so you can delete the data
                    //     // from this component and from your server as well
                    //     data.splice(i, 1);
                    //     return true;
                    //   }
                    //   return false;
                    // });
                    // this.setState({ data: data });
                  }}
                  color="danger"
                  className="remove"
                >
                  <Close />
                </Button>{" "}
              </div>
            )
          ]
        })
        this.setState({data: parsingdata});

      });
    }  
    onCancel = ()=>{
      this.setState({openAdd : false});
      this.setState({openDelete : false});
      this.setState({openUpdate : false});
    }
    fetchData = ()=>{
      axios.get(`http://localhost:3001/graphql?query=${getEvents}`)
      .then(result => {
        console.log(result);
        let events = result.data.data.getEvents;
        let parsingdata = events.map((event,key)=>{
          let startTimeParsed = new Date(event.startTime).toLocaleString('vi-VN');
          let endTimeParsed = new Date(event.endTime).toLocaleString('vi-VN'); 
          return [
            event.id,
            event.eventName,
            event.organizationName,
            event.place,
            startTimeParsed,
            endTimeParsed,
            (
              // we've added some custom button actions
              <div className="actions-right">
                {/* use this button to add a edit kind of action */}
                <Button
                  justIcon
                  round
                  simple
                  onClick={() => {
                    this.setState({id:event.id});
                    this.openDialogUpdate();
                  }}
                  color="warning"
                  className="edit"
                >
                  <Dvr />
                </Button>{" "}
                {/* use this button to remove the data row */}
                <Button
                  justIcon
                  round
                  simple
                  onClick={() => {
                    this.setState({id:event.id})
                    this.openDialogDelete();
                    // var data = this.state.data;
                    // data.find((o, i) => {
                    //   if (o.id === key) {
                    //     // here you should add some custom code so you can delete the data
                    //     // from this component and from your server as well
                    //     data.splice(i, 1);
                    //     return true;
                    //   }
                    //   return false;
                    // });
                    // this.setState({ data: data });
                  }}
                  color="danger"
                  className="remove"
                >
                  <Close />
                </Button>{" "}
              </div>
            )
          ]
        })
        this.setState({data: parsingdata});

      });
    }
    onConfirmAdd = (eventName,organization,place,startTime,endTime)=>{
      axios.post(`http://localhost:3001/graphql`, {
        query: `mutation createEventMutation($event:CreateEventInput) {
            createEvent(createEventInput:$event) { 
             eventName
            }
          }`,
        variables: {
          event :{
            "eventName": eventName,
            "place": place,
            "organizationName":organization,
            "startTime":startTime,
            "endTime":endTime, 
          }
        },
        })
        .then(res => {
          this.fetchData();
          console.log("??")
          this.setState({openAdd:false});
          // console.log(res)
          // axios.post(`http://localhost:3001/graphql`, {
          //   query: `mutation createStatisticalMutation($statistical:CreateStatisticalInput) {
          //       createStatistical(createStatisticalInput:$statistical) { 
          //         eventName
          //       }
          //     }`,
          //   variables: {
          //     statistical :{
          //       "eventName": eventName,
          //       "cost": 0,
          //       "numberOfParticipants":0,
          //       "revenue":0,
          //       "note":'', 
          //     }
          //   },
          //   })
          //   .then(res => console.log(res))
          //   .catch(err => console.log(err))
        }).then(()=>{
          this.setState({openAdd:false});
        })
        .catch(err => console.log(err));

        
      
    }
    onConfirmDelete = ()=>{
      console.log(this.state.id)
      axios.post(`http://localhost:3001/graphql`, {
        query: `mutation deleteEventMutation ($event:Int) {
                deleteEvent(deleteEventInput:$event) { 
                eventName
                }
          }`,
        variables: {
          event : this.state.id
        },
        })
        .then(res => {
          this.fetchData();
          this.setState({openAdd:false})
        })
        .catch(err =>{
          console.log(err)
          this.setState({openAdd:false})
        });

        
      this.setState({open:false});
    }
    onConfirmUpdate = (eventName,organization,place,startTime,endTime)=>{
      axios.post(`http://localhost:3001/graphql`, {
        query: `mutation updateEventMutation($event:UpdateEventInput) {
            updateEvent(updateEventInput:$event) { 
             eventName
            }
          }`,
        variables: {
          event :{
            "id" : this.state.id,
            "eventName": eventName,
            "place": place,
            "organizationName":organization,
            "startTime":startTime,
            "endTime":endTime, 
          }
        },
        })
        .then(res => {
          this.fetchData();
          this.setState({openUpdate:false});
          // console.log(res)
          // axios.post(`http://localhost:3001/graphql`, {
          //   query: `mutation createStatisticalMutation($statistical:CreateStatisticalInput) {
          //       createStatistical(createStatisticalInput:$statistical) { 
          //         eventName
          //       }
          //     }`,
          //   variables: {
          //     statistical :{
          //       "eventName": eventName,
          //       "cost": 0,
          //       "numberOfParticipants":0,
          //       "revenue":0,
          //       "note":'', 
          //     }
          //   },
          //   })
          //   .then(res => console.log(res))
          //   .catch(err => console.log(err))
        })
        .catch(err => console.log(err));

        
      
    }
    openDialog = ()=>{
      this.setState({openAdd:true})
    }
    openDialogDelete=()=>{
      this.setState({openDelete:true})
    }
    openDialogUpdate = ()=>{
      this.setState({openUpdate:true})
    }
      render() {
        const { classes } = this.props;
        return (
          <GridContainer>
            <GridItem>
              <Button color='success' onClick={this.openDialog}>Thêm sự kiện</Button>
            </GridItem> 
            <GridItem xs={12}>
              <Card>
                <CardHeader color="primary" icon>
                  <CardIcon color="primary">
                    <Assignment />
                  </CardIcon>
                  {/* <h4 className={classes.cardIconTitle}>React Table</h4> */}
                </CardHeader>
                <CardBody>
                  <Table
                    tableHead={[
                      "STT",
                      "Tên sự kiện",
                      "Đơn vị tổ chức",
                      "Nơi tổ chức",
                      "Bắt đầu",
                      "Kết thúc",
                      "",

                    ]}
                    tableData={this.state.data}
                    customCellClasses={[
                      classes.center,
                      classes.center,
                      classes.center,
                      classes.center,
                      classes.center,
                      classes.center,
                      classes.center,
                    ]}
                    customClassesForCells={[0, 1, 2, 3, 4, 5, 6]}
                    customHeadCellClasses={[
                      classes.center,
                      classes.center,
                      classes.center,
                      classes.center,
                      classes.center,
                      classes.center,
                      classes.center,
                    ]}
                    customHeadClassesForCells={[0, 1, 2, 3, 4, 5, 6]}
                  />
                </CardBody>
              </Card>
            </GridItem>
            <DialogAddEvent open={this.state.openAdd} onCancel={this.onCancel} onConfirm={this.onConfirmAdd} />
            <DialogConFirmDelete open={this.state.openDelete} onCancel={this.onCancel} onConfirm={this.onConfirmDelete}/>
            <DialogUpdateEvent open={this.state.openUpdate} onCancel={this.onCancel} onConfirm={this.onConfirmUpdate}/>
          </GridContainer> 
        );
      }
}
export default withStyles(styles)(EventManagement);
