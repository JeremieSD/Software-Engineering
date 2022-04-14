import React, { Component, useContext } from 'react';
import TitleContainer from '../Components/TitleContainer';
import {
  ColorSchemeProvider,
  ColorSchemeContext,
} from '../Platform/ColorScheme';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Components/Navbar';
import HomeNavContainer from '../Components/HomeNavContainer';
import HomeStatsContainer from '../Components/HomeStats';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

/*This is the home page and makes use of the Navbar, 
homeNavContainer, homeStatsContainer and TitleContainer components */

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { history: this.props.history };
  }
  static contextType = ColorSchemeContext;
  render() {
    const { colorScheme, toggleColorScheme } = this.context;
    return (
      <div className="HomePage">
        <Navbar history={this.state.history} />
        <div className="HomePageContent row margin-right: -15px margin-left: -15px">
          <div className="col-lg-5 col-sm-12">
            <TitleContainer
              title="Wikidata Live"
              subtitle="A web app to visualise recent changes to Wikidata in quasi real time."
            />
          </div>
          <div className="col-lg-7 col-sm-12 homeNav">
            <div className="row">
              <div className="col-lg-4 col-sm-12">
                <h1 className="text-red">
                  <span
                    style={colorScheme === 'dark' ? { color: '#ffc400' } : {}}
                  >
                    {' '}
                    <FontAwesomeIcon icon={faBars} />{' '}
                  </span>
                </h1>

                <HomeNavContainer
                  styled={
                    colorScheme === 'dark'
                      ? 'font-weight-bold text-dark-yellow'
                      : 'font-weight-bold text-red'
                  }
                  btnStyle={
                    colorScheme === 'dark'
                      ? 'align-bottom btn btn-outline-yellow'
                      : 'align-bottom btn btn-outline-red'
                  }
                  btnTitle1="About"
                  btnTitle2="Us"
                  btnText="About"
                  btnLink="/about-page"
                />
              </div>
              <div className="col-lg-4 col-sm-12 homeNav">
                <h1 className="text-green">
                  <FontAwesomeIcon icon={faChartLine} />
                </h1>
                <HomeNavContainer
                  styled={
                    colorScheme === 'dark'
                      ? 'font-weight-bold text-dark-green'
                      : 'font-weight-bold text-green'
                  }
                  btnStyle="align-bottom btn btn-outline-green"
                  btnTitle1="Wikidata"
                  btnTitle2="Dashboard"
                  btnText="Dashboard"
                  btnLink="/page"
                />
              </div>
              <div className="col-lg-4 col-sm-12 homeNav">
                <h1
                  className={
                    colorScheme === 'dark' ? 'text-dark-blue' : 'text-blue'
                  }
                >
                  <FontAwesomeIcon icon={faUser} />
                </h1>
                <HomeNavContainer
                  styled={
                    colorScheme === 'dark'
                      ? 'font-weight-bold text-dark-blue'
                      : 'font-weight-bold text-blue'
                  }
                  btnStyle={
                    colorScheme === 'dark'
                      ? 'align-bottom btn btn-outline-dark-blue'
                      : 'align-bottom btn btn-outline-blue'
                  }
                  btnTitle1="User"
                  btnTitle2="Data"
                  btnText="Users"
                  btnLink="/most-active-users"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="statsContent row justify-content-center">
          <HomeStatsContainer />
        </div>
      </div>
    );
  }
}

export default HomePage;
