const chai = require('chai');

const spies = require('chai-spies');
chai.use(spies);
import { expect } from 'chai';
import goFetch from '../src/fetch-requests.js'

console.log(goFetch)
//set up spies
//need a fetch spy

describe('post', function() {
  it('should return a promise', function() {
    console.log(goFetch);
    global.fetch = chai.spy(function() {
      return new Promise()
      });

    let item = {
      id: '',
      needs: ''
    }

    let user = {
      id: ''
    }

    expect(goFetch.post(item, user)).to.be.an.instanceOf(Promise);
  })

  it('should run fetch once', function() {

  })

  it('should call fetch with correct object and URl', function() {

  })
})

describe('getServerData', function() {
  it('should return a promise', function() {

  })

  it('should run fetch three times', function() {

  })
})
