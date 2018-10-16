const RFT = artifacts.require('RFT');

contract('RFT', async accounts => {
  it('should request a new empty token', async () => {
    const BASE_UNIT = 100;
    const AMOUNT = 10;
    const EVENT_FROM_ADDRES = '0x0000000000000000000000000000000000000000';
    const EVENT_NAME = 'Transfer';
    const TOKEN_ID = 1;

    const [from] = accounts;
    const instance = await RFT.deployed();

    const { logs } = await instance.requestToken(BASE_UNIT, AMOUNT, { from });
    assert.equal(logs.length, 1);

    const [{ event, args }] = logs;
    assert.equal(event, EVENT_NAME);
    assert.equal(args.tokenId.toNumber(), TOKEN_ID);
    assert.equal(args.to, from);
    assert.equal(args.from, EVENT_FROM_ADDRES);

    const [, baseUnit, amount, geoJson] = await instance.getToken.call(
      args.tokenId,
    );

    assert.equal(baseUnit.toNumber(), BASE_UNIT);
    assert.equal(amount.toNumber(), AMOUNT);
    assert.equal(geoJson, '');
  });
});
