<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/augustoam/who-sings-game-api">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Who Sings Game API</h3>

  <p align="center">
    An awesome GraphQL API built for the game "Who Sings" integrated with the musixmatch lyrics database. 
    <br />
    <a href="https://augustoam.github.io/who-sings-game-api/"><strong>Explore the docs »</strong></a>
    <br />
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

The main idea of this project is to provide a robust and fast API for the game "Who Sings". This service is integrated with [Musixmatch](https://www.musixmatch.com/) lyrics database, allowing the player to have a real experience based on existing songs and artists. 
The game is based on a quiz where the player has to choose who sings a snippet of lyrics provided with 3 options of artists. After completing these quizzes the game ends and the player receives a final score based on the number of correct answers.



### Built With

This service is built based on the following technologies
* [NodeJS](https://nodejs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [GraphQL](https://graphql.org/)



<!-- GETTING STARTED -->
## Getting Started



### Prerequisites

Before proceeding with the installation of dependencies and configuration of the environment variables, make sure you have the following services running:
* [Mongo DB](https://www.mongodb.com/)
* [Redis](https://redis.io/)

You also need to get a Musixmatch API key following these [instructions](https://developer.musixmatch.com/)



### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/augustoam/who-sings-game-api
   ```
2. Use the package manager [npm](https://www.npmjs.com/get-npm) to install the dependencies.
   ```sh
   npm install
   ```
3. Create a new file called .env in the root project, and based on the .env.template, fill the requested variables.



<!-- USAGE EXAMPLES -->
## Usage



<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Augusto Pedrollo Albertoni - augusto.albertoni@gmail.com
