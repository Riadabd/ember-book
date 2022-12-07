import { module, test } from 'qunit';
import { setupTest } from 'rawre/tests/helpers';

module('Unit | Route | bands/band/index', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:bands/band/index');
    assert.ok(route);
  });
});
