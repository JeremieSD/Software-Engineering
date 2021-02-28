var test = require('../Backend/searchingFunctionality.js');

var assert = require('assert');
describe('Searching for Albert Einstein', function(){
    it('Gets Q957',function(){
        assert.equal(getWikibaseItem('Albert Einstein'),'Q957');
    });
});