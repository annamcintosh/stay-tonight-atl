import React from "react";
import SitePreviewTile from "./SitePreviewTile";

const SiteList = ({ sites }) => {
  return (
    <div className="search">
      {!sites.length ? (
        <h1>No sites found.</h1>
      ) : (
        sites.map((site) => (
          <SitePreviewTile
            key={site.id}
            name={site.name}
            phone={site.phone}
            address={site.address}
            id={site.id}
          />
        ))
      )}
    </div>
  );
};

export default SiteList;
