var parser = require('..');
var expect = require("expect.js");

describe('combo-parser', function () {
    it('should parse single path', function () {
        expect(parser('/url/without/combo.js'))
            .to.be(undefined);
    });

    it('should parse single path with query', function () {
        expect(parser('/url/without/combo.js?t=000000.js'))
            .to.be(undefined);

    });

    it('should parse comboed without baseurl', function () {
        expect(parser('/??a.js,b.js'))
            .to.eql(['/a.js','/b.js']);

        expect(parser('??a.js,b.js'))
            .to.eql(['a.js','b.js']);
    });

    it('should parse comboed with baseurl', function () {

        expect(parser('/basedir/d??a.js,b.js'))
            .to.eql(['/basedir/d/a.js','/basedir/d/b.js']);

        expect(parser('/basedir/d/??a.js,b.js'))
            .to.eql(['/basedir/d/a.js','/basedir/d/b.js']);

        expect(parser('/basedir/d/??a.js,c/b.js'))
            .to.eql(['/basedir/d/a.js','/basedir/d/c/b.js']);
    });

    it('should parse combo with baseurl and query', function () {
        expect(parser('/basedir/d??/a.js,/b.js?t=99999.js'))
            .to.eql(['/basedir/d/a.js?t=99999.js','/basedir/d/b.js?t=99999.js']);

        expect(parser('/basedir/d/??a.js,b.js?t=xxxx??js'))
            .to.eql(['/basedir/d/a.js?t=xxxx??js','/basedir/d/b.js?t=xxxx??js']);
    });

});
