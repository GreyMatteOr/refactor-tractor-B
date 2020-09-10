import { expect } from 'chai';

import domUpdates from '../src/domUpdates.js';

function makeSpy(toTest) {
  function spy() {
    spy.calledWith.push(Array.from(arguments))
    spy.calls++;
    let result = spy.func(...arguments);
    spy.returned.push(result)
    return result;
  }
  spy.func = toTest;
  spy.calledWith = [];
  spy.returned = [];
  spy.calls = 0;
  return spy;
}
var node;
describe.only('Dom Update Object', function() {
  beforeEach(function () {
    global.document = {};
    node = {};
    node.insertAdjacentHTML = makeSpy(() => 'KJ')
    global.document.querySelector = makeSpy(() => {
      return node;
    });
  });

  describe('greetUser', function() {
    it('should receive a string as a parameter', function() {
      let babySpy = makeSpy(domUpdates.greetUser);
      babySpy('Gertrude');
      expect(babySpy.calls).to.equal(1);
      expect(babySpy.calledWith).to.deep.equal([['Gertrude']]);

      expect(global.document.querySelector.returned).to.deep.equal([node]);
      expect(global.document.querySelector.calls).to.equal(1);
      expect(global.document.querySelector.calledWith).to.deep.equal([[".banner-image"]]);

      expect(node.insertAdjacentHTML.returned).to.deep.equal(['KJ']);
      expect(node.insertAdjacentHTML.calls).to.equal(1);
      expect(node.insertAdjacentHTML.calledWith[0][0]).to.equal("afterbegin");

      babySpy('Batilba');
      expect(babySpy.calls).to.equal(2);
      expect(babySpy.calledWith).to.deep.equal([['Gertrude'],['Batilba']]);
    });
  });
});
