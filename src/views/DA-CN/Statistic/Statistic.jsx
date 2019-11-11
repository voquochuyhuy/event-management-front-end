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
import axios from "axios";

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
          data: [[]]
        };
    }
    componentDidMount(){
      axios.get(`http://localhost:3001/graphql?query=${statisticQuery}`).then(res=>{
        var statisticals = res.data.data.getStatisticals;
        statisticals.map(statistical=>{
          return {
            id:statistical.id,
            eventName:statistical.eventName,
            cost:statistical.cost,
            numberOfParticipants:statistical.numberOfParticipants,
            revenue:statistical.revenue,
            note:statistical.note
          }
        })
        this.setState({data:statisticals});
      })
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
                        Header: "Chi phí",
                        accessor: "cost"
                      },
                      {
                        Header: "Số lượt tham gia",
                        accessor: "numberOfParticipants"
                      },
                      {
                        Header: "Doanh thu",
                        accessor: "revenue"
                      },
                      {
                        Header: "Ghi chú",
                        accessor: "note"
                      },
                      
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
export default withStyles(styles)(Statistic);

