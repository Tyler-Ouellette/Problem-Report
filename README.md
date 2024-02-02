# Problem Reporting

## Getting started


A Node JS Program that gets all problems and reports some statistics around the number of problems in the last year, can be tweaked with constant variables. 

**Disclaimer - This application is not officially supported by Dynatrace. This is a custom program written to solve an answer. See LICENSE for details.**


## Pre-Requisites
- Node 18 or greater
- API Token must have permissions to read problems.

## How to Run

1. First git clone this repository.
```bash
git clone https://github.com/Tyler-Ouellette/Problem-Report.git
```

2. In your terminal install all the npm dependencies by running:
```bash
npm install
```

3. Using the variables.env.sample file, edit the filename to remove the .sample so it is now called 'variables.env' then add the appropriate values into the variables.
```bash
# Dynatrace Environment URL that the application will run against.
URL="https://abc1234.live.dynatrace.com"
# Dynatrace REST API token
TOKEN="MySecretToken"
```

If you are Dynatrace Managed the tenant should be: 
```bash
# Dynatrace Environment URL that the application will run against.
URL="https://DOMAIN.com/e/ENVIRONEMENTID"
# Dynatrace REST API token
TOKEN="MySecretToken"
```


4. Start the program, this will start the program on port 7777
```bash
# Build and launch the application on port 7777
npm start
```

5. Click on the link in the terminal and it will open in your browser.