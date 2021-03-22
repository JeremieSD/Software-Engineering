import { pageRevisionsSearch } from '../Backend/searchingFunctionality';

var assert = require('assert');
describe('Searching for Albert Einstein', function(){
    it('Gets Q957',function(){
        assert.equal(pageRevisionsSearch('Albert Einstein'),'Q957');
    });
});