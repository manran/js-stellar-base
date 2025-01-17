describe('Asset', function() {

    describe("constructor", function () {

        it("throws an error when there's no issuer for non XLM type asset", function () {
            expect(() => new StellarBase.Asset("USD")).to.throw()
        });

        it("throws an error when currency code is too long", function () {
            expect(() => new StellarBase.Asset("1234567890123", "GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ")).to.throw()
        });
    });

    describe("getCode()", function () {
        it("returns a code for a native asset object", function () {
            var asset = new StellarBase.Asset.native();
            expect(asset.getCode()).to.be.equal('XLM');
        });

        it("returns a code for a non-native asset", function () {
            var asset = new StellarBase.Asset("USD", "GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ");
            expect(asset.getCode()).to.be.equal('USD');
        });
    });

    describe("getIssuer()", function () {
        it("returns a code for a native asset object", function () {
            var asset = new StellarBase.Asset.native();
            expect(asset.getIssuer()).to.be.undefined;
        });

        it("returns a code for a non-native asset", function () {
            var asset = new StellarBase.Asset("USD", "GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ");
            expect(asset.getIssuer()).to.be.equal('GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ');
        });
    });

    describe("toXdrObject()", function () {
        it("parses a native asset object", function () {
            var asset = new StellarBase.Asset.native();
            var xdr = asset.toXdrObject();
            expect(xdr.toXDR().toString()).to.be.equal(new Buffer([0,0,0,0]).toString());
        });

        it("parses a 3-alphanum asset object", function () {
            var asset = new StellarBase.Asset("USD", "GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ");
            var xdr = asset.toXdrObject();

            expect(xdr).to.be.instanceof(StellarBase.xdr.Asset);
            expect(() => xdr.toXDR('hex')).to.not.throw();

            expect(xdr.arm()).to.equal('alphaNum4');
            expect(xdr.value().assetCode()).to.equal('USD\0');
        });

        it("parses a 4-alphanum asset object", function () {
            var asset = new StellarBase.Asset("BART", "GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ");
            var xdr = asset.toXdrObject();

            expect(xdr).to.be.instanceof(StellarBase.xdr.Asset);
            expect(() => xdr.toXDR('hex')).to.not.throw();

            expect(xdr.arm()).to.equal('alphaNum4');
            expect(xdr.value().assetCode()).to.equal('BART');
        });

        it("parses a 5-alphanum asset object", function () {
            var asset = new StellarBase.Asset("12345", "GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ");
            var xdr = asset.toXdrObject();

            expect(xdr).to.be.instanceof(StellarBase.xdr.Asset);
            expect(() => xdr.toXDR('hex')).to.not.throw();

            expect(xdr.arm()).to.equal('alphaNum12');
            expect(xdr.value().assetCode()).to.equal('12345\0\0\0\0\0\0\0');
        });

        it("parses a 12-alphanum asset object", function () {
            var asset = new StellarBase.Asset("123456789012", "GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ");
            var xdr = asset.toXdrObject();

            expect(xdr).to.be.instanceof(StellarBase.xdr.Asset);
            expect(() => xdr.toXDR('hex')).to.not.throw();

            expect(xdr.arm()).to.equal('alphaNum12');
            expect(xdr.value().assetCode()).to.equal('123456789012');
        });
    });
});
