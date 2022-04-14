import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { ColorSchemeContext } from '../Platform/ColorScheme';

class AboutPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: this.props.history,
      studentList: [
        [
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
        ],
        [
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
        [
          {
            firstName: 'James "Jay"',
            lastName: 'Cowan',
            year: '3rd Year CSB',
            team: 'Project Leader',
            github: 'https://github.com/JayCowan',
          },
          {
            firstName: 'Liam',
            lastName: 'O Lionaird',
            year: '3rd Year ICS',
            team: 'Backend Team',
            github: 'https://github.com/liam-ol',
          },
          {
            firstName: 'Conor',
            lastName: 'O Sirideain',
            year: '3rd Year ICS',
            team: 'Frontend Team',
            github: 'https://github.com/Tepja16',
          },
          {
            firstName: 'Micheal',
            lastName: 'Keogh',
            year: '2nd Year ICS',
            team: 'Frontend Team',
            github: 'https://github.com/M-Keogh',
          },
          {
            firstName: 'Ridish',
            lastName: 'Kolli',
            year: '2nd Year ICS',
            team: 'Frontend Team',
            github: 'https://github.com/ridish05',
          },
          {
            firstName: 'Maile',
            lastName: 'Monteiro da Rocha',
            year: '2nd Year CSB',
            team: 'Backend Team',
            github: 'https://github.com/maile-mdr',
          },
        ],
      ],
      currentStudent: 2,
    };
    this.decrement = this.decrement.bind(this);
    this.increment = this.increment.bind(this);
  }
  static contextType = ColorSchemeContext;
  decrement = () => {
    this.setState({
      currentStudent:
        this.state.currentStudent >= 1 ? this.state.currentStudent - 1 : 0,
    });
  };
  increment = () => {
    this.setState({
      currentStudent:
        this.state.currentStudent < 2 ? this.state.currentStudent + 1 : 2,
    });
  };
  render() {
    const { colorScheme, toggleColorScheme } = this.context;
    return (
      <div className="aboutPageContainer">
        <Navbar history={this.state.history} />
        <div className=" text-left">
          <div className="row">
            <div className="col-lg-6 col-sm-12  aboutPageContent">
              <div className="explainContainer text-left">
                <h3
                  className="text-blue"
                  style={colorScheme === 'dark' ? { color: '#ffffff' } : {}}
                >
                  Why we made our project
                </h3>
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
                <h3
                  className="text-blue"
                  style={colorScheme === 'dark' ? { color: '#ffffff' } : {}}
                >
                  Licensing
                </h3>
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
                <h3 className="text-red">
                  <span
                    style={colorScheme === 'dark' ? { color: '#ffc400' } : {}}
                  >
                    Clients
                  </span>
                </h3>
                <div className="card-deck">
                  <div className="card card-profile">
                    <div className="card-body">
                      <h5 className="card-title text-center text-black">
                        Damien Graux
                      </h5>
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
                      <h5 className="card-title text-center text-black">
                        Fabrizio Orlandi
                      </h5>
                      <div className="text-center text-black">
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
                <h3 className="text-red">
                  <span
                    style={colorScheme === 'dark' ? { color: '#ffc400' } : {}}
                  >
                    Students
                  </span>
                </h3>
                <button
                  className="text-button text-title-button"
                  onClick={this.increment}
                >
                  +
                </button>
                <span
                  className="text-center text-lower"
                  style={{ position: 'relative', top: '10px', left: '5px' }}
                >
                  Year {this.state.currentStudent + 1}
                </span>
                <button
                  className="text-button text-title-button"
                  onClick={this.decrement}
                >
                  -
                </button>
              </div>
              <div className="card-deck  text-center text-black">
                {this.state.studentList
                  .at(this.state.currentStudent)
                  .slice(0, 3)
                  .map(function(item, key) {
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
              <div className="card-deck  text-center text-black">
                {this.state.studentList
                  .at(this.state.currentStudent)
                  .slice(3, 6)
                  .map(function(item, key) {
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
