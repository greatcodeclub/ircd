var assert = require('assert'),
    mocks = require('./mocks')

xdescribe('User', function() {
  beforeEach(function () {
    this.user = mocks.user('ma')
  })

  it('sends', function () {
    this.user.send("some", "data")
    assert.deepEqual(this.user.connection.sent, ["some data\r\n"])
  })

  xit('sends reply', function () {
    this.user.sendReply("001", ":Welcome")
    assert.deepEqual(this.user.connection.sent, [":test.local 001 ma :Welcome\r\n"])
  })
})