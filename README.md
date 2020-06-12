
<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/psatler/barbershop-mobile.svg">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/psatler/barbershop-mobile.svg">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/psatler/barbershop-mobile.svg">

  <img alt="Repository Last Commit Date" src="https://img.shields.io/github/last-commit/psatler/barbershop-mobile?color=blue">

  <a href="https://www.linkedin.com/in/pablosatler/">
    <img alt="Made by Pablo Satler" src="https://img.shields.io/badge/made%20by-Pablo%20Satler-blue">
  </a>

  <img alt="License" src="https://img.shields.io/github/license/psatler/barbershop-mobile?color=blue">

</p>

# Barbershop Mobile
> App created with React Native

This will consume the API created at [this repository](https://github.com/psatler/barbershop-backend).




## Dependencies

- Typescript
- ESLint
- Prettier
- Styled Components
- [React Navigation v5](https://reactnavigation.org/)
- Unform/core and Unform/mobile
- Yup (for handling errors)
- Axios
- React Native Async Storage
- [Lint-staged](https://github.com/okonet/lint-staged) and [Husky](https://github.com/typicode/husky) for pre-commit checks
<!-- -
- Polished
- React Spring -->



### Acknowledments

- You can run `adb reverse tcp:3333 tcp:3333` to be able to fetch the api using _localhost_. Another adjust you can do it to find your IP local address, for example,
`192.168.15.17` and replace it on the [backend](https://github.com/psatler/barbershop-backend) at the variable _APP_API_URL_ in the `.env` file, so it becomes
`http://192.168.15.17:3333`. **Remember**: you got to be using the same network to perform requests on localhost.
