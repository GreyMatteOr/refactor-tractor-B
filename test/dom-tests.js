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

  describe('addToDom', function() {
    it('should return nothing', function() {
      let spyGuys = makeSpy(domUpdates.addToDom);
      let recipeInfo = {
        id: '',
        name: '',
        image: '',
        tags: ['']
      }
      spyGuys(recipeInfo, '', node)
      expect(spyGuys.returned).to.deep.equal([undefined])
    })

    it('should run insertAdjacentHTML once', function() {
      let spyGuys = makeSpy(domUpdates.addToDom);
      let recipeInfo = {
        id: '',
        name: '',
        image: '',
        tags: ['']
      }
      spyGuys(recipeInfo, '', node)
      expect(node.insertAdjacentHTML.calls).to.equal(1);
    })

    it('should be called with beforeend', function() {
      let spyGuys = makeSpy(domUpdates.addToDom);
      let recipeInfo = {
        id: '',
        name: '',
        image: '',
        tags: ['']
      }
      let testString = `
      <div class="recipe-card" id=>
        <h3 maxlength="40"></h3>
        <div class="card-photo-container">
          <img src= class="card-photo-preview" alt=" recipe" title=" recipe">
          <div class="text">
            <div>Click for Instructions</div>
          </div>
        </div>
        <h4></h4>
        <img src="./images/apple-logo-outline.png" alt="unfilled apple icon" class="card-apple-icon">
      </div>`
      spyGuys(recipeInfo, '', node)
      expect(node.insertAdjacentHTML.calledWith[0]).to.deep.equal(['beforeend', testString]);
    })
  })

  describe('listTags', function() {
    let listSpy
  })

});
