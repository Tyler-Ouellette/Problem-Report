// const apiCalls = require('../apiCalls');
const { DynatraceTenantAPI } = require('@dt-esa/dynatrace-api-client');

exports.getProblems = async (req, res) => {

    const creds = {
        url: process.env.TENANT,
        token: process.env.TOKEN
    }

    const dtAPI = new DynatraceTenantAPI(creds, {
        skipConnectivityCheck: true,
    })

    // Constants to define short and long living problems
    const SHORT_LIVED_TIME = (1000 * 60 * 5); // 5min
    const LONG_LIVED_TIME = (1000 * 60 * 60 * 2); // 24h
    const DAYS = 365;
    const FROM = `now-${DAYS}d`


    const problems = await dtAPI.v2.problems.getProblems({ from: FROM });

    let data = problems;

    const totalProblems = data.totalCount;
    const withRootCause = data.problems.filter(problem => problem.rootCauseEntity !== null);

    const withoutRootCause = totalProblems - withRootCause.length;
    const rootCausePercentage = withRootCause.length / totalProblems * 100;

    const numberAffectedEntities = data.problems.map(problem => problem.affectedEntities?.length).reduce((accumulator, current) => accumulator + current, 0);
    const numberImpactedEntities = data.problems.map(problem => problem.impactedEntities ? problem.impactedEntities.length : 0).reduce((accumulator, current) => accumulator + current, 0);
    const numManagementZonesAffected = data.problems.map(problem => problem.managementZones ? problem.managementZones.length : 0).reduce((accumulator, current) => accumulator + current, 0);
    const shortLivedProblems = data.problems.filter(problem => problem.endTime !== -1 && problem.endTime - problem.startTime < SHORT_LIVED_TIME);
    const longProblems = data.problems.filter(problem => problem.endTime !== -1 && problem.endTime - problem.startTime > LONG_LIVED_TIME);


    const problemStats = {
        "Total Problems": data.totalCount,
        "Problems With Root Cause": withRootCause.length,
        "Problems Without Root Cause": withoutRootCause,
        "Root Cause Found Percentage": rootCausePercentage.toPrecision(4) + "%",
        "Number of Affected Entities": numberAffectedEntities,
        "Number of Impacted Entities": numberImpactedEntities,
        "Number Of Management Zones Affected": numManagementZonesAffected,
        "Number of Short Lived Problems < 5mins": shortLivedProblems.length,
        "Long Problems > 24 hours": longProblems.length
    }
    res.status(200).send(problemStats);

}