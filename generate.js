#!/env/node -e
const R = require('ramda');
const { utc: moment } = require('moment');
const objectId = require('objectid');
const faker = require('faker');
const jsonfile = require('jsonfile');
const path = require('path');

const generateCustomer = () => {
  const customer = objectId();
  const customerData = [];
  const rand = n => Math.floor(Math.random() * n);
  let startTime = moment().add(rand(-1000000), 's');
  const factor = Math.random();
  customerData.push({
    _id: objectId(),
    customer,
    createdAt: moment(startTime).toISOString(),
    eventCategory: 'pageloads',
    eventName: 'page-loaded',
    eventValue: 'about-us'
  });

  if (factor > 0.25) {
    startTime = moment(startTime).add(rand(30), 's');
    customerData.push({
      _id: objectId(),
      customer,
      createdAt: moment(startTime).toISOString(),
      eventCategory: 'data-entry',
      eventName: 'email-entered',
      eventValue: faker.internet.email()
    });
  }

  if (Math.random() > 0.4) {
    startTime = moment(startTime).add(rand(30));
    customerData.push({
      _id: objectId(),
      customer,
      createdAt: moment(startTime).toISOString(),
      eventCategory: 'data-entry',
      eventName: 'phone-entered',
      eventValue: faker.phone.phoneNumber()
    });
  }

  if (factor > 0.35) {
    startTime = moment(startTime).add(rand(180), 's');
    customerData.push({
      _id: objectId(),
      customer,
      createdAt: moment(startTime).toISOString(),
      eventCategory: 'data-entry',
      eventName: 'query-entered',
      eventValue: faker.lorem.paragraph()
    });
  }

  if (factor > 0.4) {
    startTime = moment(startTime).add(rand(20), 's');
    customerData.push({
      _id: objectId(),
      customer,
      createdAt: moment(startTime).toISOString(),
      eventCategory: 'form-submission',
      eventName: 'get-help-form',
      eventValue: 'cta-help-button'
    });
  }

  startTime = moment(startTime).add(rand(60), 's');
  customerData.push({
    _id: objectId(),
    customer,
    createdAt: moment(startTime).toISOString(),
    eventCategory: 'pageloads',
    eventName: 'page-unloaded',
    eventValue: 'about-us'
  });
  return customerData;
};
const generate = num => R.flatten(R.times(generateCustomer, num));

jsonfile.writeFileSync(path.resolve(__dirname, 'data.json'), generate(10000), {
  spaces: 2,
  EOL: '\r\n'
});
