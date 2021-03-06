const siteSchema = {
  siteId: {
    S: "",
  },
  userId: {
    S: "",
  },
  siteName: {
    S: "",
  },
  phone: {
    S: "",
  },
  address: {
    S: "",
  },
  city: {
    S: "",
  },
  stateName: {
    S: "",
  },
  zipcode: {
    S: "",
  },
  latitude: {
    S: "",
  },
  longitude: {
    S: "",
  },
  lgbtq: {
    BOOL: false,
  },
  family: {
    BOOL: false,
  },
  women: {
    BOOL: false,
  },
  men: {
    BOOL: false,
  },
  pets: {
    BOOL: false,
  },
  youth: {
    BOOL: false,
  },
  sunday: {
    BOOL: false,
  },
  monday: {
    BOOL: false,
  },
  tuesday: {
    BOOL: false,
  },
  wednesday: {
    BOOL: false,
  },
  thursday: {
    BOOL: false,
  },
  friday: {
    BOOL: false,
  },
  saturday: {
    BOOL: false,
  },
  details: {
    S: "",
  },
};

exports.siteSchema = siteSchema;

const stubbedData = {
  siteId: "6",
  userId: "6",
  longitude: "test",
  latitude: "test",
  youth: true,
  thursday: true,
  monday: true,
  women: true,
  stateName: "test",
  address: "test",
  tuesday: true,
  wednesday: true,
  friday: true,
  city: "test",
  zipcode: "test",
  siteName: "testSixAdd",
  lgbtq: true,
  sunday: true,
  pets: true,
  men: true,
  saturday: true,
  details: "test",
  family: true,
  phone: "test",
};