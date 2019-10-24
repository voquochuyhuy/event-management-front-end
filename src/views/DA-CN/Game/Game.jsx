import React, { Component } from 'react'
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";
import Info from "@material-ui/icons/Info";
import LocationOn from "@material-ui/icons/LocationOn";
import Gavel from "@material-ui/icons/Gavel";
import HelpOutline from "@material-ui/icons/HelpOutline";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Accordion from "components/Accordion/Accordion.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

const styles = {
  cardTitle,
  pageSubcategoriesTitle: {
    color: "#3C4858",
    textDecoration: "none",
    textAlign: "center"
  },
  cardCategory: {
    margin: "0",
    color: "#999999"
  }
};
 class Game extends Component {
    render() {
        const { classes } = this.props;
        return (    
            <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                        <Card>
                        <CardHeader>
                            <h4 className={classes.cardTitle}>
                            Navigation Pills <small> - Horizontal Tabs</small>
                            </h4>
                        </CardHeader>
                        <CardBody>
                            <NavPills
                            color="warning"
                            tabs={[
                                {
                                tabButton: "Profile",
                                tabContent: (
                                    <span>
                                    <p>
                                        Collaboratively administrate empowered markets via
                                        plug-and-play networks. Dynamically procrastinate
                                        B2C users after installed base benefits.
                                    </p>
                                    <br />
                                    <p>
                                        Dramatically visualize customer directed convergence
                                        without revolutionary ROI. Collaboratively
                                        administrate empowered markets via plug-and-play
                                        networks. Dynamically procrastinate B2C users after
                                        installed base benefits.
                                    </p>
                                    <br />
                                    <p>This is very nice.</p>
                                    </span>
                                )
                                },
                                {
                                tabButton: "Settings",
                                tabContent: (
                                    <span>
                                    <p>
                                        Efficiently unleash cross-media information without
                                        cross-media value. Quickly maximize timely
                                        deliverables for real-time schemas.
                                    </p>
                                    <br />
                                    <p>
                                        Dramatically maintain clicks-and-mortar solutions
                                        without functional solutions.
                                    </p>
                                    </span>
                                )
                                },
                                {
                                tabButton: "Options",
                                tabContent: (
                                    <span>
                                    <p>
                                        Completely synergize resource taxing relationships
                                        via premier niche markets. Professionally cultivate
                                        one-to-one customer service with robust ideas.{" "}
                                    </p>
                                    <br />
                                    <p>
                                        Dynamically innovate resource-leveling customer
                                        service for state of the art customer service.
                                    </p>
                                    </span>
                                )
                                }
                            ]}
                            />
                        </CardBody>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                        <Card>
                        <CardHeader>
                            <h4 className={classes.cardTitle}>
                            Navigation Pills <small> - Horizontal Tabs</small>
                            </h4>
                        </CardHeader>
                        <CardBody>
                            <NavPills
                            color="warning"
                            tabs={[
                                {
                                tabButton: "Profile",
                                tabContent: (
                                    <span>
                                    <p>
                                        Collaboratively administrate empowered markets via
                                        plug-and-play networks. Dynamically procrastinate
                                        B2C users after installed base benefits.
                                    </p>
                                    <br />
                                    <p>
                                        Dramatically visualize customer directed convergence
                                        without revolutionary ROI. Collaboratively
                                        administrate empowered markets via plug-and-play
                                        networks. Dynamically procrastinate B2C users after
                                        installed base benefits.
                                    </p>
                                    <br />
                                    <p>This is very nice.</p>
                                    </span>
                                )
                                },
                                {
                                tabButton: "Settings",
                                tabContent: (
                                    <span>
                                    <p>
                                        Efficiently unleash cross-media information without
                                        cross-media value. Quickly maximize timely
                                        deliverables for real-time schemas.
                                    </p>
                                    <br />
                                    <p>
                                        Dramatically maintain clicks-and-mortar solutions
                                        without functional solutions.
                                    </p>
                                    </span>
                                )
                                },
                                {
                                tabButton: "Options",
                                tabContent: (
                                    <span>
                                    <p>
                                        Completely synergize resource taxing relationships
                                        via premier niche markets. Professionally cultivate
                                        one-to-one customer service with robust ideas.{" "}
                                    </p>
                                    <br />
                                    <p>
                                        Dynamically innovate resource-leveling customer
                                        service for state of the art customer service.
                                    </p>
                                    </span>
                                )
                                }
                            ]}
                            />
                        </CardBody>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                        <Card>
                        <CardHeader>
                            <h4 className={classes.cardTitle}>
                            Navigation Pills <small> - Horizontal Tabs</small>
                            </h4>
                        </CardHeader>
                        <CardBody>
                            <NavPills
                            color="warning"
                            tabs={[
                                {
                                tabButton: "Profile",
                                tabContent: (
                                    <span>
                                    <p>
                                        Collaboratively administrate empowered markets via
                                        plug-and-play networks. Dynamically procrastinate
                                        B2C users after installed base benefits.
                                    </p>
                                    <br />
                                    <p>
                                        Dramatically visualize customer directed convergence
                                        without revolutionary ROI. Collaboratively
                                        administrate empowered markets via plug-and-play
                                        networks. Dynamically procrastinate B2C users after
                                        installed base benefits.
                                    </p>
                                    <br />
                                    <p>This is very nice.</p>
                                    </span>
                                )
                                },
                                {
                                tabButton: "Settings",
                                tabContent: (
                                    <span>
                                    <p>
                                        Efficiently unleash cross-media information without
                                        cross-media value. Quickly maximize timely
                                        deliverables for real-time schemas.
                                    </p>
                                    <br />
                                    <p>
                                        Dramatically maintain clicks-and-mortar solutions
                                        without functional solutions.
                                    </p>
                                    </span>
                                )
                                },
                                {
                                tabButton: "Options",
                                tabContent: (
                                    <span>
                                    <p>
                                        Completely synergize resource taxing relationships
                                        via premier niche markets. Professionally cultivate
                                        one-to-one customer service with robust ideas.{" "}
                                    </p>
                                    <br />
                                    <p>
                                        Dynamically innovate resource-leveling customer
                                        service for state of the art customer service.
                                    </p>
                                    </span>
                                )
                                }
                            ]}
                            />
                        </CardBody>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                    <Card>
                    <CardHeader>
                        <h4 className={classes.cardTitle}>
                        Navigation Pills <small> - Horizontal Tabs</small>
                        </h4>
                    </CardHeader>
                    <CardBody>
                        <NavPills
                        color="warning"
                        tabs={[
                            {
                            tabButton: "Profile",
                            tabContent: (
                                <span>
                                <p>
                                    Collaboratively administrate empowered markets via
                                    plug-and-play networks. Dynamically procrastinate
                                    B2C users after installed base benefits.
                                </p>
                                <br />
                                <p>
                                    Dramatically visualize customer directed convergence
                                    without revolutionary ROI. Collaboratively
                                    administrate empowered markets via plug-and-play
                                    networks. Dynamically procrastinate B2C users after
                                    installed base benefits.
                                </p>
                                <br />
                                <p>This is very nice.</p>
                                </span>
                            )
                            },
                            {
                            tabButton: "Settings",
                            tabContent: (
                                <span>
                                <p>
                                    Efficiently unleash cross-media information without
                                    cross-media value. Quickly maximize timely
                                    deliverables for real-time schemas.
                                </p>
                                <br />
                                <p>
                                    Dramatically maintain clicks-and-mortar solutions
                                    without functional solutions.
                                </p>
                                </span>
                            )
                            },
                            {
                            tabButton: "Options",
                            tabContent: (
                                <span>
                                <p>
                                    Completely synergize resource taxing relationships
                                    via premier niche markets. Professionally cultivate
                                    one-to-one customer service with robust ideas.{" "}
                                </p>
                                <br />
                                <p>
                                    Dynamically innovate resource-leveling customer
                                    service for state of the art customer service.
                                </p>
                                </span>
                            )
                            }
                        ]}
                        />
                    </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
            
        )
    }
}
export default withStyles(styles)(Game);
