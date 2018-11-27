module.exports = {
  about: {
    title: 'I ♡ coding.',
    paragraphs: [
      "It's amazing that we have the ability to key in letters to bring an idea into an living app in the digital world!",
      "I'm passionate about exploring new tools, designing solutions to find the most efficient algorithms for better application performances, and delivering tech products that meet day-to-day needs.",
      `I’m experienced in building web applications with Javascript.
  Have worked with vanilla JS with HTML/CSS, jQuery, Vue.js, React.js and AngularJS... a lot of great stuff.
  And not only front-end, I love working with backend with Node.js and Springboot Java app as well!`,
    ],
  },
  resume: {
    technicalSkills: {
      languages: ['JavaScript', 'Bash Script', 'Java', 'Python', 'C#'],
      'tech stack': [
        'Vue.js',
        'HTML/CSS',
        'jQuery',
        'Mustache',
        'Apollo',
        'React.js',
        'Git',
        'Concourse',
        'Webdriver.io',
        'Node.js',
        'GraphQL',
        'Express.js',
        'MongoDB',
        'Webpack',
        'Angular.js',
      ],
    },
    experiences: [
      {
        title: 'Software Engineer',
        year: '2018 Jan - Present',
        company: 'The Home Depot',
        description: [
          {
            name: 'Browser Automation Testing Framework',
            'sub-title': 'Internal tool',
            desc: [
              `Integrated Slack API to Home Depot's internal testing framework to customize
Slack test results messages and allow instant update upon test completion in
Concourse CI/CD pipelines.`,
              `Set-up and configured Concourse CI/CD pipelines for continuous automation
testings on B2C sites to catch functional defects.`,
              `Integrated third-party MobileLabs to internal testing framework to allow
automation test on real mobile devices on CI/CD pipelines.`,
              `Designed and optimized browser test report data structure to enable flexible
use of nesting test suites for Selenium/Webdriver.io and Mocha browser tests.`,
              `Implemented GraphQL with Apollo and Express server for internal tool's
Graphical User Interface backend.`,
              `Designed and built interactive Graphical User Interface of Home Depot's
internal browser testing tool using Vue.js, Apollo and D3/nvd3.`,
            ],
          },
          {
            name: 'B2C Web Application',
            'sub-title': 'Customer-facing App',
            desc: [
              `Delivered front end features for appliance experience on Home Depot's B2C
web applications using jQuery, Mustache and SCSS stack.`,
              `Improved B2C sites' reliability through integration of Automation Tests using
Selenium/Appium/Webdriver.io`,
              `Updated the front end build process of Home Depot's B2C application through
the implementation of Webpack.`,
            ],
          },
        ],
      },
      {
        title: 'Web Developer',
        year: '2017-06 - 2018-09',
        company: 'Contract/Freelance',
        description: [
          {
            name: 'liveDraftX',
            'sub-title': 'Online fatansy football app.',
            desc: [
              `Improved User Experience and real-time data update by implementing native
websocket to Redux store to allow state update per server requests.`,
              `Integrated websocket with local storage to allow session persistence with user
token.`,
            ],
          },
          {
            name: 'Mindflare',
            'sub-title':
              'A​ ​productivity​ ​app​ ​that​ ​uses​ ​a​ ​tree​ ​data​ ​structure​ ​to​ ​allow​ ​users​ ​to​ ​create​ ​a​ ​visualization​ ​of​ ​ideas',
            desc: [
              'Designed​ ​NoSQL​ ​database​ ​schema​ ​using​ ​Mongoose​ ​ORM​ ​to​ ​organize​ ​data​ ​type,​ ​data relationship,​ ​and​ ​data​ ​storage​ ​efficiently',
              'Utilized​ ​React.js​ ​with​ ​D3​ ​to​ ​display​ ​an​ ​interactive​ ​visualization​ ​of​ ​static​ ​tree​ ​data',
              'Implemented​ ​tree​ ​traversal​ ​algorithms​ ​to​ ​manipulate​ ​nodes​ ​in​ ​the​ ​tree​ ​data​ ​structure',
            ],
          },
        ],
      },
    ],
    projects: [
      {
        name: 'Concreet-Cal',
        title: 'Front-End​ ​Software​ ​Engineer',
        'sub-title':
          'A​ ​calendar​ ​manager​ ​app​ ​that​ ​allows​ ​users​ ​to​ ​check​ ​for​ ​attendees’​ ​available​ ​​ ​hours​ ​and​ ​send​ ​event​ ​invitations',
        desc: [
          'Constructed​ ​overall​ ​front-end​ ​structure​ ​using​ ​React.js​ ​framework​ ​for​ ​an​ ​optimal​ ​user experience',
          'Set​ ​up​ ​client​ ​to​ ​server​ ​Ajax​ ​requests​ ​for​ ​user​ ​authentication​ ​and​ ​calendar​ ​data​ ​retrieval',
          'Designed​ ​intuitive​ ​UI​ ​for​ ​contact​ ​and​ ​group​ ​management​ ​with​ ​CSS​ ​styling​ ​and​ ​Font Awesome​ ​library',
        ],
      },
      {
        name: 'Student​ ​Selector',
        title: 'Full-Stack​ ​Software​ ​Engineer​',
        'sub-title':
          'A​ ​tool​ ​that​ ​allows​ ​users​ ​to​ ​store​ ​student​ ​data​ ​and​ ​to​ ​randomly​ ​select​ ​or​ ​group​ ​students​ ​in​ ​the​ ​classroom',
        desc: [
          'Architected​ ​front-end​ ​and​ ​back-end​ ​structure​ ​of​ ​the​ ​application​ ​implementing​ ​AngularJS and​ ​Express.js',
          'Integrated​ ​Mongo​ ​database​ ​and​ ​Express.js​ ​to​ ​ensure​ ​data​ ​persistency',
          'Implemented​ ​efficiency​ ​algorithm​ ​for​ ​random​ ​selection​ ​and​ ​random​ ​group​ ​selection',
        ],
      },
    ],
    education: [
      {
        schoolName: 'University of Texas at Austin',
        major: 'BS in Chemistry with Teaching Certificate',
        location: 'Austin, Texas',
        year: '2010 - 2014',
      },
      {
        schoolName: 'Austin Community College',
        major: 'Computer Science(APT)',
        location: 'Austin, Texas',
        year: '2016-2017',
      },
      {
        schoolName: 'Hack Reactor',
        major: 'Advanced Software Engineering Immersive',
        location: 'Austin, Texas',
        year: '2017',
      },
    ],
  },
};
