var parser = require('../lib/parser.js');

describe('combo-parser', function () {
    it('single path', function () {
        expect(parser('/url/without/combo.js'))
            .toEqual(['/url/without/combo.js']);
    });

    it('single path with query', function () {
        expect(parser('/url/without/combo.js?t=000000.js'))
            .toEqual(['/url/without/combo.js']);

    });

    it('comboed without baseurl', function () {
        expect(parser('/??a.js,b.js'))
            .toEqual(['/a.js','/b.js']);

        expect(parser('??a.js,b.js'))
            .toEqual(['/a.js','/b.js']);
    });

    it('comboed with baseurl', function () {

        expect(parser('/basedir/d??a.js,b.js'))
            .toEqual(['/basedir/d/a.js','/basedir/d/b.js']);

        expect(parser('/basedir/d/??a.js,b.js'))
            .toEqual(['/basedir/d/a.js','/basedir/d/b.js']);

        expect(parser('/basedir/d/??a.js,c/b.js'))
            .toEqual(['/basedir/d/a.js','/basedir/d/c/b.js']);
    });

    it('combo with baseurl and query', function () {
        expect(parser('/basedir/d??a.js,b.js?t=99999.js'))
            .toEqual(['/basedir/d/a.js','/basedir/d/b.js']);

        expect(parser('/basedir/d/??a.js,b.js?t=xxxx??js'))
            .toEqual(['/basedir/d/a.js','/basedir/d/b.js']);
    });

});
