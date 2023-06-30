<a name="readme-top"></a>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://truenorthinc.com/wp-content/themes/truenorth2019/images/nav-logo-black.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Arithmetic Calculator Web page</h3>

  <p align="center">
    calculator app for processing basic math operations from server using token authentication!
    <br />
    <a href="https://github.com/AlfredoJonas/the-man-who-calculated-be/blob/main/README.md"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Report Bug</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
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
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Web app platform to provide a simple calculator functionality (addition, subtraction,
multiplication, division, square root, and a random string generation) where each functionality will
have a separate cost per request.

User’s will have a starting credit/balance. Each request will be deducted from the user’s balance.
If the user’s balance isn’t enough to cover the request cost, the request shall be denied.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With


* [![NextJs][nextjs]][nextjs-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

This is a NextJs project, in terms of build this up you'll need to have NodeJs already installed
* <a href="https://nodejs.org/en/download">Install NodeJs</a>

### Installation

_You can follow this steps in order to have an app build and up._

1. Clone this repo
   ```sh
   git clone https://github.com/AlfredoJonas/the-man-who-calculated-fe
   ```
2. Move on the root dir of your project
    ```sh
    cd the-man-who-calculated-fe
    ```
3. Do a copy of the *env.example* file renaming it as *.env*
   ```sh
   cp .env.example .env
   ```
4. Now just install dependencies using npm(powered by NodeJs)
   ```sh
   npm i
   ``` 
5. Run tests to confirm everything is OK
    ```sh
    npm run test
    ```
6. To lift the app and show it in the browser
    ```sh
    npm run dev
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Jonas Gonzalez - [@Sanoj94](https://twitter.com/Sanoj94) - alfredojonas94@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Resources I find helpful and would like to give credit to.

* [NextJs docs](https://nextjs.org/docs)
* [StackOverflow](https://stackoverflow.com/)


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[product-screenshot]: public/images/screenshot.png
[nextjs]: https://img.shields.io/badge/nextjs-103e2e?style=for-the-badge&logo=nextjs&logoColor=white
[nextjs-url]: https://nextjs.org/