import axios from "axios";

export const retrieveSiteData = (databaseResponse, prevStateSites) => {
  const generatedSitesDifferenceArray = generateSitesDifferenceArray(
    databaseResponse,
    prevStateSites
  );
  return generatedSitesDifferenceArray.map((site) => {
    return retrieveCoordinates(site);
  });
};

const generateSitesDifferenceArray = (databaseResponse, prevStateSites) => {
  return databaseResponse.filter(
    ({ address: id1, stateName: id3, city: id5, zipcode: id7 }) =>
      !prevStateSites.some(
        ({ address: id2, stateName: id4, city: id6, zipcode: id8 }) =>
          id2 === id1 && id3 === id4 && id5 === id6 && id7 === id8
      )
  );
};

export const retrieveCoordinates = async (site) => {
  const newString = `${site.address} ${site.city} ${site.stateName} ${site.zipcode}`;
  const formattedAddress = encodeURI(newString);
  try {
    const { results } = await axios.post(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${process.env.REACT_APP_API_KEY}`
    );
    console.log(results);
    return { ...site, results };
    // return { ...site, location: results[0].geometry.location };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
