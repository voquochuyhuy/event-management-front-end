import React, { Component } from 'react'
import ReactTable from "react-table";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
// import Dvr from "@material-ui/icons/Dvr";
// import Favorite from "@material-ui/icons/Favorite";
// import Close from "@material-ui/icons/Close";
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
import axios from "axios";


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
          data: []
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
        let parsingdata = events.map(event=>{
          let startTimeParsed = new Date(event.startTime).toLocaleString('vi-VN');
          let endTimeParsed = new Date(event.endTime).toLocaleString('vi-VN'); 
          return {
            id:event.id,
            eventName:event.eventName,
            organizationName:event.organizationName,
            place:event.place,
            startTime:startTimeParsed,
            endTime:endTimeParsed
          }
        })
        this.setState({data: parsingdata});

      });
    }  
      render() {
        const { classes } = this.props;
        return (
          <GridContainer>
            <GridItem xs={12}>
              <Card>
                <CardHeader color="primary" icon>
                  <CardIcon color="primary">
                    <Assignment />
                  </CardIcon>
                  {/* <h4 className={classes.cardIconTitle}>React Table</h4> */}
                </CardHeader>
                <CardBody>
                  <ReactTable
                    data={this.state.data}
                    filterable
                    columns={[
                      {
                        Header: "STT",
                        accessor: "id"
                      },
                      {
                        Header: "Tên sự kiện",
                        accessor: "eventName"
                      },
                      {
                        Header: "Đơn vị tổ chức",
                        accessor: "organizationName"
                      },
                      {
                        Header: "Nơi tổ chức",
                        accessor: "place"
                      },
                      {
                        Header: "Bắt đầu",
                        accessor: "startTime",
                        // style :{textAlign:"center"}
                      },
                      {
                        Header: "Kết thúc",
                        accessor: "endTime"
                      },
                      // {
                      //   Header: "Actions",
                      //   accessor: "actions",
                      //   sortable: false,
                      //   filterable: false
                      // }
                    ]}
                    defaultPageSize={10}
                    showPaginationTop
                    showPaginationBottom={false}
                    className="-striped -highlight"
                  />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        );
      }
}
export default withStyles(styles)(EventManagement);
