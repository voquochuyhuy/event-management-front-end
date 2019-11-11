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

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import axios from "axios";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

const organizationQuery = `{getOrganizations{
  id
  organizationName
  place
  hotline
}}`
class Organization extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [[]]
        };
      }
    componentDidMount(){
      axios.get(`http://localhost:3001/graphql?query=${organizationQuery}`).then(res=>{
        var organizations = res.data.data.getOrganizations;
        organizations.map(organization=>{
          return {
            id:organization.id,
            organizationName:organization.organizationName,
            place:organization.place,
            hotline:organization.hotline
          }
        })
        this.setState({data:organizations});
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
                        Header: "Tên tổ chức",
                        accessor: "organizationName"
                      },
                      {
                        Header: "Địa chỉ",
                        accessor: "place"
                      },
                      {
                        Header: "Hotline",
                        accessor: "hotline"
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
export default withStyles(styles)(Organization);

