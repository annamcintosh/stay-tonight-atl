import React from 'react';

export default function SingleSiteDetail() {
  return (
    <div>
      <h1>Site Name</h1>
      <h2>Address</h2>
      <h2>Phone Number</h2>
      <p>Site Details etc etc etc</p>
      {/* {this.props.isAuthenticated ? (
        <Button
          className="remove-btn"
          color="danger"
          size="sm"
          onClick={this.onDeleteClick.bind(this, _id)}
        >
          &times;
        </Button>
      ) : null} */}
    </div>
  );
}
