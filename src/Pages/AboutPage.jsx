import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

class AboutPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: this.props.history,
      studentList: [
        {
          firstName: 'Jeremie',
          lastName: 'Sajeev Daniel',
          year: '3rd Year ICS',
          team: 'Backend Team',
          github: 'https://github.com/JeremieSD',
        },
        {
          firstName: 'Conor',
          lastName: "O'Neill",
          year: '3rd Year ICS',
          team: 'Frontend Team',
          github: 'https://github.com/conoro24',
        },
        {
          firstName: 'Matteo',
          lastName: 'McGuinness',
          year: '2nd Year ICS',
          team: 'Frontend Team',
          github: 'https://github.com/m477301',
        },
        {
          firstName: 'Emmet',
          lastName: 'Morrin',
          year: '2nd Year ICS',
          team: 'Backend Team',
          github: 'https://github.com/Unimuspanet',
        },
        {
          firstName: 'Aoife',
          lastName: 'Khan',
          year: '2nd Year CSB',
          team: 'Frontend Team',
          github: 'https://github.com/aoife-K',
        },
        {
          firstName: 'Xiaolei',
          lastName: 'Zhang',
          year: '2nd Year ICS',
          team: 'Frontend Team',
          github: 'https://github.com/Xiaoleiii',
        },
      ],
      currentStudent: true,
    };
    this.setData = this.setData.bind(this);
  }
  setData = () => {
    let list = [];
    if (this.state.currentStudent) {
      list = [
        {
          firstName: 'Brian',
          lastName: 'Lynch',
          year: '3rd Year CS',
          team: 'Frontend Team',
          github: 'https://github.com/brianlunch',
        },
        {
          firstName: 'Isobel',
          lastName: 'Mahon',
          year: '3rd Year CS',
          team: 'Frontend Team',
          github: 'https://github.com/isobelm',
        },
        {
          firstName: 'Odhran',
          lastName: 'Mullen',
          year: '3rd Year CSB',
          team: 'Backend Team',
          github: 'https://github.com/omullan',
        },
        {
          firstName: 'Alex',
          lastName: 'Mahon',
          year: '2nd Year CS',
          team: 'Frontend Team',
          github: 'https://github.com/Juuiko',
        },
        {
          firstName: 'Flora',
          lastName: 'Molnar',
          year: '2nd Year CSB',
          team: 'Frontend Team',
          github: 'https://github.com/flora-m',
        },
        {
          firstName: 'Lexes',
          lastName: 'Mantiquilla',
          year: '2nd Year CS',
          team: 'Backend Team',
          github: 'https://github.com/lexesjan',
        },
      ];
    } else {
      list = [
        {
          firstName: 'Jeremie',
          lastName: 'Sajeev Daniel',
          year: '3rd Year ICS',
          team: 'Backend Team',
          github: 'https://github.com/JeremieSD',
        },
        {
          firstName: 'Conor',
          lastName: "O'Neill",
          year: '3rd Year ICS',
          team: 'Frontend Team',
          github: 'https://github.com/conoro24',
        },
        {
          firstName: 'Matteo',
          lastName: 'McGuinness',
          year: '2nd Year ICS',
          team: 'Frontend Team',
          github: 'https://github.com/m477301',
        },
        {
          firstName: 'Emmet',
          lastName: 'Morrin',
          year: '2nd Year ICS',
          team: 'Backend Team',
          github: 'https://github.com/Unimuspanet',
        },
        {
          firstName: 'Aoife',
          lastName: 'Khan',
          year: '2nd Year CSB',
          team: 'Frontend Team',
          github: 'https://github.com/aoife-K',
        },
        {
          firstName: 'Xiaolei',
          lastName: 'Zhang',
          year: '2nd Year ICS',
          team: 'Frontend Team',
          github: 'https://github.com/Xiaoleiii',
        },
      ];
    }
    this.setState({
      currentStudent: !this.state.currentStudent,
      studentList: list,
    });
  };
  render() {
    return (
      <div className="aboutPageContainer">
        <Navbar history={this.state.history} />
        <div className=" text-left">
          <div className="row">
            <div className="col-lg-6 col-sm-12  aboutPageContent">
              <div className="explainContainer text-left">
                <h3 className="text-blue">Why we made our project</h3>
                <p>
                  We are a group of Computer Science students studying in
                  Trinity College Dublin. We undertake a module in which we are
                  given real world projects from a variety of individuals,
                  researchers and businesses.
                </p>
                <p>
                  Our clients were Fabrizio and Damien who work in the Trinity
                  ADAPT research center and they tasked us to create a website
                  that will visualise various changes to Wikidata in
                  quasi-real-time. Its targeted users are researchers and should
                  make it easier to identify spam and incorrect or malicious
                  edits to Wikidata.
                </p>
              </div>
              <br />
              <div className=" licenseContainer text-left">
                <h3 className="text-blue">Licensing</h3>
                <p>
                  We have insured all libraries and all project dependencies
                  licenses cover our web apps intended use.
                </p>
                <p>
                  We have decided to use an{' '}
                  <a href="https://opensource.org/licenses/MIT">MIT license</a>{' '}
                  for this project.
                </p>
                <p>
                  More in depth information along with the projects source code
                  can be found on the projects{' '}
                  <a href="https://github.com/isobelm/Software-Engineering">
                    Github.
                  </a>{' '}
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 profiles">
              <div className="client">
                <h3 className="text-red">Clients</h3>
                <div className="card-deck">
                  <div className="card card-profile">
                    <div className="card-body">
                      <h5 className="card-title text-center ">Damien Graux</h5>
                      <div className="text-center">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className="GH aBlack"
                          href="https://dgraux.github.io/"
                        >
                          <FontAwesomeIcon icon={faLink} />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="card card-profile">
                    <div className="card-body">
                      <h5 className="card-title text-center">
                        Fabrizio Orlandi
                      </h5>
                      <div className="text-center">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className="GH aBlack"
                          href="https://www.scss.tcd.ie/personnel/orlandif"
                        >
                          <FontAwesomeIcon icon={faLink} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="text-title">
                <h3 className="text-red">Students</h3>
                <button
                  className="text-button text-title-button"
                  onClick={this.setData}
                >
                  {this.state.currentStudent
                    ? 'see previous team'
                    : 'see present team'}
                </button>
              </div>
              <div className="card-deck  text-center">
                {this.state.studentList.slice(0, 3).map(function(item, key) {
                  return (
                    <div className="card card-profile" key={key}>
                      <div className="card-body">
                        <h5 className="card-title text-center">
                          {item.firstName}
                          <br /> {item.lastName}
                        </h5>
                        <p className="card-text">
                          <b>{item.year}</b>
                          <br />
                          {item.team}
                        </p>
                        <div className="text-center">
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="GH aBlack"
                            href={item.github}
                          >
                            <FontAwesomeIcon icon={faGithub} />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="card-deck  text-center">
                {this.state.studentList.slice(3, 6).map(function(item, key) {
                  return (
                    <div className="card card-profile" key={key}>
                      <div className="card-body">
                        <h5 className="card-title text-center">
                          {item.firstName}
                          <br /> {item.lastName}
                        </h5>
                        <p className="card-text">
                          <b>{item.year}</b>
                          <br />
                          {item.team}
                        </p>
                        <div className="text-center">
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="GH aBlack"
                            href={item.github}
                          >
                            <FontAwesomeIcon icon={faGithub} />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutPage;
