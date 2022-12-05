import { module, test } from 'qunit';
import { setupTest } from 'rawre/tests/helpers';

module('Unit | Route | bands/new', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:bands/new');
    assert.ok(route);
  });
});
