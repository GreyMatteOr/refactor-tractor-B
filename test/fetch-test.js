import { expect } from 'chai';
const chai = require('chai');
const spies = require('chai-spies');
import goFetch from '../src/fetch-requests.js'

describe('post', function() {
  console.log('here2');
  it('should do a thing', function() {
    console.log('here1');
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
    expect('false').to.equal('false')
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
