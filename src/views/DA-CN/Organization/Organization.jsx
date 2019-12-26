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
import Table from "components/Table/Table.jsx";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import DialogAddOrganization from "../components/DialogAddOrganization";
import axios from "axios";
import DialogConFirmDelete from '../components/DialogConFirmDelete';
import DialogUpdateOrganization from '../components/DialogUpdateOrganization';

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
          data: [],
          openAdd : false,
          openDelete : false,
          openUpdate : false,
          id : ""
        };
      }
    onCancel = ()=>{
      this.setState({openAdd : false})
      this.setState({openDelete : false})
      this.setState({openUpdate : false})
    } 
    onConfirmAdd = (orgaName,address,hotline)=>{
          axios.post(`http://localhost:3001/graphql`, {
          query: `mutation createOrganizationMutation($organization:CreateOrganizationInput) {
              createOrganization(createOrganizationInput:$organization) { 
                organizationName
              }
            }`,
          variables: {
            organization :{
              "organizationName": orgaName,
              "place": address,
              "hotline":hotline,
            }
          },
          })
        .then(res => {
          this.fetchData();
        }
        )
        .catch(err => {
          console.log(err);
          this.setState({open:false});
        })
        this.setState({open:false});
    } 
    onConfirmDelete = ()=>{
      axios.post(`http://localhost:3001/graphql`, {
        query: `mutation deleteOrganizationMutation($organization:Int) {
            deleteOrganization(deleteOrganizationInput:$organization) { 
              organizationName
            }
          }`,
        variables: {
          organization :this.state.id
        },
        })
      .then(res => {
        this.fetchData();
        this.setState({openDelete:false});
      }
      )
      .catch(err => {
        console.log(err);
        this.setState({openDelete:false});
      })
      
    }
    onConfirmUpdate = (orgaName,address,hotline)=>{
      axios.post(`http://localhost:3001/graphql`, {
        query: `mutation updateOrganizationMutation($organization:UpdateOrganizationInput) {
              updateOrganization(updateOrganizationInput:$organization) { 
              organizationName
            }
          }`,
        variables: {
          organization :{
            "id" : this.state.id,
            "organizationName": orgaName,
            "place": address,
            "hotline":hotline,
          }
        },
        })
      .then(res => {
        this.fetchData();
        this.setState({openAdd:false});
      }
      )
      .catch(err => {
        console.log(err);
        this.setState({openAdd:false});
      })
      
    }
    componentWillMount() {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("access_token")}`;
      console.log(localStorage.getItem("access_token"));
    }
    componentDidMount(){
      axios.get(`http://localhost:3001/graphql?query=${organizationQuery}`).then(res=>{
        var data = res.data.data.getOrganizations;
        let organizations = data.map((organization,key)=>{
          return [
            organization.id,
            organization.organizationName,
            organization.place,
            organization.hotline,
            (
              // we've added some custom button actions
              <div className="actions-right">
                {/* use this button to add a edit kind of action */}
                <Button
                  justIcon
                  round
                  simple
                  onClick={() => {
                    // let obj = this.state.data.find(o => o.id === key);
                    this.setState({id:organization.id})
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
                    this.setState({id:organization.id})
                    this.openDialogDelete()
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
        this.setState({data:organizations});
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
    fetchData = ()=>{
      axios.get(`http://localhost:3001/graphql?query=${organizationQuery}`).then(res=>{
        var data = res.data.data.getOrganizations;
        let organizations = data.map((organization,key)=>{
          return [
            organization.id,
            organization.organizationName,
            organization.place,
            organization.hotline,
            (
              // we've added some custom button actions
              <div className="actions-right">
                {/* use this button to add a edit kind of action */}
                <Button
                  justIcon
                  round
                  simple
                  onClick={() => {
                    // let obj = this.state.data.find(o => o.id === key);
                    this.setState({id:organization.id})
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
                    this.setState({id:organization.id})
                    this.openDialogDelete()
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
        this.setState({data:organizations});
      })
    }
      render() {
        const { classes } = this.props;
        return (
          <GridContainer>
            <GridItem>
              <Button color='success' onClick={this.openDialogAdd}>Thêm tổ chức</Button>
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
                      "Tên tổ chức",
                      "Địa chỉ",
                      "Hotline",
                      "",

                    ]}
                    tableData={this.state.data}
                    customCellClasses={[
                      classes.center,
                      classes.center,
                      classes.center,
                      classes.center,
                      classes.center,
              

                    ]}
                    customClassesForCells={[0, 1, 2, 3, 4]}
                    customHeadCellClasses={[
                      classes.center,
                      classes.center,
                      classes.center,
                      classes.center,
                      classes.center,
                      
                    ]}
                    customHeadClassesForCells={[0, 1, 2, 3, 4]}
                  />
                </CardBody>
              </Card>
            </GridItem>
            <DialogAddOrganization  open={this.state.openAdd} onCancel={this.onCancel} onConfirm={this.onConfirmAdd}/>
            <DialogConFirmDelete  open={this.state.openDelete} onCancel={this.onCancel} onConfirm={this.onConfirmDelete}/>
            <DialogUpdateOrganization  open={this.state.openUpdate} onCancel={this.onCancel} onConfirm={this.onConfirmUpdate} />
          </GridContainer>
        );
      }
}
export default withStyles(styles)(Organization);

