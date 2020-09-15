import { expect } from 'chai';
const chai = require('chai');
const chaiFetch = require('chai-fetch');
const spies = require('chai-spies');
import goFetch from '../src/fetch-requests.js'

describe('post', function() {
  it('should run fetch once', function() {
    global.fetch = chai.spy(() => {});
    let item = {
      id: '',
      needs: ''
    }

    let user = {
      id: ''
    }
    goFetch.post(item, user);
    expect(fetch).to.have.been.called.once;
  })

  it('should call fetch with correct object and URl', function() {
    global.fetch = chai.spy(() => {});
    let item = {
      id: '',
      needs: ''
    }

    let user = {
      id: ''
    }

    let data = {
      "userID": user.id,
      "ingredientID": item.id,
      "ingredientModification": item.needs
    }

    let update = JSON.stringify(data);

    goFetch.post(item, user);
    expect(fetch).to.have.been.called.with('https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/users/wcUsersData', {
        method: 'POST',
        body: update,
        headers: {
          'Content-Type': 'application/json'
        }
      })
  })
})

describe('getServerData', function() {
  it('should return a promise', function() {

  })

  it('should run fetch three times', function() {
    global.fetch = chai.spy(() => {});

    goFetch.getServerData();
    expect(fetch).to.have.been.called.exactly(3);
  })
})
