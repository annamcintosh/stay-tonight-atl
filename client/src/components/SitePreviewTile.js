import React from 'react';
import { Card, Button, CardTitle, CardText } from 'reactstrap';

const SitePreviewTile = (props) => {
  return (
    <Card body className="text-center">
      <CardTitle tag="h5">Site Name</CardTitle>
      <CardText>Address</CardText>
      <CardText>Phone Number</CardText>
      <Button>More Information</Button>
    </Card>
  );
};

export default SitePreviewTile;
