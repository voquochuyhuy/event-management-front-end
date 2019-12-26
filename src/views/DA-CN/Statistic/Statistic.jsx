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
import DialogAddStatistical from '../components/DialogAddStatistical';
import DialogConFirmDelete from '../components/DialogConFirmDelete';
import DialogUpdateStatistical from '../components/DialogUpdateStatistical';

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};
const statisticQuery = `{getStatisticals{
    id
    eventName
    cost
    numberOfParticipants
    revenue
    note
}}`
class Statistic extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          openAdd : false,
          openDelete : false,
          openUpdate : false,
          id : ''
        };
    }
    componentWillMount() {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("access_token")}`;
      console.log(localStorage.getItem("access_token"));
    }
    componentDidMount(){
      axios.get(`http://localhost:3001/graphql?query=${statisticQuery}`).then(res=>{
        var data = res.data.data.getStatisticals;
        console.log(res.data);
        let statistical = data.map((statistical,key)=>{
          return [
            statistical.id,
            statistical.eventName,
            statistical.cost,
            statistical.numberOfParticipants,
            statistical.revenue,
            statistical.note,
            (
              // we've added some custom button actions
              <div className="actions-right">   
                {/* use this button to add a edit kind of action */}
                <Button
                  justIcon
                  round
                  simple
                  onClick={() => {
                    this.setState({id:statistical.id})
                    this.openDialogUpdate();
                    // let obj = this.state.data.find(o => o.id === key);
                    // alert(
                    //   "You've clicked EDIT button on \n{ \nName: " +
                    //     obj.name +
                    //     ", \nposition: " +
                    //     obj.position +
                    //     ", \noffice: " +
                    //     obj.office +
                    //     ", \nage: " +
                    //     obj.age +
                    //     "\n}."
                    // );
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
                    this.setState({id:statistical.id})
                    this.openDialogDelete()
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
        this.setState({data:statistical});
      })
    }
    openDialogAdd = ()=>{
      this.setState({openAdd:true})
    }
    openDialogDelete = ()=>{
      this.setState({openDelete:true})
    }
    openDialogUpdate = ()=>{
      this.setState({openUpdate:true})
    }
    onCancel = ()=>{
      this.setState({openAdd : false});
      this.setState({openDelete : false});
      this.setState({openUpdate : false});
      this.setState({id:""})
    }
    fetchData = ()=>{
      axios.get(`http://localhost:3001/graphql?query=${statisticQuery}`).then(res=>{
        var data = res.data.data.getStatisticals;
        console.log(res.data);
        let statistical = data.map((statistical,key)=>{
          return [
            statistical.id,
            statistical.eventName,
            statistical.cost,
            statistical.numberOfParticipants,
            statistical.revenue,
            statistical.note,
            (
              // we've added some custom button actions
              <div className="actions-right">   
                {/* use this button to add a edit kind of action */}
                <Button
                  justIcon
                  round
                  simple
                  onClick={() => {
                    this.openDialogUpdate();
                    // let obj = this.state.data.find(o => o.id === key);
                    // alert(
                    //   "You've clicked EDIT button on \n{ \nName: " +
                    //     obj.name +
                    //     ", \nposition: " +
                    //     obj.position +
                    //     ", \noffice: " +
                    //     obj.office +
                    //     ", \nage: " +
                    //     obj.age +
                    //     "\n}."
                    // );
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
                    this.setState({id:statistical.id})
                    this.openDialogDelete()
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
        this.setState({data:statistical});
      })
    }
    onConfirm = (eventName,cost,numberOfParti,revenue,note)=>{
      axios.post(`http://localhost:3001/graphql`, {
          query: `mutation createStatisticalMutation($statistical:CreateStatisticalInput)  {
                  createStatistical(createStatisticalInput:$statistical){
                      eventName
                  }
              }`,
          variables: {
            statistical :{
              "eventName": eventName,
              "cost":  parseFloat (cost),
              "numberOfParticipants":  parseFloat (numberOfParti),
              "revenue":  parseFloat (revenue),
              "note": note
            }
          },
          })
        .then(res => {
          this.fetchData();
        }
        )
        .catch(err => console.log(err));
      this.setState({openAdd:false});
    }
    onConfirmDelete = ()=>{
      axios.post(`http://localhost:3001/graphql`, {
        query: `mutation deleteStatisticalMutation($statistical:Int)  {
                deleteStatistical(deleteStatisticalInput:$statistical){
                    eventName
                }
            }`,
        variables: {
          statistical : this.state.id
        },
        })
      .then(res => {
        this.fetchData();
        this.setState({openDelete:false});
      }
      )
      .catch(err => console.log(err));
    
    }
    onConfirmUpdate = (eventName,cost,numberOfParti,revenue,note)=>{
      axios.post(`http://localhost:3001/graphql`, {
          query: `mutation updateStatisticalMutation ($statistical : UpdateStatisticalInput) {
            updateStatistical ( updateStatisticalInput : $statistical ){
                eventName
            }
         }`,
          variables: {
            statistical :{
              "id" :  parseFloat(this.state.id),
              "eventName": eventName,
              "cost":  parseFloat (cost),
              "numberOfParticipants":  parseFloat (numberOfParti),
              "revenue":  parseFloat (revenue),
              "note": note
            }
          },
          })
        .then(res => {
          this.fetchData();
          this.setState({openUpdate:false});
        }
        )
        .catch(err => console.log(err));
    }
      render() {
        const { classes } = this.props;
        return (
          <GridContainer>
            <GridItem>
              <Button color='success' onClick={this.openDialogAdd}>Thêm số liệu</Button>
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
                      "Chi phí",
                      "Số lượt tham gia",
                      "Doanh thu",
                      "Ghi chú",
                      ""
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
                    customHeadClassesForCells={[0, 1, 2, 3, 4 , 5, 6]}
                  />
                </CardBody>
              </Card>
            </GridItem>
            <DialogAddStatistical  open={this.state.openAdd} onCancel={this.onCancel} onConfirm={this.onConfirm} />
            <DialogConFirmDelete open={this.state.openDelete} onCancel={this.onCancel} onConfirm={this.onConfirmDelete} />
            <DialogUpdateStatistical open={this.state.openUpdate} onCancel={this.onCancel} onConfirm={this.onConfirmUpdate} />
          </GridContainer>
        );
      }
}
export default withStyles(styles)(Statistic);

