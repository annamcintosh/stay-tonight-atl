  const handleGeocoding = (address) => {
    const google = window.google;
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK") {
        console.log(
          "The position of the address is:",
          results[0].geometry.placeId
        );
        return results[0].geometry.placeId;
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  };

handleGeocoding("")

  // handleGeocodingRequest = (addressFormatted) => {
  //   axios
  //     .get(
  //       `https://maps.googleapis.com/maps/api/geocode/json?address=${addressFormatted}&key=YOUR_API_KEY`
  //     )
  //     .then((res) =>
  //       res
  //         .send(res[0].geometry.placeId)
  //         .catch((err) => console.log(err.response.data, err.response.status))
  //     );
  // };